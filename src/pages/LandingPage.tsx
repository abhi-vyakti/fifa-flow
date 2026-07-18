import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Brain, Shield, Sparkles, Play, Terminal, ArrowRight, 
  MapPin, Settings, Compass, Users, Activity, Leaf, Code2, Globe, Heart
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startJudgeDemo, isPlayingDemo } = useLiveData();
  const { setRole } = useThemeSettings();

  const handleLaunchDemo = () => {
    // 1. Switch active role view to organizer command center
    setRole('organizer');
    // 2. Start the automated judge story player
    startJudgeDemo();
    // 3. Navigate to Situation Room page
    navigate('/commander');
  };

  // Sponsor Tech Badges structure
  const sponsors = [
    { name: 'Groq API', desc: 'Ultra-fast Llama 3.3', logo: '⚡' },
    { name: 'React 18', desc: 'Component VDOM', logo: '⚛️' },
    { name: 'Node.js', desc: 'Express API Server', logo: '🟢' },
    { name: 'Supabase', desc: 'Auth & DB Gateway', logo: '⚡' },
    { name: 'Leaflet Maps', desc: 'Accessibility Geofence', logo: '🗺️' },
    { name: 'Recharts', desc: 'Telemetry Visualization', logo: '📈' }
  ];

  return (
    <div className="space-y-20 py-8 px-4 max-w-7xl mx-auto font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 pt-12 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Brain size={400} className="text-aiCyan animate-pulse-slow" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-aiCyan/10 to-aiPurple/10 border border-aiCyan/25 rounded-full text-xs font-bold text-aiCyan uppercase tracking-widest mx-auto shadow-glow">
          <Sparkles size={12} className="animate-spin" />
          <span>FIFA World Cup 2026 Operations</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight font-sans">
          FIFA FLOW
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aiCyan via-fifaGold to-aiPurple">
            AI Operations Copilot
          </span>
        </h1>

        <p className="text-md sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The real-time operational engine behind every match. Empowering organizers, security, medical, and volunteers with context-aware crowd intelligence.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button 
            onClick={handleLaunchDemo}
            className="flex items-center space-x-2.5 px-8 py-4 bg-gradient-to-r from-aiCyan via-blue-600 to-aiPurple hover:brightness-110 text-white font-extrabold rounded-xl transition-all shadow-glow text-md border border-white/10 group transform hover:-translate-y-0.5"
          >
            <Play size={18} fill="#FFF" className="text-white animate-pulse" />
            <span>🚀 Launch Judge Demo</span>
            <ArrowRight size={16} className="transition-all group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => navigate('/commander')}
            className="px-6 py-4 bg-white/5 border border-darkBorder hover:border-darkBorderGlow rounded-xl text-xs font-bold tracking-wider uppercase text-white hover:bg-white/10 transition-all"
          >
            Open Command Center
          </button>
        </div>

        {isPlayingDemo && (
          <div className="text-xs text-aiCyan font-semibold animate-pulse mt-3">
            Judge mode walkthrough is playing in the background. Navigate to the Situation Room to inspect.
          </div>
        )}
      </section>

      {/* 2. SPONSOR TECH BADGES */}
      <section className="space-y-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Built With Leading Hackathon Tech</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {sponsors.map((tech) => (
            <div 
              key={tech.name}
              className="glass-panel px-4 py-2.5 rounded-xl border border-darkBorder hover:border-darkBorderGlow flex items-center space-x-2.5 transition-all text-xs text-left cursor-default"
            >
              <span className="text-md shrink-0">{tech.logo}</span>
              <div>
                <span className="font-bold text-white block">{tech.name}</span>
                <span className="text-[10px] text-gray-500 font-mono leading-none">{tech.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LIVE AI PREVIEW PRESET */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-darkBorder relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-aiCyan/10 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-sans tracking-wide text-white">Context-Aware Operations Summary</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              FLOW AI collects real-time sensor parameters, maps crowd densities, checks transport schedules, and provides actionable summaries tailored to different stakeholder roles.
            </p>
            <div className="space-y-2 text-xs">
              {[
                'Predictive bottleneck alerting (e.g. Gate C queue warnings)',
                'Automated volunteer task allocations and gamification tracking',
                'Emergency medical dispatcher route calculations avoiding crowd paths',
                'Sustainability engine monitoring water / electrical consumption'
              ].map((f, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-aiCyan" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive AI Telemetry Card */}
          <div className="bg-black/45 border border-darkBorder p-5 rounded-2xl space-y-4 relative">
            <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest border-b border-darkBorder pb-2">
              <span>FLOW AI System Summary</span>
              <span className="text-aiCyan font-bold">10s telemetry</span>
            </div>
            
            <div className="space-y-3">
              <div className="bg-red-950/20 border border-red-500/20 p-3 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-red-400 font-bold">
                  <span>Gate C Ingress congestion expected within 6 minutes.</span>
                  <span>96% Conf</span>
                </div>
                <p className="text-[11px] text-gray-400">Metro Line 2 just arrived. Gate C volume is already at 84% capacity.</p>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Power Optimization Recommendation</span>
                  <span>94% Conf</span>
                </div>
                <p className="text-[11px] text-gray-400">Match is active. Recommend dimming outer structural ring lighting by 30% to conserve grid load.</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-darkBorder pt-3">
              <span>Telemetry status: stable</span>
              <button 
                onClick={() => navigate('/commander')} 
                className="text-aiCyan font-bold uppercase hover:underline"
              >
                Launch dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYSTEM ARCHITECTURE PROCESS FLOW */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-sans tracking-wide text-white">The Live Reasoning Pipeline</h2>
          <p className="text-xs text-gray-400 max-w-lg mx-auto">
            Instead of routing raw prompts directly to LLMs, FLOW AI collects telemetry parameters first, validates constraints, and generates reasoning traces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
          {[
            { step: '01', title: 'Telemetry Engine', desc: 'Simulates raw data streams from gates, transits, and grids.' },
            { step: '02', title: 'Context Collector', desc: 'Aggregates user roles, section locations, and active safety alerts.' },
            { step: '03', title: 'Decision Engine', desc: 'Evaluates priority rules, capacity thresholds, and logs alternative steps.' },
            { step: '04', title: 'Groq API', desc: 'Processes context-rich JSON requests using Llama 3.3.' },
            { step: '05', title: 'Reasoning Formatter', desc: 'Extracts confidence logs and parses variables to dashboards.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-darkBorder flex flex-col justify-between items-center text-xs space-y-2">
              <span className="text-xs font-black text-aiCyan bg-aiCyan/10 px-2 py-0.5 border border-aiCyan/30 rounded-full font-mono">
                {item.step}
              </span>
              <h4 className="font-extrabold text-white">{item.title}</h4>
              <p className="text-[11px] text-gray-400 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT FOOTER */}
      <footer className="border-t border-darkBorder pt-8 pb-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-fifaGold to-fifaRed flex items-center justify-center text-[10px] font-bold text-white">F</div>
          <span className="font-bold text-white">FIFA FLOW</span>
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/commander')}>Situation Room</span>
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/architecture')}>System Arch</span>
          <span className="hover:text-white transition-all cursor-pointer" onClick={() => navigate('/settings')}>Preferences</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span>Made for 2026 World Cup Hackathon</span>
          <Heart size={10} className="text-red-500 animate-pulse" />
        </div>
      </footer>

    </div>
  );
};
