import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { StadiumState, Incident, PresetScenario } from '../types';

interface LiveDataContextType {
  state: StadiumState;
  loading: boolean;
  error: string | null;
  triggerScenario: (scenario: PresetScenario) => Promise<void>;
  reportIncident: (incident: Omit<Incident, 'id' | 'reportedAt'>) => Promise<void>;
  resolveIncident: (id: string) => Promise<void>;
  isMockedFrontend: boolean;
  activeDemoStep: number | null;
  isPlayingDemo: boolean;
  startJudgeDemo: () => void;
  stopJudgeDemo: () => void;
  liveMatch: {
    homeScore: number;
    awayScore: number;
    minute: number;
    second: number;
    homeGoals: string[];
    awayGoals: string[];
  };
}

const LiveDataContext = createContext<LiveDataContextType | undefined>(undefined);

// Initial state matching mock generator
const defaultInitialState: StadiumState = {
  timestamp: new Date().toISOString(),
  healthScore: { overall: 94, safety: 97, transportation: 91, food: 95, medical: 93, accessibility: 98, sustainability: 90 },
  occupancy: {
    current: 68420, max: 80000, percent: 85.5,
    gates: {
      A: { current: 15420, capacity: 20000, status: 'OPEN', congestion: 77 },
      B: { current: 18200, capacity: 20000, status: 'OPEN', congestion: 91 },
      C: { current: 20800, capacity: 20000, status: 'OPEN', congestion: 104 },
      D: { current: 14000, capacity: 20000, status: 'OPEN', congestion: 70 }
    }
  },
  sections: {
    A1: { crowdDensity: 'green', queueLength: 3, foodAvailability: 95, incidents: 0, volunteers: 4, security: 3, medical: 1 },
    A2: { crowdDensity: 'green', queueLength: 4, foodAvailability: 90, incidents: 0, volunteers: 3, security: 2, medical: 0 },
    A3: { crowdDensity: 'yellow', queueLength: 8, foodAvailability: 85, incidents: 0, volunteers: 5, security: 3, medical: 1 },
    A4: { crowdDensity: 'yellow', queueLength: 7, foodAvailability: 88, incidents: 0, volunteers: 4, security: 2, medical: 0 },
    B1: { crowdDensity: 'yellow', queueLength: 9, foodAvailability: 80, incidents: 0, volunteers: 4, security: 4, medical: 1 },
    B2: { crowdDensity: 'orange', queueLength: 12, foodAvailability: 72, incidents: 0, volunteers: 5, security: 5, medical: 1 },
    B3: { crowdDensity: 'orange', queueLength: 14, foodAvailability: 60, incidents: 1, volunteers: 6, security: 6, medical: 2 },
    B4: { crowdDensity: 'yellow', queueLength: 8, foodAvailability: 82, incidents: 0, volunteers: 3, security: 3, medical: 0 },
    C1: { crowdDensity: 'orange', queueLength: 15, foodAvailability: 55, incidents: 0, volunteers: 4, security: 4, medical: 1 },
    C2: { crowdDensity: 'red', queueLength: 22, foodAvailability: 40, incidents: 1, volunteers: 6, security: 7, medical: 2 },
    C3: { crowdDensity: 'red', queueLength: 25, foodAvailability: 35, incidents: 0, volunteers: 5, security: 6, medical: 1 },
    C4: { crowdDensity: 'orange', queueLength: 18, foodAvailability: 50, incidents: 0, volunteers: 3, security: 4, medical: 0 },
    D1: { crowdDensity: 'green', queueLength: 5, foodAvailability: 90, incidents: 0, volunteers: 4, security: 3, medical: 1 },
    D2: { crowdDensity: 'green', queueLength: 4, foodAvailability: 92, incidents: 0, volunteers: 3, security: 3, medical: 0 },
    D3: { crowdDensity: 'yellow', queueLength: 6, foodAvailability: 88, incidents: 0, volunteers: 4, security: 4, medical: 1 },
    D4: { crowdDensity: 'green', queueLength: 5, foodAvailability: 94, incidents: 0, volunteers: 3, security: 3, medical: 0 }
  },
  transportation: {
    metro: {
      line1: { name: 'Metro Line 1 (Express)', status: 'OPERATIONAL', nextArrivalMins: 3, congestion: 65 },
      line2: { name: 'Metro Line 2 (Stadium North)', status: 'OPERATIONAL', nextArrivalMins: 5, congestion: 88 }
    },
    bus: {
      shuttleA: { name: 'Shuttle Bus A (West Lot)', status: 'OPERATIONAL', delayMins: 0, frequencyMins: 6 },
      shuttleB: { name: 'Shuttle Bus B (East Lot)', status: 'DELAYED', delayMins: 12, frequencyMins: 8 }
    },
    parking: {
      lotA: { name: 'Parking Lot A (VIP)', occupiedPercent: 95 },
      lotB: { name: 'Parking Lot B (General)', occupiedPercent: 88 },
      lotC: { name: 'Parking Lot C (Overflow)', occupiedPercent: 74 },
      lotD: { name: 'Parking Lot D (Accessible)', occupiedPercent: 42 }
    }
  },
  foodStalls: {
    'Stall 1': { name: 'Arena Tacos & Nachos', inventoryPercent: 88, salesVelocity: 'MEDIUM', waitTimeMins: 6 },
    'Stall 5': { name: 'Classic Burgers & Hotdogs', inventoryPercent: 78, salesVelocity: 'HIGH', waitTimeMins: 12 },
    'Stall 12': { name: 'Rio Pizza Slice', inventoryPercent: 82, salesVelocity: 'MEDIUM', waitTimeMins: 8 },
    'Stall 18': { name: 'Halal Grill & Bowls', inventoryPercent: 28, salesVelocity: 'CRITICAL', waitTimeMins: 18 },
    'Stall 20': { name: 'World Cup Vegan Deli', inventoryPercent: 94, salesVelocity: 'LOW', waitTimeMins: 2 }
  },
  sustainability: { powerUsageKw: 840, waterConsumptionLpm: 1200, wasteGenerationPercent: 62, carbonOffsetKg: 4250, sustainabilityAlerts: [] },
  weather: { tempC: 24, humidityPercent: 55, condition: 'CLEAR', precipitationProbabilityPercent: 10 },
  incidents: [
    {
      id: 'INC-2026-001',
      title: 'Fan collapsed near Gate C',
      type: 'medical',
      severity: 'high',
      location: 'Section C2',
      status: 'dispatched',
      reportedAt: new Date(Date.now() - 3 * 60000).toISOString(),
      details: 'Adult male collapsed. Heat exhaustion suspected. Medical responders dispatched.',
      priority: 2,
      department: 'Medical',
      resourcesRequired: ['Paramedic Team', 'Stretcher'],
      nearbyResponders: ['Medic Unit 3 (Section C1)', 'Volunteer John D.'],
      escalationLevel: 'Level 1',
      suggestedActions: ['Keep area clear of crowd', 'Verify route for ambulance entrance']
    },
    {
      id: 'INC-2026-002',
      title: 'Minor scuffle in West Plaza',
      type: 'security',
      severity: 'medium',
      location: 'Section B3',
      status: 'investigating',
      reportedAt: new Date(Date.now() - 5 * 60000).toISOString(),
      details: 'Argument over seating. Security team on site resolving details.',
      priority: 3,
      department: 'Security',
      resourcesRequired: ['Security Patrol'],
      nearbyResponders: ['Security Unit 5'],
      escalationLevel: 'Level 0',
      suggestedActions: ['De-escalate verbal disagreement']
    }
  ],
  volunteers: {
    active: 145, assigned: 112, idle: 33,
    volunteersList: [
      { id: 'V-101', name: 'John Doe', location: 'Gate A', status: 'ON_TASK', tasksCompleted: 14, responseTimeSec: 80, peopleAssisted: 36, rank: 'GOLD', rating: 95 },
      { id: 'V-102', name: 'Maria Gomez', location: 'Section C2', status: 'ON_TASK', tasksCompleted: 12, responseTimeSec: 65, peopleAssisted: 42, rank: 'GOLD', rating: 98 },
      { id: 'V-103', name: 'Yusuf Al-Fayed', location: 'Section B3', status: 'IDLE', tasksCompleted: 8, responseTimeSec: 110, peopleAssisted: 22, rank: 'SILVER', rating: 89 },
      { id: 'V-104', name: 'Emily Watson', location: 'Gate D', status: 'IDLE', tasksCompleted: 9, responseTimeSec: 95, peopleAssisted: 28, rank: 'SILVER', rating: 91 }
    ]
  },
  lostAndFound: [
    { id: 'LF-001', itemName: 'Black Leather Wallet', section: 'Section A3', status: 'reported', reportedAt: new Date(Date.now() - 15 * 60000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1627124765135-5e123a2b9040?w=150' },
    { id: 'LF-002', itemName: 'iPhone 15 Pro (Blue)', section: 'Section C2', status: 'found', reportedAt: new Date(Date.now() - 10 * 60000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=150' }
  ],
  aiTimeline: [
    { time: '14:04', event: 'Metro Line 1 arrived at stadium station', icon: 'metro' },
    { time: '14:08', event: 'Gate C entry volume spikes above 80%', icon: 'crowd' },
    { time: '14:10', event: 'Stall 18 Halal Grill inventory alert (below 30%)', icon: 'food' },
    { time: '14:11', event: 'FLOW AI automatically dispatched 3 volunteers to Gate C', icon: 'ai' },
    { time: '14:12', event: 'Medical dispatch sent to C2 for collapsed fan', icon: 'medical' }
  ],
  liveActivityFeed: [
    { time: '14:14:12', message: 'Volunteer Maria G. arrived at Section C2 for Medical assist', type: 'volunteer' },
    { time: '14:13:45', message: 'Gate C warning level escalated to ORANGE due to queue time (>15 mins)', type: 'system' },
    { time: '14:12:00', message: 'Medical emergency reported in Section C2', type: 'medical' },
    { time: '14:11:30', message: 'FLOW AI rerouted 450 fans to Gate D signboards', type: 'ai' },
    { time: '14:10:15', message: 'Security patrol resolved scuffle at West Plaza', type: 'security' }
  ],
  copilotActions: [
    {
      id: 'CO-1',
      recommendation: 'Deploy 3 volunteers from West Gate to Gate C congestion',
      priority: 'high',
      confidence: 96,
      department: 'Volunteers',
      why: 'Gate C is experiencing 104% design capacity entry volume while West Gate has 3 idle volunteers.',
      expectedEffect: 'Queue ↓ 21% | Wait Time ↓ 4 min',
      risks: 'Minor coverage gap at West Gate (risk: low)',
      rollbackPlan: 'Re-assign volunteers if West Gate volume increases by 15%',
      whyDetails: [
        'Gate C crowd capacity reached 104% (threshold 90%)',
        'Average queue wait time at Gate C exceeded 18 minutes',
        'West Gate crowd capacity is at 35% with 3 idle volunteers',
        'Camera analysis shows entry bottlenecks developing at outer perimeter C'
      ],
      matchedMemory: {
        event: 'World Cup Qatar 2022 - Group Stage Ingress Surge',
        resolution: 'Redistribute volunteers + perimeter dynamic sign routing',
        successRate: 94
      }
    },
    {
      id: 'CO-2',
      recommendation: 'Trigger Sustainability Protocol: Dim exterior structural lights by 30%',
      priority: 'medium',
      confidence: 94,
      department: 'Operations',
      why: 'Stadium power draw reached 840kW (threshold is 800kW) during non-match halftime phase.',
      expectedEffect: 'Power Usage ↓ 40kW | Cost ↓ 12%',
      risks: 'Reduced ambient lighting outside (risk: low)',
      rollbackPlan: 'Restore lighting if crowd egress rate drops below 10k/hr',
      whyDetails: [
        'Stadium total power load exceeded threshold of 800kW',
        'No active match play in progress (non-critical visual stage)',
        'Solar battery reserve is at 42% (below 50% target)',
        'Estimated savings: 40kW over next 4 hours'
      ],
      matchedMemory: {
        event: 'Stadium Energy Conservation Protocol 2024',
        resolution: 'Dim external architecture lighting ring',
        successRate: 98
      }
    },
    {
      id: 'CO-3',
      recommendation: 'Redirect mobile concession orders to Stall 20 (Vegan Deli)',
      priority: 'low',
      confidence: 89,
      department: 'Food',
      why: 'Stall 18 queue time is 18 minutes with low stock, while Stall 20 has excess stock and 2 minute wait times.',
      expectedEffect: 'Wait Time ↓ 6 min | Inventory Balanced',
      risks: 'Vegan preference compatibility check (risk: low)',
      rollbackPlan: 'Revert default recommendation if Stall 20 queue grows beyond 8 mins',
      whyDetails: [
        'Stall 18 queue wait times reached critical 18 minutes',
        'Stall 18 inventory has depleted to 28% of capacity',
        'Stall 20 inventory is at 94% with 2 minutes queue wait times',
        'AI user profiles suggest 64% concession overlap compatibility'
      ],
      matchedMemory: {
        event: 'CONCACAF 2025 - Mid-match Concession Redistribution',
        resolution: 'Reroute mobile app food suggestions dynamically',
        successRate: 88
      }
    },
    {
      id: 'CO-4',
      recommendation: 'Broadcast audio & display accessibility warnings at Metro Platform 2',
      priority: 'high',
      confidence: 95,
      department: 'Security',
      why: 'Congestion at Platform 2 requires slow movement guidance for elderly and wheelchair users.',
      expectedEffect: 'Accident Risk ↓ 45% | Flow Egress Rate ↑ 8%',
      risks: 'Temporary noise levels increase (risk: low)',
      rollbackPlan: 'Disable broadcast once platform occupancy drops to <60%',
      whyDetails: [
        'Metro Platform 2 occupancy reached 88% capacity limit',
        'Wheelchair route egress timing slowed by 4.2 minutes',
        'Dashed guide-paths indicate platform bottleneck',
        'Safety regulations require immediate audio warnings for visual/motor assistance'
      ],
      matchedMemory: {
        event: 'Metro Platform Crisis Simulation 2024',
        resolution: 'Activate accessibility safety announcements + custom guidance paths',
        successRate: 95
      }
    }
  ]
};

export const LiveDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StadiumState>(defaultInitialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockedFrontend, setIsMockedFrontend] = useState(false);
  const [activeDemoStep, setActiveDemoStep] = useState<number | null>(null);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const [liveMatch, setLiveMatch] = useState({
    homeScore: 1,
    awayScore: 0,
    minute: 78,
    second: 0,
    homeGoals: ["Pulisic 76'"],
    awayGoals: [] as string[]
  });

  const startTimestampRef = useRef<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimestampRef.current) / 1000);
      const elapsedMatchSeconds = elapsedSeconds * 4; // 1 real second = 4 match seconds
      const minMatchSeconds = 78 * 60;
      const maxMatchSeconds = 95 * 60;
      const matchSpan = maxMatchSeconds - minMatchSeconds; // 17 minutes = 1020 seconds
      const matchTimeSeconds = minMatchSeconds + (elapsedMatchSeconds % matchSpan);
      
      const minute = Math.floor(matchTimeSeconds / 60);
      const second = matchTimeSeconds % 60;

      let homeScore = 1;
      let awayScore = 0;
      let homeGoals = ["Pulisic 76'"];
      let awayGoals: string[] = [];

      if (minute >= 82) {
        awayScore = 1;
        awayGoals = ["Kane 82'"];
      }
      if (minute >= 86) {
        homeScore = 2;
        homeGoals = ["Pulisic 76'", "Reyna 86'"];
      }

      setLiveMatch({
        homeScore,
        awayScore,
        minute,
        second,
        homeGoals,
        awayGoals
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const demoIntervalRef = useRef<any | null>(null);
  const apiFetchIntervalRef = useRef<any | null>(null);

  // 1. Fetch live telemetry from Express API
  const fetchLiveTelemetry = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/mock-live');
      if (!response.ok) throw new Error('API server down');
      const data = await response.json();
      setState(data);
      setError(null);
      setIsMockedFrontend(false);
    } catch (err) {
      // Backend unavailable - trigger local fallback simulation loop on frontend
      setIsMockedFrontend(true);
      setError('Express server offline. Using local frontend simulation client.');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTelemetry();

    // Poll server every 10 seconds
    apiFetchIntervalRef.current = setInterval(() => {
      if (!isPlayingDemo) {
        fetchLiveTelemetry(true);
      }
    }, 10000);

    return () => {
      if (apiFetchIntervalRef.current) clearInterval(apiFetchIntervalRef.current);
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    };
  }, [isPlayingDemo]);

  // Frontend local simulation loop (similar to backend generator) if server is offline
  useEffect(() => {
    if (!isMockedFrontend || isPlayingDemo) return;

    const frontendSim = setInterval(() => {
      setState(prev => {
        const next = { ...prev };
        next.timestamp = new Date().toISOString();
        
        // Random power and water fluctuations
        next.sustainability.powerUsageKw = Math.max(500, Math.min(1000, next.sustainability.powerUsageKw + Math.floor(Math.random() * 21) - 10));
        next.sustainability.waterConsumptionLpm = Math.max(800, Math.min(2000, next.sustainability.waterConsumptionLpm + Math.floor(Math.random() * 41) - 20));
        
        // Inventories shrink
        Object.keys(next.foodStalls).forEach(key => {
          const stall = next.foodStalls[key];
          if (stall.inventoryPercent > 5) {
            stall.inventoryPercent -= Math.floor(Math.random() * 2);
          }
        });

        // Metro timers
        Object.keys(next.transportation.metro).forEach(key => {
          const m = (next.transportation.metro as any)[key];
          if (m.nextArrivalMins <= 1) {
            m.nextArrivalMins = Math.floor(Math.random() * 5) + 5;
            next.aiTimeline.unshift({
              time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
              event: `${m.name} arrived at platform`,
              icon: 'metro'
            });
            next.aiTimeline = next.aiTimeline.slice(0, 8);
          } else {
            m.nextArrivalMins--;
          }
        });

        // Recalculate health
        const unres = next.incidents.filter(i => i.status !== 'resolved').length;
        const safety = Math.max(80, 100 - (unres * 4));
        const foodScore = Math.max(80, 98 - (next.foodStalls['Stall 18'].inventoryPercent < 20 ? 10 : 0));
        const transportScore = Math.max(80, 95 - (next.transportation.bus.shuttleB.delayMins > 10 ? 10 : 0));
        const sustainabilityScore = Math.max(80, 98 - Math.max(0, Math.floor((next.sustainability.powerUsageKw - 800) / 10)));
        
        next.healthScore = {
          ...next.healthScore,
          safety,
          food: foodScore,
          transportation: transportScore,
          sustainability: sustainabilityScore,
          overall: Math.floor((safety + transportScore + foodScore + next.healthScore.medical + next.healthScore.accessibility + sustainabilityScore) / 6)
        };

        return next;
      });
    }, 10000);

    return () => clearInterval(frontendSim);
  }, [isMockedFrontend, isPlayingDemo]);

  // 2. Trigger scenario
  const triggerScenario = async (scenario: PresetScenario) => {
    if (!isMockedFrontend) {
      try {
        const response = await fetch('http://localhost:3001/api/what-if', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenario })
        });
        const data = await response.json();
        setState(data);
        return;
      } catch (err) {
        console.warn('Fallback to local what-if trigger');
      }
    }

    // Local scenario mutations
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setState(prev => {
      const next = { ...prev };
      
      if (scenario === 'HEAVY_RAIN') {
        next.weather.condition = 'RAIN';
        next.weather.precipitationProbabilityPercent = 95;
        next.weather.tempC = 17;
        next.transportation.bus.shuttleB.delayMins = 20;
        next.transportation.metro.line2.congestion = 100;
        next.aiTimeline.unshift({ time: timeStr, event: 'Downpour started: Indoor routing active.', icon: 'weather' });
      } else if (scenario === 'METRO_DELAY') {
        next.transportation.metro.line2.status = 'DELAYED';
        next.transportation.metro.line2.nextArrivalMins = 25;
        next.aiTimeline.unshift({ time: timeStr, event: 'Metro Line 2: 25 min signal delay.', icon: 'metro' });
      } else if (scenario === 'MEDICAL_EMERGENCY') {
        const id = `INC-${Date.now().toString().slice(-4)}`;
        next.incidents.unshift({
          id, title: 'Cardiac distress in Section B2', type: 'medical', severity: 'critical', location: 'Section B2',
          status: 'reported', reportedAt: new Date().toISOString(), details: 'Spectator reported severe chest pains.',
          priority: 1, department: 'Medical', resourcesRequired: ['AED', 'Medic Unit'],
          nearbyResponders: ['Medic Unit 1 (Section B1)', 'Volunteer Yusuf A.'], escalationLevel: 'Level 2',
          suggestedActions: ['Clear the immediate accessway']
        });
        next.sections.B2.incidents = 1;
        next.sections.B2.crowdDensity = 'red';
        next.aiTimeline.unshift({ time: timeStr, event: `Critical medical emergency reported at Section B2`, icon: 'medical' });
      } else if (scenario === 'KICKOFF_RUSH') {
        next.occupancy.current = 77200;
        next.occupancy.percent = 96.5;
        next.occupancy.gates.C.congestion = 112;
        next.sections.C2.crowdDensity = 'red';
        next.sections.C2.queueLength = 32;
        next.aiTimeline.unshift({ time: timeStr, event: 'Halftime exit volumes peaked Gate C.', icon: 'crowd' });
      } else if (scenario === 'FULL_STADIUM') {
        next.occupancy.current = 79900;
        next.occupancy.percent = 99.9;
        next.aiTimeline.unshift({ time: timeStr, event: 'Stadium capacity limits verified.', icon: 'crowd' });
      } else if (scenario === 'VIP_ARRIVAL') {
        next.transportation.parking.lotA.occupiedPercent = 100;
        next.aiTimeline.unshift({ time: timeStr, event: 'VIP Motorcade successfully arrived.', icon: 'security' });
      } else if (scenario === 'CYBER_ATTACK') {
        const id = `INC-${Date.now().toString().slice(-4)}`;
        next.incidents.unshift({
          id, title: 'Brute-force attack on Access Control Servers', type: 'security', severity: 'critical', location: 'Server Room 3',
          status: 'investigating', reportedAt: new Date().toISOString(), details: 'Intrusion detection alerted multiple login failures from unknown exterior gateway.',
          priority: 1, department: 'Security', resourcesRequired: ['Cyber Response Team', 'Network Lock'],
          nearbyResponders: ['NetOps Team Alpha'], escalationLevel: 'Level 3',
          suggestedActions: ['Isolate Gate Ingress subnet', 'Activate offline volunteer check-in lists']
        });
        next.aiTimeline.unshift({ time: timeStr, event: 'Cyber attack detected on gate ticketing network.', icon: 'security' });
      } else if (scenario === 'POWER_OUTAGE') {
        next.sustainability.powerUsageKw = 120; // Standby generator load
        const id = `INC-${Date.now().toString().slice(-4)}`;
        next.incidents.unshift({
          id, title: 'Lusail Substation Failure', type: 'infrastructure', severity: 'critical', location: 'Substation B',
          status: 'reported', reportedAt: new Date().toISOString(), details: 'Lusail main grid offline. Backups and standby generators active. South stand dimmed.',
          priority: 1, department: 'Operations', resourcesRequired: ['Maintenance Crew', 'Emergency Lighting'],
          nearbyResponders: ['Power Station Operator'], escalationLevel: 'Level 3',
          suggestedActions: ['Direct volunteers with mega-horns', 'Keep evacuation paths lit']
        });
        next.aiTimeline.unshift({ time: timeStr, event: 'Main grid power failure reported. Backups active.', icon: 'system' });
      } else if (scenario === 'DRONE_INTRUSION') {
        const id = `INC-${Date.now().toString().slice(-4)}`;
        next.incidents.unshift({
          id, title: 'Unauthorized drone near South Stand', type: 'security', severity: 'high', location: 'Section C3',
          status: 'reported', reportedAt: new Date().toISOString(), details: 'Spectator reported micro-drone hovering above section C3 at 30m altitude.',
          priority: 2, department: 'Security', resourcesRequired: ['RF Jammer', 'Police Drone Intercept'],
          nearbyResponders: ['Security Unit 12'], escalationLevel: 'Level 2',
          suggestedActions: ['Deploy RF Jammer Unit', 'Notify Airspace Control']
        });
        next.aiTimeline.unshift({ time: timeStr, event: 'Unauthorized drone spotted over South stand.', icon: 'security' });
      } else if (scenario === 'CROWD_SURGE') {
        next.occupancy.gates.B.congestion = 125;
        next.sections.B2.crowdDensity = 'red';
        next.sections.B2.queueLength = 40;
        const id = `INC-${Date.now().toString().slice(-4)}`;
        next.incidents.unshift({
          id, title: 'Crowd surge at Gate B entry ramp', type: 'general', severity: 'high', location: 'Gate B',
          status: 'dispatched', reportedAt: new Date().toISOString(), details: 'Platform ingress bottleneck due to ticket-scanner failures. Density rising.',
          priority: 2, department: 'Volunteers', resourcesRequired: ['Crowd Directors', 'Spare Scanners'],
          nearbyResponders: ['Volunteer Team Beta'], escalationLevel: 'Level 2',
          suggestedActions: ['Open overflow security lanes', 'Reroute incoming spectators to Gate A']
        });
        next.aiTimeline.unshift({ time: timeStr, event: 'Crowd surge detected at Gate B entry ramp.', icon: 'crowd' });
      }

      return next;
    });
  };

  // 3. Report incident
  const reportIncident = async (incident: Omit<Incident, 'id' | 'reportedAt'>) => {
    if (!isMockedFrontend) {
      try {
        const response = await fetch('http://localhost:3001/api/incident/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(incident)
        });
        const data = await response.json();
        setState(data.currentState);
        return;
      } catch (err) {
        console.warn('Fallback to local incident reporting');
      }
    }

    // Local report
    const id = `INC-${Date.now().toString().slice(-4)}`;
    const newInc: Incident = {
      ...incident,
      id,
      reportedAt: new Date().toISOString()
    };

    setState(prev => {
      const next = { ...prev, incidents: [newInc, ...prev.incidents] };
      
      const loc = incident.location;
      if (next.sections[loc]) {
        next.sections[loc].incidents++;
        next.sections[loc].crowdDensity = incident.severity === 'critical' || incident.severity === 'high' ? 'red' : 'orange';
      }

      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      next.liveActivityFeed.unshift({
        time: timeStr,
        message: `NEW INCIDENT: ${newInc.title} reported at ${newInc.location}`,
        type: newInc.type
      });

      return next;
    });
  };

  // 4. Resolve incident
  const resolveIncident = async (id: string) => {
    if (!isMockedFrontend) {
      try {
        const response = await fetch('http://localhost:3001/api/incident/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const data = await response.json();
        setState(data.currentState);
        return;
      } catch (err) {
        console.warn('Fallback to local incident resolution');
      }
    }

    // Local resolve
    setState(prev => {
      const next = { ...prev };
      const idx = next.incidents.findIndex(i => i.id === id);
      if (idx !== -1) {
        const incident = next.incidents[idx];
        incident.status = 'resolved';
        
        const loc = incident.location;
        if (next.sections[loc]) {
          next.sections[loc].incidents = Math.max(0, next.sections[loc].incidents - 1);
          if (next.sections[loc].incidents === 0) {
            next.sections[loc].crowdDensity = 'green';
          }
        }

        const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
        next.liveActivityFeed.unshift({
          time: timeStr,
          message: `RESOLVED: ${incident.title} resolved at ${incident.location}`,
          type: 'system'
        });
      }
      return next;
    });
  };

  // 5. Judge Mode Walkthrough Scripted Player
  const startJudgeDemo = () => {
    stopJudgeDemo();
    setIsPlayingDemo(true);
    setActiveDemoStep(0);

    const demoSteps = [
      // 00:00 - Kickoff Begins
      () => {
        setState(prev => ({
          ...prev,
          healthScore: { overall: 94, safety: 97, transportation: 91, food: 95, medical: 93, accessibility: 98, sustainability: 90 },
          occupancy: { current: 71200, max: 80000, percent: 89, gates: prev.occupancy.gates },
          liveActivityFeed: [
            { time: '12:00:00', message: 'Matchday Kickoff initiated. Crowd entry count reaches 71,200.', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ],
          aiTimeline: [
            { time: '12:00', event: 'Match Kickoff begun. Ingress volumes normal.', icon: 'crowd' }
          ]
        }));
      },
      // 00:10 - Metro Arrives
      () => {
        setActiveDemoStep(1);
        setState(prev => ({
          ...prev,
          transportation: {
            ...prev.transportation,
            metro: {
              ...prev.transportation.metro,
              line2: { name: 'Metro Line 2 (Stadium North)', status: 'OPERATIONAL', nextArrivalMins: 0, congestion: 95 }
            }
          },
          liveActivityFeed: [
            { time: '12:00:10', message: 'Metro Line 2 arrived at Stadium North station platform.', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ],
          aiTimeline: [
            { time: '12:00', event: 'Metro Line 2 arrived at Stadium North platform.', icon: 'metro' },
            ...prev.aiTimeline.slice(0, 5)
          ]
        }));
      },
      // 00:15 - Gate C Congestion
      () => {
        setActiveDemoStep(2);
        setState(prev => ({
          ...prev,
          occupancy: {
            ...prev.occupancy,
            gates: {
              ...prev.occupancy.gates,
              C: { current: 23200, capacity: 20000, status: 'OPEN', congestion: 116 }
            }
          },
          sections: {
            ...prev.sections,
            C2: { ...prev.sections.C2, crowdDensity: 'red', queueLength: 28 },
            C3: { ...prev.sections.C3, crowdDensity: 'red', queueLength: 32 }
          },
          liveActivityFeed: [
            { time: '12:00:15', message: 'CRITICAL WARNING: Gate C queues exceeded 25 minutes.', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ]
        }));
      },
      // 00:20 - FLOW Predicts Bottleneck
      () => {
        setActiveDemoStep(3);
        setState(prev => ({
          ...prev,
          copilotActions: [
            {
              id: 'DEMO-CO-1',
              recommendation: 'Redirect Gate C arriving fans to Gate D & deploy 3 volunteers',
              priority: 'high',
              confidence: 96,
              department: 'Volunteers',
              why: 'Metro Line 2 arrived. Gate C congestion reached 116%, while Gate D has 3 idle volunteers and 70% congestion.'
            },
            ...prev.copilotActions.slice(0, 3)
          ],
          aiTimeline: [
            { time: '12:00', event: 'FLOW AI predicted Gate C bottleneck. Recommending redirection.', icon: 'ai' },
            ...prev.aiTimeline.slice(0, 5)
          ]
        }));
      },
      // 00:25 - Volunteers Deployed
      () => {
        setActiveDemoStep(4);
        setState(prev => ({
          ...prev,
          volunteers: {
            ...prev.volunteers,
            assigned: prev.volunteers.assigned + 3,
            idle: prev.volunteers.idle - 3,
            volunteersList: prev.volunteers.volunteersList.map(v => 
              v.id === 'V-103' ? { ...v, status: 'ON_TASK', location: 'Section C2' } : v
            )
          },
          liveActivityFeed: [
            { time: '12:00:25', message: 'Volunteer deployment accepted. 3 responders dispatched to Gate C.', type: 'volunteer' },
            ...prev.liveActivityFeed.slice(0, 5)
          ]
        }));
      },
      // 00:30 - Routes Updated
      () => {
        setActiveDemoStep(5);
        setState(prev => ({
          ...prev,
          liveActivityFeed: [
            { time: '12:00:30', message: 'FLOW AI rerouted 620 fans to Gate D via digital signage overrides.', type: 'ai' },
            ...prev.liveActivityFeed.slice(0, 5)
          ],
          aiTimeline: [
            { time: '12:00', event: 'Bypass routes updated. Concourse digital displays switched.', icon: 'ai' },
            ...prev.aiTimeline.slice(0, 5)
          ]
        }));
      },
      // 00:40 - Crowd Normalized
      () => {
        setActiveDemoStep(6);
        setState(prev => ({
          ...prev,
          occupancy: {
            ...prev.occupancy,
            gates: {
              ...prev.occupancy.gates,
              C: { current: 19800, capacity: 20000, status: 'OPEN', congestion: 99 }
            }
          },
          sections: {
            ...prev.sections,
            C2: { ...prev.sections.C2, crowdDensity: 'yellow', queueLength: 9 },
            C3: { ...prev.sections.C3, crowdDensity: 'yellow', queueLength: 8 }
          },
          liveActivityFeed: [
            { time: '12:00:40', message: 'Gate C queue congestion dropped below critical (99%).', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ]
        }));
      },
      // 00:50 - Incident Resolved
      () => {
        setActiveDemoStep(7);
        setState(prev => ({
          ...prev,
          liveActivityFeed: [
            { time: '12:00:50', message: 'Gate C Bottleneck incident declared RESOLVED by FLOW AI.', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ],
          aiTimeline: [
            { time: '12:00', event: 'Crowd normalized. Redirection event closed.', icon: 'ai' },
            ...prev.aiTimeline.slice(0, 5)
          ]
        }));
      },
      // 01:00 - Overall Health check
      () => {
        setActiveDemoStep(8);
        setState(prev => ({
          ...prev,
          healthScore: { overall: 96, safety: 98, transportation: 95, food: 95, medical: 94, accessibility: 98, sustainability: 92 },
          liveActivityFeed: [
            { time: '12:01:00', message: 'System diagnostics complete. Stadium Health score: 96%.', type: 'system' },
            ...prev.liveActivityFeed.slice(0, 5)
          ]
        }));
        // Complete the demo
        setTimeout(() => {
          stopJudgeDemo();
        }, 6000);
      }
    ];

    let step = 0;
    demoSteps[0]();

    demoIntervalRef.current = setInterval(() => {
      step++;
      if (step < demoSteps.length) {
        demoSteps[step]();
      } else {
        if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      }
    }, 6000); // 6 seconds per step, total 1 minute
  };

  const stopJudgeDemo = () => {
    setIsPlayingDemo(false);
    setActiveDemoStep(null);
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    fetchLiveTelemetry(); // Reload actual state
  };

  return (
    <LiveDataContext.Provider value={{
      state,
      loading,
      error,
      triggerScenario,
      reportIncident,
      resolveIncident,
      isMockedFrontend,
      activeDemoStep,
      isPlayingDemo,
      startJudgeDemo,
      stopJudgeDemo,
      liveMatch
    }}>
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveData = () => {
  const context = useContext(LiveDataContext);
  if (context === undefined) throw new Error('useLiveData must be used within LiveDataProvider');
  return context;
};
