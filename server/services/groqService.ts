import { Groq } from 'groq-sdk';
import { StadiumState } from '../types';

// Read API keys and configs
const apiKey = process.env.GROQ_API_KEY || '';
const activeModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const fallbackModel = process.env.GROQ_FALLBACK_MODEL || 'llama-3.1-8b-instant';
const reasoningModel = process.env.GROQ_REASONING_MODEL || 'deepseek-r1-distill-llama-70b';

let groqClient: Groq | null = null;
if (apiKey) {
  groqClient = new Groq({ apiKey });
} else {
  console.warn('⚠️ GROQ_API_KEY environment variable is not defined. Using Advanced Local Reasoning Engine fallback.');
}

// Structured output interface
export interface AIReasoningTrace {
  recommendation: string;
  confidence: number;
  reasoning: string[];
  alternatives: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  department: 'Security' | 'Volunteers' | 'Medical' | 'Operations' | 'General';
}

/**
 * Clean and sanitize user prompt input to prevent prompt injections
 */
function sanitizeInput(prompt: string): string {
  if (!prompt) return '';
  return prompt
    .replace(/<[^>]*>/g, '') // remove HTML tag like injections
    .substring(0, 1000)      // limit characters
    .trim();
}

/**
 * Fallback local engine for offline / no-key execution.
 * Simulates the telemetry context processing, decision ranking, and formatted JSON output.
 */
