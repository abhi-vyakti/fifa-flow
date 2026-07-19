import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Brain, Sparkles, Terminal, ArrowRight, 
  Compass, CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useThemeSettings();

  return (
    <div className="space-y-16 py-6 px-4 max-w-6xl mx-auto font-sans relative">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="text-center space-y-8 pt-10 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
          <Brain size={380} className="text-primary" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-primary/10 border border-primary/25 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest mx-auto">
          <Sparkles size={11} className="text-primary" />
          <span>FIFA World Cup 2026 Operations Copilot</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-headline font-black tracking-tight text-on-surface leading-none uppercase">
          FIFA FLOW
          <span className="block text-primary mt-1">
            Stadium Intelligence
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
          The intelligent operational layer behind the stadium experience. Bridging real-time sensor telemetries, volunteer grids, and fan assistance dynamically.
        </p>

        {/* Platform Control Entry */}
        <div className="max-w-md mx-auto bg-surface-container-low border border-outline-variant/60 p-5 rounded-3xl shadow-ultra-soft">
          <button 
            onClick={() => {
              navigate('/select-persona');
            }}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl transition-all shadow-ultra-soft text-xs uppercase tracking-wider cursor-pointer"
          >
            <span>Enter Operations Platform</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 2. STADIUM VECTOR HERO VISUAL */}
      <section className="text-center">
        <div className="relative w-full max-w-2xl mx-auto h-[300px] bg-surface-container rounded-3xl border border-outline-variant/60 overflow-hidden flex items-center justify-center shadow-ultra-soft">
          <div className="absolute top-0 w-80 h-40 bg-gradient-to-b from-primary/5 to-transparent blur-[60px] rounded-full pointer-events-none" />
          
          <svg width="100%" height="100%" viewBox="0 0 600 300" fill="none" className="relative z-10 opacity-70">
            <ellipse cx="300" cy="150" rx="210" ry="105" stroke="currentColor" className="text-outline-variant/30" strokeWidth="1" />
            <ellipse cx="300" cy="150" rx="165" ry="82" stroke="currentColor" className="text-primary/20" strokeWidth="1.5" strokeDasharray="8,20" />
            <ellipse cx="300" cy="150" rx="115" ry="57" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
            <ellipse cx="300" cy="150" rx="78" ry="39" stroke="currentColor" className="text-primary/10" strokeWidth="2" strokeDasharray="35,115" />
            <path d="M 110,150 Q 205,88 300,118 T 490,150" stroke="url(#flowG)" strokeWidth="2" fill="none" />
            <ellipse cx="300" cy="150" rx="145" ry="72" stroke="rgba(239,68,68,0.2)" strokeWidth="1.5" strokeDasharray="18,180" />
            <defs>
              <linearGradient id="flowG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c2652a" stopOpacity="0" />
                <stop offset="50%" stopColor="#c2652a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c2652a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center HUD label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-1 pointer-events-none">
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-primary">Digital Twin Active</div>
              <div className="text-[8px] text-secondary font-mono">98% Capacity &bull; Gate C: Stable</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE PORTAL PATHWAYS */}
      <section className="space-y-5">
        <h2 className="text-[10px] font-bold text-center text-secondary uppercase tracking-widest">Select Your Workspace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto font-sans">
          
          {/* Fan Companion */}
          <div 
            onClick={() => { setRole('fan'); navigate('/fan'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 hover:border-primary hover:shadow-ultra-soft cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Compass size={18} />
              </div>
              <h3 className="font-headline font-black text-lg text-on-surface group-hover:text-primary transition-colors">
                Spectator Fan Companion
              </h3>
              <p className="text-[11px] text-secondary leading-relaxed">
                Accessible routing, food queue monitors, parking zones, and emergency SOS for stadium guests.
              </p>
            </div>
            <div className="flex items-center text-[10px] text-primary font-bold uppercase tracking-widest pt-1">
              <span>Open Companion</span>
              <ArrowRight size={11} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Operations Command */}
          <div 
            onClick={() => { setRole('organizer'); navigate('/mission-control'); }}
            className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/60 hover:border-primary hover:shadow-ultra-soft cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Terminal size={18} />
              </div>
              <h3 className="font-headline font-black text-lg text-on-surface group-hover:text-primary transition-colors">
                Operations Command Control
              </h3>
              <p className="text-[11px] text-secondary leading-relaxed">
                SVG heatmaps, what-if simulations, dispatcher teams, and explainable AI reasoning traces.
              </p>
            </div>
            <div className="flex items-center text-[10px] text-primary font-bold uppercase tracking-widest pt-1">
              <span>Enter Command</span>
              <ArrowRight size={11} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. LIVE TELEMETRY VALUE PROP PANEL */}
      <section className="bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-outline-variant/60 max-w-3xl mx-auto shadow-ultra-soft">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3 text-left">
            <h3 className="text-[9px] text-primary font-bold uppercase tracking-widest">Live Engine Telemetry</h3>
            <h2 className="text-xl font-headline font-black text-on-surface leading-tight">
              Context-aware command intelligence.
            </h2>
            <p className="text-[11px] text-secondary leading-relaxed">
              FLOW processes live sensors, updates gate validations, evaluates queues, and provides explainable, structured AI recommendations with confidence traces.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] text-secondary">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                <span>98.9% Model Accuracy</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={11} className="text-emerald-600 shrink-0" />
                <span>520ms Ingress Latency</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-2xl space-y-3 text-left">
            <div className="flex items-center justify-between text-[9px] text-secondary uppercase tracking-widest border-b border-outline-variant pb-2 font-mono">
              <span>AI Pipeline Status</span>
              <span className="text-primary font-bold">STABLE</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between text-primary font-bold text-[11px] font-mono">
                <span>Gate C Congestion</span>
                <span>96% CONF</span>
              </div>
              <p className="text-[10px] text-secondary leading-relaxed">Metro Line 2 platform arrived. Redirecting ingress flows to Gate D.</p>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};
