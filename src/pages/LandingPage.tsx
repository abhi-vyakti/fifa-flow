import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Brain, Shield, Sparkles, Play, Terminal, ArrowRight, 
  MapPin, Settings, Compass, Users, Activity, Leaf, Code2, Globe, Heart, CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startJudgeDemo, isPlayingDemo } = useLiveData();
  const { setRole } = useThemeSettings();

  const handleLaunchDemo = () => {
    setRole('organizer');
    startJudgeDemo();
    navigate('/commander');
  };

  const sponsors = [
    { name: 'Groq API', desc: 'Ultra-fast Llama 3.3', logo: '⚡' },
    { name: 'React 18', desc: 'Component VDOM', logo: '⚛️' },
    { name: 'Node.js', desc: 'Express API Server', logo: '🟢' },
    { name: 'Supabase', desc: 'Auth & DB Gateway', logo: '⚡' },
    { name: 'Leaflet Maps', desc: 'Accessibility Geofence', logo: '🗺️' },
    { name: 'Recharts', desc: 'Telemetry Visualization', logo: '📈' }
  ];

  return (
    <div className="space-y-16 py-6 px-4 max-w-6xl mx-auto font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 pt-10 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Brain size={350} className="text-aiCyan animate-pulse-slow" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-fifaGold/15 to-fifaRed/15 border border-fifaGold/35 rounded-full text-[10px] font-bold text-fifaGold uppercase tracking-widest mx-auto shadow-glass">
          <Sparkles size={12} className="animate-spin text-fifaGold" />
          <span>FIFA World Cup 2026 Operations Copilot</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
          FIFA FLOW
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aiCyan via-fifaGold to-fifaRed">
            AI Operating System
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          The intelligent operational layer behind the stadium experience. Bridging real-time sensor telemetries, volunteer grids, and fans assistance dynamically.
        </p>

        {/* Guided Walkthrough Callout */}
        <div className="max-w-md mx-auto bg-gradient-to-r from-aiPurple/10 via-aiCyan/10 to-transparent border border-aiCyan/20 p-4 rounded-2xl space-y-3">
          <div className="text-xs text-white font-bold flex items-center justify-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-aiCyan animate-ping" />
            <span>Judge Evaluation Shortcut</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Click below to launch an automated 60-second guided simulation walkthrough (Kickoff rush, metro delay, volunteer rerouting).
          </p>
          <button 
            onClick={handleLaunchDemo}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-aiCyan via-blue-600 to-aiPurple hover:brightness-115 text-white font-bold rounded-xl transition-all shadow-glow text-xs uppercase tracking-wider"
          >
            <Play size={12} fill="#FFF" />
            <span>🚀 Run Guided Walkthrough</span>
          </button>
        </div>
      </section>

      {/* 2. SIMPLIFIED STAKEHOLDER PORTAL PATHWAYS */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-center text-white uppercase tracking-wider">Select Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Spectator Companion */}
          <div 
            onClick={() => { setRole('fan'); navigate('/fan'); }}
            className="glass-panel p-6 rounded-2xl border border-darkBorder hover:border-aiCyan/40 hover:shadow-glow cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-aiCyan/10 border border-aiCyan/30 flex items-center justify-center text-aiCyan group-hover:scale-110 transition-transform">
                <Compass size={22} />
              </div>
              <h3 className="font-extrabold text-white text-md tracking-wide group-hover:text-aiCyan transition-colors">
                Spectator Fan Portal
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Optimized mobile companion for stadium guests. Get accessible wheelchair routing directions, inspect concession queue forecasts, scan seat maps, and log emergency SOS alerts.
              </p>
            </div>
            
            <div className="flex items-center text-xs text-aiCyan font-bold uppercase tracking-wider pt-2">
              <span>Open Fan Assistant</span>
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Operations Command Center */}
          <div 
            onClick={() => { setRole('organizer'); navigate('/commander'); }}
            className="glass-panel p-6 rounded-2xl border border-darkBorder hover:border-fifaGold/40 hover:shadow-glass cursor-pointer transition-all duration-300 group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-fifaGold/10 border border-fifaGold/30 flex items-center justify-center text-fifaGold group-hover:scale-110 transition-transform">
                <Terminal size={22} />
              </div>
              <h3 className="font-extrabold text-white text-md tracking-wide group-hover:text-fifaGold transition-colors">
                Stadium Operations Command
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Control panel built for organizers, medical dispatchers, security rovers, and volunteers. Inspect SVG Digital Twins, run what-if simulators, and access AI summaries.
              </p>
            </div>
            
            <div className="flex items-center text-xs text-fifaGold font-bold uppercase tracking-wider pt-2">
              <span>Enter Operations Command</span>
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION PREVIEW */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-darkBorder relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-aiCyan/10 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-[10px] text-aiCyan font-bold uppercase tracking-wider">Predictive Telemetry Processing</h3>
            <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-wide text-white leading-tight">
              An intelligent, context-aware command center.
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              FIFA FLOW continuously processes live sensors, updates gate validations, evaluates medical queues, and provides explainable, structured AI recommendations.
            </p>
            
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>94% Telemetry Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>520ms Copilot Latency</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Multilingual Synthesizer</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Carbon Offset Tracking</span>
              </div>
            </div>
          </div>

          {/* AI telemetries UI Mockup */}
          <div className="bg-black/45 border border-darkBorder p-5 rounded-2xl space-y-4 relative">
            <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest border-b border-darkBorder pb-2">
              <span>Live Command Dispatch</span>
              <span className="text-aiCyan font-bold">10s TELEMETRY</span>
            </div>
            
            <div className="space-y-2.5">
              <div className="bg-red-950/20 border border-red-500/20 p-3 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-red-400 font-bold">
                  <span>Gate C Congestion warning</span>
                  <span>96% Conf</span>
                </div>
                <p className="text-[11px] text-gray-400">Metro Line 2 platform arrived. Redirecting ingress flows to Gate D.</p>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Concession queue load balance</span>
                  <span>89% Conf</span>
                </div>
                <p className="text-[11px] text-gray-400">Stall 18 queue exceeds 18 mins. Redirecting vegan orders to Stall 20.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REFINED PIPELINE WORKFLOW */}
      <section className="space-y-6">
        <h2 className="text-base font-bold text-center text-white uppercase tracking-wider">The Live Reasoning Pipeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Telemetry Engine', desc: 'Simulates sensor streams for gates, transits, and utility grids.' },
            { step: '02', title: 'Context Collector', desc: 'Aggregates active user roles and coordinates stands positioning.' },
            { step: '03', title: 'Decision Engine', desc: 'Filters priority rules and evaluates capacity bottlenecks.' },
            { step: '04', title: 'Groq API', desc: 'Processes context-rich json inputs using Llama 3.3 models.' },
            { step: '05', title: 'Reasoning Formatter', desc: 'Outputs structured confidence values and maps dashboards.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-xl border border-darkBorder flex flex-col justify-between items-center text-center text-xs space-y-2">
              <span className="text-[10px] font-black text-aiCyan bg-aiCyan/10 px-2 py-0.5 border border-aiCyan/30 rounded-full font-mono">
                {item.step}
              </span>
              <h4 className="font-extrabold text-white">{item.title}</h4>
              <p className="text-[10px] text-gray-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TECH BADGES */}
      <section className="space-y-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Sponsor Technology Stack</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {sponsors.map((tech) => (
            <div 
              key={tech.name}
              className="glass-panel px-4 py-2 rounded-lg border border-darkBorder flex items-center space-x-2 text-xs text-left"
            >
              <span className="text-sm shrink-0">{tech.logo}</span>
              <div>
                <span className="font-bold text-white block">{tech.name}</span>
                <span className="text-[9px] text-gray-500 font-mono leading-none">{tech.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-darkBorder pt-6 pb-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-fifaGold to-fifaRed flex items-center justify-center text-[10px] font-bold text-white">F</div>
          <span className="font-bold text-white">FIFA FLOW</span>
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/commander')}>Situation Room</span>
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/architecture')}>System Arch</span>
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/settings')}>Preferences</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>Made for 2026 World Cup</span>
          <Heart size={10} className="text-red-500 animate-pulse" />
        </div>
      </footer>

    </div>
  );
};
