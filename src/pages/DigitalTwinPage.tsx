import React, { useState, useEffect } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Shield, Users, Activity, Sliders, MapPin, Cloud, Cpu, Wifi, Eye, Radio, 
  AlertTriangle, Navigation, Info, ArrowRight, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StandDetails {
  id: string;
  name: string;
  occupancy: number;
  queue: string;
  cctv: string;
  temp: number;
  staff: number;
  medical: string;
  aiForecast: string;
  gateCongestion: number;
  sectorsList: string[];
}

const STAND_DATA: Record<string, StandDetails> = {
  north: { 
    id: 'north', 
    name: 'North Stand', 
    occupancy: 96, 
    queue: '2 mins', 
    cctv: 'CCTV Camera N4 Active', 
    temp: 24, 
    staff: 42, 
    medical: 'Medic Unit 3 on standby', 
    aiForecast: 'Predicted load to drop by 10% post-halftime', 
    gateCongestion: 35,
    sectorsList: ['N1', 'N2', 'N3', 'N4', 'N5']
  },
  south: { 
    id: 'south', 
    name: 'South Stand', 
    occupancy: 99, 
    queue: '12 mins', 
    cctv: 'CCTV Camera S2 Active', 
    temp: 25, 
    staff: 58, 
    medical: 'Incident V-102 resolved', 
    aiForecast: 'Spike predicted in 10 mins (egress platform surge)', 
    gateCongestion: 85,
    sectorsList: ['S1', 'S2', 'S3', 'S4', 'S5']
  },
  east: { 
    id: 'east', 
    name: 'East Stand', 
    occupancy: 91, 
    queue: '4 mins', 
    cctv: 'CCTV Camera E3 Active', 
    temp: 24, 
    staff: 36, 
    medical: 'No active medical alerts', 
    aiForecast: 'Expected steady flow for next 45 minutes', 
    gateCongestion: 42,
    sectorsList: ['E1', 'E2', 'E3', 'E4', 'E5']
  },
  west: { 
    id: 'west', 
    name: 'West Stand', 
    occupancy: 94, 
    queue: '3 mins', 
    cctv: 'CCTV Camera W1 Active', 
    temp: 23, 
    staff: 45, 
    medical: 'Responder Unit 1 on site', 
    aiForecast: 'Expected VIP motorcade departure at 82nd minute', 
    gateCongestion: 38,
    sectorsList: ['W1', 'W2', 'W3', 'W4', 'W5']
  }
};

// Outer helper to construct radial segments for the holographic stadium
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

