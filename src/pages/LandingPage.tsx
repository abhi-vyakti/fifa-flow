import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeSettings } from '../contexts/ThemeContext';
import { useAtmosphereAudio } from '../hooks/useAtmosphereAudio';
import { 
  Brain, Sparkles, Play, Terminal, ArrowRight, 
  Compass, Volume2, VolumeX, CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  onTriggerIntro: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onTriggerIntro }) => {
  const navigate = useNavigate();
  const { setRole } = useThemeSettings();
  const { isPlaying: audioActive, toggleAudio: onToggleAudio } = useAtmosphereAudio();

  const sponsors = [
    { name: 'Groq API', desc: 'Ultra-fast Llama 3.3', logo: '⚡' },
    { name: 'React 18', desc: 'Component VDOM', logo: '⚛️' },
    { name: 'Node.js', desc: 'Express API Server', logo: '🟢' },
    { name: 'Supabase', desc: 'Auth & DB Gateway', logo: '🔥' },
    { name: 'Leaflet Maps', desc: 'Accessibility Geofence', logo: '🗺️' },
    { name: 'Recharts', desc: 'Telemetry Visualization', logo: '📈' }
  ];

  return (
    <div className="space-y-16 py-6 px-4 max-w-6xl mx-auto font-sans relative">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="text-center space-y-8 pt-10 relative">
        {/* Faint background brain icon — pure ambient */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
          <Brain size={380} className="text-aiCyan" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-fifaGold/10 to-transparent border border-fifaGold/25 rounded-full text-[10px] font-bold text-fifaGold uppercase tracking-widest mx-auto">
          <Sparkles size={11} className="text-fifaGold" />
          <span>FIFA World Cup 2026 Operations Copilot</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none font-sans uppercase">
          FIFA FLOW
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aiCyan via-fifaGold to-fifaRed mt-1">
            Stadium Intelligence
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          The intelligent operational layer behind the stadium experience. Bridging real-time sensor telemetries, volunteer grids, and fan assistance dynamically.
        </p>

        {/* Judge Evaluation Sequencer Panel */}
        <div className="max-w-md mx-auto bg-gradient-to-b from-white/[0.025] to-transparent border border-white/5 p-5 rounded-2xl space-y-4 shadow-glass">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-aiCyan animate-ping" />
            <span>Judge Evaluation Sequencer</span>
          </div>
          
          <button 
            onClick={onTriggerIntro}
            className="w-full flex items-center justify-center space-x-2.5 py-3 bg-gradient-to-r from-aiCyan via-blue-600 to-aiPurple hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-glow text-xs uppercase tracking-wider"
          >
            <Play size={11} fill="#FFF" />
            <span>Run Cinematic Broadcast Demo</span>
          </button>

          {/* Opt-in audio toggle */}
          <div className="flex justify-center pt-1">
            <button 
              onClick={onToggleAudio}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${audioActive ? 'bg-fifaGold/15 border-fifaGold text-fifaGold' : 'bg-white/5 border-darkBorder text-gray-400'}`}
            >
              {audioActive ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
              <span>{audioActive ? 'Atmosphere ON' : 'Enable Match Atmosphere'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. STADIUM VECTOR HERO VISUAL */}
      <section className="text-center">
        <div className="relative w-full max-w-2xl mx-auto h-[300px] bg-black/40 rounded-3xl border border-darkBorder overflow-hidden flex items-center justify-center shadow-glass">
          {/* Ambient top flare */}
          <div className="absolute top-0 w-80 h-40 bg-gradient-to-b from-aiCyan/8 to-transparent blur-[60px] rounded-full pointer-events-none" />
          
          {/* SVG Stadium HUD telemetry rings */}
          <svg width="100%" height="100%" viewBox="0 0 600 300" fill="none" className="relative z-10 opacity-70">
            {/* Outer ambient ring */}
            <ellipse cx="300" cy="150" rx="210" ry="105" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            {/* Scanning dashed ring */}
            <ellipse cx="300" cy="150" rx="165" ry="82" stroke="rgba(6,182,212,0.12)" strokeWidth="1.5" strokeDasharray="8,20" />
            {/* Inner pitch boundary */}
            <ellipse cx="300" cy="150" rx="115" ry="57" fill="rgba(0,255,102,0.008)" stroke="rgba(0,255,102,0.18)" strokeWidth="1" />
            {/* Telemetry sector pulse ring */}
            <ellipse cx="300" cy="150" rx="78" ry="39" stroke="rgba(212,175,55,0.15)" strokeWidth="2" strokeDasharray="35,115" />
            {/* Flow ingress vector line */}
            <path d="M 110,150 Q 205,88 300,118 T 490,150" stroke="url(#flowG)" strokeWidth="2" fill="none" />
            {/* Warning perimeter pulse */}
            <ellipse cx="300" cy="150" rx="145" ry="72" stroke="rgba(225,6,0,0.12)" strokeWidth="1.5" strokeDasharray="18,180" />
            {/* Spotlight beams from roof */}
            <line x1="195" y1="150" x2="160" y2="30" stroke="rgba(6,182,212,0.08)" strokeWidth="14" strokeLinecap="round" />
            <line x1="405" y1="150" x2="440" y2="30" stroke="rgba(6,182,212,0.08)" strokeWidth="14" strokeLinecap="round" />
            {/* Data node dots */}
            <circle cx="300" cy="91" r="3.5" fill="rgba(6,182,212,0.6)" />
            <circle cx="185" cy="150" r="2.5" fill="rgba(212,175,55,0.5)" />
            <circle cx="415" cy="150" r="2.5" fill="rgba(212,175,55,0.5)" />
            <circle cx="300" cy="209" r="3.5" fill="rgba(6,182,212,0.4)" />
            <defs>
              <linearGradient id="flowG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing spotlights from top */}
          <div className="absolute top-2 left-[33%] w-1 h-32 bg-aiCyan/12 blur-[4px] rotate-[12deg] rounded-full animate-pulse" />
          <div className="absolute top-2 right-[33%] w-1 h-32 bg-aiCyan/12 blur-[4px] -rotate-[12deg] rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />

          {/* Center HUD label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-1 pointer-events-none">
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-aiCyan/60">Digital Twin Active</div>
              <div className="text-[8px] text-gray-600 font-mono">94% Capacity • Gate C: Alert</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE PORTAL PATHWAYS */}
      <section className="space-y-5">
        <h2 className="text-[10px] font-bold text-center text-gray-500 uppercase tracking-widest">Select Your Workspace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          
          {/* Fan Companion */}
          <div 
            onClick={() => { setRole('fan'); navigate('/fan'); }}
            className="glass-panel p-6 rounded-2xl border border-darkBorder hover:border-aiCyan/40 hover:shadow-glow cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-aiCyan/5 border border-aiCyan/20 flex items-center justify-center text-aiCyan group-hover:scale-105 transition-transform">
                <Compass size={18} />
              </div>
              <h3 className="font-extrabold text-white text-sm tracking-wide group-hover:text-aiCyan transition-colors">
                Spectator Fan Companion
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Accessible routing, food queue monitors, parking zones, and emergency SOS for stadium guests.
              </p>
            </div>
            <div className="flex items-center text-[10px] text-aiCyan font-bold uppercase tracking-widest pt-1">
              <span>Open Companion</span>
              <ArrowRight size={11} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Operations Command */}
          <div 
            onClick={() => { setRole('organizer'); navigate('/commander'); }}
            className="glass-panel p-6 rounded-2xl border border-darkBorder hover:border-fifaGold/40 hover:shadow-glass cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-fifaGold/5 border border-fifaGold/20 flex items-center justify-center text-fifaGold group-hover:scale-105 transition-transform">
                <Terminal size={18} />
              </div>
              <h3 className="font-extrabold text-white text-sm tracking-wide group-hover:text-fifaGold transition-colors">
                Operations Command Control
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                SVG heatmaps, what-if simulations, dispatcher teams, and explainable AI reasoning traces.
              </p>
            </div>
            <div className="flex items-center text-[10px] text-fifaGold font-bold uppercase tracking-widest pt-1">
              <span>Enter Command</span>
              <ArrowRight size={11} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. LIVE TELEMETRY VALUE PROP PANEL */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-darkBorder max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3 text-left">
            <h3 className="text-[9px] text-aiCyan font-bold uppercase tracking-widest">Live Engine Telemetry</h3>
            <h2 className="text-xl font-bold font-sans tracking-wide text-white leading-tight">
              Context-aware command intelligence.
            </h2>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              FLOW processes live sensors, updates gate validations, evaluates queues, and provides explainable, structured AI recommendations with confidence traces.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] text-gray-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                <span>94% Model Accuracy</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                <span>520ms Ingress Latency</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-darkBorder p-4 rounded-xl space-y-3 text-left">
            <div className="flex items-center justify-between text-[9px] text-gray-500 uppercase tracking-widest border-b border-darkBorder pb-2">
              <span>AI Pipeline Status</span>
              <span className="text-aiCyan font-bold">STABLE</span>
            </div>
            <div className="bg-red-950/20 border border-red-500/15 p-3 rounded-lg text-xs space-y-1">
              <div className="flex items-center justify-between text-red-400 font-bold text-[11px]">
                <span>Gate C Congestion</span>
                <span>96% CONF</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">Metro Line 2 platform arrived. Redirecting ingress flows to Gate D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECH BADGES */}
      <section className="space-y-4 text-center">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Built With</h3>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {sponsors.map((tech) => (
            <div 
              key={tech.name}
              className="glass-panel px-3 py-2 rounded-xl border border-darkBorder flex items-center space-x-2 text-xs"
            >
              <span className="text-xs shrink-0">{tech.logo}</span>
              <div>
                <span className="font-bold text-white text-[11px] block">{tech.name}</span>
                <span className="text-[9px] text-gray-500 font-mono leading-none">{tech.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
