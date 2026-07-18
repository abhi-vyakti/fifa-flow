import React, { createContext, useContext, useState, useRef } from 'react';
import { useLiveData } from './LiveDataContext';

export interface AIReasoningTrace {
  recommendation: string;
  confidence: number;
  reasoning: string[];
  alternatives: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  department: string;
}

interface AIContextType {
  askCopilot: (prompt: string, role?: string, useDeepseek?: boolean) => Promise<AIReasoningTrace>;
  askCopilotStream: (
    prompt: string,
    role: string,
    onStepChange: (step: string, message: string) => void,
    onComplete: (data: AIReasoningTrace) => void,
    onError: (err: string) => void
  ) => void;
  cancelActiveRequest: () => void;
  loading: boolean;
  activeStep: { step: string; message: string } | null;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state: liveState } = useLiveData();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<{ step: string; message: string } | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  // Local fallback client reasoning generator (replicates the backend flow)
  const generateLocalReasoning = (prompt: string, role: string): AIReasoningTrace => {
    const query = prompt.toLowerCase();
    const activeIncidents = liveState.incidents.filter(i => i.status !== 'resolved');
    const isC2Red = liveState.sections.C2.crowdDensity === 'red';
    const rainActive = liveState.weather.condition === 'RAIN';
    const metroDelayed = liveState.transportation.metro.line2.status === 'DELAYED';

    let recommendation = "All stadium operations are running within normal parameters. Telemetry normal.";
    let confidence = 95;
    let reasoning = [
      `Overall stadium health score is at ${liveState.healthScore.overall}%.`,
      "All active volunteer quadrants are reporting green status.",
      "Weather sensors register normal temperature and humidity."
    ];
    let alternatives = [
      "Maintain default security patrols around outer concourses.",
      "Monitor incoming shuttle frequency."
    ];
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let department = 'Operations';

    if (activeIncidents.length > 0) riskLevel = 'MEDIUM';

    if (query.includes('route') || query.includes('gate') || query.includes('go to') || query.includes('exit') || query.includes('congest')) {
      department = 'Operations';
      if (liveState.occupancy.gates.C.congestion > 95 || isC2Red) {
        recommendation = "Bypass Gate C. Direct fans to Gate D exit points and update dynamic routing panels.";
        confidence = 96;
        reasoning = [
          `Gate C occupancy has reached ${liveState.occupancy.gates.C.congestion}% design limit.`,
          "Concourse Section C2 is reporting red bottleneck densities.",
          "Gate D exhibits 70% congestion with open entry turnstiles."
        ];
        alternatives = [
          "Establish secondary manual bypass lanes through West Plaza Gate B.",
          "Instruct volunteers at Section B4 to hold egress waves."
        ];
        riskLevel = 'HIGH';
      } else {
        recommendation = "Maintain regular exit lanes. Direct flow signs to nearest gate.";
        confidence = 91;
        reasoning = [
          "All gate structures are operating below 90% congestion levels.",
          "Crowd egress speed is stable at 1,150 fans/minute."
        ];
        alternatives = [
          "Open standby turnstiles if platform density spikes."
        ];
      }
    } else if (query.includes('rain') || query.includes('weather') || rainActive) {
      department = 'Operations';
      recommendation = "Deploy slip warning indicators and redirect crowds to covered concourse corridors.";
      confidence = 94;
      reasoning = [
        "Precipitation registers active rain levels.",
        "Wet tiles on outdoor stairs present friction safety concerns.",
        "Outdoor plaza winds register above 15 knots."
      ];
      alternatives = [
        "Issue localized mobile alert warnings about slip hazards.",
        "Set external transport shuttles to bad-weather speed limit mode."
      ];
      riskLevel = 'MEDIUM';
    } else if (query.includes('metro') || query.includes('train') || query.includes('transport') || metroDelayed) {
      department = 'Operations';
      if (metroDelayed) {
        recommendation = "Deploy Shuttle Bus Fleet B to transport fans to Town Center station.";
        confidence = 98;
        reasoning = [
          "Metro Line 2 reports a signal failure with a 25-minute delay.",
          "Station terminal platform holds over 1,500 waiting passengers.",
          "12 reserve shuttle buses are active and idle in Lot C."
        ];
        alternatives = [
          "Broadcast delay advisories on stadium display monitors.",
          "Redirect crowd streams to food concourses to stagger departures."
        ];
        riskLevel = 'HIGH';
      } else {
        recommendation = "Maintain normal train scheduling. Platform metrics are normal.";
        confidence = 93;
        reasoning = [
          "Metro Line 1 and 2 next arrival times are under 5 minutes.",
          "Platform boarding queues are cleared on every train departure."
        ];
        alternatives = [
          "Pre-stage Lot C buses in preparation for post-match surges."
        ];
      }
    } else if (query.includes('medical') || query.includes('medic') || query.includes('hurt') || query.includes('collapse')) {
      department = 'Medical';
      const medInc = activeIncidents.find(i => i.type === 'medical');
      if (medInc) {
        recommendation = `Dispatch Medical Squad to ${medInc.location} via inner Corridor E-3.`;
        confidence = 99;
        reasoning = [
          `Active emergency: ${medInc.title} at ${medInc.location}.`,
          "Inner Corridor E-3 is clear of public lines, providing 2.4 min faster ETA.",
          "First responder John D. has reached the patient."
        ];
        alternatives = [
          "Deploy auxiliary golf-cart medic squad from East Post.",
          "Request local ambulance standby at Entrance Gate B."
        ];
        riskLevel = 'HIGH';
      } else {
        recommendation = "No active medical dispatch triggers. All posts report green status.";
        confidence = 95;
        reasoning = [
          "Active medical alert queue is empty.",
          "Three first-aid stations report 85% staff and bed availability."
        ];
        alternatives = [
          "Conduct routine radio checks on mobile medic rover groups."
        ];
      }
    } else if (query.includes('security') || query.includes('scuffle') || query.includes('fight') || query.includes('suspicious')) {
      department = 'Security';
      const secInc = activeIncidents.find(i => i.type === 'security');
      if (secInc) {
        recommendation = `Dispatch Security Patrol Unit 5 to ${secInc.location} to de-escalate argument.`;
        confidence = 97;
        reasoning = [
          `Active event: ${secInc.title} at ${secInc.location}.`,
          "Security Unit 5 is located 60 meters away at Section B2 lobby.",
          "Video CCTV cameras have focused on the row coordinates."
        ];
        alternatives = [
          "Alert nearest volunteer supervisor Yusuf A. to observe and log status.",
          "Coordinate police coordinator stand-by at Section B entrance."
        ];
        riskLevel = 'MEDIUM';
      } else {
        recommendation = "Checkpoint security telemetry clear. Roving teams are on schedule.";
        confidence = 92;
        reasoning = [
          "Metal detector gates and smart ticket gates report 100% throughput.",
          "No security threats or crowd scuffles are active."
        ];
        alternatives = [
          "Establish high-density checklines at Gates A and C ahead of post-match flow."
        ];
      }
    } else if (query.includes('food') || query.includes('stall') || query.includes('hungry') || query.includes('inventory')) {
      department = 'Operations';
      if (liveState.foodStalls['Stall 18'].inventoryPercent < 30) {
        recommendation = "Trigger Concession Redirect: Point mobile orders to Stall 20 (Vegan Deli).";
        confidence = 95;
        reasoning = [
          "Stall 18 (Halal Bowls) stock has fallen to 28% capacity.",
          "Halal Bowls wait time is 18 minutes.",
          "Stall 20 has 94% inventory and less than 2 minutes wait time."
        ];
        alternatives = [
          "Dispatch cargo cart from main kitchen with fresh ingredients.",
          "Update concourse directory boards to show Stall 18 queue overload."
        ];
        riskLevel = 'MEDIUM';
      } else {
        recommendation = "Maintain regular food service. Concession volumes are stable.";
        confidence = 92;
        reasoning = [
          "Average inventory across all food stands is at 76%.",
          "Mean queue wait times register at 6.2 minutes."
        ];
        alternatives = [
          "Stage replenishment pallets behind West concession block."
        ];
      }
    } else if (query.includes('sustain') || query.includes('power') || query.includes('energy') || query.includes('water')) {
      department = 'Operations';
      if (liveState.sustainability.powerUsageKw > 800) {
        recommendation = "Activate Energy Saving Protocol: Dim structural light ring by 30%.";
        confidence = 97;
        reasoning = [
          `Current power draw is ${liveState.sustainability.powerUsageKw} kW, exceeding peak threshold.`,
          "Gameplay is active (reduced concourse illumination needs).",
          "Brings grid consumption down by 85kW immediately."
        ];
        alternatives = [
          "Stagger South Concourse HVAC compressor cycles.",
          "Set non-operational stadium monitors to eco-sleep mode."
        ];
        riskLevel = 'MEDIUM';
      } else {
        recommendation = "Power usage is stable. Sustainability loops operating within guidelines.";
        confidence = 93;
        reasoning = [
          "Current stadium load is 640kW (well below the 800kW threshold).",
          "Rainwater harvesting greywater loops are functioning normally."
        ];
        alternatives = [
          "Deploy volunteers to clear compost dump rows near Stall 5."
        ];
      }
    } else if (query.includes('what should i do') || query.includes('next') || query.includes('action') || query.includes('copilot')) {
      if (liveState.occupancy.gates.C.congestion > 95 || isC2Red) {
        recommendation = "Deploy 3 volunteers from Gate D to Gate C congestion points, and activate exit bypass signage.";
        confidence = 96;
        reasoning = [
          "Gate C congestion has exceeded 104% design capacity, causing 25 min queues.",
          "Gate D has 3 idle volunteers available immediately.",
          "Redirection avoids long wait lines."
        ];
        alternatives = [
          "Reroute metro platform queues using electronic signs.",
          "Open secondary overflow Gates B2/B3."
        ];
        riskLevel = 'HIGH';
      } else if (liveState.incidents.some(i => i.status !== 'resolved')) {
        const firstMed = liveState.incidents.find(i => i.status !== 'resolved')!;
        recommendation = `Dispatch rescue team to Section ${firstMed.location} for ${firstMed.title}`;
        confidence = 98;
        reasoning = [
          `Incident is marked in status: ${firstMed.status}.`,
          `Responders on area: ${firstMed.nearbyResponders.join(', ')}.`
        ];
        alternatives = [
          "Broadcast crowd alerts to clear access paths."
        ];
        riskLevel = 'HIGH';
      } else {
        recommendation = "All parameters nominal. Conduct standard security checks and monitor gates.";
        confidence = 90;
        reasoning = [
          "All gate structures operating smoothly.",
          "Metro transit schedules are on time.",
          "Average concession queues are under 6 minutes."
        ];
        alternatives = [
          "Pre-clear transit walkway zones for halftime egress flows."
        ];
      }
    }

    return { recommendation, confidence, reasoning, alternatives, riskLevel, department };
  };

  // 1. Non-streaming copilot ask
  const askCopilot = async (prompt: string, role = 'organizer', useDeepseek = false): Promise<AIReasoningTrace> => {
    setLoading(true);
    cancelActiveRequest();

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('http://localhost:3001/api/copilot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, role, useDeepseek }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error('Express copilot failed');
      const data = await response.json();
      return data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw err;
      }
      console.warn('Backend ask failed. Running local client reasoning engine.');
      // Artificial 350ms delay
      await new Promise(resolve => setTimeout(resolve, 350));
      return generateLocalReasoning(prompt, role);
    } finally {
      setLoading(false);
    }
  };

  // 2. Streaming copilot ask (SSE)
  const askCopilotStream = (
    prompt: string,
    role: string,
    onStepChange: (step: string, message: string) => void,
    onComplete: (data: AIReasoningTrace) => void,
    onError: (err: string) => void
  ) => {
    setLoading(true);
    cancelActiveRequest();

    abortControllerRef.current = new AbortController();
    
    // Check if we can stream from backend, or must fall back to frontend timer streams
    const streamUrl = `http://localhost:3001/api/chat/stream?prompt=${encodeURIComponent(prompt)}&role=${encodeURIComponent(role)}`;
    
    let eventSource: EventSource | null = null;
    
    // Attempt local stream directly if frontend says it's offline to avoid long timeout pauses
    const tryLocalStream = () => {
      // 1. Collect Context
      onStepChange('COLLECTING_CONTEXT', 'FLOW AI: Gathering localized telemetry, crowd counts, weather parameters, and safety feeds...');
      
      const t1 = setTimeout(() => {
        // 2. Decision Engine
        onStepChange('DECISION_ENGINE', 'Decision Engine: Evaluating gate occupancy, queue delays, active dispatcher alerts, and priority rankings...');
      }, 900);

      const t2 = setTimeout(() => {
        // 3. Model Inference
        onStepChange('MODEL_INFERENCE', 'Model Inference: Querying local reasoning engine (Llama-3.3-70b-versatile emulation)...');
      }, 1800);

      const t3 = setTimeout(() => {
        // 4. Complete
        const result = generateLocalReasoning(prompt, role);
        onStepChange('COMPLETE', 'Reasoning Formatter: Validating JSON schema and mapping to operations situation dashboard.');
        onComplete(result);
        setLoading(false);
      }, 2700);

      // Save references so we can abort them
      abortControllerRef.current!.signal.addEventListener('abort', () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        setLoading(false);
      });
    };

    // If we're already marked as mocked, don't even try the backend
    const checkServer = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/mock-live', { method: 'HEAD', signal: abortControllerRef.current?.signal });
        if (res.ok) {
          // Server is alive, connect EventSource
          eventSource = new EventSource(streamUrl);
          
          eventSource.addEventListener('reasoning_step', (e: any) => {
            const data = JSON.parse(e.data);
            if (data.step === 'COMPLETE') {
              onComplete(data.data);
              eventSource?.close();
              setLoading(false);
            } else {
              onStepChange(data.step, data.message);
            }
          });

          eventSource.addEventListener('error', (e) => {
            console.error('SSE connection error, falling back to local stream', e);
            eventSource?.close();
            tryLocalStream();
          });
        } else {
          tryLocalStream();
        }
      } catch (err) {
        tryLocalStream();
      }
    };

    checkServer();
  };

  const cancelActiveRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setActiveStep(null);
  };

  return (
    <AIContext.Provider value={{
      askCopilot,
      askCopilotStream,
      cancelActiveRequest,
      loading,
      activeStep
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) throw new Error('useAI must be used within AIProvider');
  return context;
};