export const StadiumDigitalTwin: React.FC = () => {
  const { state } = useLiveData();
  const { emergencyMode } = useThemeSettings();
  
  // States
  const [selectedStand, setSelectedStand] = useState<StandDetails>(STAND_DATA.south);
  const [selectedSector, setSelectedSector] = useState<string>('S3');
  const [heatmapActive, setHeatmapActive] = useState<boolean>(true);
  const [evacuationActive, setEvacuationActive] = useState<boolean>(false);
  const [incidentsActive, setIncidentsActive] = useState<boolean>(true);
  
  // Ticking time for CCTV Feed
  const [cctvTime, setCctvTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCctvTime(d.toLocaleTimeString([], { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync selected sector when stand changes
  const handleStandSelect = (stand: StandDetails) => {
    setSelectedStand(stand);
    setSelectedSector(stand.sectorsList[2]); // Default to center sector (e.g. S3, N3)
  };

  // Sector Color helper for Heatmap Density
  const getSectorColor = (sectorCode: string, isSelected: boolean) => {
    if (!heatmapActive) {
      return isSelected 
        ? 'fill-primary stroke-primary/30' 
        : 'fill-surface-container-high/40 stroke-outline-variant/30 hover:fill-primary/20';
    }

    // Heatmap mode
    const prefix = sectorCode.charAt(0); // S, N, E, W
    if (prefix === 'S') {
      if (sectorCode === 'S2' || sectorCode === 'S3') {
        return isSelected 
          ? 'fill-error stroke-error/30 animate-pulse' 
          : 'fill-error/70 stroke-error/20 hover:fill-error/90';
      }
      return isSelected 
        ? 'fill-amber-500 stroke-amber-500/30' 
        : 'fill-amber-500/60 stroke-amber-500/20 hover:fill-amber-500/80';
    }
    if (prefix === 'N') {
      return isSelected 
        ? 'fill-emerald-500 stroke-emerald-500/30' 
        : 'fill-emerald-500/60 stroke-emerald-500/20 hover:fill-emerald-500/80';
    }
    // East & West (Moderate Load)
    if (sectorCode === 'E3' || sectorCode === 'W3') {
      return isSelected 
        ? 'fill-amber-400 stroke-amber-400/30' 
        : 'fill-amber-400/60 stroke-amber-400/20 hover:fill-amber-400/80';
    }
    return isSelected 
      ? 'fill-emerald-500 stroke-emerald-500/30' 
      : 'fill-emerald-500/50 stroke-emerald-500/20 hover:fill-emerald-500/70';
  };

  // Get active incidents in MetLife Stadium (Match 42)
  const activeIncidents = state.incidents.filter(i => i.status !== 'resolved');

  return (
    <div className="space-y-6">
      
      {/* Self-contained CRT scanner stylesheets */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes crt-flicker {
          0% { opacity: 0.96; }
          50% { opacity: 1; }
          100% { opacity: 0.97; }
        }
        .scanline-effect {
          animation: scanline 8s linear infinite;
        }
        .crt-screen {
          animation: crt-flicker 0.2s infinite;
        }
      `}</style>

      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; Stadium Digital Twin
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1">
            {emergencyMode 
              ? "AI detected emergency state. Digital Twin displays evacuation lanes." 
              : `AI monitoring stands. Selected: ${selectedStand.name} (Sector ${selectedSector}).`
            }
          </h1>
          <p className="text-secondary text-xs font-sans mt-0.5">
            Real-time interactive stadium map linked directly to gate telemetries and CCTV grids.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Venue Health (Span 3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/50 shadow-ultra-soft relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10" />
            <h2 className="font-display font-black text-xl text-on-surface mb-5">Venue Health</h2>
            
            {/* Holographic gauge */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-pulse-slow opacity-20" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="17.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" className="text-secondary" />
                </svg>
                <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_6px_rgba(194,101,42,0.15)]" viewBox="0 0 36 36">
                  <path className="text-surface-container-high/60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.8"></path>
                  <motion.path 
                    className="text-primary" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeDasharray="98, 100" 
                    strokeLinecap="round" 
                    strokeWidth={2.8}
                    initial={{ strokeDasharray: "0 100" }}
                    animate={{ strokeDasharray: "98 100" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-on-surface leading-none">98%</span>
                  <span className="text-[8px] uppercase tracking-wider text-secondary mt-1 font-mono font-bold">Efficiency</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2.5">
                <span className="text-secondary">Attendance</span>
                <span className="font-extrabold text-on-surface font-mono">74,820</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2.5">
                <span className="text-secondary">Gate Status</span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black border border-emerald-200/50 uppercase">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" /> ALL OPEN
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2.5">
                <span className="text-secondary">Avg Queue</span>
                <span className="font-extrabold text-on-surface">4 Mins</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2.5">
                <span className="text-secondary">Parking</span>
                <span className="font-extrabold text-on-surface font-mono">91%</span>
              </div>
              <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2.5">
                <span className="text-secondary">Medical Units</span>
                <span className={`font-black uppercase text-[10px] ${activeIncidents.filter(i => i.type === 'medical').length > 0 ? 'text-error animate-pulse' : 'text-on-surface'}`}>
                  {activeIncidents.filter(i => i.type === 'medical').length > 0 ? `${activeIncidents.filter(i => i.type === 'medical').length} ACTIVE` : '4 Active'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">Security Unit</span>
                <span className="font-extrabold text-on-surface">146 Active</span>
              </div>
            </div>
          </div>

          {/* Weather Mini Card */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/50 shadow-ultra-soft hover:border-primary/20 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2.5 font-mono">Live Weather</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cloud className="text-primary" size={24} />
                <div>
                  <p className="text-lg font-black text-on-surface leading-tight">24°C</p>
                  <p className="text-[10px] text-secondary">Clear Sky</p>
                </div>
              </div>
              <div className="text-[10px] text-secondary font-mono text-right leading-normal">
                <p>Humidity 45%</p>
                <p>Wind 12km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: High-Fidelity Stadium SVG Map Console (Span 6) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <div className="relative bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/50 shadow-ultra-soft h-[500px] flex flex-col justify-between items-center">
            
            <div className="w-full flex justify-between items-center border-b border-outline-variant/30 pb-2 mb-2">
              <span className="text-[9px] font-mono text-secondary uppercase tracking-widest font-black">
                Tactical Spatial Twin Layout
              </span>
              <span className="text-[9px] font-mono text-secondary uppercase bg-surface-container px-2 py-0.5 rounded border border-outline-variant/40">
                ZOOM: 100%
              </span>
            </div>

            {/* Stadium Pitch & Stands SVG */}
            <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full max-h-[380px] select-none">
                
                {/* Evacuation Routes Background Vectors (Glowing Arrows) */}
                <AnimatePresence>
                  {evacuationActive && (
                    <g className="opacity-80">
                      {/* Evacuation Arrows from Stands outward to Corner Gates */}
                      {/* Gate A (Top Left) Routes */}
                      <path d="M 28 28 L 18 18" stroke="#ff4d4d" strokeWidth="1" strokeDasharray="3 3" className="animate-pulse" />
                      <path d="M 40 22 L 18 18" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />
                      <path d="M 22 40 L 18 18" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />

                      {/* Gate B (Top Right) Routes */}
                      <path d="M 72 28 L 82 18" stroke="#ff4d4d" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 60 22 L 82 18" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />
                      <path d="M 78 40 L 82 18" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />

                      {/* Gate C (Bottom Left) Routes */}
                      <path d="M 28 72 L 18 82" stroke="#ff4d4d" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 22 60 L 18 82" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />
                      <path d="M 40 78 L 18 82" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />

                      {/* Gate D (Bottom Right) Routes */}
                      <path d="M 72 72 L 82 82" stroke="#ff4d4d" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M 78 60 L 82 82" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />
                      <path d="M 60 78 L 82 82" stroke="#ff4d4d" strokeWidth="0.8" strokeDasharray="3 3" />
                    </g>
                  )}
                </AnimatePresence>

                {/* Outer boundary grid lines */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-outline-variant/60" strokeDasharray="0.8 1" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant/40" />

                {/* --- NORTH STAND sectors (Angles 225 - 315) --- */}
                <g className="transition-all duration-300">
                  {/* N1 */}
                  <path 
                    d={getSectorPath(50, 50, 225, 243, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('N1', selectedSector === 'N1')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.north); setSelectedSector('N1'); }}
                  />
                  {/* N2 */}
                  <path 
                    d={getSectorPath(50, 50, 243, 261, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('N2', selectedSector === 'N2')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.north); setSelectedSector('N2'); }}
                  />
                  {/* N3 */}
                  <path 
                    d={getSectorPath(50, 50, 261, 279, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('N3', selectedSector === 'N3')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.north); setSelectedSector('N3'); }}
                  />
                  {/* N4 */}
                  <path 
                    d={getSectorPath(50, 50, 279, 297, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('N4', selectedSector === 'N4')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.north); setSelectedSector('N4'); }}
                  />
                  {/* N5 */}
                  <path 
                    d={getSectorPath(50, 50, 297, 315, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('N5', selectedSector === 'N5')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.north); setSelectedSector('N5'); }}
                  />
                  <text x="50" y="7.5" textAnchor="middle" className="text-[2.2px] font-mono font-black fill-secondary pointer-events-none tracking-wide">NORTH STAND</text>
                </g>

                {/* --- EAST STAND sectors (Angles 315 - 405) --- */}
                <g className="transition-all duration-300">
                  {/* E1 */}
                  <path 
                    d={getSectorPath(50, 50, 315, 333, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('E1', selectedSector === 'E1')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.east); setSelectedSector('E1'); }}
                  />
                  {/* E2 */}
                  <path 
                    d={getSectorPath(50, 50, 333, 351, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('E2', selectedSector === 'E2')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.east); setSelectedSector('E2'); }}
                  />
                  {/* E3 */}
                  <path 
                    d={getSectorPath(50, 50, 351, 369, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('E3', selectedSector === 'E3')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.east); setSelectedSector('E3'); }}
                  />
                  {/* E4 */}
                  <path 
                    d={getSectorPath(50, 50, 369, 387, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('E4', selectedSector === 'E4')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.east); setSelectedSector('E4'); }}
                  />
                  {/* E5 */}
                  <path 
                    d={getSectorPath(50, 50, 387, 405, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('E5', selectedSector === 'E5')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.east); setSelectedSector('E5'); }}
                  />
                  <text x="93.5" y="51" textAnchor="middle" transform="rotate(90 93.5 51)" className="text-[2.2px] font-mono font-black fill-secondary pointer-events-none tracking-wide">EAST STAND</text>
                </g>

                {/* --- SOUTH STAND sectors (Angles 45 - 135) --- */}
                <g className="transition-all duration-300">
                  {/* S1 */}
                  <path 
                    d={getSectorPath(50, 50, 45, 63, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('S1', selectedSector === 'S1')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.south); setSelectedSector('S1'); }}
                  />
                  {/* S2 */}
                  <path 
                    d={getSectorPath(50, 50, 63, 81, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('S2', selectedSector === 'S2')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.south); setSelectedSector('S2'); }}
                  />
                  {/* S3 */}
                  <path 
                    d={getSectorPath(50, 50, 81, 99, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('S3', selectedSector === 'S3')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.south); setSelectedSector('S3'); }}
                  />
                  {/* S4 */}
                  <path 
                    d={getSectorPath(50, 50, 99, 117, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('S4', selectedSector === 'S4')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.south); setSelectedSector('S4'); }}
                  />
                  {/* S5 */}
                  <path 
                    d={getSectorPath(50, 50, 117, 135, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('S5', selectedSector === 'S5')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.south); setSelectedSector('S5'); }}
                  />
                  <text x="50" y="94.5" textAnchor="middle" className="text-[2.2px] font-mono font-black fill-secondary pointer-events-none tracking-wide">SOUTH STAND</text>
                </g>

                {/* --- WEST STAND sectors (Angles 135 - 225) --- */}
                <g className="transition-all duration-300">
                  {/* W1 */}
                  <path 
                    d={getSectorPath(50, 50, 135, 153, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('W1', selectedSector === 'W1')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.west); setSelectedSector('W1'); }}
                  />
                  {/* W2 */}
                  <path 
                    d={getSectorPath(50, 50, 153, 171, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('W2', selectedSector === 'W2')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.west); setSelectedSector('W2'); }}
                  />
                  {/* W3 */}
                  <path 
                    d={getSectorPath(50, 50, 171, 189, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('W3', selectedSector === 'W3')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.west); setSelectedSector('W3'); }}
                  />
                  {/* W4 */}
                  <path 
                    d={getSectorPath(50, 50, 189, 207, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('W4', selectedSector === 'W4')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.west); setSelectedSector('W4'); }}
                  />
                  {/* W5 */}
                  <path 
                    d={getSectorPath(50, 50, 207, 225, 29, 39)} 
                    className={`cursor-pointer transition-colors duration-250 ${getSectorColor('W5', selectedSector === 'W5')}`}
                    onClick={() => { handleStandSelect(STAND_DATA.west); setSelectedSector('W5'); }}
                  />
                  <text x="6.5" y="51" textAnchor="middle" transform="rotate(-90 6.5 51)" className="text-[2.2px] font-mono font-black fill-secondary pointer-events-none tracking-wide">WEST STAND</text>
                </g>

                {/* --- Center Pitch (High Definition Style Turf) --- */}
                <g>
                  {/* Base grass fill */}
                  <rect x="34" y="29" width="32" height="42" rx="2" fill="#ecfdf5" stroke="currentColor" strokeWidth="0.4" className="text-outline-variant" />
                  
                  {/* Mowed lines pattern (Subtle lines) */}
                  {[...Array(9)].map((_, idx) => (
                    <rect key={idx} x="34" y={29 + idx * 4.6} width="32" height="2.3" fill="#10B981" fillOpacity="0.04" className="pointer-events-none" />
                  ))}

                  {/* Pitch outlines */}
                  <line x1="34" y1="50" x2="66" y2="50" stroke="currentColor" strokeWidth="0.25" className="text-outline-variant" />
                  <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-outline-variant" />
                  <circle cx="50" cy="50" r="0.6" fill="currentColor" className="text-outline-variant" />
                  
                  {/* Penalty boxes */}
                  <rect x="42" y="29" width="16" height="6.5" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant" />
                  <rect x="42" y="64.5" width="16" height="6.5" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-outline-variant" />
                  
                  {/* Corner flags arc */}
                  <path d="M 34 30.5 A 1.5 1.5 0 0 1 35.5 29" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-outline-variant" />
                  <path d="M 64.5 29 A 1.5 1.5 0 0 1 66 30.5" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-outline-variant" />
                  <path d="M 34 69.5 A 1.5 1.5 0 0 0 35.5 71" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-outline-variant" />
                  <path d="M 64.5 71 A 1.5 1.5 0 0 0 66 69.5" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-outline-variant" />
                </g>

                {/* --- Outer Evacuation Gates (Clickable / Glowing Markers) --- */}
                <g className="cursor-pointer">
                  {/* Gate A */}
                  <circle cx="18" cy="18" r="1.5" className={`${evacuationActive ? 'fill-error animate-pulse' : 'fill-outline'}`} />
                  <text x="18" y="15" textAnchor="middle" className="text-[1.8px] font-mono font-bold fill-secondary pointer-events-none">GATE A</text>

                  {/* Gate B */}
                  <circle cx="82" cy="18" r="1.5" className={`${evacuationActive ? 'fill-error animate-pulse' : 'fill-outline'}`} />
                  <text x="82" y="15" textAnchor="middle" className="text-[1.8px] font-mono font-bold fill-secondary pointer-events-none">GATE B</text>

                  {/* Gate C */}
                  <circle cx="18" cy="82" r="1.5" className={`${evacuationActive ? 'fill-error animate-pulse' : 'fill-outline'}`} />
                  <text x="18" y="86" textAnchor="middle" className="text-[1.8px] font-mono font-bold fill-secondary pointer-events-none">GATE C</text>

                  {/* Gate D */}
                  <circle cx="82" cy="82" r="1.5" className={`${evacuationActive ? 'fill-error animate-pulse' : 'fill-outline'}`} />
                  <text x="82" y="86" textAnchor="middle" className="text-[1.8px] font-mono font-bold fill-secondary pointer-events-none">GATE D</text>
                </g>

                {/* --- Pulse Warnings for Active Incidents (Incident Markers) --- */}
                <AnimatePresence>
                  {incidentsActive && activeIncidents.length > 0 && (
                    <g>
                      {activeIncidents.map((incident) => {
                        // Plot coordinates based on target location (e.g. C2/B2)
                        let coords = { cx: 50, cy: 82 }; // Default South stand area
                        if (incident.location.includes('B2') || incident.location.includes('B3')) {
                          coords = { cx: 18, cy: 50 }; // West Stand area
                        } else if (incident.location.includes('C2') || incident.location.includes('C3')) {
                          coords = { cx: 50, cy: 82 }; // South stand area
                        }
                        
                        return (
                          <g key={incident.id} className="animate-pulse">
                            <circle cx={coords.cx} cy={coords.cy} r="3" fill="#ff4d4d" fillOpacity="0.3" />
                            <circle cx={coords.cx} cy={coords.cy} r="1.2" fill="#ff4d4d" />
                            <polygon points={`${coords.cx},${coords.cy - 1.8} ${coords.cx - 1.5},${coords.cy + 1.2} ${coords.cx + 1.5},${coords.cy + 1.2}`} fill="#ffffff" transform={`scale(0.5) translate(${coords.cx}, ${coords.cy})`} />
                          </g>
                        );
                      })}
                    </g>
                  )}
                </AnimatePresence>

              </svg>
            </div>

            {/* Tactical Layer Control Dock */}
            <div className="w-full flex flex-wrap gap-2.5 justify-center border-t border-outline-variant/30 pt-3 mt-1">
              <button 
                onClick={() => setHeatmapActive(!heatmapActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer active:scale-95 ${
                  heatmapActive 
                    ? 'bg-primary-fixed/40 text-primary border-primary/30 font-extrabold shadow-sm' 
                    : 'bg-surface-container border-outline-variant/50 text-secondary'
                }`}
              >
                <Cpu size={12} />
                <span>Heatmap Layer</span>
              </button>
              
              <button 
                onClick={() => setEvacuationActive(!evacuationActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer active:scale-95 ${
                  evacuationActive 
                    ? 'bg-error-container text-error border-error/30 font-extrabold shadow-sm' 
                    : 'bg-surface-container border-outline-variant/50 text-secondary'
                }`}
              >
                <Navigation size={12} className={evacuationActive ? 'animate-bounce' : ''} />
                <span>Evac Routes</span>
              </button>

              <button 
                onClick={() => setIncidentsActive(!incidentsActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer active:scale-95 ${
                  incidentsActive 
                    ? 'bg-error/15 text-error border-error/20 font-extrabold shadow-sm' 
                    : 'bg-surface-container border-outline-variant/50 text-secondary'
                }`}
              >
                <AlertTriangle size={12} />
                <span>Incidents</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Sidebar: Selected Section details (Span 3) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className={`glass-panel rounded-3xl p-5 border-l-4 space-y-4 shadow-ultra-soft transition-all duration-300 ${
            selectedStand.id === 'south' 
              ? 'border-error shadow-[0_0_12px_rgba(192,57,43,0.06)]' 
              : selectedStand.id === 'north'
                ? 'border-emerald-500'
                : 'border-amber-400'
          }`}>
            <div>
              <div className="text-[9px] font-mono text-secondary uppercase font-black tracking-widest flex items-center justify-between">
                <span>Stand Analysis</span>
                <span className={`h-1.5 w-1.5 rounded-full ${selectedStand.gateCongestion > 70 ? 'bg-error animate-ping' : 'bg-emerald-500'}`} />
              </div>
              <h3 className="font-display font-black text-xl text-on-surface mt-0.5">
                {selectedStand.name}
              </h3>
              <div className="text-[10px] text-primary font-mono font-bold mt-0.5">
                Analyzing Sector {selectedSector}
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans">
              
              <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/40 space-y-1 relative overflow-hidden group">
                <span className="text-secondary text-[10px] uppercase font-mono font-bold block">AI Crowd Prediction</span>
                <span className="font-extrabold text-on-surface relative z-10 leading-normal">{selectedStand.aiForecast}</span>
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 rounded-2xl">
                  <span className="text-secondary text-[9px] font-mono block">Occupancy</span>
                  <span className="text-sm font-black text-on-surface mt-0.5 font-mono">{selectedStand.occupancy}%</span>
                </div>
                <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 rounded-2xl">
                  <span className="text-secondary text-[9px] font-mono block">Gate Queue</span>
                  <span className={`text-sm font-black mt-0.5 font-mono ${selectedStand.gateCongestion > 70 ? 'text-error font-extrabold' : 'text-on-surface'}`}>
                    {selectedStand.queue}
                  </span>
                </div>
              </div>

              {/* Futuristic CCTV Camera feed simulated panel */}
              <div className="bg-surface-container-low p-3 rounded-2xl space-y-2">
                <div className="text-secondary text-[9px] font-mono font-black uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Radio size={11} className="text-primary animate-pulse" />
                    <span>CCTV TELEMETRY FEED</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-500 font-extrabold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE
                  </span>
                </div>
                
                {/* Viewport Frame */}
                <div className="bg-black/95 text-white/80 font-mono text-[9px] p-3 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-between select-none border border-white/10 group">
                  {/* CRT Screen Scanline Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-10 w-full scanline-effect pointer-events-none" />
                  <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none crt-screen" />
                  
                  {/* Corner viewfinder brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />

                  {/* Top Feed stats */}
                  <div className="flex justify-between items-center text-[8px] text-white/50 relative z-10">
                    <span className="flex items-center gap-1 font-bold text-red-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse" /> REC
                    </span>
                    <span className="font-mono">{cctvTime}</span>
                  </div>

                  {/* Middle Bounding Box Visuals (Cyberpunk AI tracking visualization) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border border-emerald-500/40 bg-emerald-500/5 px-2 py-1 rounded absolute top-8 left-6 text-[6px] text-emerald-400 scale-90">
                      FAN_022 [FLOW_OK]
                    </div>
                    <div className="border border-amber-500/40 bg-amber-500/5 px-2 py-1 rounded absolute bottom-8 right-6 text-[6px] text-amber-400 scale-90 animate-pulse">
                      DENSITY_SURGE [85%]
                    </div>
                    <div className="text-[8px] text-white/20 font-black tracking-widest uppercase">
                      FLOW AI CORE
                    </div>
                  </div>

                  {/* Bottom Feed metadata */}
                  <div className="flex justify-between items-center text-[7.5px] text-white/40 relative z-10 font-bold border-t border-white/5 pt-1.5">
                    <span>{selectedStand.cctv.toUpperCase()}</span>
                    <span>30 FPS // ISO 400</span>
                  </div>
                </div>
              </div>

              {/* Staffing metrics */}
              <div className="bg-surface-container/50 border border-outline-variant/30 p-3 rounded-2xl text-[10px] space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-secondary font-sans">Connected Staff</span>
                  <span className="font-extrabold text-on-surface">{selectedStand.staff} Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary font-sans">Medical Team</span>
                  <span className="font-extrabold text-on-surface">{selectedStand.medical}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
