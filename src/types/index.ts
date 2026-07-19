export interface HealthScore {
  overall: number;
  safety: number;
  transportation: number;
  food: number;
  medical: number;
  accessibility: number;
  sustainability: number;
}

export interface GateInfo {
  current: number;
  capacity: number;
  status: 'OPEN' | 'CLOSED' | 'OVERFLOW';
  congestion: number;
}

export interface SectionInfo {
  crowdDensity: 'green' | 'yellow' | 'orange' | 'red';
  queueLength: number;
  foodAvailability: number;
  incidents: number;
  volunteers: number;
  security: number;
  medical: number;
}

export interface TransitLine {
  name: string;
  status: 'OPERATIONAL' | 'DELAYED' | 'SUSPENDED';
  nextArrivalMins: number;
  congestion: number;
}

export interface ShuttleBus {
  name: string;
  status: 'OPERATIONAL' | 'DELAYED' | 'SUSPENDED';
  delayMins: number;
  frequencyMins: number;
}

export interface ParkingLot {
  name: string;
  occupiedPercent: number;
}

export interface FoodStallInfo {
  name: string;
  inventoryPercent: number;
  salesVelocity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  waitTimeMins: number;
}

export interface SustainabilityMetrics {
  powerUsageKw: number;
  waterConsumptionLpm: number;
  wasteGenerationPercent: number;
  carbonOffsetKg: number;
  sustainabilityAlerts: string[];
}

export interface WeatherInfo {
  tempC: number;
  humidityPercent: number;
  condition: 'CLEAR' | 'RAIN' | 'OVERCAST' | 'STORM';
  precipitationProbabilityPercent: number;
}

export interface Incident {
  id: string;
  title: string;
  type: 'medical' | 'security' | 'sustainability' | 'infrastructure' | 'general';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  status: 'reported' | 'dispatched' | 'on-scene' | 'investigating' | 'resolved';
  reportedAt: string;
  details: string;
  priority: number;
  department: string;
  resourcesRequired: string[];
  nearbyResponders: string[];
  escalationLevel: string;
  suggestedActions: string[];
}

export interface VolunteerInfo {
  id: string;
  name: string;
  location: string;
  status: 'ON_TASK' | 'IDLE' | 'BREAK';
  tasksCompleted: number;
  responseTimeSec: number;
  peopleAssisted: number;
  rank: 'GOLD' | 'SILVER' | 'BRONZE';
  rating: number;
}

export interface LostItem {
  id: string;
  itemName: string;
  section: string;
  status: 'reported' | 'found' | 'claimed';
  reportedAt: string;
  imageUrl?: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
  icon: string;
}

export interface ActivityFeedItem {
  time: string;
  message: string;
  type: string; // medical, security, volunteer, system, ai
}

export interface CopilotAction {
  id: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  department: string;
  why: string;
  expectedEffect?: string;
  risks?: string;
  rollbackPlan?: string;
  whyDetails?: string[];
  matchedMemory?: {
    event: string;
    resolution: string;
    successRate: number;
  };
}

export interface StadiumState {
  timestamp: string;
  healthScore: HealthScore;
  occupancy: {
    current: number;
    max: number;
    percent: number;
    gates: {
      A: GateInfo;
      B: GateInfo;
      C: GateInfo;
      D: GateInfo;
    };
  };
  sections: {
    [key: string]: SectionInfo;
  };
  transportation: {
    metro: {
      line1: TransitLine;
      line2: TransitLine;
    };
    bus: {
      shuttleA: ShuttleBus;
      shuttleB: ShuttleBus;
    };
    parking: {
      lotA: ParkingLot;
      lotB: ParkingLot;
      lotC: ParkingLot;
      lotD: ParkingLot;
    };
  };
  foodStalls: {
    [key: string]: FoodStallInfo;
  };
  sustainability: SustainabilityMetrics;
  weather: WeatherInfo;
  incidents: Incident[];
  volunteers: {
    active: number;
    assigned: number;
    idle: number;
    volunteersList: VolunteerInfo[];
  };
  lostAndFound: LostItem[];
  aiTimeline: TimelineEvent[];
  liveActivityFeed: ActivityFeedItem[];
  copilotActions: CopilotAction[];
}

export type PresetScenario =
  | 'KICKOFF_RUSH'
  | 'MEDICAL_EMERGENCY'
  | 'HEAVY_RAIN'
  | 'METRO_DELAY'
  | 'FULL_STADIUM'
  | 'VIP_ARRIVAL'
  | 'CYBER_ATTACK'
  | 'POWER_OUTAGE'
  | 'DRONE_INTRUSION'
  | 'CROWD_SURGE';
