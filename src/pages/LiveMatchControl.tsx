import React, { useState, useEffect, useRef } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Play, StopCircle, Shield, Activity, Compass, Users, AlertTriangle, 
  CheckCircle2, Clock, Eye, Send, ArrowRight, Zap, RefreshCw, Cpu, Cloud,
  TrendingUp, ShieldAlert, Award, Radio, Tv, Flame, Crosshair, Pause, RotateCcw, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { USABadge, ENGBadge } from '../components/FlagBadge';

interface ReplayStep {
  time: string;
  title: string;
  desc: string;
  type: 'security' | 'medical' | 'broadcast' | 'transport' | 'fan';
  status: 'pending' | 'active' | 'done';
  camera: string;
}

export const LiveMatchControl: React.FC = () => {
  const { state, resolveIncident } = useLiveData();
  const { emergencyMode } = useThemeSettings();

  // Replay Incident State
  const [isPlayingReplay, setIsPlayingReplay] = useState(false);
  const [activeReplayStep, setActiveReplayStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'feed' | 'decisions' | 'incidents'>('decisions');

  const logContainerRef = useRef<HTMLDivElement>(null);
  
  const replaySteps: ReplayStep[] = [
    { time: '17:14', title: 'Unauthorized Drone Spied', desc: 'IoT perimeter sensors register unauthorized drone hovering above South Stand gate ramp.', type: 'security', status: 'done', camera: 'CAM-SOUTH-GATE-04' },
    { time: '17:15', title: 'Security Dispatch', desc: 'Operations Agent triggers police jammer. Security Unit 12 dispatched to South Stand.', type: 'security', status: 'done', camera: 'JAMMER-ACTIVED-CH-9' },
    { time: '17:16', title: 'Broadcast Overlay Warned', desc: 'Broadcast Agent updates stadium director and dims live camera feeds to avoid spectator panic.', type: 'broadcast', status: 'done', camera: 'FEED-DELAY-OVERRIDE' },
    { time: '17:17', title: 'Egress Routes Adjusted', desc: 'Transport Agent adjusts subway gates. Volunteers reroute Gate C incoming streams to Gate D.', type: 'transport', status: 'done', camera: 'TRANSIT-GRID-WEST' },
    { time: '17:18', title: 'Threat Neutralized', desc: 'Police jammer signals override drone controls. Threat successfully resolved. Standby mode active.', type: 'security', status: 'done', camera: 'THREAT-RESOLVED-SAFE' }
  ];

  const stepLogs = [
    [
      "[17:14:02] INIT: Airspace monitoring initialized.",
      "[17:14:15] WARN: IoT radar sensor reports altitude anomaly at South Stand.",
      "[17:14:28] ALERT: CAM-SOUTH-GATE-04 locks onto micro-UAV drone (45m)."
    ],
    [
      "[17:15:02] ACTION: Activating RF Jammer on Channel 9.",
      "[17:15:15] SYSTEM: Transmitting frequency sweep: 915MHz - 928MHz.",
      "[17:15:30] DISPATCH: Security Unit 12 dispatched to South Gate ramp."
    ],
    [
      "[17:16:05] BROADCAST: Live stream delay buffer set to +7 seconds.",
      "[17:16:12] ACTION: CCTV override enabled. Masking public screens.",
      "[17:16:25] STATUS: Video glitch generator active on main display boards."
    ],
    [
      "[17:17:01] ROUTING: Disabling entry turnstiles at Gate C.",
      "[17:17:15] VOLUNTEERS: Directing 1,400 incoming fans to Gate D.",
      "[17:17:35] TRAFFIC: Transit terminal access gates toggled to EGRESS mode."
    ],
    [
      "[17:18:03] STATUS: UAV telemetry signal lost. Target crash confirmed.",
      "[17:18:18] SECURE: Jammer standby. Egress gates resuming standard operations.",
      "[17:18:32] SUCCESS: Incident resolved. Database incident report #4928 saved."
    ]
  ];

  const currentLogs = stepLogs.slice(0, activeReplayStep + 1).flat();

  useEffect(() => {
    if (!isPlayingReplay || isPaused) return;

    const baseDuration = 3500; // 3.5s per step
    const duration = baseDuration / playbackSpeed;

    const timer = setTimeout(() => {
      if (activeReplayStep < replaySteps.length - 1) {
        setActiveReplayStep(prev => prev + 1);
      } else {
        setIsPaused(true); // Pause at the end to allow inspection
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlayingReplay, isPaused, activeReplayStep, playbackSpeed]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [activeReplayStep, isPlayingReplay]);

  const handleStartReplay = () => {
    setActiveReplayStep(0);
    setIsPaused(false);
    setIsPlayingReplay(true);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      
      {/* ── Top Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            AI OS · LIVE MATCH CONTROLLER
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl text-on-surface mt-1 leading-tight">
            {isPlayingReplay 
              ? `Dynamic Incident Replay — Step ${activeReplayStep + 1} Operational` 
              : "USA vs ENG Operations Dashboard"
            }
          </h1>
          <p className="text-secondary font-medium text-xs font-sans mt-0.5">
            Real-time fixture monitoring, automated action graphs, and explainable decision memories.
          </p>
        </div>

        {/* Cinematic Replay CTA */}
        <button
          onClick={handleStartReplay}
          disabled={isPlayingReplay}
          className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer active:scale-95 shadow-sm ${
            isPlayingReplay 
              ? 'bg-primary/10 border-primary text-primary animate-pulse' 
              : 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary border-primary/20 text-white hover:shadow-md hover:shadow-primary/15'
          }`}
        >
          <RefreshCw size={12} className={isPlayingReplay ? 'animate-spin' : ''} />
          <span>{isPlayingReplay ? 'Replaying Incident...' : 'Replay Last Incident'}</span>
        </button>
      </div>

      {/* ── Match Scoreboard Panel ── */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/60 p-5 md:p-6 shadow-ultra-soft">
        {/* Field texture hint background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/5 rounded-full pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-3 items-center gap-4">
          {/* USA */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-3xl md:text-4xl font-black text-on-surface">USA</span>
              <USABadge className="w-8 h-8 md:w-9 md:h-9" />
            </div>
            <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-wider">UNITED STATES</span>
            <div className="hidden md:flex gap-1">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-mono rounded font-semibold">Pulisic 76'</span>
            </div>
          </div>

          {/* Timer & Score */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="h-2 w-2 rounded-full bg-error animate-pulse" />
              <span className="text-xs font-black text-error uppercase tracking-wider font-mono">LIVE STAGE</span>
            </div>
            <div className="font-display text-4xl md:text-5xl font-black tracking-tight text-primary">
              2 <span className="text-outline-variant mx-2">—</span> 1
            </div>
            <div className="mt-2.5 px-3.5 py-1 bg-surface-container rounded-full border border-outline-variant/50 flex items-center gap-1.5">
              <Clock size={12} className="text-primary animate-pulse" />
              <span className="font-mono text-xs font-bold text-on-surface">78:42</span>
            </div>
            <span className="text-secondary font-mono text-[10px] font-semibold uppercase tracking-wider mt-2">
              LUSAIL ICONIC STADIUM · GROUP A
            </span>
          </div>

          {/* ENG */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-2.5">
              <ENGBadge className="w-8 h-8 md:w-9 md:h-9" />
              <span className="font-display text-3xl md:text-4xl font-black text-on-surface">ENG</span>
            </div>
            <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-wider">ENGLAND</span>
            <div className="hidden md:flex gap-1">
              <span className="px-2 py-0.5 bg-outline-variant text-secondary text-[10px] font-mono rounded font-semibold">Kane 62'</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex gap-1.5 p-1.5 bg-surface-container rounded-xl border border-outline-variant/40 w-fit">
        <button
          onClick={() => setActiveTab('decisions')}
          className={`px-4.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'decisions' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          AI Decisions & Propagations
        </button>
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'feed' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Match Event Log
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`px-4.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeTab === 'incidents' ? 'bg-primary text-white shadow-md shadow-primary/10' : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Active Dispatch ({state.incidents.filter(i => i.status !== 'resolved').length})
        </button>
      </div>

      {/* ── Main Layout Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ── Left Column: Active Dashboard Content (Dynamic Tabs) ── */}
        <div className="lg:col-span-8 space-y-5">
          <AnimatePresence mode="wait">
            
            {/* 1. Tab Decisions & Memory */}
            {activeTab === 'decisions' && (
              <motion.div
                key="decisions-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Propagation Graph Visualization */}
                <div className="glass-panel rounded-2xl p-5 border border-outline-variant/60">
                  <div className="text-xs font-bold text-on-surface uppercase tracking-wider font-mono flex items-center gap-2 mb-4 border-b border-outline-variant/40 pb-2.5">
                    <Cpu size={14} className="text-primary" />
                    <span>Real-time Interconnected Event Propagation Graph</span>
                  </div>

                  <div className="relative py-3">
                    {/* Continuous path connector */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-outline-variant/35 -translate-y-1/2 z-0" />
                    
                    <div className="grid grid-cols-5 gap-2 relative z-10">
                      {[
                        { title: 'Crowd Surge', icon: AlertTriangle, status: 'active', desc: 'Section C2', color: 'text-error bg-error/10 border-error/30' },
                        { title: 'Security OS', icon: Shield, status: 'done', desc: 'Units Dispatched', color: 'text-primary bg-primary/10 border-primary/20' },
                        { title: 'Medical Alert', icon: Activity, status: 'done', desc: 'Responders Ready', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' },
                        { title: 'Transport Grid', icon: Compass, status: 'pending', desc: 'Gate C Divert', color: 'text-secondary bg-surface-container border-outline-variant/30' },
                        { title: 'Fan Push Alert', icon: CheckCircle2, status: 'pending', desc: 'Geo-notification', color: 'text-secondary bg-surface-container border-outline-variant/30' }
                      ].map((node, i) => {
                        const Icon = node.icon;
                        return (
                          <div key={i} className="flex flex-col items-center text-center">
                            <div className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${node.color} ${node.status === 'active' ? 'animate-pulse scale-105 shadow-[0_0_12px_rgba(192,57,43,0.15)]' : ''}`}>
                              <Icon size={16} />
                            </div>
                            <span className="text-xs font-bold text-on-surface mt-2 truncate max-w-full">{node.title}</span>
                            <span className="text-[10px] text-secondary font-mono mt-0.5 font-medium">{node.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Explainable Decisions List */}
                <div className="glass-panel rounded-2xl p-5 border border-outline-variant/60 space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
                    <h3 className="font-display font-black text-lg text-on-surface">Explainable Decisions & AI Memory</h3>
                    <span className="text-[10px] text-secondary font-mono font-bold">2 RECOMMENDED ACTIONS</span>
                  </div>
 
                  <div className="space-y-4">
                    {state.copilotActions.slice(0, 2).map((action) => (
                      <div key={action.id} className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-xl space-y-3.5 hover:border-outline transition-colors">
                        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-outline-variant/30 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] bg-primary/10 text-primary border border-primary/25 px-2.5 py-0.5 rounded font-bold uppercase">
                              {action.department}
                            </span>
                            <span className={`h-1.5 w-1.5 rounded-full ${action.priority === 'high' ? 'bg-error' : 'bg-amber-500'}`} />
                            <span className="text-[10px] font-bold text-secondary font-mono uppercase">{action.priority} PRIORITY</span>
                          </div>
                          <span className="text-xs font-bold text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">
                            Confidence: {action.confidence}%
                          </span>
                        </div>
 
                        <div className="space-y-1">
                          <span className="text-[10px] text-secondary font-mono uppercase tracking-wider block font-semibold">AI Decision Recommendation</span>
                          <p className="text-sm font-bold text-on-surface leading-snug">{action.recommendation}</p>
                        </div>
 
                        {/* Decision matrix columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-outline-variant/20 text-xs">
                          <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg space-y-1">
                            <span className="text-secondary font-mono text-[9px] uppercase tracking-wider block font-semibold">Expected Net Effect</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1">
                              <TrendingUp size={12} /> {action.expectedEffect}
                            </span>
                          </div>
                          <div className="bg-error/5 border border-error/10 p-2.5 rounded-lg space-y-1">
                            <span className="text-secondary font-mono text-[9px] uppercase tracking-wider block font-semibold">Potential System Risks</span>
                            <span className="font-bold text-error flex items-center gap-1">
                              <ShieldAlert size={12} /> {action.risks}
                            </span>
                          </div>
                        </div>
 
                        {/* Why details */}
                        <div className="bg-surface-container border border-outline-variant/35 p-3 rounded-lg space-y-2">
                          <span className="text-[10px] font-bold text-on-surface uppercase font-mono tracking-wider block flex items-center gap-1">
                            <Zap size={12} className="text-primary" /> Logic Chain & Parameters
                          </span>
                          <ul className="text-xs list-none space-y-1.5 text-secondary pl-1 font-medium">
                            {action.whyDetails?.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-primary mt-1.5 shrink-0">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
 
                        {/* AI memory context */}
                        {action.matchedMemory && (
                          <div className="bg-primary/5 border border-primary/15 p-2.5 rounded-lg flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-primary"><Award size={14} /></span>
                              <div>
                                <span className="text-secondary font-mono text-[9px] block font-semibold">PREVIOUS MEMORY RESOLUTION</span>
                                <span className="font-bold text-on-surface text-[11px]">{action.matchedMemory.event}</span>
                              </div>
                            </div>
                            <span className="font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold">
                              {action.matchedMemory.successRate}% Success rate
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Tab Event Log */}
            {activeTab === 'feed' && (
              <motion.div
                key="feed-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-5 border border-outline-variant/60 space-y-4"
              >
                <div className="border-b border-outline-variant/40 pb-2">
                  <h3 className="font-display font-black text-lg text-on-surface">Match Day Event Log</h3>
                  <p className="text-secondary text-[11px] mt-0.5">Timeline of key incidents, goals, and decisions logged during the fixture.</p>
                </div>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/40 pl-8">
                  {/* Goal 76' */}
                  <div className="relative">
                    <span className="absolute -left-6 top-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center border border-white shadow-sm">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                    </span>
                    <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/35 text-xs space-y-1">
                      <span className="font-mono font-bold text-primary">76' · USA Goal</span>
                      <p className="font-bold text-on-surface">GOAL! UNITED STATES 2 - 1 ENGLAND</p>
                      <p className="text-[10px] text-secondary">C. Pulisic with a brilliant clinical strike inside the box. Assisted by Aaronson.</p>
                    </div>
                  </div>

                  {/* Goal 62' */}
                  <div className="relative">
                    <span className="absolute -left-6 top-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center border border-white shadow-sm">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                    </span>
                    <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/35 text-xs space-y-1">
                      <span className="font-mono font-bold text-primary">62' · ENG Goal</span>
                      <p className="font-bold text-on-surface">GOAL! UNITED STATES 1 - 1 ENGLAND</p>
                      <p className="text-[10px] text-secondary">H. Kane scores a dynamic header from a set-piece corner kick.</p>
                    </div>
                  </div>

                  {/* VAR Penalty */}
                  <div className="relative">
                    <span className="absolute -left-6 top-1.5 w-4 h-4 bg-error rounded-full flex items-center justify-center border border-white shadow-sm">
                      <Eye size={8} className="text-white" />
                    </span>
                    <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/35 text-xs space-y-1">
                      <span className="font-mono font-bold text-error">54' · VAR Review</span>
                      <p className="font-bold text-on-surface">VAR Check: USA Penalty Claim</p>
                      <p className="text-[10px] text-secondary">Potential hand ball checked by referee. Review concludes: NO PENALTY.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Tab Incidents (Active Dispatch) */}
            {activeTab === 'incidents' && (
              <motion.div
                key="incidents-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-panel rounded-2xl p-5 border border-outline-variant/60 space-y-4"
              >
                <div className="border-b border-outline-variant/40 pb-2">
                  <h3 className="font-display font-black text-lg text-on-surface">Active Incident Dispatch</h3>
                  <p className="text-secondary text-[11px] mt-0.5">Real-time alerts requiring human verification, triage, or team dispatch.</p>
                </div>

                <div className="space-y-3">
                  {state.incidents.filter(i => i.status !== 'resolved').map((inc) => (
                    <div key={inc.id} className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            inc.severity === 'high' ? 'bg-error/15 text-error border border-error/35' : 'bg-amber-500/10 text-amber-600 border border-amber-500/25'
                          }`}>
                            {inc.severity} Severity
                          </span>
                          <span className="text-[10px] text-secondary font-mono">Incident #{inc.id}</span>
                        </div>
                        <h4 className="font-bold text-xs text-on-surface">{inc.title}</h4>
                        <p className="text-[10px] text-secondary leading-normal">{inc.details}</p>
                      </div>
                      <button 
                        onClick={() => resolveIncident(inc.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Acknowledge & Resolve
                      </button>
                    </div>
                  ))}

                  {state.incidents.filter(i => i.status !== 'resolved').length === 0 && (
                    <div className="text-center py-8 text-secondary">
                      <CheckCircle2 size={24} className="mx-auto text-emerald-500 mb-2" />
                      <p className="text-xs font-semibold">All incidents resolved. System operating optimally.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Right Column: Telemetry & Metrics ── */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display font-black text-lg text-on-surface">Stadium Live Telemetry</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Temp */}
            <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-secondary text-[8px] font-mono uppercase tracking-wider block">Climate Sensors</span>
                <span className="text-xl font-black text-on-surface mt-1 block">{state.weather.tempC}°C</span>
                <span className="text-secondary text-[9px] mt-0.5 block">Precipitation: {state.weather.precipitationProbabilityPercent}%</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <Cloud size={16} />
              </div>
            </div>

            {/* Power */}
            <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-secondary text-[8px] font-mono uppercase tracking-wider block">Electrical Grid</span>
                <span className="text-xl font-black text-on-surface mt-1 block">{state.sustainability.powerUsageKw} kW</span>
                <span className="text-secondary text-[9px] mt-0.5 block">Backup Load: Stable</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                <Zap size={16} />
              </div>
            </div>

            {/* Quick Dispatch card (if tab is not active, preview it here) */}
            <div className="glass-panel p-4 rounded-2xl border border-outline-variant/60 space-y-3">
              <span className="text-on-surface text-[10px] font-bold font-mono uppercase block border-b border-outline-variant pb-2">Active Incidents</span>
              
              <div className="space-y-2">
                {state.incidents.filter(i => i.status !== 'resolved').slice(0, 2).map((inc) => (
                  <div key={inc.id} className="p-2.5 bg-surface-container rounded-xl border border-outline-variant/35 text-[10px]">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-on-surface truncate">{inc.title}</span>
                      <span className="text-[8px] text-error font-mono">{inc.severity.toUpperCase()}</span>
                    </div>
                    <button 
                      onClick={() => resolveIncident(inc.id)}
                      className="w-full text-center py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold mt-2 transition-colors cursor-pointer"
                    >
                      Resolve
                    </button>
                  </div>
                ))}
                {state.incidents.filter(i => i.status !== 'resolved').length === 0 && (
                  <p className="text-[9px] text-secondary text-center py-2">0 active alerts</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── Cinematic Replay Modal ── */}
      <AnimatePresence>
        {isPlayingReplay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1050] bg-[#020308]/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-3xl glass-panel bg-surface border border-outline-variant rounded-2xl shadow-ultra-soft p-5 space-y-4 overflow-hidden relative"
            >
              {/* Radar sweeps animation decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full border border-primary/10 animate-ping pointer-events-none" />

              <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
                  </span>
                  <span className="font-display font-black text-lg text-on-surface">Dynamic Security Replay Feed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-primary/15 border border-primary/30 text-primary px-2.5 py-0.5 rounded font-mono font-bold">STADIUM EYE ACTIVE</span>
                  <button 
                    onClick={() => {
                      setIsPlayingReplay(false);
                    }}
                    className="p-1.5 rounded hover:bg-surface-container-high text-secondary hover:text-on-surface cursor-pointer transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Grid content split: Camera screen and step description */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch relative z-10">
                
                {/* Camera View Box & Controls */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  
                  {/* CCTV Screen */}
                  <div className="bg-gradient-to-br from-[#0c1126] via-[#020512] to-[#000104] border border-outline-variant/65 rounded-xl overflow-hidden min-h-[240px] relative flex flex-col justify-between p-3.5 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 pointer-events-none" />
                    
                    {/* Grid Lines Overlay */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
                    
                    {/* Target Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12] text-primary pointer-events-none">
                      <Crosshair size={48} className="animate-spin-slow" />
                    </div>

                    {/* Live SVG Tactical Feed */}
                    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full text-primary pointer-events-none">
                      <defs>
                        <linearGradient id="glitch-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#020308" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#2b221d" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#020308" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <style>{`
                        @keyframes flow-dash {
                          to { stroke-dashoffset: -20; }
                        }
                        .flow-arrows {
                          animation: flow-dash 1.2s linear infinite;
                        }
                        @keyframes spin-slow {
                          to { transform: rotate(360deg); }
                        }
                        .animate-spin-slow {
                          transform-origin: center;
                          animation: spin-slow 25s linear infinite;
                        }
                        @keyframes sweep-spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                        .radar-sweep-line {
                          transform-origin: 200px 120px;
                          animation: sweep-spin 8s linear infinite;
                        }
                      `}</style>

                      {/* Radar sweep scanning line */}
                      <line x1="200" y1="120" x2="330" y2="120" stroke="rgba(194, 101, 42, 0.2)" strokeWidth="1.2" className="radar-sweep-line" />
                      
                      {/* Seating Rings & Pitch outlines (Creative details!) */}
                      <ellipse cx="200" cy="120" rx="130" ry="80" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-outline-variant/30" />
                      <ellipse cx="200" cy="120" rx="120" ry="72" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-outline-variant/20" strokeDasharray="2 3" />
                      
                      {/* Center blueprint soccer pitch */}
                      <rect x="150" y="85" width="100" height="70" fill="#10B981" fillOpacity={0.06} stroke="currentColor" strokeWidth="0.4" className="text-emerald-500/30" />
                      <line x1="200" y1="85" x2="200" y2="155" stroke="currentColor" strokeWidth="0.3" className="text-emerald-500/30" />
                      <circle cx="200" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-emerald-500/30" />

                      {/* Stadium field base */}
                      <ellipse cx="200" cy="120" rx="140" ry="90" fill="none" stroke="#534a42" strokeWidth="1" strokeDasharray="4,4" className="opacity-20" />
                      
                      {activeReplayStep === 0 && (
                        <g>
                          <rect x="290" y="70" width="40" height="40" fill="none" stroke="#c0392b" strokeWidth="1.5" className="animate-pulse" />
                          <line x1="310" y1="55" x2="310" y2="125" stroke="#c0392b" strokeWidth="0.5" strokeDasharray="3,3" />
                          <line x1="265" y1="90" x2="355" y2="90" stroke="#c0392b" strokeWidth="0.5" strokeDasharray="3,3" />
                          
                          <circle cx="310" cy="90" r="5" fill="#c0392b" />
                          <line x1="300" y1="85" x2="320" y2="95" stroke="#c0392b" strokeWidth="2" />
                          <line x1="300" y1="95" x2="320" y2="85" stroke="#c0392b" strokeWidth="2" />
                          <circle cx="300" cy="85" r="2" fill="none" stroke="#c0392b" strokeWidth="0.5" />
                          <circle cx="320" cy="95" r="2" fill="none" stroke="#c0392b" strokeWidth="0.5" />
                          <circle cx="300" cy="95" r="2" fill="none" stroke="#c0392b" strokeWidth="0.5" />
                          <circle cx="320" cy="85" r="2" fill="none" stroke="#c0392b" strokeWidth="0.5" />
                          
                          <text x="310" y="45" textAnchor="middle" fill="#c0392b" className="font-mono text-[9px] font-bold tracking-wider">UAV TARGET DETECTED</text>
                          <text x="310" y="125" textAnchor="middle" fill="#c0392b" className="font-mono text-[7px]">ALT: 45.2M</text>
                          <text x="310" y="135" textAnchor="middle" fill="#c0392b" className="font-mono text-[7px]">VEL: 12.8KM/H</text>
                          
                          <circle cx="200" cy="120" r="100" fill="none" stroke="#c2652a" strokeWidth="0.5" strokeDasharray="4,4" className="opacity-20" />
                        </g>
                      )}

                      {activeReplayStep === 1 && (
                        <g>
                          <circle cx="200" cy="120" r="10" fill="#e08850" className="animate-pulse" />
                          <circle cx="200" cy="120" r="25" fill="none" stroke="#e08850" strokeWidth="1.5" className="animate-ping opacity-60" style={{ animationDuration: '2.5s' }} />
                          <circle cx="200" cy="120" r="55" fill="none" stroke="#e08850" strokeWidth="1" className="animate-ping opacity-40" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }} />
                          <circle cx="200" cy="120" r="85" fill="none" stroke="#e08850" strokeWidth="0.5" className="animate-ping opacity-20" style={{ animationDuration: '2.5s', animationDelay: '1.6s' }} />
                          
                          <line x1="200" y1="120" x2="310" y2="90" stroke="#c0392b" strokeWidth="2" strokeDasharray="6,4" className="animate-pulse" />
                          <circle cx="310" cy="90" r="6" fill="#534a42" className="opacity-50" />
                          
                          <path d="M 80 180 C 140 185, 230 150, 310 90" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,3" />
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="translate"
                              values="80,180; 165,160; 255,120; 310,90"
                              keyTimes="0; 0.35; 0.7; 1"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                            <rect x="-10" y="-6" width="20" height="12" rx="3" fill="#10B981" className="shadow-lg" />
                            <circle cx="0" cy="0" r="2" fill="#ffffff" />
                          </g>
                          
                          <text x="200" y="35" textAnchor="middle" fill="#e08850" className="font-mono text-[9px] font-bold tracking-widest uppercase">JAMMER BLOCK SIGNAL ON CH-9</text>
                        </g>
                      )}

                      {activeReplayStep === 2 && (
                        <g>
                          <rect x="0" y="0" width="400" height="240" fill="url(#glitch-gradient)" className="opacity-40" />
                          
                          <g className="opacity-25">
                            <rect x="20" y="20" width="50" height="200" fill="#c2652a" />
                            <rect x="70" y="20" width="50" height="200" fill="#534a42" />
                            <rect x="120" y="20" width="50" height="200" fill="#10B981" />
                            <rect x="170" y="20" width="50" height="200" fill="#c0392b" />
                            <rect x="220" y="20" width="50" height="200" fill="#e08850" />
                            <rect x="270" y="20" width="50" height="200" fill="#8c3c3c" />
                            <rect x="320" y="20" width="60" height="200" fill="#2b221d" />
                          </g>

                          <g className="stroke-[#c2652a] opacity-80" strokeWidth="1.5">
                            <line x1="0" y1="50" x2="400" y2="50" strokeDasharray="30, 10, 50, 20" className="animate-pulse" />
                            <line x1="0" y1="130" x2="400" y2="135" strokeWidth="2.5" className="animate-pulse" />
                            <line x1="0" y1="180" x2="400" y2="180" strokeDasharray="10, 80, 20, 10" className="animate-pulse" />
                          </g>
                          
                          <text x="200" y="110" textAnchor="middle" fill="#ffffff" className="font-mono font-bold text-xs tracking-wider">CCTV SIGNAL OVERRIDE</text>
                          <text x="200" y="130" textAnchor="middle" fill="#c0392b" className="font-mono font-black text-[9px] animate-pulse">MASK BUFFER STREAM ENGAGED</text>
                          <text x="200" y="150" textAnchor="middle" fill="#e08850" className="font-mono font-bold text-[8px]">LIVE STAGE DELAY: +7.0S</text>
                        </g>
                      )}

                      {activeReplayStep === 3 && (
                        <g>
                          <g>
                            <circle cx="110" cy="70" r="12" fill="#c0392b" className="opacity-20 animate-pulse" />
                            <circle cx="110" cy="70" r="9" fill="none" stroke="#c0392b" strokeWidth="1.5" />
                            <line x1="104" y1="64" x2="116" y2="76" stroke="#c0392b" strokeWidth="2" />
                            <line x1="116" y1="64" x2="104" y2="76" stroke="#c0392b" strokeWidth="2" />
                            <text x="130" y="73" textAnchor="start" fill="#c0392b" className="font-mono text-[8px] font-bold">GATE C CLOSED</text>
                          </g>

                          <g>
                            <circle cx="110" cy="170" r="14" fill="#10B981" className="opacity-20 animate-ping" />
                            <circle cx="110" cy="170" r="10" fill="none" stroke="#10B981" strokeWidth="2" />
                            <path d="M 106 170 L 109 173 L 115 166" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                            <text x="130" y="173" textAnchor="start" fill="#10B981" className="font-mono text-[8px] font-bold">GATE D ACTIVE</text>
                          </g>

                          <path d="M 100 85 C 130 95, 140 145, 110 160" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,4" className="flow-arrows" />
                          
                          <text x="200" y="35" textAnchor="middle" fill="#10B981" className="font-mono text-[9px] font-bold tracking-widest uppercase">EGRESS ROUTING BYPASS ACTIVATED</text>
                        </g>
                      )}

                      {activeReplayStep === 4 && (
                        <g>
                          <circle cx="200" cy="120" r="40" fill="#10B981" className="opacity-10 animate-pulse" />
                          <circle cx="200" cy="120" r="28" fill="none" stroke="#10B981" strokeWidth="2.5" />
                          <path d="M 188 120 L 196 128 L 214 110" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                          
                          <text x="200" y="70" textAnchor="middle" fill="#10B981" className="font-mono font-black text-xs tracking-widest">THREAT RESOLVED</text>
                          <text x="200" y="180" textAnchor="middle" fill="#534a42" className="font-mono font-bold text-[9px] uppercase tracking-wider">Stadium perimeter returned to secure status</text>
                        </g>
                      )}
                    </svg>

                    <div className="flex justify-between items-center text-[9px] font-mono text-emerald-500 relative z-10">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span>REPLAY FEED ACTIVE</span>
                      </div>
                      <span>{replaySteps[activeReplayStep].camera}</span>
                    </div>

                    {/* Spacer to let SVG center */}
                    <div className="h-20 pointer-events-none" />

                    <div className="flex justify-between items-center text-[9px] font-mono text-secondary relative z-10">
                      <span>INDEX: 9283-SEC</span>
                      <span>TACTICAL SYSTEM LAYOUT v4.2</span>
                    </div>
                  </div>

                  {/* Playback Controls Panel */}
                  <div className="bg-surface-container border border-outline-variant/40 rounded-xl p-3 flex flex-col gap-3 shadow-inner">
                    {/* Time progress bar */}
                    <div className="relative w-full h-1 bg-outline-variant/40 rounded-full flex items-center">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${((activeReplayStep + (isPaused ? 0 : 0.5)) / replaySteps.length) * 100}%` }}
                      />
                      {replaySteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveReplayStep(idx);
                            setIsPaused(true); // pause auto playback on manual selection
                          }}
                          className={`absolute -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all cursor-pointer ${
                            idx === activeReplayStep 
                              ? 'bg-primary border-white scale-110 shadow-md' 
                              : idx < activeReplayStep 
                                ? 'bg-primary border-primary' 
                                : 'bg-surface-container-high border-outline-variant'
                          }`}
                          style={{ left: `${(idx / (replaySteps.length - 1)) * 100}%` }}
                          title={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Left: action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsPaused(!isPaused);
                          }}
                          className="p-1.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 rounded-lg cursor-pointer transition-colors active:scale-95 flex items-center justify-center animate-duration-300"
                          title={isPaused ? 'Resume' : 'Pause'}
                        >
                          {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                        </button>
                        <button
                          onClick={() => {
                            setActiveReplayStep(0);
                            setIsPaused(false);
                          }}
                          className="p-1.5 bg-surface-container-high border border-outline-variant hover:bg-surface-container-highest text-secondary hover:text-on-surface rounded-lg cursor-pointer transition-colors active:scale-95 flex items-center justify-center"
                          title="Restart Replay"
                        >
                          <RotateCcw size={14} />
                        </button>
                      </div>

                      {/* Center: step title */}
                      <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider">
                        STEP {activeReplayStep + 1} OF {replaySteps.length}
                      </span>

                      {/* Right: speed controller */}
                      <div className="flex items-center gap-1 border border-outline-variant/60 bg-surface-container-low p-0.5 rounded-lg text-[9px] font-mono font-bold">
                        {([1, 1.5, 2] as const).map(speed => (
                          <button
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`px-2 py-1 rounded cursor-pointer transition-all ${
                              playbackSpeed === speed 
                                ? 'bg-primary text-white font-extrabold shadow-sm' 
                                : 'text-secondary hover:text-on-surface'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Log Diagnostics */}
                  <div className="bg-[#020308] border border-outline-variant/65 rounded-xl p-3 flex flex-col gap-1.5 h-[120px]">
                    <div className="text-[9px] text-emerald-500 font-mono font-bold tracking-widest border-b border-emerald-950 pb-1.5 mb-1.5 flex items-center gap-1.5 justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                        SYSTEM OPERATIONS TERMINAL DIAGNOSTICS
                      </span>
                      <span>SEC_NET v1.9</span>
                    </div>
                    <div 
                      ref={logContainerRef}
                      className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed text-emerald-400/90 pr-1 space-y-1 scrollbar-thin"
                    >
                      {currentLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-emerald-600 shrink-0 font-bold">&gt;</span>
                          <span className="break-all">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Event Logs Timeline */}
                <div className="md:col-span-5 flex flex-col gap-3 justify-between">
                  <div className="space-y-3.5">
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block font-bold border-b border-outline-variant/40 pb-1">Event Flow Status</span>
                    <div className="space-y-3 pr-1 max-h-[200px] md:max-h-none overflow-y-auto">
                      {replaySteps.map((step, idx) => {
                        const isActive = idx === activeReplayStep;
                        const isPassed = idx < activeReplayStep;
                        return (
                          <button 
                            key={idx} 
                            onClick={() => {
                              setActiveReplayStep(idx);
                              setIsPaused(true); // pause playback
                            }}
                            className={`w-full text-left flex items-start gap-2.5 transition-all duration-300 p-1.5 rounded-lg border cursor-pointer hover:bg-surface-container-low ${
                              isActive 
                                ? 'bg-surface-container border-primary font-bold shadow-sm' 
                                : isPassed 
                                  ? 'opacity-65 border-transparent text-secondary' 
                                  : 'opacity-35 border-transparent text-secondary/60'
                            }`}
                          >
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold ${
                              isActive ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-container-high text-secondary'
                            }`}>
                              {step.time}
                            </span>
                            <div className="text-[11px]">
                              <span className={`block leading-snug font-semibold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                                {step.title}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Step Details */}
                  <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/45 text-xs mt-2 leading-relaxed">
                    <span className="font-bold text-on-surface text-[11px] block mb-1">Step Detail:</span>
                    <p className="font-medium text-secondary text-[11px]">{replaySteps[activeReplayStep].desc}</p>
                  </div>
                </div>

              </div>

              <div className="border-t border-outline-variant/40 pt-3 text-center">
                <span className="text-[9px] text-secondary font-mono uppercase tracking-wider font-semibold">AI Operations Grid Synchronized & Saved to Core Memory</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
