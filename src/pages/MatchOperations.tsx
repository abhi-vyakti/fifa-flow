import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Terminal, Shield, Activity, Compass, Users, CheckCircle, AlertTriangle, 
  Info, ArrowRight, Play, Clock, MapPin, Wifi, Tv, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Custom High-Definition SVG Team Flags ---
const USABadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-usa">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-usa)">
      {[...Array(13)].map((_, i) => (
        <rect key={i} x="0" y={i * 7.7} width="100" height="4.2" fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect x="0" y="0" width="45" height="40" fill="#3C3B6E" />
      <polygon points="22.5,8 25,16 33,16 26.5,21 29,29 22.5,24 16,29 18.5,21 12,16 20,16" fill="#FFFFFF" />
    </g>
  </svg>
);

const ENGBadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-eng">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-eng)">
      <rect width="100" height="100" fill="#FFFFFF" />
      <rect x="41" y="0" width="18" height="100" fill="#CE1126" />
      <rect x="0" y="41" width="100" height="18" fill="#CE1126" />
    </g>
  </svg>
);

const ARGBadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-arg">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-arg)">
      <rect x="0" y="0" width="100" height="30" fill="#74ACDF" />
      <rect x="0" y="30" width="100" height="40" fill="#FFFFFF" />
      <rect x="0" y="70" width="100" height="30" fill="#74ACDF" />
      <circle cx="50" cy="50" r="8" fill="#F8B125" stroke="#8A5B0B" strokeWidth="1" />
      <circle cx="50" cy="50" r="3" fill="#F8B125" />
    </g>
  </svg>
);

const MEXBadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-mex">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-mex)">
      <rect x="0" y="0" width="33.3" height="100" fill="#006847" />
      <rect x="33.3" y="0" width="33.4" height="100" fill="#FFFFFF" />
      <rect x="66.7" y="0" width="33.3" height="100" fill="#C8102E" />
      <circle cx="50" cy="50" r="7" fill="#8B5A2B" />
    </g>
  </svg>
);

const BRABadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-bra">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-bra)">
      <rect width="100" height="100" fill="#009739" />
      <polygon points="50,10 90,50 50,90 10,50" fill="#FFDF00" />
      <circle cx="50" cy="50" r="18" fill="#002776" />
      <path d="M35 50 C 40 45, 60 45, 65 50" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
    </g>
  </svg>
);