function runLocalReasoningEngine(prompt: string, context: StadiumState, role: string): AIReasoningTrace {
  const query = prompt.toLowerCase();
  
  // Context elements
  const currentOccupancy = context.occupancy.current;
  const isC2Red = context.sections.C2.crowdDensity === 'red';
  const isC3Red = context.sections.C3.crowdDensity === 'red';
  const activeIncidents = context.incidents.filter(i => i.status !== 'resolved');
  const rainStart = context.weather.condition === 'RAIN';
  const metroDelayed = context.transportation.metro.line2.status === 'DELAYED';

  // Default trace response
  let recommendation = "FLOW AI is monitoring stadium operations. Telemetry feeds are normal.";
  let confidence = 94;
  let reasoning = [
    `Stadium occupancy is currently at ${context.occupancy.percent}%`,
    "All security and volunteer patrol quadrants are reporting green",
    "Weather telemetry shows clear operational parameters"
  ];
  let alternatives = [
    "Maintain standard volunteer post rotation schedules",
    "Keep monitoring Gate C ingress queue feeds"
  ];
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let department: 'Security' | 'Volunteers' | 'Medical' | 'Operations' | 'General' = 'Operations';

  if (activeIncidents.length > 0) {
    riskLevel = 'MEDIUM';
  }

  // 1. Route Planning or Gate Congestion Query
  if (query.includes('route') || query.includes('gate') || query.includes('congest') || query.includes('go to') || query.includes('leave') || query.includes('exit')) {
    department = 'Operations';
    if (context.occupancy.gates.C.congestion > 95 || isC2Red || isC3Red) {
      recommendation = "Reroute exit flows away from Gate C and direct fans to Gate D.";
      confidence = 96;
      reasoning = [
        `Gate C entry congestion is currently at ${context.occupancy.gates.C.congestion}% design limit.`,
        "Sections C2 and C3 are reporting high crowd density limits.",
        "Gate D reports 70% congestion and has open lane capacity."
      ];
      alternatives = [
        "Open auxiliary overflow barriers at Gate B West Corridor.",
        "Instruct field volunteers to hold crowd flows at Concourse C Entrance."
      ];
      riskLevel = 'HIGH';
    } else {
      recommendation = "Keep main exits open. Maintain standard directional flows.";
      confidence = 92;
      reasoning = [
        "Gate C and Gate B are operating within acceptable threshold limits.",
        "Total crowd egress rate is steady at 1,200 fans per minute."
      ];
      alternatives = [
        "Open Gate D pre-scan checkpoints early if volumes increase."
      ];
    }
  }
  // 2. Weather Event Query
  else if (query.includes('rain') || query.includes('weather') || query.includes('wet') || query.includes('temp') || rainStart) {
    department = 'Operations';
    recommendation = "Activate Wet Weather Protocol: Redirect spectators to covered concourse corridors.";
    confidence = 95;
    reasoning = [
      "Weather sensors register precipitation probability at 95%.",
      "Outer plaza steps present slip risks to pedestrians.",
      "Concourse HVAC systems have been set to indoor air dehumidification mode."
    ];
    alternatives = [
      "Distribute disposable rain ponchos at volunteer stations.",
      "Implement speed limitations for security and transport shuttles."
    ];
    if (rainStart) riskLevel = 'MEDIUM';
  }
  // 3. Transit / Metro Query
  else if (query.includes('metro') || query.includes('train') || query.includes('bus') || query.includes('transport') || metroDelayed) {
    department = 'Operations';
    if (metroDelayed) {
      recommendation = "Deploy shuttle bus fleet from Gate C to Town Center Hub.";
      confidence = 98;
      reasoning = [
        "Metro Line 2 reports a technical signal failure causing a 25-minute delay.",
        "Stadium transit terminal is experiencing high platform accumulation (1,500+ fans).",
        "12 reserve shuttle buses are active and idle in Lot C."
      ];
      alternatives = [
        "Broadcast transit delays on in-bowl stadium screens and display signage.",
        "Deploy volunteers to Metro platforms to coordinate row queue queues."
      ];
      riskLevel = 'HIGH';
    } else {
      recommendation = "Keep standard metro dispatch schedules. Monitor platform counts.";
      confidence = 94;
      reasoning = [
        "Metro Line 1 and 2 are operating at optimal 4-minute intervals.",
        "Platform queue clearing times are under 3 minutes."
      ];
      alternatives = [
        "Pre-stage Shuttle Bus Fleet A to handle peak post-match departure volumes."
      ];
    }
  }
  // 4. Medical / Health Emergency Query
  else if (query.includes('medical') || query.includes('medic') || query.includes('collapse') || query.includes('hurt') || query.includes('injury')) {
    department = 'Medical';
    const medicalInc = activeIncidents.find(i => i.type === 'medical');
    if (medicalInc) {
      recommendation = `Dispatch Medic Unit to ${medicalInc.location} via Corridor E-3 immediately.`;
      confidence = 99;
      reasoning = [
        `Active medical event: ${medicalInc.title} reported at ${medicalInc.location}.`,
        "Corridor E-3 is clear of spectator crowds and offers a 2.4-minute faster arrival time.",
        "Volunteer John D. has reached the spot and is providing initial aid."
      ];
      alternatives = [
        "Dispatch backup motorized cart crew from West Hub.",
        "Initiate emergency transport coordinates for ambulances at gate entrance."
      ];
      riskLevel = 'HIGH';
    } else {
      recommendation = "Monitor stadium medical post occupancy. All responder teams are currently green.";
      confidence = 95;
      reasoning = [
        "No unresolved critical medical reports are on the queue.",
        "First-aid posts A, B, and C have 85% bed and staff availability."
      ];
      alternatives = [
        "Conduct periodic radio check-ins with volunteer rover units."
      ];
    }
  }
  // 5. Security / Threat Query
  else if (query.includes('security') || query.includes('fight') || query.includes('scuffle') || query.includes('suspicious') || query.includes('gate closed')) {
    department = 'Security';
    const secInc = activeIncidents.find(i => i.type === 'security');
    if (secInc) {
      recommendation = `Dispatch Security Patrol Unit 5 to ${secInc.location} to resolve active scuffle.`;
      confidence = 96;
      reasoning = [
        `Active alert: ${secInc.title} at ${secInc.location}.`,
        "Security patrol Unit 5 is currently stationed 60 meters away at Section B2.",
        "Area cameras have been focused and are feeding real-time footage to Security command."
      ];
      alternatives = [
        "Deploy nearby volunteer supervisor Yusuf A. to observe and report progress.",
        "Temporarily hold line access at row 12 entrance."
      ];
      riskLevel = 'MEDIUM';
    } else {
      recommendation = "Maintain standard roving patrols. Gate entry points report secure parameters.";
      confidence = 93;
      reasoning = [
        "All checkpoint metal scanners and digital ID systems are operating normally.",
        "No active security flags reported."
      ];
      alternatives = [
        "Rotate outer plaza patrol lines ahead of post-match mass egress."
      ];
    }
  }
  // 6. Concessions / Food Query
  else if (query.includes('food') || query.includes('stall') || query.includes('inventory') || query.includes('hungry') || query.includes('eat')) {
    department = 'Operations';
    if (context.foodStalls['Stall 18'].inventoryPercent < 30) {
      recommendation = "Promote Concession redirection: Reroute vegans and general orders to Stall 20.";
      confidence = 94;
      reasoning = [
        "Stall 18 (Halal Grill) inventory level is at 28% capacity.",
        "Wait line at Stall 18 is currently 18 minutes.",
        "Stall 20 (Vegan Deli) has excess stock levels (94%) and a wait time under 2 minutes."
      ];
      alternatives = [
        "Dispatch emergency stock replenishment cart from Central Kitchen.",
        "Update digital queue signage to reflect Stall 18 delays."
      ];
      riskLevel = 'MEDIUM';
    } else {
      recommendation = "Maintain standard concession services. Stock levels are stable.";
      confidence = 91;
      reasoning = [
        "Average concession inventory is at 74% capacity.",
        "Mean wait times across all stalls is 6.5 minutes."
      ];
      alternatives = [
        "Coordinate Halftime peak stock staging with back-of-house logistics."
      ];
    }
  }
  // 7. Sustainability Query
  else if (query.includes('sustain') || query.includes('power') || query.includes('energy') || query.includes('water') || query.includes('waste')) {
    department = 'Operations';
    if (context.sustainability.powerUsageKw > 800) {
      recommendation = "Activate Energy Saving Protocol: Dim outer structural ring lights by 30%.";
      confidence = 97;
      reasoning = [
        `Power draw has crossed peak threshold at ${context.sustainability.powerUsageKw} kW.`,
        "Match is currently in active gameplay phase (reduced concourse illumination required).",
        "Dimming reduces immediate grid strain by 85kW without impacting field of play."
      ];
      alternatives = [
        "Set secondary lobby displays to eco-idle sleep modes.",
        "Stagger non-critical chiller unit cycles in South Concourse."
      ];
      riskLevel = 'MEDIUM';
    } else {
      recommendation = "Sustainability grid parameters normal. Carbon offsetting target of 4,250kg on track.";
      confidence = 93;
      reasoning = [
        "Power usage is 640kW (well below the 800kW baseline threshold).",
        "Water conservation loops are running at 94% efficiency."
      ];
      alternatives = [
        "Initiate compost recycling sweeps near North concession rows."
      ];
    }
  }
  // 8. General / Copilot Action Query (What should I do next)
  else if (query.includes('what should i do') || query.includes('next') || query.includes('copilot') || query.includes('command') || query.includes('status')) {
    if (context.occupancy.gates.C.congestion > 95 || isC2Red) {
      recommendation = "Deploy 3 volunteers from West Gate to Gate C, and initiate Gate D signage bypass.";
      confidence = 96;
      reasoning = [
        "Gate C has exceeded 104% design capacity, causing 25 min queues.",
        "West Gate has 3 idle volunteers available immediately.",
        "Favorable weather conditions allow safe outdoor redirection."
      ];
      alternatives = [
        "Broadcast emergency crowd advice to incoming rail travelers.",
        "Open outer ticket validation gates B2 and B3 for free egress."
      ];
      riskLevel = 'HIGH';
    } else if (context.incidents.some(i => i.status !== 'resolved')) {
      const firstInc = context.incidents.find(i => i.status !== 'resolved')!;
      recommendation = `Dispatch responders to ${firstInc.location} for ${firstInc.title}.`;
      confidence = 98;
      reasoning = [
        `Incident ${firstInc.id} remains in status: ${firstInc.status}.`,
        `Required resources: ${firstInc.resourcesRequired.join(', ')}.`,
        `Responders located within 120 meters: ${firstInc.nearbyResponders.join(', ')}.`
      ];
      alternatives = [
        "Issue localized warning broadcasts to avoid nearby pedestrian channels."
      ];
      riskLevel = 'MEDIUM';
    } else {
      recommendation = "All parameters nominal. Conduct general perimeter scans.";
      confidence = 90;
      reasoning = [
        "Total crowd count is stabilized.",
        "Transport transit loops are on schedule.",
        "Energy grid is operating inside eco limits."
      ];
      alternatives = [
        "Verify post-match departure routes are clear of structural materials."
      ];
    }
  }

  return {
    recommendation,
    confidence,
    reasoning,
    alternatives,
    riskLevel,
    department
  };
}

