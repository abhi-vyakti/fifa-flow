import React, { useState, useEffect } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Shield, Users, Activity, Sliders, MapPin, Eye, Radio, AlertTriangle, 
  CheckCircle2, Plus, Minus, Target, MessageSquare, Cpu, Navigation, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  reportedAt: string;
  details: string;
  assignedUnit: string;
  eta: string;
  status: 'active' | 'investigating' | 'resolved';
  coord: { cx: number; cy: number }; // Map coordinates
}

// Polar coordinate arc path helper
const getSectorPath = (cx: number, cy: number, startAngle: number, endAngle: number, innerR: number, outerR: number) => {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  
  const x1 = cx + innerR * Math.cos(rad(startAngle));
  const y1 = cy + innerR * Math.sin(rad(startAngle));
  const x2 = cx + outerR * Math.cos(rad(startAngle));
  const y2 = cy + outerR * Math.sin(rad(startAngle));
  
  const x3 = cx + outerR * Math.cos(rad(endAngle));
  const y3 = cy + outerR * Math.sin(rad(endAngle));
  const x4 = cx + innerR * Math.cos(rad(endAngle));
  const y4 = cy + innerR * Math.sin(rad(endAngle));
  
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  
  return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1} Z`;
};

export const SecurityCenter: React.FC = () => {
  const { state, resolveIncident } = useLiveData();
  const { emergencyMode } = useThemeSettings();
  const [activeTab, setActiveTab] = useState<'level0' | 'level1' | 'level2'>('level1');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Dynamic incidents state mapped to database
  const [localAlerts, setLocalAlerts] = useState<SecurityAlert[]>([
    { id: 'SEC-1', title: 'Large queue at Gate B', severity: 'high', location: 'Gate B Ingress', reportedAt: '2m ago', details: 'Spectator density exceeding 4 persons/sqm. Tension rising at outer validation gates.', assignedUnit: 'Patrol Unit Alpha', eta: '4m', status: 'active', coord: { cx: 16, cy: 50 } },
    { id: 'SEC-2', title: 'Suspicious unattended package', severity: 'medium', location: 'Section C2 Lobby', reportedAt: '12m ago', details: 'Black backpack left near concession stand 18. Local stewards setting up perimeter cordon.', assignedUnit: 'Security Squad 4', eta: '6m', status: 'investigating', coord: { cx: 72, cy: 72 } }
  ]);

  const handleResolveLocal = (id: string) => {
    setLocalAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Check how many security incidents exist globally
  const activeGlobalIncidents = state.incidents.filter(i => i.status !== 'resolved' && (i.type === 'security' || i.department === 'Security'));
  const totalIncidentsCount = localAlerts.length + activeGlobalIncidents.length;

  return (
    <div className="space-y-6">
      
      {/* Dynamic CSS animations for scanlines and radar sweeps */}
      <style>{`
        @keyframes flow-dash-reverse {
          to { stroke-dashoffset: 20; }
        }
        .evac-flow-line {
          animation: flow-dash-reverse 1.5s linear infinite;
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .radar-sweep-effect {
          transform-origin: 50px 50px;
          animation: radar-sweep 12s linear infinite;
        }
      `}</style>

      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; Security Operations Center
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1">
            {emergencyMode 
              ? "AI detected emergency status. Elevating threat level to Level 3. Securing exits." 
              : totalIncidentsCount > 0 
                ? `AI monitors ${totalIncidentsCount} active security alert${totalIncidentsCount > 1 ? 's' : ''}. Deploying patrols.` 
                : "AI predicts normal spectator behavior. All turnstiles operational."
            }
          </h1>
          <p className="text-secondary text-xs font-sans mt-0.5">
            Coordinate crowd flows, inspect real-time alarms, and dispatch response units.
          </p>
        </div>
      </div>

      {/* Top Banner stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-lowest border border-outline-variant/50 rounded-3xl p-5 shadow-ultra-soft text-center">
        <div className="flex flex-col items-center justify-center gap-1 border-r border-outline-variant/40 last:border-r-0">
          <span className="text-3xl font-display font-black text-on-surface">11</span>
          <p className="text-[10px] uppercase tracking-widest font-mono text-secondary font-bold">Active Gates</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-outline-variant/40 last:border-r-0">
          <span className="text-3xl font-display font-black text-on-surface">146</span>
          <p className="text-[10px] uppercase tracking-widest font-mono text-secondary font-bold">Patrol Guards</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-outline-variant/40 last:border-r-0">
          <span className="text-3xl font-display font-black text-on-surface">2,186</span>
          <p className="text-[10px] uppercase tracking-widest font-mono text-secondary font-bold">CCTV Cameras</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 last:border-0">
          <span className={`text-sm font-display font-black leading-none ${totalIncidentsCount > 0 ? 'text-error animate-pulse' : 'text-on-surface'}`}>
            {totalIncidentsCount > 0 ? 'WARNING' : '100% READY'}
          </span>
          <p className="text-[10px] uppercase tracking-widest font-mono text-secondary font-bold">Security Status</p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* LEFT: Live Incidents Feed (Span 3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-display font-black text-lg text-on-surface">Live Incidents</h3>
            <span className="bg-primary/20 text-primary border border-primary/30 px-2.5 py-0.5 rounded-full text-[9px] font-black font-mono">
              {totalIncidentsCount} ACTIVE
            </span>
          </div>

          <div className="space-y-4 pr-1 max-h-[520px] overflow-y-auto scrollbar-thin">
            
            {/* Local hardcoded security incidents */}
            {localAlerts.map(alert => (
              <div 
                key={alert.id} 
                className="bg-surface-container-lowest border border-outline-variant/50 p-4 rounded-2xl shadow-ultra-soft hover:border-primary/50 transition-all cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                    alert.severity === 'high' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    {alert.severity} Priority
                  </span>
                  <span className="text-[9px] font-mono text-secondary">{alert.reportedAt}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-on-surface leading-tight">{alert.title}</h4>
                  <p className="text-[10px] text-secondary mt-1 leading-normal">{alert.details}</p>
                </div>
                <div className="pt-2.5 border-t border-outline-variant/30 flex justify-between items-center text-[9px] font-mono text-secondary">
                  <span>{alert.assignedUnit}</span>
                  <button 
                    onClick={() => handleResolveLocal(alert.id)}
                    className="text-primary hover:text-primary-container font-black cursor-pointer hover:underline"
                  >
                    RESOLVE (ETA: {alert.eta})
                  </button>
                </div>
              </div>
            ))}

            {/* Dynamic Context incidents mapping */}
            {activeGlobalIncidents.map(inc => (
              <div 
                key={inc.id} 
                className="bg-surface-container-lowest border border-outline-variant/50 p-4 rounded-2xl shadow-ultra-soft hover:border-primary/50 transition-all cursor-pointer space-y-3 border-l-3 border-l-red-500"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                    Critical Alert
                  </span>
                  <span className="text-[9px] font-mono text-secondary">Active</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-on-surface leading-tight">{inc.title}</h4>
                  <p className="text-[10px] text-secondary mt-1 leading-normal">{inc.details}</p>
                </div>
                <button 
                  onClick={() => resolveIncident(inc.id)}
                  className="w-full text-center py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer active:scale-98 shadow-sm"
                >
                  Acknowledge & Resolve
                </button>
              </div>
            ))}

            {totalIncidentsCount === 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 text-center text-secondary shadow-ultra-soft">
                <CheckCircle2 size={24} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-xs font-bold text-on-surface">No active threat alerts</p>
                <p className="text-[10px] text-secondary mt-0.5">Perimeter nodes report stable status.</p>
              </div>
            )}
          </div>
        </div>

        {/* CENTER: Interactive Security Stadium Map (Span 6) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/50 shadow-ultra-soft h-[520px] relative overflow-hidden flex flex-col justify-center items-center">
            
            {/* Top map selector */}
            <div className="flex justify-between items-center absolute top-4 left-4 right-4 z-10 border-b border-outline-variant/30 pb-2.5">
              <h3 className="font-display font-black text-lg text-on-surface">Stadium Live Map</h3>
              <div className="flex gap-1.5">
                {(['level0', 'level1', 'level2'] as const).map((level) => (
                  <button 
                    key={level}
                    onClick={() => setActiveTab(level)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer active:scale-95 ${
                      activeTab === level 
                        ? 'bg-primary border-primary text-white shadow-sm' 
                        : 'bg-surface-container border-outline-variant/50 text-secondary hover:text-on-surface'
                    }`}
                  >
                    {level === 'level0' ? 'Level 0: Pitch' : level === 'level1' ? 'Level 1: Concourse' : 'Level 2: VIP'}
                  </button>
                ))}
              </div>
            </div>

            {/* Stadium concentric circle SVG */}
            <div className="w-full flex-1 flex items-center justify-center mt-6">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full max-h-[380px] select-none transition-all duration-500"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                
                {/* Defs for gradients & filters */}
                <defs>
                  <radialGradient id="heatZoneGateB" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c0392b" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#c0392b" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
                  </radialGradient>
                  
                  <radialGradient id="heatZoneCordonC2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#d97706" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Tactical Radar Line sweeping in background */}
                <line x1="50" y1="50" x2="50" y2="6" stroke="rgba(194, 101, 42, 0.15)" strokeWidth="0.8" className="radar-sweep-effect pointer-events-none" />

                {/* Outer boundary guidelines */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-outline-variant/30" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-outline-variant/60" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant/30" strokeDasharray="1 1" />

                {/* --- LEVEL 0: PITCH LAYOUT --- */}
                {activeTab === 'level0' && (
                  <g className="transition-all duration-300">
                    {/* Concentric stand wireframe */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant/50" />
                    
                    {/* Pitch Green turf (fixed invalid hex color `#ecfdf5/10`) */}
                    <rect x="34" y="28" width="32" height="44" rx="1.5" fill="#ecfdf5" fillOpacity={0.08} stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/40" />
                    {/* Pitch markings */}
                    <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-emerald-500/40" />
                    <circle cx="50" cy="50" r="5.5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-emerald-500/40" />
                    <rect x="40" y="28" width="20" height="6.5" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-emerald-500/30" />
                    <rect x="40" y="65.5" width="20" height="6.5" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-emerald-500/30" />

                    {/* Sideline team benches */}
                    <rect x="30" y="44" width="2" height="5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />
                    <rect x="68" y="44" width="2" height="5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />

                    {/* Emergency medical vehicle access corridor */}
                    <path d="M 50 94 L 50 74" stroke="#e08850" strokeWidth="0.8" strokeDasharray="2 2" fill="none" className="evac-flow-line" />
                    <text x="50" y="86" textAnchor="middle" className="text-[2px] font-mono fill-secondary tracking-widest pointer-events-none">MED CORRIDOR</text>

                    {/* Pitchside guards positions (Little shields/dots) */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * Math.PI) / 4;
                      const cx = 50 + 34 * Math.cos(angle);
                      const cy = 50 + 34 * Math.sin(angle);
                      return (
                        <circle key={i} cx={cx} cy={cy} r="0.8" fill="#c2652a" stroke="white" strokeWidth="0.15" />
                      );
                    })}
                  </g>
                )}

                {/* --- LEVEL 1: CONCOURSE LAYOUT --- */}
                {activeTab === 'level1' && (
                  <g className="transition-all duration-300">
                    {/* Ring of sectors for the stands */}
                    {/* North sectors */}
                    <path d={getSectorPath(50, 50, 225, 315, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />
                    <path d={getSectorPath(50, 50, 255, 285, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant/60" />
                    
                    {/* South sectors */}
                    <path d={getSectorPath(50, 50, 45, 135, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />
                    <path d={getSectorPath(50, 50, 75, 105, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant/60" />

                    {/* East sectors */}
                    <path d={getSectorPath(50, 50, 315, 405, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />
                    
                    {/* West sectors */}
                    <path d={getSectorPath(50, 50, 135, 225, 30, 42)} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />

                    {/* Ingress heat zones and cordons tied to alerts */}
                    {/* SEC-1: Gate B Ingress alert zone */}
                    {localAlerts.some(a => a.id === 'SEC-1') && (
                      <g>
                        <circle cx="16" cy="50" r="10" fill="url(#heatZoneGateB)" className="animate-pulse" />
                        <circle cx="16" cy="50" r="6" fill="none" stroke="#c0392b" strokeWidth="0.4" strokeDasharray="2 2" className="animate-spin-slow" style={{ animationDuration: '6s' }} />
                        <g transform="translate(16, 50)">
                          <circle cx="0" cy="0" r="2.2" fill="#c0392b" className="animate-ping" />
                          <circle cx="0" cy="0" r="1.4" fill="#c0392b" stroke="white" strokeWidth="0.3" />
                        </g>
                        <text x="16" y="44" textAnchor="middle" className="text-[1.8px] font-mono fill-error font-black">GATE B QUEUE</text>
                      </g>
                    )}

                    {/* SEC-2: Unattended package cordon */}
                    {localAlerts.some(a => a.id === 'SEC-2') && (
                      <g>
                        <circle cx="72" cy="72" r="8" fill="url(#heatZoneCordonC2)" />
                        <circle cx="72" cy="72" r="5" fill="none" stroke="#d97706" strokeWidth="0.4" strokeDasharray="3 2" className="animate-pulse" />
                        <g transform="translate(72, 72)">
                          <circle cx="0" cy="0" r="2" fill="#d97706" className="animate-ping" />
                          <circle cx="0" cy="0" r="1.2" fill="#d97706" stroke="white" strokeWidth="0.25" />
                        </g>
                        <text x="72" y="65" textAnchor="middle" className="text-[1.8px] font-mono fill-amber-600 font-black">SEC-2 CORDON</text>
                      </g>
                    )}

                    {/* Spectator exit flow lines */}
                    <path d="M 50 30 Q 50 16 50 6" stroke="#10B981" strokeWidth="0.5" strokeDasharray="2 3" fill="none" className="evac-flow-line" />
                    <path d="M 30 50 Q 16 50 6 50" stroke="#10B981" strokeWidth="0.5" strokeDasharray="2 3" fill="none" className="evac-flow-line" />
                    <path d="M 70 50 Q 84 50 94 50" stroke="#10B981" strokeWidth="0.5" strokeDasharray="2 3" fill="none" className="evac-flow-line" />

                    {/* General turnstile gate nodes */}
                    <circle cx="50" cy="5" r="1.2" fill="#10B981" stroke="white" strokeWidth="0.2" />
                    <circle cx="95" cy="50" r="1.2" fill="#10B981" stroke="white" strokeWidth="0.2" />
                    <circle cx="5" cy="50" r="1.2" fill="#c0392b" stroke="white" strokeWidth="0.2" />
                    <circle cx="50" cy="95" r="1.2" fill="#10B981" stroke="white" strokeWidth="0.2" />
                  </g>
                )}

                {/* --- LEVEL 2: VIP SUITE LAYOUT --- */}
                {activeTab === 'level2' && (
                  <g className="transition-all duration-300">
                    {/* VIP boxes inner ring */}
                    <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-outline-variant/60" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant/40" strokeDasharray="2 2" />

                    {/* VIP suite divisions */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * Math.PI) / 6;
                      const x1 = 50 + 20 * Math.cos(angle);
                      const y1 = 50 + 20 * Math.sin(angle);
                      const x2 = 50 + 26 * Math.cos(angle);
                      const y2 = 50 + 26 * Math.sin(angle);
                      return (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.3" className="text-outline-variant/50" />
                      );
                    })}

                    {/* Highlight VIP suite lounge (East side) */}
                    <path d={getSectorPath(50, 50, -30, 30, 20, 26)} fill="#c2652a" fillOpacity={0.15} stroke="#c2652a" strokeWidth="0.4" />
                    <text x="64" y="51" textAnchor="middle" className="text-[1.8px] font-mono fill-primary font-black tracking-widest">VIP CLUB</text>

                    {/* Guard stations at private entry lifts */}
                    <g transform="translate(38, 38)" className="cursor-pointer">
                      <circle cx="0" cy="0" r="1" fill="#f8b125" stroke="white" strokeWidth="0.2" />
                    </g>
                    <g transform="translate(62, 38)" className="cursor-pointer">
                      <circle cx="0" cy="0" r="1" fill="#f8b125" stroke="white" strokeWidth="0.2" />
                    </g>
                    <g transform="translate(38, 62)" className="cursor-pointer">
                      <circle cx="0" cy="0" r="1" fill="#f8b125" stroke="white" strokeWidth="0.2" />
                    </g>
                  </g>
                )}

                {/* Pulse Warning for Active Critical Incidents */}
                <AnimatePresence>
                  {activeGlobalIncidents.length > 0 && (
                    <g>
                      {activeGlobalIncidents.map((incident) => {
                        // Plot coordinates based on location (e.g. Section B2 / West Plaza)
                        let coords = { cx: 50, cy: 76 }; // Default South stand area
                        if (incident.location.includes('B3') || incident.location.includes('B2') || incident.location.includes('West')) {
                          coords = { cx: 28, cy: 50 }; // West Stand area
                        }
                        
                        return (
                          <g key={incident.id} className="animate-pulse">
                            <circle cx={coords.cx} cy={coords.cy} r="4" fill="#ff4d4d" fillOpacity="0.3" />
                            <circle cx={coords.cx} cy={coords.cy} r="1.5" fill="#ff4d4d" stroke="white" strokeWidth="0.25" />
                          </g>
                        );
                      })}
                    </g>
                  )}
                </AnimatePresence>

              </svg>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-surface-container-highest/95 border border-outline-variant/60 p-2.5 rounded-2xl flex flex-col gap-1.5 text-[9px] font-mono shadow-ultra-soft z-10 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Security Patrol</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Medical Station</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-error" />
                <span>Active Incident Cordon</span>
              </div>
            </div>

            {/* Map Controls right side */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                className="h-8 w-8 bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface rounded-xl flex items-center justify-center shadow-ultra-soft cursor-pointer active:scale-95 transition-all"
              >
                <Plus size={14} />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                className="h-8 w-8 bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface rounded-xl flex items-center justify-center shadow-ultra-soft cursor-pointer active:scale-95 transition-all"
              >
                <Minus size={14} />
              </button>
              <button 
                onClick={() => { setZoomLevel(100); }}
                className="h-8 w-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-ultra-soft cursor-pointer active:scale-95 transition-all"
                title="Reset Zoom"
              >
                <Target size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: Operational Stats & AI Forecast (Span 3) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="glass-panel rounded-3xl p-5 border-l-4 border-primary space-y-4 shadow-ultra-soft">
            <h3 className="font-display font-black text-lg text-on-surface">AI Risk Diagnostics</h3>
            
            <div className="space-y-3.5 text-xs font-sans">
              <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/40 space-y-1">
                <span className="text-secondary text-[10px] uppercase font-mono block">AI Threat Score</span>
                <span className="font-extrabold text-on-surface">0.02% (Extremely Low)</span>
              </div>

              <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/40 space-y-1">
                <span className="text-secondary text-[10px] uppercase font-mono block">Active Edge Gateways</span>
                <span className="font-extrabold text-emerald-600">42 / 42 Edge Nodes Syncing</span>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-3 rounded-2xl flex items-start gap-2.5">
                <Cpu size={15} className="text-primary shrink-0 mt-0.5 animate-pulse" />
                <div className="text-[10px]">
                  <span className="font-bold text-primary uppercase font-mono block">Anomalous Crowd Wave</span>
                  <p className="text-secondary leading-normal mt-0.5">
                    Camera feed W2 indicates rhythmic crowd chanting rising. Volumetric sensors in Section C2 confirm density within safety index.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-outline-variant shadow-ultra-soft space-y-3">
            <h3 className="font-display font-black text-lg text-on-surface">Direct Contact</h3>
            <div className="space-y-2.5 text-xs">
              <button className="w-full bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface py-2 rounded-xl font-bold tracking-wide transition-all shadow-ultra-soft active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer text-[10px] uppercase font-mono">
                <MessageSquare size={12} />
                <span>Call Police Command</span>
              </button>
              <button className="w-full bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface py-2 rounded-xl font-bold tracking-wide transition-all shadow-ultra-soft active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer text-[10px] uppercase font-mono">
                <MessageSquare size={12} />
                <span>Call Medical Dispatch</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
