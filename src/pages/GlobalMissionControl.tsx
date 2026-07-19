import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Compass, MapPin, Plane, Radio, Cloud, Shield, Cpu, Wifi, ArrowRight, AlertTriangle,
  ChevronRight, Activity, Users, Thermometer, Eye, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlagBadge } from '../components/FlagBadge';

interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  stadium: string;
  coordinates: { x: number; y: number };
  capacity: string;
  occupancy: number;
  threatLevel: 'low' | 'medium' | 'high';
  iotNodes: number;
  weather: string;
  temp: number;
  liveMatch: string;
  score: string;
  flag: string;
}

const VENUES: Venue[] = [
  { id: 'vancouver', name: 'BC Place', city: 'Vancouver', country: 'Canada', stadium: 'BC Place Stadium', coordinates: { x: 14.5, y: 25 }, capacity: '54,500', occupancy: 88, threatLevel: 'low', iotNodes: 1240, weather: 'Clear', temp: 18, liveMatch: 'CAN vs NGA', score: '2-1', flag: '🇨🇦' },
  { id: 'seattle', name: 'Lumen Field', city: 'Seattle', country: 'USA', stadium: 'Lumen Field', coordinates: { x: 14, y: 28 }, capacity: '69,000', occupancy: 92, threatLevel: 'low', iotNodes: 1450, weather: 'Rain', temp: 14, liveMatch: 'USA vs JPN', score: '0-0', flag: '🇺🇸' },
  { id: 'sanfran', name: "Levi's Stadium", city: 'San Francisco', country: 'USA', stadium: "Levi's Stadium", coordinates: { x: 12, y: 34 }, capacity: '68,500', occupancy: 95, threatLevel: 'low', iotNodes: 1600, weather: 'Sunny', temp: 22, liveMatch: 'MEX vs SWE', score: '1-1', flag: '🇺🇸' },
  { id: 'la', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', stadium: 'SoFi Stadium', coordinates: { x: 13, y: 37 }, capacity: '70,240', occupancy: 98, threatLevel: 'medium', iotNodes: 1980, weather: 'Sunny', temp: 26, liveMatch: 'BRA vs GER', score: '3-2', flag: '🇺🇸' },
  { id: 'dallas', name: 'AT&T Stadium', city: 'Dallas', country: 'USA', stadium: 'AT&T Stadium', coordinates: { x: 27, y: 40 }, capacity: '80,000', occupancy: 94, threatLevel: 'low', iotNodes: 2150, weather: 'Clear', temp: 29, liveMatch: 'ARG vs FRA', score: '2-2', flag: '🇺🇸' },
  { id: 'houston', name: 'NRG Stadium', city: 'Houston', country: 'USA', stadium: 'NRG Stadium', coordinates: { x: 28, y: 44 }, capacity: '72,200', occupancy: 87, threatLevel: 'low', iotNodes: 1390, weather: 'Overcast', temp: 28, liveMatch: 'BEL vs SEN', score: '1-0', flag: '🇺🇸' },
  { id: 'kansascity', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', stadium: 'Arrowhead Stadium', coordinates: { x: 30, y: 33 }, capacity: '76,416', occupancy: 89, threatLevel: 'low', iotNodes: 1520, weather: 'Clear', temp: 25, liveMatch: 'JPN vs POL', score: '1-0', flag: '🇺🇸' },
  { id: 'atlanta', name: 'Mercedes-Benz', city: 'Atlanta', country: 'USA', stadium: 'Mercedes-Benz Stadium', coordinates: { x: 38, y: 38 }, capacity: '71,000', occupancy: 93, threatLevel: 'low', iotNodes: 1700, weather: 'Overcast', temp: 24, liveMatch: 'NED vs COL', score: '2-1', flag: '🇺🇸' },
  { id: 'toronto', name: 'BMO Field', city: 'Toronto', country: 'Canada', stadium: 'BMO Field', coordinates: { x: 40, y: 25 }, capacity: '45,736', occupancy: 82, threatLevel: 'low', iotNodes: 980, weather: 'Clear', temp: 19, liveMatch: 'ESP vs TUN', score: '4-1', flag: '🇨🇦' },
  { id: 'boston', name: 'Gillette Stadium', city: 'Boston', country: 'USA', stadium: 'Gillette Stadium', coordinates: { x: 48, y: 24 }, capacity: '65,878', occupancy: 90, threatLevel: 'low', iotNodes: 1410, weather: 'Overcast', temp: 17, liveMatch: 'POR vs KOR', score: '2-1', flag: '🇺🇸' },
  { id: 'newyork', name: 'MetLife Stadium', city: 'New York/NJ', country: 'USA', stadium: 'MetLife Stadium', coordinates: { x: 47, y: 27 }, capacity: '82,500', occupancy: 94, threatLevel: 'medium', iotNodes: 2280, weather: 'Sunny', temp: 21, liveMatch: 'USA vs ENG', score: '1-0', flag: '🇺🇸' },
  { id: 'philadelphia', name: 'Lincoln Financial', city: 'Philadelphia', country: 'USA', stadium: 'Lincoln Financial Field', coordinates: { x: 46, y: 29 }, capacity: '69,176', occupancy: 85, threatLevel: 'low', iotNodes: 1350, weather: 'Clear', temp: 20, liveMatch: 'SUI vs CRO', score: '0-0', flag: '🇺🇸' },
  { id: 'miami', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', stadium: 'Hard Rock Stadium', coordinates: { x: 42, y: 48 }, capacity: '64,767', occupancy: 91, threatLevel: 'low', iotNodes: 1750, weather: 'Rain', temp: 27, liveMatch: 'URU vs NED', score: '0-2', flag: '🇺🇸' },
  { id: 'mexicocity', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', stadium: 'Estadio Azteca', coordinates: { x: 22, y: 55 }, capacity: '87,523', occupancy: 99, threatLevel: 'high', iotNodes: 2450, weather: 'Sunny', temp: 24, liveMatch: 'MEX vs ITA', score: '2-0', flag: '🇲🇽' },
  { id: 'monterrey', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', stadium: 'Estadio BBVA Bancomer', coordinates: { x: 21, y: 48 }, capacity: '51,348', occupancy: 96, threatLevel: 'low', iotNodes: 1180, weather: 'Clear', temp: 30, liveMatch: 'ECU vs AUS', score: '1-1', flag: '🇲🇽' },
  { id: 'guadalajara', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', stadium: 'Estadio Akron', coordinates: { x: 18, y: 52 }, capacity: '48,071', occupancy: 90, threatLevel: 'low', iotNodes: 1050, weather: 'Sunny', temp: 27, liveMatch: 'GHA vs SRB', score: '1-2', flag: '🇲🇽' },
];

export const GlobalMissionControl: React.FC = () => {
  const navigate = useNavigate();
  const { liveMatch } = useLiveData();
  const { t } = useThemeSettings();
  const [selectedVenue, setSelectedVenue] = useState<Venue>(VENUES.find(v => v.id === 'newyork')!);
  const [hoveredVenue, setHoveredVenue] = useState<string | null>(null);

  const totalIoT = VENUES.reduce((sum, v) => sum + v.iotNodes, 0);
  const avgOccupancy = Math.round(VENUES.reduce((sum, v) => sum + v.occupancy, 0) / VENUES.length);
  const highRiskCount = VENUES.filter(v => v.threatLevel === 'high').length;
  const medRiskCount = VENUES.filter(v => v.threatLevel === 'medium').length;

  const getThreatColor = (level: string) => {
    if (level === 'high') return 'text-error';
    if (level === 'medium') return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getThreatBg = (level: string) => {
    if (level === 'high') return 'bg-error';
    if (level === 'medium') return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      
      {/* ── Top AI Status Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS · {t.globalMissionControl}
          </div>
          <h1 className="font-display font-black text-2xl text-on-surface mt-1 leading-tight">
            {t.globalMissionControl} — {VENUES.length} Active Nodes
          </h1>
          <p className="text-secondary text-[11px] font-sans mt-0.5">
            Real-time satellite telemetry, weather grids, and IoT sensor arrays across 3 host nations.
          </p>
        </div>

        {/* Quick Stats Chips */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/40 rounded-xl text-[10px] font-mono">
            <Wifi size={11} className="text-emerald-500" />
            <span className="text-secondary">{totalIoT.toLocaleString()}</span>
            <span className="text-on-surface font-bold">IoT Nodes</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/40 rounded-xl text-[10px] font-mono">
            <Users size={11} className="text-primary" />
            <span className="text-on-surface font-bold">{avgOccupancy}%</span>
            <span className="text-secondary">Avg Fill</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/40 rounded-xl text-[10px] font-mono">
            <Shield size={11} className={highRiskCount > 0 ? 'text-error' : 'text-emerald-500'} />
            <span className="text-on-surface font-bold">{highRiskCount + medRiskCount}</span>
            <span className="text-secondary">Elevated</span>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Map + Detail ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        
        {/* ─── SVG Map Panel (2/3) ─── */}
        <div className="xl:col-span-2 glass-panel rounded-2xl relative overflow-hidden border border-outline-variant/60">
          
          {/* Map Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant/40 bg-surface-container-low/50">
            <div className="flex items-center gap-2">
              <Compass size={14} className="text-primary" />
              <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">North America Operations Grid</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-secondary">
                <Plane size={10} className="text-primary animate-pulse" />
                18 Flights
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-secondary">
                <Radio size={10} className="text-emerald-500" />
                3 Satellites
              </div>
            </div>
          </div>

          {/* SVG Map */}
          <div className="p-4 relative">
            <svg viewBox="0 0 60 65" className="w-full max-h-[480px] select-none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}>
              <defs>
                <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c0392b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e08850" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e08850" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e6e0d6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ece6dc" stopOpacity="0.6" />
                </linearGradient>
                <filter id="landShadow" x="-2%" y="-2%" width="104%" height="104%">
                  <feDropShadow dx="0.2" dy="0.3" stdDeviation="0.4" floodColor="#3a302a" floodOpacity="0.08" />
                </filter>
              </defs>

              {/* Latitude/Longitude Grid (subtle) */}
              <g stroke="#d8d0c8" strokeWidth="0.06" opacity="0.4" strokeDasharray="0.5 0.5">
                {[10, 20, 30, 40, 50].map(x => <line key={`vl${x}`} x1={x} y1="0" x2={x} y2="65" />)}
                {[10, 20, 30, 40, 50, 60].map(y => <line key={`hl${y}`} x1="0" y1={y} x2="60" y2={y} />)}
              </g>

              {/* ── Continent Shapes (more detailed) ── */}
              <g filter="url(#landShadow)">
                {/* Canada / Northern US */}
                <path 
                  d="M 3,3 L 12,2 L 22,3 L 35,4 L 48,3 L 55,6 L 52,10 L 50,15 L 52,18 L 50,22 L 47,20 L 44,22 L 40,20 L 38,22 L 42,26 L 48,28 L 50,30 L 48,32 L 44,35 L 42,38 L 38,35 L 35,38 L 32,35 L 30,38 L 28,36 L 25,38 L 22,35 L 18,38 L 15,35 L 12,36 L 10,34 L 8,30 L 5,25 L 3,18 L 2,10 Z" 
                  fill="url(#landGrad)" 
                  stroke="#d8d0c8" 
                  strokeWidth="0.15"
                />
                {/* Florida Peninsula */}
                <path 
                  d="M 38,35 L 42,38 L 44,42 L 44,48 L 42,50 L 40,48 L 38,42 L 36,38 Z" 
                  fill="url(#landGrad)" 
                  stroke="#d8d0c8" 
                  strokeWidth="0.15"
                />
                {/* Mexico */}
                <path 
                  d="M 5,38 L 10,34 L 15,36 L 18,38 L 22,35 L 25,38 L 28,42 L 30,46 L 28,50 L 25,54 L 22,58 L 18,56 L 16,52 L 14,48 L 12,44 L 8,42 L 5,38 Z" 
                  fill="url(#landGrad)" 
                  stroke="#d8d0c8" 
                  strokeWidth="0.15"
                />
                {/* Central America */}
                <path 
                  d="M 22,58 L 25,60 L 28,62 L 30,64 L 28,64 L 24,62 L 20,60 Z" 
                  fill="url(#landGrad)" 
                  stroke="#d8d0c8" 
                  strokeWidth="0.15"
                />
              </g>

              {/* Country border lines (subtle) */}
              <g stroke="#c2652a" strokeWidth="0.08" opacity="0.15" fill="none" strokeDasharray="0.8 0.4">
                {/* US-Canada border (rough 49th parallel) */}
                <path d="M 5,22 L 12,22 L 20,22 L 28,22 L 35,22 L 40,20 L 44,22 L 50,22" />
                {/* US-Mexico border */}
                <path d="M 10,34 L 15,36 L 18,38 L 22,35 L 25,38" />
              </g>

              {/* Flight paths (curved arcs) */}
              <g stroke="#c2652a" strokeWidth="0.12" fill="none" opacity="0.25">
                <path d="M 14,28 C 20,30 22,35 27,40" strokeDasharray="0.6 0.6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="8s" repeatCount="indefinite" />
                </path>
                <path d="M 13,37 C 25,30 35,28 48,24" strokeDasharray="0.6 0.6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="10s" repeatCount="indefinite" />
                </path>
                <path d="M 47,27 C 44,35 42,42 42,48" strokeDasharray="0.6 0.6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="6s" repeatCount="indefinite" />
                </path>
              </g>

              {/* Satellite orbit arcs */}
              <g stroke="#e08850" strokeWidth="0.08" fill="none" opacity="0.2">
                <ellipse cx="30" cy="35" rx="25" ry="10" transform="rotate(-8 30 35)" strokeDasharray="0.4 0.4">
                  <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="15s" repeatCount="indefinite" />
                </ellipse>
              </g>

              {/* ── Threat Heatmap Glows ── */}
              {VENUES.map(v => {
                if (v.threatLevel === 'high') return <circle key={`g-${v.id}`} cx={v.coordinates.x} cy={v.coordinates.y} r="4" fill="url(#redGlow)" className="animate-pulse" />;
                if (v.threatLevel === 'medium') return <circle key={`g-${v.id}`} cx={v.coordinates.x} cy={v.coordinates.y} r="3" fill="url(#orangeGlow)" className="animate-pulse" style={{ animationDuration: '2s' }} />;
                return null;
              })}

              {/* ── Venue Pins ── */}
              {VENUES.map(v => {
                const isSelected = selectedVenue.id === v.id;
                const isHovered = hoveredVenue === v.id;
                const pinColor = v.threatLevel === 'high' ? '#c0392b' : v.threatLevel === 'medium' ? '#e08850' : '#10B981';
                
                return (
                  <g 
                    key={v.id} 
                    transform={`translate(${v.coordinates.x}, ${v.coordinates.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedVenue(v)}
                    onMouseEnter={() => setHoveredVenue(v.id)}
                    onMouseLeave={() => setHoveredVenue(null)}
                  >
                    {/* Selection ring */}
                    {isSelected && (
                      <>
                        <circle r="2.2" fill="none" stroke={pinColor} strokeWidth="0.12" opacity="0.4">
                          <animate attributeName="r" from="1.5" to="2.8" dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="1.5" fill="none" stroke={pinColor} strokeWidth="0.15" opacity="0.6" />
                      </>
                    )}
                    
                    {/* Outer ring */}
                    <circle 
                      r={isSelected ? '1' : isHovered ? '0.9' : '0.7'} 
                      fill="none" 
                      stroke={pinColor} 
                      strokeWidth="0.15"
                      opacity={isSelected || isHovered ? 1 : 0.7}
                    />
                    {/* Inner dot */}
                    <circle r={isSelected ? '0.55' : '0.4'} fill={pinColor} />
                    
                    {/* Hover/Selected label */}
                    {(isSelected || isHovered) && (
                      <g>
                        <rect x="1.5" y="-2.2" width={v.city.length * 0.85 + 2} height="3.5" rx="0.6" 
                          fill="white" stroke="#d8d0c8" strokeWidth="0.1" opacity="0.95"
                          style={{ filter: 'drop-shadow(0 0.3px 0.5px rgba(0,0,0,0.1))' }}
                        />
                        <text x="2.2" y="-0.3" className="text-[1.6px] font-sans" fill="#3a302a" fontWeight="800">
                          {v.city}
                        </text>
                        <text x="2.2" y="0.8" className="text-[1.1px] font-sans" fill="#78706a">
                          {v.liveMatch} · {v.id === 'newyork' ? `${liveMatch.homeScore}-${liveMatch.awayScore}` : v.score}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-surface-container-high/95 backdrop-blur-sm border border-outline-variant/50 p-3 rounded-xl text-[9px] font-mono shadow-ultra-soft space-y-1.5">
              <div className="text-secondary font-bold uppercase tracking-wider pb-1 border-b border-outline-variant/40">Status Map</div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-on-surface">Operational</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-on-surface">Elevated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-error" />
                <span className="text-on-surface">Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Detail Panel (1/3) ─── */}
        <div className="xl:col-span-1 space-y-4">
          
          {/* Selected Venue Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVenue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-panel rounded-2xl border border-outline-variant/60 overflow-hidden"
            >
              {/* Venue Header */}
              <div className="p-4 border-b border-outline-variant/40 bg-surface-container-low/50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-secondary uppercase tracking-widest">Selected Node</div>
                    <h2 className="font-display font-black text-lg text-on-surface mt-0.5 leading-tight">{selectedVenue.stadium}</h2>
                    <div className="flex items-center gap-1.5 text-[11px] text-secondary mt-1">
                      <MapPin size={10} className="text-primary" />
                      <FlagBadge country={selectedVenue.country} className="w-4 h-4" />
                      <span>{selectedVenue.city}, {selectedVenue.country}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
                    selectedVenue.threatLevel === 'high' ? 'bg-error/10 text-error border-error/30' :
                    selectedVenue.threatLevel === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' :
                    'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  }`}>
                    {selectedVenue.threatLevel}
                  </div>
                </div>
              </div>

              {/* Live Match Strip */}
              <div className="mx-4 mt-3 p-3 bg-surface-container rounded-xl border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-secondary uppercase">Live Match</div>
                    <div className="text-sm font-black text-on-surface mt-0.5">{selectedVenue.liveMatch}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
                      <span className="text-[8px] font-bold text-error uppercase tracking-wider">Live</span>
                    </div>
                    <div className="text-lg font-mono font-black text-primary mt-0.5">
                      {selectedVenue.id === 'newyork' ? `${liveMatch.homeScore}-${liveMatch.awayScore}` : selectedVenue.score}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5 p-4">
                <div className="bg-surface-container/60 border border-outline-variant/30 p-3 rounded-xl">
                  <div className="text-[8px] font-mono text-secondary uppercase tracking-wider">Occupancy</div>
                  <div className="text-base font-black text-on-surface mt-0.5">{selectedVenue.occupancy}%</div>
                  {/* Mini progress bar */}
                  <div className="w-full h-1 bg-outline-variant/30 rounded-full mt-1.5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${selectedVenue.occupancy > 95 ? 'bg-error' : selectedVenue.occupancy > 85 ? 'bg-primary' : 'bg-emerald-500'}`} style={{ width: `${selectedVenue.occupancy}%` }} />
                  </div>
                  <div className="text-[8px] text-secondary mt-1 font-mono">{selectedVenue.capacity}</div>
                </div>
                <div className="bg-surface-container/60 border border-outline-variant/30 p-3 rounded-xl">
                  <div className="text-[8px] font-mono text-secondary uppercase tracking-wider">Weather</div>
                  <div className="text-base font-black text-on-surface mt-0.5">{selectedVenue.temp}°C</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Cloud size={9} className="text-secondary" />
                    <span className="text-[8px] text-secondary font-mono">{selectedVenue.weather}</span>
                  </div>
                </div>
                <div className="bg-surface-container/60 border border-outline-variant/30 p-3 rounded-xl">
                  <div className="text-[8px] font-mono text-secondary uppercase tracking-wider">IoT Sensors</div>
                  <div className="text-base font-black text-on-surface mt-0.5">{selectedVenue.iotNodes.toLocaleString()}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Wifi size={9} className="text-emerald-500" />
                    <span className="text-[8px] text-emerald-600 font-mono">Syncing</span>
                  </div>
                </div>
                <div className="bg-surface-container/60 border border-outline-variant/30 p-3 rounded-xl">
                  <div className="text-[8px] font-mono text-secondary uppercase tracking-wider">AI Status</div>
                  <div className="text-base font-black text-on-surface mt-0.5 flex items-center gap-1">
                    <Zap size={12} className="text-primary" /> Active
                  </div>
                  <div className="text-[8px] text-emerald-600 font-mono mt-1">All models online</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-4 pb-4">
                <button 
                  onClick={() => navigate('/digital-twin')}
                  className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer text-[11px] uppercase tracking-wider"
                >
                  <Eye size={12} />
                  <span>Open Digital Twin</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* AI Alert Banner */}
          <div className="glass-panel rounded-2xl p-4 border border-outline-variant/60 space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface uppercase tracking-wider font-mono">
              <Cpu size={12} className="text-primary" />
              Edge AI Diagnostics
            </div>
            
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-lg">
                <span className="text-secondary">Connected Venues</span>
                <span className="font-bold text-on-surface font-mono">{VENUES.length}/{VENUES.length} Online</span>
              </div>
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-lg">
                <span className="text-secondary">Avg Ingress Latency</span>
                <span className="font-bold text-emerald-600 font-mono">4.2 min</span>
              </div>
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-lg">
                <span className="text-secondary">Active Satellites</span>
                <span className="font-bold text-on-surface font-mono">FLOW-Sat 1, 2, 4</span>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl flex items-start gap-2">
              <AlertTriangle size={13} className="text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-[9px] font-bold text-primary uppercase font-mono">AI Reroute Alert</div>
                <p className="text-[9px] text-secondary leading-normal mt-0.5">
                  Gate C at Dallas predicted to spike to 18 min. Pre-egress load balancing recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Venue List (Scrollable) ── */}
      <div className="glass-panel rounded-2xl border border-outline-variant/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant/40 bg-surface-container-low/50">
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Activity size={12} className="text-primary" />
            All Tournament Venues — Live Status
          </span>
          <span className="text-[9px] text-secondary font-mono">{VENUES.length} nodes active</span>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-2.5 p-4 min-w-max">
            {VENUES.map(v => {
              const isActive = selectedVenue.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVenue(v)}
                  className={`
                    flex-shrink-0 w-[160px] p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group
                    ${isActive 
                      ? 'border-primary bg-primary/8 shadow-[0_0_15px_rgba(194,101,42,0.08)]' 
                      : 'border-outline-variant/50 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <FlagBadge country={v.country} className="w-5 h-5" />
                    <span className={`h-2 w-2 rounded-full ${getThreatBg(v.threatLevel)} ${v.threatLevel !== 'low' ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="text-[10px] font-bold text-on-surface truncate">{v.city}</div>
                  <div className="text-[8px] text-secondary truncate mt-0.5 font-mono">{v.name}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/30">
                    <span className="text-[8px] font-mono text-secondary">{v.occupancy}%</span>
                    <span className="text-[8px] font-mono font-bold text-primary">{v.score}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