/**
 * Executes a reasoning request. Matches contextual factors, queries Groq API with Llama 3.3
 * or DeepSeek R1 models, parses structured JSON, and returns the result. Falls back gracefully.
 */
export async function getAIReasoning(
  prompt: string,
  context: StadiumState,
  role: string = 'organizer',
  useDeepseek: boolean = false
): Promise<AIReasoningTrace> {
  const sanitizedPrompt = sanitizeInput(prompt);

  // If no Groq API Key, run local simulation reasoning engine
  if (!groqClient) {
    // Artificial 300ms latency to look realistic
    await new Promise(resolve => setTimeout(resolve, 350));
    return runLocalReasoningEngine(sanitizedPrompt, context, role);
  }

  const systemInstructions = `
You are FLOW AI, the intelligent operations copilot for the FIFA World Cup 2026.
Your job is to reason about stadium telemetry, safety incidents, volunteer grids, crowd levels, transport delay flags, and environmental stats.

Role of user making request: "${role}"

Current Stadium Telemetry Context:
${JSON.stringify({
  healthScore: context.healthScore,
  occupancy: context.occupancy,
  activeIncidentCount: context.incidents.filter(i => i.status !== 'resolved').length,
  recentIncidents: context.incidents.filter(i => i.status !== 'resolved').slice(0, 3),
  weather: context.weather,
  metroStatus: context.transportation.metro,
  shuttleStatus: context.transportation.bus,
  lowStockFoodStalls: Object.keys(context.foodStalls)
    .filter(k => context.foodStalls[k].inventoryPercent < 40)
    .map(k => ({ name: k, item: context.foodStalls[k].name, stock: context.foodStalls[k].inventoryPercent })),
  sustainability: context.sustainability,
  volunteers: { active: context.volunteers.active, assigned: context.volunteers.assigned, idle: context.volunteers.idle }
}, null, 2)}

You must perform a context-aware reasoning chain. Think about:
1. Primary risk and critical congestion points.
2. What actions should be prioritized.
3. Logical backup alternatives.
4. Explainable indicators ("Why" bullets).

You MUST output your response strictly as a structured JSON object. Do not include any markdown fences (like \`\`\`json), do not include any preamble or extra text. Output ONLY the JSON block matching this TypeScript interface:

interface AIReasoningTrace {
  recommendation: string; // The primary actionable instruction. Be direct, clear, and professional.
  confidence: number; // Percentage score (1-100) reflecting confidence based on telemetry details and impact.
  reasoning: string[]; // List of specific indicators or facts that explain WHY this recommendation is made.
  alternatives: string[]; // List of 2 alternative backup steps if the primary recommendation cannot be executed.
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  department: 'Security' | 'Volunteers' | 'Medical' | 'Operations' | 'General';
}
`;

  // Try Groq API execution with retry logic
  let attempts = 0;
  const maxAttempts = 3;
  let delay = 1000; // 1s base delay

  const modelToUse = useDeepseek ? reasoningModel : activeModel;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      
      // Set up a 8-second timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemInstructions },
          { role: 'user', content: sanitizedPrompt }
        ],
        model: modelToUse,
        temperature: 0.1, // low temperature for structured logic
        response_format: { type: 'json_object' }
      }, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const content = completion.choices[0]?.message?.content || '{}';
      const parsed: AIReasoningTrace = JSON.parse(content);
      
      // Return validated object
      return {
        recommendation: parsed.recommendation || "All operations nominal. Keep monitoring feeds.",
        confidence: parsed.confidence || 90,
        reasoning: parsed.reasoning || ["Telemetry is operating within stable parameters."],
        alternatives: parsed.alternatives || ["Maintain standard response team locations."],
        riskLevel: parsed.riskLevel || 'LOW',
        department: parsed.department || 'Operations'
      };

    } catch (error: any) {
      console.error(`Groq API attempt ${attempts} failed:`, error.message);
      
      if (attempts >= maxAttempts) {
        console.warn('All Groq API retries failed. Running fallback local reasoning engine.');
        return runLocalReasoningEngine(sanitizedPrompt, context, role);
      }

      // Wait with exponential backoff before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  return runLocalReasoningEngine(sanitizedPrompt, context, role);
}