const FRABadge: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} rounded-full shadow-md border border-outline-variant/40 bg-white shrink-0`}>
    <mask id="circle-mask-fra">
      <circle cx="50" cy="50" r="50" fill="white" />
    </mask>
    <g mask="url(#circle-mask-fra)">
      <rect x="0" y="0" width="33.3" height="100" fill="#00209F" />
      <rect x="33.3" y="0" width="33.4" height="100" fill="#FFFFFF" />
      <rect x="66.7" y="0" width="33.3" height="100" fill="#E4002B" />
    </g>
  </svg>
);

// --- High-Tech Double-Concentric Telemetry Dial ---
interface TelemetryDialProps {
  percent: number;
  label: string;
  icon: React.ComponentType<any>;
  emergencyMode: boolean;
}

const TelemetryDial: React.FC<TelemetryDialProps> = ({ percent, label, icon: Icon, emergencyMode }) => {
  const radius = 15.9155;
  const strokeWidth = 2.6;
  const isCritical = percent < 80;

  let strokeColor = "text-primary";
  if (emergencyMode || isCritical) {
    strokeColor = "text-error";
  } else if (percent >= 95) {
    strokeColor = "text-emerald-500";
  }

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/50 flex flex-col items-center justify-center text-center shadow-ultra-soft relative overflow-hidden group hover:border-primary/40 hover:shadow-soft transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative w-18 h-18 mb-3 flex items-center justify-center">
        {/* Rotating Outer Dashed Grid Track */}
        <svg className="absolute inset-0 w-full h-full animate-pulse-slow opacity-25" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="17.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-secondary" />
        </svg>

        {/* Concentric Progress Gauge */}
        <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_4px_rgba(194,101,42,0.15)] group-hover:drop-shadow-[0_0_8px_rgba(194,101,42,0.3)] transition-all duration-300" viewBox="0 0 36 36">
          {/* Background track */}
          <path 
            className="text-surface-container-high/60" 
            d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={strokeWidth}
          />
          {/* Animating Core Arc */}
          <motion.path 
            className={strokeColor}
            d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeWidth={strokeWidth}
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${percent} 100` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>

        {/* Center overlay of Icon & Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 text-secondary/60 group-hover:text-primary transition-colors duration-300 mb-0.5" />
          <span className="font-display font-black text-[13px] text-on-surface leading-none">{percent}%</span>
        </div>
      </div>

      <h4 className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold group-hover:text-on-surface transition-colors duration-300">{label}</h4>
    </div>
  );
};

export const MatchOperations: React.FC = () => {
  const navigate = useNavigate();
  const { state, isPlayingDemo, activeDemoStep, stopJudgeDemo } = useLiveData();
  const { emergencyMode } = useThemeSettings();

  // --- Interactive local selection ---
  const [selectedMatchId, setSelectedMatchId] = useState<number>(42);

  // --- Dynamic calculations based on global incidents state ---
  const activeSecurityIncidents = state.incidents.filter(i => i.type === 'security' && i.status !== 'resolved');
  const activeMedicalIncidents = state.incidents.filter(i => i.type === 'medical' && i.status !== 'resolved');
  const activeOtherIncidents = state.incidents.filter(i => i.type !== 'security' && i.type !== 'medical' && i.status !== 'resolved');
  const totalActiveIncidents = state.incidents.filter(i => i.status !== 'resolved').length;

  // --- Context dataset for Matches ---
  const matches = [
    {
      id: 42,
      home: "USA",
      away: "ENG",
      venue: "MetLife Stadium",
      time: "14:00 Local",
      stage: "Second Half",
      stageColor: "bg-primary/15 text-primary border-primary/20",
      homeBadge: USABadge,
      awayBadge: ENGBadge,
      attendance: "97% (79,400)",
      telemetries: {
        venueReadiness: Math.max(70, 92 - totalActiveIncidents * 4),
        networkLink: 99,
        broadcastFeed: 88,
        securityNode: Math.max(60, 94 - activeSecurityIncidents.length * 10),
        ingressLoad: "MetLife (89%)",
        activeGates: "Gates A, B, C, D",
        weather: "Sunny • 24°C"
      },
      registry: {
        broadcast: 'Stable' as const,
        security: activeSecurityIncidents.length > 0 ? `${activeSecurityIncidents.length} Alert` : 'Stable',
        medical: activeMedicalIncidents.length > 0 ? `${activeMedicalIncidents.length} Alert` : 'Stable'
      },
      logs: [
        { type: 'warning' as const, title: 'Gate C ticketing delay predicted', message: 'Ticket validation system indicates queue growth rate is 15% above norm. AI predicts 18-minute wait time in 15 minutes.', time: '14:15' },
        { type: 'info' as const, title: 'Broadcast Uplink Stable', message: 'Redundant satellite feed synchronized with zero frame loss. UHD HDR stream online globally.', time: '14:10' }
      ]
    },
    {
      id: 43,
      home: "ARG",
      away: "MEX",
      venue: "Azteca Stadium",
      time: "17:00 Local",
      stage: "Warm-up",
      stageColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/60",
      homeBadge: ARGBadge,
      awayBadge: MEXBadge,
      attendance: "99% (87,000)",
      telemetries: {
        venueReadiness: 96,
        networkLink: 95,
        broadcastFeed: 97,
        securityNode: 98,
        ingressLoad: "Azteca (74%)",
        activeGates: "Gates 1 - 8",
        weather: "Cloudy • 22°C"
      },
      registry: {
        broadcast: 'Checking' as const,
        security: 'Stable' as const,
        medical: 'Stable' as const
      },
      logs: [
        { type: 'info' as const, title: 'Azteca Stadium power grid balanced', message: 'Solar backup systems fully charged and integrated. Operations utilizing green energy profile.', time: '16:45' },
        { type: 'info' as const, title: 'Dynamic ticket routing engaged', message: 'Interactive routing signboards synchronized across northern concourses for incoming crowd.', time: '16:30' }
      ]
    },
    {
      id: 44,
      home: "BRA",
      away: "FRA",
      venue: "SoFi Stadium",
      time: "20:00 Local",
      stage: "Preparing",
      stageColor: "bg-surface-container text-secondary border-outline-variant/60",
      homeBadge: BRABadge,
      awayBadge: FRABadge,
      attendance: "98% (70,000)",
      telemetries: {
        venueReadiness: 82,
        networkLink: 90,
        broadcastFeed: 60,
        securityNode: 85,
        ingressLoad: "SoFi (12%)",
        activeGates: "Main Ingress Only",
        weather: "Clear • 20°C"
      },
      registry: {
        broadcast: 'Offline' as const,
        security: 'Offline' as const,
        medical: 'Offline' as const
      },
      logs: [
        { type: 'info' as const, title: 'Pre-match fiber test pending', message: 'Main connectivity lines under diagnostic calibration. Backup satellite synchronization scheduled for T-2hr.', time: '18:15' },
        { type: 'info' as const, title: 'Perimeter security checks in progress', message: 'Automated turnstile node configurations pushed to outer zones. Local security patrols online.', time: '18:00' }
      ]
    }
  ];

  // Retrieve active selected match
  const selectedMatch = matches.find(m => m.id === selectedMatchId) || matches[0];

  // Check details status color utilities
  const getStatusStyle = (status: string) => {
    if (status.includes('Alert') || status === 'Offline') {
      return 'bg-error-container text-error border border-error/25 dark:bg-error-950/20 dark:text-error-400 dark:border-error-900/40';
    }
    if (status === 'Checking') {
      return 'bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40';
    }
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40';
  };

  const getStatusDot = (status: string) => {
    if (status.includes('Alert')) return 'bg-error animate-pulse';
    if (status === 'Offline') return 'bg-secondary';
    if (status === 'Checking') return 'bg-amber-500 animate-pulse';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Demo Simulation HUD Overlay */}
      <AnimatePresence>
        {isPlayingDemo && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary/10 border border-primary/20 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-ultra-soft"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <div className="text-xs">
                <span className="font-mono font-black text-primary mr-2 uppercase tracking-wider">AI Scenario Playback Active</span>
                <span className="text-on-surface font-semibold">
                  Step {activeDemoStep !== null ? activeDemoStep + 1 : 0} of 9 in progress...
                </span>
              </div>
            </div>
            <button 
              onClick={() => stopJudgeDemo()} 
              className="bg-primary hover:bg-primary-container text-on-primary-container px-4 py-1.5 rounded-xl text-[10px] font-extrabold font-mono transition-all cursor-pointer active:scale-95 shadow-md uppercase tracking-wider border border-primary/30"
            >
              Stop Playback
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; Match Operations
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1 transition-all duration-300">
            {emergencyMode 
              ? "AI detected grid outages. Activating localized fallback protocols." 
              : selectedMatch.id === 42 && totalActiveIncidents > 0 
                ? `AI detects ${totalActiveIncidents} operational incident${totalActiveIncidents > 1 ? 's' : ''} at MetLife Stadium.` 
                : selectedMatch.id === 42 
                  ? "AI predicts normal spectator entry flow for the next 3 hours."
                  : selectedMatch.id === 43 
                    ? "AI projects peak arrival rush starting in 45 minutes."
                    : "AI monitors scheduling validation checks for upcoming match."
            }
          </h1>
          <p className="text-secondary text-xs font-sans mt-0.5">
            Monitor and coordinate tournament fixtures, telemetry logs, and venue operations.
          </p>
        </div>
      </div>

      {/* 1. Horizontal Interactive Match Cards */}
      <div className="overflow-x-auto pb-2 scrollbar-hide flex gap-4 snap-x">
        {matches.map((match) => {
          const HomeBadge = match.homeBadge;
          const AwayBadge = match.awayBadge;
          const isSelected = selectedMatchId === match.id;
          const isLive = match.stage === 'Second Half';

          return (
            <motion.div
              key={match.id}
              onClick={() => setSelectedMatchId(match.id)}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`min-w-[300px] rounded-3xl border relative snap-start cursor-pointer overflow-hidden flex-1 ${
                isSelected
                  ? 'border-primary shadow-[0_0_30px_rgba(194,101,42,0.12)]'
                  : 'border-outline-variant/60 hover:border-primary/40'
              }`}
            >
              {/* Top color band */}
              <div className={`h-1 w-full ${
                isLive ? 'bg-gradient-to-r from-primary via-primary/60 to-primary/20' :
                match.stage === 'Warm-up' ? 'bg-gradient-to-r from-amber-500 via-amber-400/60 to-transparent' :
                'bg-gradient-to-r from-outline-variant/40 to-transparent'
              }`} />

              <div className={`p-5 ${
                isSelected ? 'bg-surface-container-lowest' : 'bg-surface-container-lowest/60'
              }`}>

                {/* Header row */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                    isSelected ? 'text-primary' : 'text-secondary'
                  }`}>
                    MATCH {match.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 border ${match.stageColor}`}>
                    {isLive && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />}
                    {match.stage}
                  </span>
                </div>

                {/* Teams + Score display */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <HomeBadge className="w-10 h-10" />
                    <span className="font-display font-black text-xs text-on-surface">{match.home}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    {isLive ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-2xl text-on-surface">1</span>
                          <span className="text-secondary/50 font-mono text-base">–</span>
                          <span className="font-display font-black text-2xl text-on-surface">0</span>
                        </div>
                        <span className="text-[9px] text-primary font-mono font-bold animate-pulse mt-0.5">78'</span>
                      </>
                    ) : (
                      <span className="text-[10px] text-secondary font-mono">{match.stage === 'Preparing' ? 'PRE-MATCH' : 'KO 17:00'}</span>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <AwayBadge className="w-10 h-10" />
                    <span className="font-display font-black text-xs text-on-surface">{match.away}</span>
                  </div>
                </div>

                {/* Venue + stats */}
                <div className="space-y-1.5 border-t border-outline-variant/30 pt-3 text-xs">
                  <div className="flex items-center gap-1 text-secondary font-mono text-[10px]">
                    <MapPin size={10} className="text-primary" />
                    <span>{match.venue} · {match.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Attendance AI</span>
                    <span className="font-bold text-on-surface">{match.attendance}</span>
                  </div>
                </div>

                {isSelected && match.id === 42 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('/live'); }}
                    className="mt-3 w-full py-2 rounded-xl bg-primary/10 border border-primary/25 text-primary text-[10px] font-black font-mono uppercase tracking-wider hover:bg-primary/15 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Tactical Panel <ArrowRight size={10} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid: Overview & Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Content - Operations Overview Table (Span 2) */}
        <div className="xl:col-span-2 space-y-6">

          {/* Mini Stadium Map for selected match */}
          <div className="relative rounded-3xl overflow-hidden border border-outline-variant/50 bg-[#0d1a14] h-44 flex items-center justify-center">
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a14] via-transparent to-[#0d1a14] pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a14] via-transparent to-[#0d1a14] pointer-events-none z-10" />

            {/* SVG Football Pitch */}
            <svg viewBox="0 0 400 180" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="pitchGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14532d" />
                  <stop offset="50%" stopColor="#166534" />
                  <stop offset="100%" stopColor="#14532d" />
                </linearGradient>
                <radialGradient id="pitchSpot" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {/* Turf */}
              <rect width="400" height="180" fill="url(#pitchGrad)" />
              {/* Alternating stripes */}
              {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                <rect key={i} x={i * 30} y="0" width="15" height="180" fill="#15803d" opacity="0.4" />
              ))}
              {/* Spotlight */}
              <ellipse cx="200" cy="90" rx="150" ry="80" fill="url(#pitchSpot)" />
              {/* Outer boundary */}
              <rect x="20" y="10" width="360" height="160" rx="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              {/* Center line */}
              <line x1="200" y1="10" x2="200" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              {/* Center circle */}
              <circle cx="200" cy="90" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <circle cx="200" cy="90" r="2.5" fill="rgba(255,255,255,0.7)" />
              {/* Left penalty area */}
              <rect x="20" y="50" width="60" height="80" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              <rect x="20" y="65" width="30" height="50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              {/* Right penalty area */}
              <rect x="320" y="50" width="60" height="80" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              <rect x="350" y="65" width="30" height="50" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              {/* Goals */}
              <rect x="10" y="72" width="12" height="36" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <rect x="378" y="72" width="12" height="36" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              {/* Penalty spots */}
              <circle cx="65" cy="90" r="2" fill="rgba(255,255,255,0.5)" />
              <circle cx="335" cy="90" r="2" fill="rgba(255,255,255,0.5)" />
            </svg>

            {/* Overlaid info */}
            <div className="relative z-20 text-center pointer-events-none">
              <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-1">{selectedMatch.venue}</div>
              <div className="flex items-center justify-center gap-4">
                {React.createElement(selectedMatch.homeBadge, { className: 'w-8 h-8' })}
                <div className="text-center">
                  {selectedMatch.stage === 'Second Half' ? (
                    <>
                      <div className="font-display font-black text-3xl text-white">1 – 0</div>
                      <div className="text-[10px] text-primary font-mono animate-pulse">LIVE · 78'</div>
                    </>
                  ) : (
                    <div className="font-mono text-white/70 text-sm">{selectedMatch.stage.toUpperCase()}</div>
                  )}
                </div>
                {React.createElement(selectedMatch.awayBadge, { className: 'w-8 h-8' })}
              </div>
            </div>

            {/* Corner telemetry chips */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-2.5 py-1.5 border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-white/70 font-mono">{selectedMatch.telemetries.ingressLoad}</span>
            </div>
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-2.5 py-1.5 border border-white/10">
              <span className="text-[9px] text-white/70 font-mono">{selectedMatch.telemetries.weather}</span>
            </div>
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-2.5 py-1.5 border border-white/10">
              <span className="text-[9px] text-white/70 font-mono">{selectedMatch.telemetries.activeGates}</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-5 shadow-ultra-soft">
            <div className="flex items-center justify-between mb-4 border-b border-outline-variant/60 pb-3">
              <h2 className="font-display font-black text-xl text-on-surface">Integrated Operations Registry</h2>
              <span className="text-[10px] text-secondary font-mono font-bold">11 CONNECTED MODULES</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/40 bg-surface-container-low text-[10px] font-mono text-secondary uppercase tracking-widest font-bold">
                    <th className="py-3 px-4">Match / Venue</th>
                    <th className="py-3 px-4">Broadcast Center</th>
                    <th className="py-3 px-4">Security Center</th>
                    <th className="py-3 px-4">Medical Center</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-xs font-sans">
                  {matches.map((match) => {
                    const HomeBadge = match.homeBadge;
                    const AwayBadge = match.awayBadge;
                    const isSelected = selectedMatchId === match.id;

                    // Table Row click highlights & bidirectionality
                    return (
                      <tr 
                        key={match.id}
                        onClick={() => setSelectedMatchId(match.id)}
                        className={`transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? 'bg-primary/5 hover:bg-primary/8 font-bold border-l-3 border-primary' 
                            : 'hover:bg-surface-container-low/30'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="flex -space-x-1.5">
                              <HomeBadge className="w-6 h-6 border border-surface-container-lowest" />
                              <AwayBadge className="w-6 h-6 border border-surface-container-lowest" />
                            </div>
                            <div>
                              <div className={`font-bold transition-colors ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                                {match.home} vs {match.away}
                              </div>
                              <div className="text-[9px] text-secondary mt-0.5 flex items-center gap-1 font-mono">
                                <MapPin size={9} className="text-primary" /> {match.venue}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Broadcast Center Status column */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(match.registry.broadcast)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(match.registry.broadcast)}`} />
                            {match.registry.broadcast}
                          </span>
                        </td>
                        
                        {/* Security Center Status column */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(match.registry.security)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(match.registry.security)}`} />
                            {match.registry.security}
                          </span>
                        </td>
                        
                        {/* Medical Center Status column */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(match.registry.medical)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(match.registry.medical)}`} />
                            {match.registry.medical}
                          </span>
                        </td>
                        
                        <td className="py-4 px-4 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (match.id === 42) {
                                navigate('/live');
                              } else {
                                setSelectedMatchId(match.id);
                              }
                            }}
                            className="text-primary hover:text-primary-container cursor-pointer p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                          >
                            <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Global Cyberpunk Telemetry Readiness Gauges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TelemetryDial 
              percent={selectedMatch.telemetries.venueReadiness} 
              label="Venue Readiness" 
              icon={MapPin} 
              emergencyMode={emergencyMode} 
            />
            <TelemetryDial 
              percent={selectedMatch.telemetries.networkLink} 
              label="Network Link" 
              icon={Wifi} 
              emergencyMode={emergencyMode} 
            />
            <TelemetryDial 
              percent={selectedMatch.telemetries.broadcastFeed} 
              label="Broadcast Feed" 
              icon={Tv} 
              emergencyMode={emergencyMode} 
            />
            <TelemetryDial 
              percent={selectedMatch.telemetries.securityNode} 
              label="Security Node" 
              icon={Shield} 
              emergencyMode={emergencyMode} 
            />
          </div>
        </div>

        {/* Right Details Panel - AI Telemetry Forecast */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* AI Security Dispatch Card */}
          <div className="glass-panel rounded-3xl p-5 space-y-4 shadow-ultra-soft">
            <div className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center justify-between font-mono border-b border-outline-variant/60 pb-3">
              <div className="flex items-center gap-1.5">
                <Terminal size={14} className="text-primary" />
                <span>AI Operations Log</span>
              </div>
              <span className="bg-primary/10 text-primary text-[8px] px-1.5 py-0.5 rounded font-black uppercase">
                {selectedMatch.home} Console
              </span>
            </div>
            
            <div className="space-y-4">
              
              {/* If MetLife (Match 42) is selected, show actual incident alerts in realtime */}
              {selectedMatch.id === 42 && state.incidents.length > 0 && (
                <div className="space-y-2.5">
                  {state.incidents.map((incident) => {
                    if (incident.status === 'resolved') return null;
                    return (
                      <div 
                        key={incident.id}
                        onClick={() => navigate('/live')}
                        className="bg-error-container border border-error/25 hover:border-error/50 p-3.5 rounded-2xl flex items-start gap-2.5 shadow-sm hover:shadow transition-all cursor-pointer group"
                      >
                        <AlertTriangle size={16} className="text-error shrink-0 mt-0.5 animate-pulse" />
                        <div className="text-xs font-sans">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-black text-error uppercase font-mono text-[9px] tracking-wider">
                              Incident {incident.type.toUpperCase()} Active
                            </span>
                            <span className="text-[8px] text-secondary font-mono">
                              {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="font-extrabold text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                            {incident.title}
                          </div>
                          <p className="text-secondary leading-normal mt-0.5 text-[11px]">
                            {incident.details} Located in {incident.location}. Security responders coordinates deployed.
                          </p>
                          <div className="flex items-center gap-1 mt-1.5 text-[9px] text-primary font-bold font-mono tracking-wider">
                            <span>LAUNCH SITUATION PANEL</span>
                            <ArrowRight size={8} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Standard context logs */}
              {selectedMatch.logs.map((log, idx) => (
                <div key={idx} className="flex gap-3 relative group">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-all group-hover:bg-primary/20">
                    <Info size={13} />
                  </div>
                  <div className="text-xs font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-on-surface group-hover:text-primary transition-colors duration-200">
                        {log.title}
                      </span>
                      <span className="text-[8px] text-secondary font-mono ml-auto bg-surface-container px-1 py-0.5 rounded">
                        {log.time}
                      </span>
                    </div>
                    <p className="text-secondary leading-normal mt-0.5 text-[11px]">
                      {log.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connected Stadium Nodes Panel */}
          <div className="glass-panel rounded-3xl p-5 space-y-4 shadow-ultra-soft border border-outline-variant/70">
            <div className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center justify-between font-mono">
              <div className="flex items-center gap-1.5">
                <Compass size={14} className="text-primary" />
                <span>Tournament Telemetries</span>
              </div>
              <span className="text-[8px] text-secondary font-mono">LIVE FEED</span>
            </div>
            
            <div className="space-y-2 text-[11px] font-sans">
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
                <span className="text-secondary">Venue Ingress Load</span>
                <span className="font-black text-on-surface font-mono text-xs">
                  {selectedMatch.telemetries.ingressLoad}
                </span>
              </div>
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
                <span className="text-secondary">Active IoT Gates</span>
                <span className="font-black text-on-surface font-mono text-xs">
                  {selectedMatch.telemetries.activeGates}
                </span>
              </div>
              <div className="flex justify-between items-center bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
                <span className="text-secondary">Weather Grid</span>
                <span className="font-black text-on-surface font-mono text-xs">
                  {selectedMatch.telemetries.weather}
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/digital-twin')}
              className="w-full bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all shadow-ultra-soft active:scale-98 flex items-center justify-center space-x-1.5 cursor-pointer relative overflow-hidden group"
            >
              {/* Button sweep reflection sweep animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span>Verify Digital Twin</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
