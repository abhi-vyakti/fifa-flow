import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeSettings, type UserRole } from '../contexts/ThemeContext';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  Brain, Sparkles, Terminal, ArrowRight, Compass, Shield, Activity, Users, HelpCircle,
  Zap, Eye, Radio, Play, CheckCircle2, RefreshCw, Layers, Cpu, Navigation, Wifi, Globe, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, t } = useThemeSettings();
  const { state, liveMatch } = useLiveData();

  // Interactive quadrant preview on landing hero
  const [selectedQuadrant, setSelectedQuadrant] = useState<'north' | 'south' | 'east' | 'west'>('south');
  const [tickerIndex, setTickerIndex] = useState(0);

  // Live insights ticker auto-rotate
  const insights = [
    "AI Copilot rerouted 450 spectators from Gate C to Gate D (Queue wait reduced to 1.2 min).",
    "Metro Line 2 platform arrival detected. Shuttle fleet frequency increased by 20%.",
    "Medical Unit B-3 on standby near Section C2 with 4/6 first aid beds available.",
    "Multilingual safety broadcast transmitted in English, Spanish, French, Portuguese, Arabic, and Hindi."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % insights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [insights.length]);

  const quadrantDetails = {
    south: { name: 'South Stand (Sector S2-S4)', load: '94% Peak Load', queue: '1.4 min', status: 'CRITICAL INGRESS', color: 'text-error border-error/40 bg-error/10' },
    north: { name: 'North Stand (Sector N1-N5)', load: '72% Normal', queue: '0.8 min', status: 'STABLE FLOW', color: 'text-emerald-600 border-emerald-500/40 bg-emerald-500/10' },
    east: { name: 'East Stand (Sector E1-E4)', load: '85% Moderate', queue: '1.8 min', status: 'BALANCED', color: 'text-amber-600 border-amber-500/40 bg-amber-500/10' },
    west: { name: 'West Stand (Sector W1-W4)', load: '68% Low Queue', queue: '0.5 min', status: 'OPTIMAL', color: 'text-emerald-600 border-emerald-500/40 bg-emerald-500/10' },
  };

  const currentQuad = quadrantDetails[selectedQuadrant];

  return (
    <div className="space-y-20 py-8 px-4 max-w-7xl mx-auto font-sans relative overflow-hidden">
      
      {/* Dynamic Background Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-amber-500/5 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="text-center space-y-8 pt-6 relative z-10">
        
        {/* Pulsing Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 bg-surface-container-low border border-primary/30 rounded-full text-xs font-bold text-primary uppercase font-mono tracking-widest shadow-ultra-soft"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <Sparkles size={13} className="text-primary animate-pulse" />
          <span>FIFA World Cup 2026 • AI Stadium Operating System</span>
        </motion.div>

        {/* Hero Title with Metallic Shimmer & Deep Impact */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-headline font-black tracking-tight text-on-surface leading-none uppercase drop-shadow-sm">
            FIFA <span className="text-primary bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent">FLOW</span>
          </h1>
          <div className="text-xl sm:text-3xl font-headline font-black tracking-widest text-primary uppercase font-mono mt-1">
            STADIUM INTELLIGENCE COGNITIVE ENGINE
          </div>
        </motion.div>

        {/* High-Readability Hero Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-on-surface/90 font-sans font-medium max-w-2xl mx-auto leading-relaxed"
        >
          The next-generation operational AI backbone connecting real-time IoT sensors, digital twin crowd heatmaps, volunteer dispatch grids, and spectator fan navigation across 16 tournament host venues.
        </motion.p>

        {/* Hero Action CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto pt-2"
        >
          <button 
            onClick={() => navigate('/select-persona')}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-container text-white font-black rounded-2xl transition-all shadow-ultra-soft text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-2 group hover:scale-[1.02] active:scale-95 border border-primary/30"
          >
            <Zap size={16} className="text-white animate-pulse" />
            <span>Enter Operations Platform</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => { setRole('fan'); navigate('/fan'); }}
            className="w-full sm:w-auto px-8 py-4 bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/80 text-on-surface font-extrabold rounded-2xl transition-all shadow-ultra-soft text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center space-x-2 hover:border-primary/40 active:scale-95"
          >
            <Compass size={16} className="text-primary" />
            <span>Fan Spectator Companion</span>
          </button>
        </motion.div>
      </section>

      {/* ── 2. INTERACTIVE LIVE STADIUM TELEMETRY COMMAND DECK (HERO SHOWCASE) ── */}
      <section className="relative max-w-5xl mx-auto">
        <div className="bg-surface-container-low border border-outline-variant/80 rounded-3xl p-6 sm:p-8 shadow-ultra-soft relative overflow-hidden space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h3 className="font-display font-black text-lg text-on-surface">METLIFE STADIUM &bull; LIVE TELEMETRY RADAR</h3>
                <p className="text-xs text-secondary font-mono">82,500 Capacity &bull; 96% Ingress Efficiency &bull; AI Decision Engine Active</p>
              </div>
            </div>

            {/* Scoreboard Pill */}
            <div className="flex items-center bg-surface-container border border-outline-variant px-3 py-1.5 rounded-2xl text-xs font-mono font-bold space-x-3 text-on-surface self-start sm:self-auto">
              <span className="text-error font-black animate-pulse">LIVE 91'</span>
              <span>USA <strong className="text-primary font-black">2</strong> : <strong className="text-primary font-black">1</strong> ENG</span>
            </div>
          </div>

          {/* Stadium Interactive Quadrant Selector & Radar Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Radar & Quadrant Buttons (Span 7) */}
            <div className="lg:col-span-7 bg-surface-container border border-outline-variant/60 p-6 rounded-2xl relative flex flex-col items-center justify-center min-h-[300px] shadow-ultra-soft overflow-hidden">
              
              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-64 h-64 border border-primary/40 rounded-full animate-ping" />
                <div className="w-48 h-48 border border-emerald-500/30 rounded-full" />
                <div className="w-32 h-32 border border-primary/20 rounded-full" />
              </div>

              {/* Pitch Visual Representation */}
              <div className="w-full max-w-[280px] h-[180px] border-2 border-emerald-500/30 rounded-xl relative flex items-center justify-center bg-emerald-500/5 my-4">
                <div className="w-1/2 h-full border-r border-emerald-500/30" />
                <div className="w-20 h-20 border border-emerald-500/30 rounded-full absolute" />
                
                {/* Quadrant Touch Markers */}
                <button 
                  onClick={() => setSelectedQuadrant('north')}
                  className={`absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all border ${selectedQuadrant === 'north' ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-md' : 'bg-surface-container-low text-secondary border-outline-variant'}`}
                >
                  North Stand
                </button>
                <button 
                  onClick={() => setSelectedQuadrant('south')}
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all border ${selectedQuadrant === 'south' ? 'bg-red-600 text-white border-red-500 scale-105 shadow-md' : 'bg-surface-container-low text-secondary border-outline-variant'}`}
                >
                  South Stand
                </button>
                <button 
                  onClick={() => setSelectedQuadrant('west')}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all border ${selectedQuadrant === 'west' ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-md' : 'bg-surface-container-low text-secondary border-outline-variant'}`}
                >
                  West
                </button>
                <button 
                  onClick={() => setSelectedQuadrant('east')}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all border ${selectedQuadrant === 'east' ? 'bg-amber-600 text-white border-amber-500 scale-105 shadow-md' : 'bg-surface-container-low text-secondary border-outline-variant'}`}
                >
                  East
                </button>
              </div>

              <p className="text-[11px] text-secondary font-mono mt-2">
                👆 Click any stadium quadrant above to inspect real-time crowd telemetries
              </p>
            </div>

            {/* Selected Quadrant Telemetry Card (Span 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-2xl space-y-3 shadow-ultra-soft text-left">
                <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                  <span className="text-xs font-mono font-black text-on-surface uppercase">{currentQuad.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase border ${currentQuad.color}`}>
                    {currentQuad.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] text-secondary font-mono block">SPECTATOR LOAD</span>
                    <span className="text-lg font-black text-on-surface font-mono">{currentQuad.load}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-secondary font-mono block font-bold">AVG QUEUE TIME</span>
                    <span className="text-lg font-black text-primary font-mono">{currentQuad.queue}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/40 space-y-1.5">
                  <span className="text-[9px] text-secondary font-mono uppercase font-bold block">AI AUTO-DECISION ACTION</span>
                  <p className="text-xs text-on-surface font-medium leading-relaxed">
                    FLOW AI dynamically balances gate turnstiles and dispatches nearby volunteers to maintain queue velocity.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* AI Real-time Streaming Ticker */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-3 rounded-2xl flex items-center space-x-3 text-xs font-mono text-left shadow-ultra-soft">
            <div className="flex items-center space-x-1.5 shrink-0 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-xl text-primary font-bold text-[10px] uppercase">
              <Cpu size={12} className="animate-spin" />
              <span>AI STREAM</span>
            </div>
            <AnimatePresence>
              <motion.p 
                key={tickerIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-on-surface font-bold text-xs truncate flex-1"
              >
                {insights[tickerIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── 3. TOURNAMENT IMPACT NUMBERS BAR ── */}
      <section className="bg-surface-container-low border border-outline-variant/60 rounded-3xl p-6 shadow-ultra-soft max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-black text-primary block">16</span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">Host Venues Connected</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-black text-on-surface block">2,450+</span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">IoT Sensor Nodes</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-black text-emerald-600 block">&lt; 1.2s</span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">AI Inference Latency</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-display font-black text-on-surface block">6</span>
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">Languages (EN/ES/FR/PT/AR/HI)</span>
          </div>

        </div>
      </section>

      {/* ── 4. OPERATIONAL WORKSPACE PERSONAS HUB ── */}
      <section className="space-y-8 text-center max-w-6xl mx-auto">
        
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">
            <Layers size={12} className="text-primary" />
            <span>Role-Based Operational Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-headline font-black text-on-surface uppercase tracking-tight">
            {t.selectWorkspace}
          </h2>
          <p className="text-xs sm:text-sm text-secondary font-medium max-w-md mx-auto">
            Choose your assigned operational role to launch specialized AI dashboards and telemetry controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Commander */}
          <div 
            onClick={() => { setRole('organizer'); navigate('/commander'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/70 hover:border-amber-500/60 hover:bg-surface-container-high cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-ultra-soft hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 group-hover:scale-110 transition-transform">
                  <Brain size={22} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xl bg-amber-500/15 text-amber-800 border border-amber-500/30">
                  Commander
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-on-surface group-hover:text-amber-700 transition-colors">
                Tournament Commander
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans font-medium">
                Complete AI-powered oversight of all stadium systems, real-time telemetry, situation room intelligence, and decision simulations.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-amber-700">
              <span className="uppercase tracking-wider">Launch Workspace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Security */}
          <div 
            onClick={() => { setRole('security'); navigate('/security'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/70 hover:border-red-500/60 hover:bg-surface-container-high cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-ultra-soft hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 group-hover:scale-110 transition-transform">
                  <Shield size={22} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xl bg-red-500/15 text-red-800 border border-red-500/30">
                  Security
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-on-surface group-hover:text-red-700 transition-colors">
                Security Director
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans font-medium">
                Monitor real-time threat levels, coordinate emergency response teams, inspect perimeter sensors, and broadcast multilingual safety alerts.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-red-700">
              <span className="uppercase tracking-wider">Launch Workspace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Medical */}
          <div 
            onClick={() => { setRole('medical'); navigate('/medical'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/70 hover:border-emerald-500/60 hover:bg-surface-container-high cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-ultra-soft hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 group-hover:scale-110 transition-transform">
                  <Activity size={22} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xl bg-emerald-500/15 text-emerald-800 border border-emerald-500/30">
                  Medical
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-on-surface group-hover:text-emerald-700 transition-colors">
                Medical Operations
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans font-medium">
                Oversee first aid post bed capacity, dispatch paramedic responder units, clear fast evacuation corridors, and manage medical triage queues.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-emerald-700">
              <span className="uppercase tracking-wider">Launch Workspace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Volunteer */}
          <div 
            onClick={() => { setRole('volunteer'); navigate('/volunteers'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/70 hover:border-orange-500/60 hover:bg-surface-container-high cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-ultra-soft hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-700 group-hover:scale-110 transition-transform">
                  <Users size={22} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xl bg-orange-500/15 text-orange-800 border border-orange-500/30">
                  Volunteer
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-on-surface group-hover:text-orange-700 transition-colors">
                Volunteer Coordinator
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans font-medium">
                Manage field volunteer task assignments, shift scheduling, lost-and-found cataloging, and real-time backup requests across stadium sectors.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-orange-700">
              <span className="uppercase tracking-wider">Launch Workspace</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Fan Spectator */}
          <div 
            onClick={() => { setRole('fan'); navigate('/fan'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/70 hover:border-sky-500/60 hover:bg-surface-container-high cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4 shadow-ultra-soft hover:-translate-y-1 md:col-span-2 lg:col-span-2"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-700 group-hover:scale-110 transition-transform">
                  <Compass size={22} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xl bg-sky-500/15 text-sky-800 border border-sky-500/30">
                  Spectator Fan
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-on-surface group-hover:text-sky-700 transition-colors">
                Fan Spectator Companion
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-sans font-medium max-w-xl">
                Navigate stadium stands, locate seat sections, check food queue wait times, find wheelchair-accessible pathways, and trigger emergency SOS assistance.
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-sky-700">
              <span className="uppercase tracking-wider">Launch Companion</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. CORE SYSTEM CAPABILITIES FEATURE SHOWCASE ── */}
      <section className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            INTELLIGENCE CAPABILITIES
          </span>
          <h2 className="text-3xl font-display font-black text-on-surface uppercase tracking-tight">
            Engineered for High-Consequence Stadium Environments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-3 text-left">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
              <Brain size={20} />
            </div>
            <h3 className="font-display font-black text-base text-on-surface">AI Neural Consensus Engine</h3>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Multi-agent reasoning models continuously evaluate crowd bottlenecks, transit schedules, and emergency alerts to reach cross-departmental consensus in under 1.2 seconds.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-3 text-left">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600">
              <Layers size={20} />
            </div>
            <h3 className="font-display font-black text-base text-on-surface">3D Stadium Digital Twin</h3>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Spatial visual floor plan representing stand sectors, turnstile congestion heatmaps, CCTV camera sightlines, and emergency egress routes in real time.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-3 text-left">
            <div className="h-10 w-10 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-600">
              <Globe size={20} />
            </div>
            <h3 className="font-display font-black text-base text-on-surface">Multilingual Broadcast & Audio</h3>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Instant translation of emergency safety alerts and public address announcements across 6 languages: English, Spanish, French, Portuguese, Arabic, and Hindi.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 shadow-ultra-soft space-y-3 text-left">
            <div className="h-10 w-10 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-600">
              <Navigation size={20} />
            </div>
            <h3 className="font-display font-black text-base text-on-surface">Accessible Fan Assistance</h3>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Dedicated Spectator Portal offering turn-by-turn wheelchair-accessible routing, food stall queue tracking, ticket gate guidance, and panic SOS dispatch.
            </p>
          </div>

        </div>
      </section>

      {/* Footer Branding */}
      <footer className="border-t border-outline-variant/60 pt-8 pb-4 text-center text-xs text-secondary font-mono space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Award size={14} className="text-primary" />
          <span className="font-bold text-on-surface">FIFA FLOW &bull; FIFA World Cup 2026 Operations Copilot</span>
        </div>
        <p className="text-[10px] text-secondary/70">
          Built for Challenge 4: FIFA Flow. All rights reserved.
        </p>
      </footer>

    </div>
  );
};