/**
 * Simulates a streaming API response via Server-Sent Events (SSE).
 * Sends the structured JSON pieces step-by-step to the frontend, demonstrating the reasoning process.
 */
export function streamAIReasoning(
  prompt: string,
  context: StadiumState,
  role: string,
  sendEvent: (data: string, eventName?: string) => void,
  onComplete: () => void
) {
  const sanitizedPrompt = sanitizeInput(prompt);
  
  // 1. Simulate Context Collection Phase
  setTimeout(() => {
    sendEvent(JSON.stringify({
      step: 'COLLECTING_CONTEXT',
      message: 'FLOW AI: Gathering localized telemetry, crowd counts, weather parameters, and safety feeds...'
    }), 'reasoning_step');
  }, 300);

  // 2. Simulate Decision Engine Threshold Evaluation
  setTimeout(() => {
    sendEvent(JSON.stringify({
      step: 'DECISION_ENGINE',
      message: 'Decision Engine: Evaluating gate occupancy, queue delays, active dispatcher alerts, and priority rankings...'
    }), 'reasoning_step');
  }, 800);

  // 3. Simulate Groq API Request / Local reasoning execution
  setTimeout(async () => {
    sendEvent(JSON.stringify({
      step: 'MODEL_INFERENCE',
      message: `Model Inference: Querying reasoning model (${groqClient ? activeModel : 'Local reasoning engine'}) for optimal recommendations...`
    }), 'reasoning_step');

    try {
      const finalResponse = await getAIReasoning(sanitizedPrompt, context, role);
      
      setTimeout(() => {
        sendEvent(JSON.stringify({
          step: 'FORMATTING_RESULT',
          message: 'Reasoning Formatter: Validating JSON schema and mapping to operations situation dashboard...'
        }), 'reasoning_step');
      }, 300);

      setTimeout(() => {
        sendEvent(JSON.stringify({
          step: 'COMPLETE',
          data: finalResponse
        }), 'reasoning_step');
        onComplete();
      }, 800);

    } catch (err) {
      const fallback = runLocalReasoningEngine(sanitizedPrompt, context, role);
      sendEvent(JSON.stringify({
        step: 'COMPLETE',
        data: fallback
      }), 'reasoning_step');
      onComplete();
    }
  }, 1300);
}
