import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getCurrentState,
  startSimulationLoop,
  triggerPresetScenario,
  resolveIncidentInSimulation,
  addIncidentInSimulation
} from './services/mockDataGenerator';
import { getAIReasoning, streamAIReasoning } from './services/groqService';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: '*', // In development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 1. Simple Security Rate Limiter (IP-based, in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per min

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  let rateData = rateLimitMap.get(ip);
  if (!rateData || now > rateData.resetTime) {
    rateData = { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, rateData);
    return next();
  }

  rateData.count++;
  if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait 60 seconds before calling telemetry again.'
    });
  }

  next();
}

app.use('/api/', rateLimiter);

// 2. Input Validation Middleware
function validateIncidentInput(req: Request, res: Response, next: NextFunction) {
  const { title, type, severity, location, details } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({ error: 'Validation Error', message: 'Incident title must be a string of at least 3 characters.' });
  }
  if (!type || !['medical', 'security', 'sustainability', 'infrastructure', 'general'].includes(type)) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid incident type. Must be medical, security, sustainability, infrastructure, or general.' });
  }
  if (!severity || !['low', 'medium', 'high', 'critical'].includes(severity)) {
    return res.status(400).json({ error: 'Validation Error', message: 'Invalid severity rating. Must be low, medium, high, or critical.' });
  }
  if (!location || typeof location !== 'string') {
    return res.status(400).json({ error: 'Validation Error', message: 'Incident location is required.' });
  }
  
  next();
}

// 3. API Endpoints

// GET /api/mock-live: Get the current live simulated stadium state
app.get('/api/mock-live', (req: Request, res: Response) => {
  try {
    const currentState = getCurrentState();
    res.json(currentState);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Telemetry Error', message: error.message });
  }
});

// POST /api/what-if: Trigger a hypothetical scenario and return the modified state
app.post('/api/what-if', (req: Request, res: Response) => {
  try {
    const { scenario } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: 'Bad Request', message: 'Scenario name is required.' });
    }
    
    const modifiedState = triggerPresetScenario(scenario);
    res.json(modifiedState);
  } catch (error: any) {
    res.status(500).json({ error: 'Simulation Error', message: error.message });
  }
});

// POST /api/incident/report: Log a new incident
app.post('/api/incident/report', validateIncidentInput, (req: Request, res: Response) => {
  try {
    const { title, type, severity, location, details, priority, department, resourcesRequired, nearbyResponders, escalationLevel, suggestedActions } = req.body;
    
    const addedIncident = addIncidentInSimulation({
      title,
      type,
      severity,
      location,
      status: 'reported',
      details: details || '',
      priority: priority || 3,
      department: department || 'Operations',
      resourcesRequired: resourcesRequired || [],
      nearbyResponders: nearbyResponders || [],
      escalationLevel: escalationLevel || 'Level 0',
      suggestedActions: suggestedActions || []
    });

    res.status(201).json({
      message: 'Incident reported successfully',
      incident: addedIncident,
      currentState: getCurrentState()
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Dispatch Error', message: error.message });
  }
});

// POST /api/incident/resolve: Resolve an existing incident
app.post('/api/incident/resolve', (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Bad Request', message: 'Incident ID is required to resolve.' });
    }

    const updatedState = resolveIncidentInSimulation(id);
    res.json({
      message: `Incident ${id} marked as resolved.`,
      currentState: updatedState
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Resolution Error', message: error.message });
  }
});

// POST /api/copilot/ask: Retrieve a context-enriched structured AI reasoning trace (non-streaming)
app.post('/api/copilot/ask', async (req: Request, res: Response) => {
  try {
    const { prompt, role, useDeepseek } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Bad Request', message: 'Prompt is required.' });
    }

    const state = getCurrentState();
    const trace = await getAIReasoning(prompt, state, role || 'organizer', useDeepseek || false);
    res.json(trace);
  } catch (error: any) {
    res.status(500).json({ error: 'AI Copilot Error', message: error.message });
  }
});

// GET /api/chat/stream: Server-Sent Events stream for FLOW AI reasoning steps
app.get('/api/chat/stream', (req: Request, res: Response) => {
  const prompt = req.query.prompt as string;
  const role = (req.query.role as string) || 'organizer';

  if (!prompt) {
    return res.status(400).json({ error: 'Bad Request', message: 'Prompt query parameter is required.' });
  }

  // Set headers for Server-Sent Events
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no' // Prevent proxy buffering
  });

  const sendEvent = (data: string, eventName?: string) => {
    if (eventName) {
      res.write(`event: ${eventName}\n`);
    }
    res.write(`data: ${data}\n\n`);
  };

  // Keep-alive heartbeat connection monitor
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  const state = getCurrentState();

  try {
    streamAIReasoning(prompt, state, role, sendEvent, () => {
      clearInterval(heartbeat);
      res.end();
    });
  } catch (err: any) {
    sendEvent(JSON.stringify({ error: err.message }), 'error');
    clearInterval(heartbeat);
    res.end();
  }

  req.on('close', () => {
    clearInterval(heartbeat);
  });
});

// 4. Global Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred in the FIFA FLOW telemetry system.'
  });
});

// Start telemetry loops
startSimulationLoop();

// Listen
app.listen(PORT, () => {
  console.log(`🚀 FIFA FLOW backend running on http://localhost:${PORT}`);
});
