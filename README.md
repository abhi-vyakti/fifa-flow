# FIFA FLOW
## The AI Operations Copilot Behind Every Match

FIFA FLOW is an enterprise-grade AI operating system and telemetry dispatch copilot designed to manage and optimize the stadium experience for the **FIFA World Cup 2026**. 

It aggregates real-time sensor telemetries (crowd volumes, gate queues, utilities load, and transit timings) into a single unified control room. It maps section bottlenecks visually, dispatches security or medical responders via optimal corridors, coordinates gamified volunteer checklist queues, and runs automated "What-If" crisis simulations.

---

## 🌟 Key Features

1. **AI Situation Room (Operations Hub)**:
   - Displays real-time risk indicators, countdowns for incoming transits, and predicted bottlenecks.
   - Outputs main action steps with confidence metrics (e.g. 96%) and fallback choice options.
   - Provides fully Explainable AI logs showing the exact telemetry parameters driving recommendations.

2. **Interactive Stadium Digital Twin (SVG Heatmap)**:
   - Visual floor plan of stadium stands (North, East, South, West).
   - Dynamic section colors matching crowd volumes (Green ➔ Yellow ➔ Orange ➔ Red).
   - Hover grids and click handlers opening detailed metrics (staffing count, queues, active events).

3. **What-If Scenario Simulator**:
   - Allows operators to simulate hypotheticals: Kickoff Rush, Medical Emergency, Heavy Rain Downpour, Metro Line Delay, Full Capacity Stadium, or VIP Delegation Arrival.
   - Modifies sensor values and triggers choreographed recovery timelines instantly.

4. **Judge Demo Mode Walkthrough ("🚀 Launch Demo")**:
   - An automated 60-second guided simulation sequence representing a kickoff bottleneck crisis and its step-by-step resolution. Ideal for rapid hackathon evaluations.

5. **Accessibility Assistant**:
   - Custom mobility routes for wheelchair users (avoids stairs and escalators), elderly, and families.
   - Screen-reader tags, high-contrast layouts, color-blind friendly shapes, and voice synthesis support.

6. **Multilingual Broadcast Generator**:
   - Translates safety directives instantly across six languages: English, Spanish, French, Portuguese, Arabic, and Hindi.

7. **Gamified Volunteer Portal**:
   - Renders performance stats (tasks completed, response speed, assisted counts) and rank tier badges (Gold/Silver/Bronze) with animations.

8. **System Telemetry Panel**:
   - Live analytics representing API updates, active AI agents count, and Groq SDK connectivity.

---

## ⚙️ System Architecture & Telemetry Pipeline

Rather than routing raw user inputs directly to LLMs, FIFA FLOW coordinates a context-aware filtering pipeline:

```
Telemetry Engine (Raw Sensors)
          ↓
Context Collector (Aggregates Role, Location & Safety State)
          ↓
Decision Engine (Evaluates priorities & threshold constraints)
          ↓
Groq API Inference (llama-3.3-70b-versatile / deepseek-r1-distill-llama-70b)
          ↓
Reasoning Formatter (Validates output traces and confidence indexes)
          ↓
Dashboard Interface (Updates Situation Room & specialized views)
```

---

## 📁 Project Directory Structure

```
FIFA-FLOW/
├── package.json         # Frontend configuration & UI packages
├── tailwind.config.js   # Custom dark mode theme & animations
├── postcss.config.js
├── index.html           # Main SPA entrypoint
├── server/
│   ├── server.ts        # Express API gateway & rate limiter
│   ├── package.json     # Backend server dependencies
│   ├── tsconfig.json    # TypeScript configurations
│   └── services/
│       ├── groqService.ts       # Groq SDK controller (exponential retries & SSE streams)
│       └── mockDataGenerator.ts # Simulated sensors loop & preset scenarios
└── src/
    ├── main.tsx
    ├── index.css        # Base typography, custom scrollbars & glass styling
    ├── App.tsx          # React Router client navigation paths
    ├── components/
    │   ├── DashboardLayout.tsx   # Enterprise shell with telemetry & activity feeds
    │   ├── StadiumDigitalTwin.tsx # Interactive SVG Stand Map
    │   ├── AISituationRoom.tsx   # Operations command summary board
    │   └── AICopilot.tsx         # Conversational search & voice analyzer
    ├── pages/
    │   ├── LandingPage.tsx       # Product welcome page & demo launcher
    │   ├── OrganizerDashboard.tsx # Recharts grids & sustainability trackers
    │   ├── FanAssistant.tsx      # Seat finding, SOS & navigation tools
    │   ├── VolunteerDashboard.tsx # Gamified tasks & lost item loggers
    │   ├── SecurityDashboard.tsx  # Broadcast translation & suspicious activity forms
    │   ├── MedicalDashboard.tsx   # Triage dispatch, routes & aid beds capacity
    │   ├── ArchitecturePage.tsx   # Interactive flowchart page for judges
    │   └── SettingsPage.tsx       # Accessibility checks & active role toggle
    ├── contexts/
    │   ├── LiveDataContext.tsx   # Telemetry polling & demo story controller
    │   ├── AIContext.tsx         # Streaming SSE client & local fallback engine
    │   └── ThemeContext.tsx      # Settings, translation & contrast toggle
    ├── hooks/
    │   └── useSpeech.ts          # Speech synthesis and web recognition
    └── utils/
        ├── helpers.ts            # Formatting utility functions
        └── helpers.test.ts       # Vitest unit test suite
```

---

## 🚀 Installation & Launch Setup

### Prerequisites
- Node.js (v18 or higher)
- NPM or Yarn package manager

### 1. Configure Environment Variables
Create a `.env` file in the `server/` directory:
```env
PORT=3001
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_REASONING_MODEL=deepseek-r1-distill-llama-70b
```
*Note: If `GROQ_API_KEY` is omitted, the application automatically activates a local, deterministic client reasoning engine fallback. This guarantees the dashboard remains fully responsive and functional even without an API key.*

### 2. Start the Backend Express Server (Port 3001)
```bash
cd server
npm install
npm run dev
```

### 3. Start the Frontend Vite Server (Port 5173)
In a separate terminal, navigate to the project root:
```bash
npm install
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to explore the system!

### 4. Run Automated Unit Tests
```bash
npm test
```
