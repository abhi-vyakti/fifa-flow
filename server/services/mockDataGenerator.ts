import { StadiumState, Incident, PresetScenario } from '../types';

// Initial state of the stadium
let state: StadiumState = {
  timestamp: new Date().toISOString(),
  healthScore: {
    overall: 94,
    safety: 97,
    transportation: 91,
    food: 95,
    medical: 93,
    accessibility: 98,
    sustainability: 90
  },
  occupancy: {
    current: 68420,
    max: 80000,
    percent: 85.5,
    gates: {
      A: { current: 15420, capacity: 20000, status: 'OPEN', congestion: 77 },
      B: { current: 18200, capacity: 20000, status: 'OPEN', congestion: 91 },
      C: { current: 20800, capacity: 20000, status: 'OPEN', congestion: 104 }, // Overloaded initially
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
    C2: { crowdDensity: 'red', queueLength: 22, foodAvailability: 40, incidents: 1, volunteers: 6, security: 7, medical: 2 }, // Bottleneck Section
    C3: { crowdDensity: 'red', queueLength: 25, foodAvailability: 35, incidents: 0, volunteers: 5, security: 6, medical: 1 }, // Bottleneck Section
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
      lotB: { name: 'Parking Lot B (General North)', occupiedPercent: 88 },
      lotC: { name: 'Parking Lot C (General South)', occupiedPercent: 74 },
      lotD: { name: 'Parking Lot D (Accessible)', occupiedPercent: 42 }
    }
  },
  foodStalls: {
    'Stall 1': { name: 'Arena Tacos & Nachos', inventoryPercent: 88, salesVelocity: 'MEDIUM', waitTimeMins: 6 },
    'Stall 5': { name: 'Classic Burgers & Hotdogs', inventoryPercent: 78, salesVelocity: 'HIGH', waitTimeMins: 12 },
    'Stall 12': { name: 'Rio Pizza Slice', inventoryPercent: 82, salesVelocity: 'MEDIUM', waitTimeMins: 8 },
    'Stall 18': { name: 'Halal Grill & Bowls', inventoryPercent: 28, salesVelocity: 'CRITICAL', waitTimeMins: 18 }, // Low inventory issue
    'Stall 20': { name: 'World Cup Vegan Deli', inventoryPercent: 94, salesVelocity: 'LOW', waitTimeMins: 2 }
  },
  sustainability: {
    powerUsageKw: 840,
    waterConsumptionLpm: 1200,
    wasteGenerationPercent: 62,
    carbonOffsetKg: 4250,
    sustainabilityAlerts: []
  },
  weather: {
    tempC: 24,
    humidityPercent: 55,
    condition: 'CLEAR', // CLEAR, RAIN, OVERCAST
    precipitationProbabilityPercent: 10
  },
  incidents: [
    {
      id: 'INC-2026-001',
      title: 'Fan collapsed near Gate C',
      type: 'medical',
      severity: 'high',
      location: 'Section C2',
      status: 'dispatched',
      reportedAt: new Date(Date.now() - 3 * 60000).toISOString(), // 3 mins ago
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
    active: 145,
    assigned: 112,
    idle: 33,
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
    { id: 'CO-1', recommendation: 'Deploy 3 volunteers from West Gate to Gate C congestion', priority: 'high', confidence: 96, department: 'Volunteers', why: 'Gate C is experiencing 104% design capacity entry volume while West Gate has 3 idle volunteers.' },
    { id: 'CO-2', recommendation: 'Trigger Sustainability Protocol: Dim exterior structural lights by 30%', priority: 'medium', confidence: 94, department: 'Operations', why: 'Stadium power draw reached 840kW (threshold is 800kW) during non-match halftime phase.' },
    { id: 'CO-3', recommendation: 'Redirect mobile concession orders to Stall 20 (Vegan Deli)', priority: 'low', confidence: 89, department: 'Food', why: 'Stall 18 queue time is 18 minutes with low stock, while Stall 20 has excess stock and 2 minute wait times.' },
    { id: 'CO-4', recommendation: 'Broadcast audio & display accessibility warnings at Metro Platform 2', priority: 'high', confidence: 95, department: 'Security', why: 'Congestion at Platform 2 requires slow movement guidance for elderly and wheelchair users.' }
  ]
};

// Simulated loop to mutate state over time
export function startSimulationLoop() {
  setInterval(() => {
    // 1. Update timestamp
    state.timestamp = new Date().toISOString();

    // 2. Slow natural fluctuations
    // Water and power draw change slightly
    state.sustainability.powerUsageKw += Math.floor(Math.random() * 21) - 10;
    state.sustainability.waterConsumptionLpm += Math.floor(Math.random() * 41) - 20;
    
    // Food stall inventories decline
    Object.keys(state.foodStalls).forEach((key) => {
      const stall = state.foodStalls[key];
      if (stall.inventoryPercent > 5) {
        const rate = stall.salesVelocity === 'CRITICAL' || stall.salesVelocity === 'HIGH' ? 2 : 1;
        stall.inventoryPercent -= Math.floor(Math.random() * rate);
      }
    });

    // Update transportation times
    Object.keys(state.transportation.metro).forEach((key) => {
      const train = (state.transportation.metro as any)[key];
      if (train.nextArrivalMins <= 1) {
        train.nextArrivalMins = Math.floor(Math.random() * 6) + 4; // Reset to 4-10 mins
        // Add metro arrival to timeline
        const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        state.aiTimeline.unshift({
          time: timeStr,
          event: `${train.name} arrived at platform`,
          icon: 'metro'
        });
        state.aiTimeline = state.aiTimeline.slice(0, 8);
      } else {
        train.nextArrivalMins -= 1;
      }
    });

    // Update section queues slightly
    Object.keys(state.sections).forEach((key) => {
      const sect = state.sections[key];
      const delta = Math.floor(Math.random() * 3) - 1;
      sect.queueLength = Math.max(1, sect.queueLength + delta);
      if (sect.queueLength > 20) {
        sect.crowdDensity = 'red';
      } else if (sect.queueLength > 12) {
        sect.crowdDensity = 'orange';
      } else if (sect.queueLength > 6) {
        sect.crowdDensity = 'yellow';
      } else {
        sect.crowdDensity = 'green';
      }
    });

    // Generate random activity events
    const feedTemplates = [
      { message: 'Sustainability engine optimizing HVAC cooling zones', type: 'system' },
      { message: 'Water filtration pressure system normal (1200 LPM)', type: 'system' },
      { message: 'Gate A queue times stabilized to under 5 minutes', type: 'system' },
      { message: 'Lost wallet returned to Security Desk at Section A3', type: 'volunteer' },
      { message: 'Patrol dispatched to check Section B4 seating row 18', type: 'security' },
      { message: 'Medical emergency at C2 resolved, patient discharged', type: 'medical' }
    ];

    if (Math.random() > 0.6) {
      const choice = feedTemplates[Math.floor(Math.random() * feedTemplates.length)];
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      state.liveActivityFeed.unshift({ time: timeStr, message: choice.message, type: choice.type });
      state.liveActivityFeed = state.liveActivityFeed.slice(0, 15);
    }

    // Dynamic health score recalculation based on queue lengths, incidents, utility load
    let avgQueue = 0;
    let redCount = 0;
    Object.keys(state.sections).forEach((key) => {
      avgQueue += state.sections[key].queueLength;
      if (state.sections[key].crowdDensity === 'red') redCount++;
    });
    avgQueue /= Object.keys(state.sections).length;

    const unresIncidents = state.incidents.filter(i => i.status !== 'resolved').length;
    const safety = Math.max(80, 100 - (unresIncidents * 3) - (state.occupancy.percent > 95 ? 5 : 0));
    const transport = Math.max(75, 95 - (state.transportation.bus.shuttleB.delayMins > 10 ? 8 : 0) - (redCount > 1 ? 5 : 0));
    const food = Math.max(80, 98 - (state.foodStalls['Stall 18'].inventoryPercent < 20 ? 6 : 0) - Math.floor(avgQueue / 2));
    const medical = Math.max(85, 100 - (state.incidents.filter(i => i.type === 'medical' && i.severity === 'high').length * 5));
    const sustainability = Math.max(75, 98 - Math.max(0, Math.floor((state.sustainability.powerUsageKw - 700) / 15)));

    state.healthScore = {
      overall: Math.floor((safety + transport + food + medical + state.healthScore.accessibility + sustainability) / 6),
      safety,
      transportation: transport,
      food,
      medical,
      accessibility: state.healthScore.accessibility,
      sustainability
    };
  }, 10000);
}

// Triggers scenario adjustments
export function triggerPresetScenario(scenario: PresetScenario): StadiumState {
  console.log(`Triggering scenario: ${scenario}`);
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  switch (scenario) {
    case 'KICKOFF_RUSH':
      state.occupancy.current = 76500;
      state.occupancy.percent = 95.6;
      state.healthScore.overall = 89;
      state.healthScore.transportation = 80;
      state.healthScore.safety = 92;
      
      // Gates congested
      state.occupancy.gates.A.congestion = 95;
      state.occupancy.gates.B.congestion = 108; // Red alert
      state.occupancy.gates.C.congestion = 115; // Red alert
      state.occupancy.gates.D.congestion = 88;
      
      // Select sections red
      ['A3', 'B2', 'B3', 'C1', 'C2', 'C3', 'C4'].forEach(sec => {
        state.sections[sec].crowdDensity = 'red';
        state.sections[sec].queueLength = Math.floor(Math.random() * 15) + 20;
      });

      state.aiTimeline.unshift({
        time: timeStr,
        event: 'FLOW AI detected peak Kickoff Rush: Rerouting gates.',
        icon: 'ai'
      });

      state.copilotActions = [
        { id: 'CO-1', recommendation: 'Open Gate D overflow paths and deploy 5 volunteers', priority: 'high', confidence: 97, department: 'Volunteers', why: 'Gate B and C entering peak kickoff density, Gate D operates at 70% design speed.' },
        { id: 'CO-2', recommendation: 'Broadcast Mobile Ticket Entry alerts to section ticket holders', priority: 'medium', confidence: 91, department: 'Security', why: 'Reduce gate friction by pre-scanning tickets before scanning lanes.' }
      ];
      break;

    case 'MEDICAL_EMERGENCY':
      // Add a critical medical incident
      const newMedical: Incident = {
        id: `INC-${Date.now().toString().slice(-4)}`,
        title: 'Cardiac distress in Section B2',
        type: 'medical',
        severity: 'critical',
        location: 'Section B2',
        status: 'reported',
        reportedAt: new Date().toISOString(),
        details: '65-year old spectator reports chest pains and breathing difficulty. CPR certified volunteer on standby.',
        priority: 1,
        department: 'Medical',
        resourcesRequired: ['AED Defibrillator', 'Advanced Cardiac Life Support Team', 'Wheelchair dispatch'],
        nearbyResponders: ['Medic Unit 1 (Section B1)', 'Volunteer Yusuf A.'],
        escalationLevel: 'Level 2',
        suggestedActions: ['Clear immediate row seats for access', 'Guide emergency vehicle to Entrance Gate B']
      };
      
      state.incidents.unshift(newMedical);
      state.healthScore.medical = 82;
      state.healthScore.overall = 90;
      
      state.aiTimeline.unshift({
        time: timeStr,
        event: 'CRITICAL Emergency: FLOW AI dispatched ALS Medic Unit 1 to Section B2.',
        icon: 'medical'
      });

      state.liveActivityFeed.unshift({
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        message: 'Critical Medical Alert: Cardiac distress in B2',
        type: 'medical'
      });

      state.copilotActions = [
        { id: 'CO-1', recommendation: 'Route Medical Responders via Inner Corridor E-3', priority: 'high', confidence: 99, department: 'Medical', why: 'Corridor E-3 is free of public lines and provides 2.4 min faster ETA than public walkway.' },
        { id: 'CO-2', recommendation: 'Instruct nearest volunteer (Yusuf A.) to retrieve AED from Section B1 Lobby', priority: 'high', confidence: 98, department: 'Volunteers', why: 'Yusuf is 42 meters from B1 lobby AED box.' }
      ];
      break;

    case 'HEAVY_RAIN':
      state.weather.condition = 'RAIN';
      state.weather.precipitationProbabilityPercent = 95;
      state.weather.tempC = 18;
      
      // Congestion moves indoors
      ['B2', 'B3', 'C2', 'C3', 'A3'].forEach(sec => {
        state.sections[sec].crowdDensity = 'orange';
        state.sections[sec].queueLength = Math.floor(Math.random() * 10) + 15;
      });

      // Transportation impact (shuttles delayed, metro load rises)
      state.transportation.bus.shuttleA.delayMins = 8;
      state.transportation.bus.shuttleB.delayMins = 22;
      state.transportation.metro.line1.congestion = 95;
      state.transportation.metro.line2.congestion = 100;
      
      state.healthScore.transportation = 78;
      state.healthScore.safety = 92;
      state.healthScore.overall = 87;

      state.aiTimeline.unshift({
        time: timeStr,
        event: 'Downpour started: Activating indoor crowd mitigation plan.',
        icon: 'weather'
      });

      state.copilotActions = [
        { id: 'CO-1', recommendation: 'Distribute rain routing maps and hold fans in covered concourses', priority: 'medium', confidence: 92, department: 'Operations', why: 'Prevents mass slips and stampedes on wet exterior stairs.' },
        { id: 'CO-2', recommendation: 'Increase Metro Line 2 frequency to 3 minutes', priority: 'high', confidence: 95, department: 'Transport', why: 'Clears platforms faster as fans seek immediate shelter.' }
      ];
      break;

    case 'METRO_DELAY':
      state.transportation.metro.line2.status = 'DELAYED';
      state.transportation.metro.line2.nextArrivalMins = 25;
      state.transportation.metro.line2.congestion = 99;
      
      state.healthScore.transportation = 70;
      state.healthScore.overall = 88;

      state.aiTimeline.unshift({
        time: timeStr,
        event: 'Metro Line 2 signal fault: 25 min delay reported.',
        icon: 'metro'
      });

      state.liveActivityFeed.unshift({
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        message: 'Alert: Metro Line 2 delayed 25 mins due to technical fault',
        type: 'system'
      });

      state.copilotActions = [
        { id: 'CO-1', recommendation: 'Activate overflow Shuttle Buses from Gate C to Town Center Metro', priority: 'high', confidence: 96, department: 'Transport', why: 'Metro delays are building massive platform crowds (currently 1500+ fans in terminal).' },
        { id: 'CO-2', recommendation: 'Broadcast Metro delays via stadium screens and mobile push notifications', priority: 'medium', confidence: 93, department: 'Security', why: 'Informs fans to remain in concessions areas to prevent train platform crush.' }
      ];
      break;

    case 'FULL_STADIUM':
      state.occupancy.current = 79800;
      state.occupancy.percent = 99.8;
      state.healthScore.overall = 91;
      
      // All sections yellow or orange
      Object.keys(state.sections).forEach(sec => {
        state.sections[sec].crowdDensity = Math.random() > 0.5 ? 'orange' : 'yellow';
        state.sections[sec].queueLength = Math.floor(Math.random() * 8) + 10;
      });
      
      state.sustainability.powerUsageKw = 960; // Peak load
      state.sustainability.waterConsumptionLpm = 1650;
      
      state.aiTimeline.unshift({
        time: timeStr,
        event: 'Stadium reaches full capacity (99.8% occupancy).',
        icon: 'crowd'
      });
      break;

    case 'VIP_ARRIVAL':
      state.transportation.parking.lotA.occupiedPercent = 100;
      
      state.liveActivityFeed.unshift({
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        message: 'VIP delegation entered Stadium North VIP Lounge',
        type: 'security'
      });

      state.aiTimeline.unshift({
        time: timeStr,
        event: 'VIP motorcade arrived. Security escorts operational.',
        icon: 'security'
      });

      state.copilotActions = [
        { id: 'CO-1', recommendation: 'Secure Corridor V-1 and clear public flow near Suite 20', priority: 'high', confidence: 98, department: 'Security', why: 'Ensures VIP delegation arrival safely reaches Box 20 without crowd blocks.' }
      ];
      break;
  }

  return { ...state };
}

export function getCurrentState(): StadiumState {
  return { ...state };
}

export function updateStateDirectly(updatedFields: Partial<StadiumState>): StadiumState {
  state = { ...state, ...updatedFields };
  return { ...state };
}

export function resolveIncidentInSimulation(incidentId: string): StadiumState {
  const incidentIdx = state.incidents.findIndex(i => i.id === incidentId);
  if (incidentIdx !== -1) {
    state.incidents[incidentIdx].status = 'resolved';
    // Add to activity feed
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    state.liveActivityFeed.unshift({
      time: timeStr,
      message: `Incident ${incidentId} (${state.incidents[incidentIdx].title}) has been RESOLVED.`,
      type: 'system'
    });
    
    // Reroute active icons back
    const sec = state.incidents[incidentIdx].location;
    if (state.sections[sec]) {
      state.sections[sec].incidents = 0;
      state.sections[sec].crowdDensity = 'green';
    }
  }
  return { ...state };
}

export function addIncidentInSimulation(incident: Omit<Incident, 'id' | 'reportedAt'>): Incident {
  const newInc: Incident = {
    ...incident,
    id: `INC-${Date.now().toString().slice(-4)}`,
    reportedAt: new Date().toISOString()
  };
  state.incidents.unshift(newInc);
  
  const sec = incident.location;
  if (state.sections[sec]) {
    state.sections[sec].incidents += 1;
    state.sections[sec].crowdDensity = incident.severity === 'critical' || incident.severity === 'high' ? 'red' : 'orange';
  }

  // Update feed
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
  state.liveActivityFeed.unshift({
    time: timeStr,
    message: `NEW INCIDENT: ${newInc.title} reported at ${newInc.location}`,
    type: newInc.type
  });

  return newInc;
}
