import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings, type UserRole } from '../contexts/ThemeContext';
import { useAtmosphereAudio } from '../hooks/useAtmosphereAudio';
import { 
  Shield, Users, Activity, Sliders, LayoutDashboard, Brain, Compass, 
  Map, Terminal, Settings as SettingsIcon, AlertCircle, Wifi, Play, StopCircle, 
  Activity as TelemetryIcon, Languages, HelpCircle, CheckCircle2, ChevronRight, Menu, X, HelpCircle as ArchIcon,
  Volume2, VolumeX, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onTriggerIntro?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onTriggerIntro: _onTriggerIntro }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    state, isPlayingDemo, activeDemoStep, startJudgeDemo, stopJudgeDemo, resolveIncident 
  } = useLiveData();
  const { 
    role, setRole, language, setLanguage, highContrast 
  } = useThemeSettings();

  const { isPlaying: audioActive, toggleAudio: onToggleAudio } = useAtmosphereAudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitySidebarOpen, setActivitySidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');

  // Listening to Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // List of paths and navigation
  const navItems = [
    { name: 'Landing Overview', path: '/', icon: LayoutDashboard },
    { name: 'AI Situation Room', path: '/commander', icon: Brain, badge: 'CORE' },
    { name: 'Organizer Dashboard', path: '/dashboard', icon: Terminal },
    { name: 'Fan Assistant Portal', path: '/fan', icon: Compass },
    { name: 'Volunteer Portal', path: '/volunteer', icon: Users },
    { name: 'Security Patrol', path: '/security', icon: Shield },
    { name: 'Medical Dispatch', path: '/medical', icon: Activity },
    { name: 'System Architecture', path: '/architecture', icon: ArchIcon, badge: 'JUDGE' },
    { name: 'Settings Options', path: '/settings', icon: SettingsIcon }
  ];

  // Map roles to dashboard paths
  const roleRoutes: Record<UserRole, string> = {
    organizer: '/commander',
    fan: '/fan',
    volunteer: '/volunteer',
    security: '/security',
    medical: '/medical'
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    navigate(roleRoutes[newRole]);
  };

  // Convert current path to readable breadcrumbs
  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'FIFA FLOW > LANDING';
    return `FIFA FLOW > ${segments.map(s => s.toUpperCase()).join(' > ')}`;
  };

  const demoSteps = [
    { title: 'Kickoff Rush', desc: 'Stadium filling up quickly' },
    { title: 'Metro Arrival', desc: 'Transit terminal surge' },
    { title: 'Gate C Congestion', desc: 'Entry bottleneck warning' },
    { title: 'FLOW Prediction', desc: 'Hotspot warning trigger' },
    { title: 'Volunteers Deployed', desc: 'Dispatched to Section C2' },
    { title: 'Routes Updated', desc: 'Egress rerouted to Gate D' },
    { title: 'Crowd Normalized', desc: 'Congestion levels drop' },
    { title: 'Incident Resolved', desc: 'Bypass parameters cleared' },
    { title: 'Diagnostic Complete', desc: 'Stadium health score: 96%' }
  ];

  const isLanding = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col bg-[#020308] text-gray-100 ${highContrast ? 'high-contrast' : ''}`}>
      
      {/* 1. Judge Mode Progress Overlay (Sticky Top) */}
      {isPlayingDemo && activeDemoStep !== null && (
        <div className="bg-gradient-to-r from-aiPurple/90 via-aiCyan/90 to-emerald-600/90 text-white px-4 py-3 flex flex-wrap items-center justify-between shadow-lg backdrop-blur-md sticky top-0 z-50 transition-all duration-500 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div className="text-sm font-semibold tracking-wider font-sans uppercase">
              JUDGE MODE ACTIVE &bull; STEP {activeDemoStep + 1} of {demoSteps.length}
            </div>
            <div className="hidden md:block text-xs bg-white/20 px-2 py-0.5 rounded font-medium">
              {demoSteps[activeDemoStep]?.title}: {demoSteps[activeDemoStep]?.desc}
            </div>
          </div>

          {/* Visual Step Dots */}
          <div className="hidden lg:flex items-center space-x-1">
            {demoSteps.map((s, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${idx <= activeDemoStep ? 'bg-white scale-125' : 'bg-white/30'}`} title={s.title} />
                {idx < demoSteps.length - 1 && <div className={`h-0.5 w-4 ${idx < activeDemoStep ? 'bg-white' : 'bg-white/30'}`} />}
              </div>
            ))}
          </div>

          <button 
            onClick={stopJudgeDemo}
            className="flex items-center space-x-1 text-xs font-bold uppercase bg-darkBg/60 border border-white/20 px-3 py-1.5 rounded hover:bg-darkBg/95 transition-all text-white"
          >
            <StopCircle size={14} className="text-red-500" />
            <span>Stop Demo</span>
          </button>
        </div>
      )}

      {/* 2. Top Header Navbar (Live Broadcast Match Ribbon) */}
      <header className={`h-20 border-b border-darkBorder bg-darkCard/45 backdrop-blur-xl flex items-center justify-between px-6 z-40 sticky top-0 ${isLanding ? 'hidden' : ''}`}>
        
        {/* Left Section: Logo & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden hover:bg-white/5 rounded text-gray-400"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fifGold via-fifaRed to-aiCyan flex items-center justify-center font-bold text-white shadow-glow">
              F
            </div>
            <div className="hidden md:block leading-none">
              <span className="font-extrabold text-white text-sm font-sans tracking-wide">FIFA FLOW</span>
              <span className="text-[8px] text-gray-500 block uppercase font-mono tracking-widest mt-0.5">OPS COPILOT</span>
            </div>
          </div>

          {/* Breadcrumbs for spatial awareness */}
          <div className="hidden lg:block text-[9px] text-gray-500 font-mono tracking-wider pl-4 border-l border-darkBorder">
            {getBreadcrumbs()}
          </div>
        </div>

        {/* Center Section: Live Broadcast Tournament Score Ribbon */}
        <div className="flex items-center bg-black/40 border border-darkBorder px-4 py-2 rounded-full space-x-4 text-xs font-semibold shadow-inner">
          <div className="flex items-center space-x-1.5 text-fifaRed">
            <span className="h-2 w-2 rounded-full bg-fifaRed animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider">LIVE</span>
          </div>
          <div className="text-white flex items-center space-x-2">
            <span>🇺🇸 USA</span>
            <span className="bg-white/10 px-2 py-0.5 rounded font-bold font-mono">1 - 0</span>
            <span>ENG 🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
          </div>
          <span className="text-gray-500">|</span>
          <span className="text-fifaGold font-mono">78:42 min</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">Group A</span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-aiCyan hidden sm:inline">Capacity: 94%</span>
        </div>

        {/* Right Section: Translate, Audio & Control Tools */}
        <div className="flex items-center space-x-3">
          
          {/* Cmd+K Search trigger button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 bg-white/5 border border-darkBorder hover:border-darkBorderGlow px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 transition-all"
            title="Search Dashboard (Ctrl+K)"
          >
            <Search size={13} />
            <span className="text-[10px] font-mono border border-white/10 px-1 rounded bg-black/20">Ctrl+K</span>
          </button>

          {/* Opt-in audio toggle button */}
          <button 
            onClick={onToggleAudio}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${audioActive ? 'bg-fifaGold/15 border-fifaGold text-fifaGold shadow-glass' : 'bg-white/5 border-darkBorder text-gray-400'}`}
          >
            {audioActive ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
            <span className="hidden lg:inline">{audioActive ? '🔊 Atmosphere ON' : '🔇 Muted Ambient'}</span>
          </button>

          {/* Language Selector */}
          <div className="hidden sm:flex items-center bg-white/5 border border-darkBorder rounded-lg px-2 py-1.5 text-xs">
            <Languages size={13} className="text-gray-400 mr-1.5" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border-none outline-none text-white cursor-pointer font-medium"
            >
              <option value="en" className="bg-darkBg">EN</option>
              <option value="es" className="bg-darkBg">ES</option>
              <option value="fr" className="bg-darkBg">FR</option>
              <option value="pt" className="bg-darkBg">PT</option>
              <option value="ar" className="bg-darkBg">AR</option>
              <option value="hi" className="bg-darkBg">HI</option>
            </select>
          </div>

          <button 
            onClick={() => setActivitySidebarOpen(!activitySidebarOpen)}
            className={`p-2 rounded-lg border transition-all ${activitySidebarOpen ? 'bg-aiCyan/10 border-aiCyan/30 text-aiCyan' : 'bg-white/5 border-darkBorder text-gray-400 hover:text-white'}`}
            title="Toggle Live Activity Feed"
          >
            <AlertCircle size={16} />
          </button>
        </div>
      </header>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Left Navigation (Desktop Hover-Expanding Rail) */}
        <aside 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`hidden md:flex flex-col border-r border-darkBorder bg-darkCard/30 backdrop-blur-md p-4 space-y-6 transition-all duration-300 ease-[0.16,1,0.3,1] z-30 ${isSidebarHovered ? 'w-64' : 'w-20'} ${isLanding ? '!hidden' : ''}`}
        >
            
            {/* Active Role Toggle Panel */}
            <div className="bg-white/5 border border-darkBorder p-3 rounded-xl overflow-hidden">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
              {isSidebarHovered && <span>Active Persona</span>}
              <Wifi size={10} className="text-emerald-500 animate-pulse shrink-0 mx-auto" />
            </div>
            
            <select
              value={role}
              onChange={(e) => handleRoleChange(e.target.value as any)}
              className="w-full bg-darkBg text-white text-xs border border-darkBorder rounded-lg p-2 focus:outline-none focus:border-aiCyan"
            >
              <option value="organizer">{isSidebarHovered ? 'Organizer' : 'ORG'}</option>
              <option value="fan">{isSidebarHovered ? 'Fan companion' : 'FAN'}</option>
              <option value="volunteer">{isSidebarHovered ? 'Volunteer' : 'VOL'}</option>
              <option value="security">{isSidebarHovered ? 'Security' : 'SEC'}</option>
              <option value="medical">{isSidebarHovered ? 'Medical' : 'MED'}</option>
            </select>
          </div>

          {/* Grouped Nav Links */}
          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            
            {/* MATCH CONTROL GROUP */}
            <div className="space-y-1">
              {isSidebarHovered && <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest px-3 mb-1.5">MATCH CONTROL</div>}
              {[
                { name: 'AI Situation Room', path: '/commander', icon: Brain, badge: 'CORE' },
                { name: 'Organizer Dashboard', path: '/dashboard', icon: Terminal },
                { name: 'System Architecture', path: '/architecture', icon: ArchIcon, badge: 'JUDGE' }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${isActive ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-l-2 border-aiCyan text-white shadow-glow' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isSidebarHovered ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon size={15} className={isActive ? 'text-aiCyan' : 'text-gray-400 group-hover:text-white'} />
                      {isSidebarHovered && <span>{item.name}</span>}
                    </div>
                    {isSidebarHovered && item.badge && (
                      <span className="text-[8px] bg-aiPurple/20 border border-aiPurple/30 text-aiPurple font-extrabold px-1 rounded uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* STAKEHOLDER PORTALS GROUP */}
            <div className="space-y-1">
              {isSidebarHovered && <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest px-3 mb-1.5">ROLES COMMAND</div>}
              {[
                { name: 'Fan Assistant Portal', path: '/fan', icon: Compass },
                { name: 'Volunteer Portal', path: '/volunteer', icon: Users },
                { name: 'Security Patrol', path: '/security', icon: Shield },
                { name: 'Medical Dispatch', path: '/medical', icon: Activity }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${isActive ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-l-2 border-aiCyan text-white shadow-glow' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isSidebarHovered ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon size={15} className={isActive ? 'text-aiCyan' : 'text-gray-400 group-hover:text-white'} />
                      {isSidebarHovered && <span>{item.name}</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* PREFERENCES GROUP */}
            <div className="space-y-1">
              {isSidebarHovered && <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest px-3 mb-1.5">PREFERENCES</div>}
              {[
                { name: 'Landing Overview', path: '/', icon: LayoutDashboard },
                { name: 'Settings Options', path: '/settings', icon: SettingsIcon }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${isActive ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-l-2 border-aiCyan text-white shadow-glow' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isSidebarHovered ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon size={15} className={isActive ? 'text-aiCyan' : 'text-gray-400 group-hover:text-white'} />
                      {isSidebarHovered && <span>{item.name}</span>}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Sidebar Footer */}
          <div className="text-center text-[9px] text-gray-600 border-t border-darkBorder pt-3">
            {isSidebarHovered ? <span>2026 World Cup &bull; FIFA FLOW</span> : <span>'26</span>}
          </div>
        </aside>

        {/* Sidebar Left Navigation (Mobile Drawer overlay) */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <aside className="w-64 h-full bg-darkBg border-r border-darkBorder p-4 flex flex-col space-y-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-darkBorder pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-fifaGold to-fifaRed flex items-center justify-center font-bold text-white">F</div>
                  <span className="font-extrabold text-white">FIFA FLOW</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded hover:bg-white/5 text-gray-400">
                  <X size={18} />
                </button>
              </div>

              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Select Persona</div>
                <select
                  value={role}
                  onChange={(e) => {
                    handleRoleChange(e.target.value as any);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-darkBg text-white text-xs border border-darkBorder rounded p-2 outline-none"
                >
                  <option value="organizer">Organizer Command</option>
                  <option value="fan">Fan Assistant</option>
                  <option value="volunteer">Volunteer Portal</option>
                  <option value="security">Security Patrol</option>
                  <option value="medical">Medical Dispatch</option>
                </select>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm ${isActive ? 'bg-aiCyan/10 border-l-2 border-aiCyan text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        )}

        {/* Main Dashboard Pages Slot (Uses directional camera pan reveal transition) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-darkBg/60 to-darkBg relative z-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>

        {/* Right Sidebar - Live Activity Feed */}
        {!isLanding && activitySidebarOpen && (
          <aside className="hidden xl:flex flex-col w-80 border-l border-darkBorder bg-darkCard/20 backdrop-blur-md p-4 space-y-4 overflow-hidden h-[calc(100vh-5rem)] sticky top-20">
            <div className="flex items-center justify-between border-b border-darkBorder pb-3">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-sm tracking-wide text-white uppercase">Live Activity Feed</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">10s TELEMETRY</span>
            </div>

            {/* List of scrollable events */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {state.liveActivityFeed.map((item, idx) => {
                let badgeClass = 'bg-white/5 text-gray-400';
                if (item.type === 'medical') badgeClass = 'bg-red-500/20 border-red-500/30 text-red-400';
                if (item.type === 'security') badgeClass = 'bg-amber-500/20 border-amber-500/30 text-amber-400';
                if (item.type === 'volunteer') badgeClass = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
                if (item.type === 'ai') badgeClass = 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400';

                return (
                  <div key={idx} className="glass-panel border-l-2 p-2.5 rounded-lg text-xs space-y-1 transition-all hover:translate-x-0.5" style={{ 
                    borderLeftColor: item.type === 'medical' ? '#E10600' : item.type === 'security' ? '#F59E0B' : item.type === 'volunteer' ? '#00B050' : item.type === 'ai' ? '#06b6d4' : '#4B5563'
                  }}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${badgeClass}`}>
                        {item.type}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed font-sans">{item.message}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions Panel in Right Sidebar */}
            <div className="border-t border-darkBorder pt-4 space-y-3.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Active Emergency Dispatch</div>
              
              {state.incidents.filter(i => i.status !== 'resolved').slice(0, 1).map((inc) => (
                <div key={inc.id} className="bg-red-950/20 border border-red-900/50 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-400">{inc.title}</span>
                    <span className="text-[9px] bg-red-500/20 text-red-300 border border-red-500/40 px-1 rounded uppercase font-bold">
                      {inc.severity}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-normal text-[11px]">{inc.details}</p>
                  <div className="text-[10px] text-gray-500 font-mono">Location: {inc.location}</div>
                  <button 
                    onClick={() => resolveIncident(inc.id)}
                    className="w-full text-center py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide transition-all shadow-greenGlow flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Acknowledge & Resolve</span>
                  </button>
                </div>
              ))}

              {state.incidents.filter(i => i.status !== 'resolved').length === 0 && (
                <div className="bg-emerald-950/10 border border-emerald-900/30 p-4 rounded-xl text-center">
                  <CheckCircle2 className="mx-auto text-emerald-500 mb-1.5" size={20} />
                  <p className="text-xs text-gray-400 font-sans font-medium">All emergency dispatch lines cleared.</p>
                </div>
              )}
            </div>
          </aside>
        )}

      </div>

      {/* 4. Command Palette Dialogue Overlay (Ctrl+K Modal) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCommandPaletteOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20, filter: 'blur(10px)' }}
              animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg glass-panel bg-darkCard/95 border border-darkBorder rounded-2xl shadow-glow overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-darkBorder flex items-center space-x-3">
                <Search size={16} className="text-aiCyan" />
                <input
                  type="text"
                  placeholder="Type a portal name or shortcut..."
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full text-xs font-semibold focus:ring-0"
                  autoFocus
                />
                <span className="text-[9px] bg-white/5 border border-darkBorder px-1.5 py-0.5 rounded text-gray-500 font-mono">ESC</span>
              </div>
              
              <div className="p-2 max-h-60 overflow-y-auto space-y-1">
                {navItems
                  .filter(item => item.name.toLowerCase().includes(cmdQuery.toLowerCase()))
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          const routeRoles: Record<string, UserRole> = {
                            '/commander': 'organizer',
                            '/dashboard': 'organizer',
                            '/fan': 'fan',
                            '/volunteer': 'volunteer',
                            '/security': 'security',
                            '/medical': 'medical'
                          };
                          if (routeRoles[item.path]) {
                            setRole(routeRoles[item.path]);
                          }
                          navigate(item.path);
                          setCommandPaletteOpen(false);
                          setCmdQuery('');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-left text-gray-400 hover:text-white hover:bg-white/5 transition-all font-semibold"
                      >
                        <Icon size={14} className="text-gray-500" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
