import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings, type UserRole } from '../contexts/ThemeContext';
import { useAtmosphereAudio } from '../hooks/useAtmosphereAudio';
import { 
  Shield, Users, Activity, Sliders, Brain, Compass, 
  Map, Terminal, Settings as SettingsIcon, AlertCircle, Wifi, Play,
  Activity as TelemetryIcon, Languages, HelpCircle, CheckCircle2, Menu, X,
  Search, Stethoscope, HardHat, UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { USABadge, ENGBadge } from './FlagBadge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onTriggerIntro?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onTriggerIntro: _onTriggerIntro }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, liveMatch } = useLiveData();
  const { 
    role, setRole, language, setLanguage, highContrast, emergencyMode, setEmergencyMode, t 
  } = useThemeSettings();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // List of paths and navigation with persona-based access control
  const navItems = [
    // SYSTEM CONTROL
    { name: t.globalMissionControl, path: '/mission-control', icon: Compass, group: t.systemControl,
      roles: ['organizer', 'security'] },
    { name: t.aiSituationRoom, path: '/commander', icon: Brain, badge: 'AI OS', group: t.systemControl,
      roles: ['organizer'] },

    // OPERATIONS
    { name: t.matchOperations,       path: '/matches',      icon: Terminal,      group: t.operations,
      roles: ['organizer', 'security', 'volunteer', 'medical'] },
    { name: t.liveMatchControl,     path: '/live',         icon: Play,          group: t.operations,
      roles: ['organizer'] },
    { name: t.stadiumDigitalTwin,   path: '/digital-twin', icon: Map,           group: t.operations,
      roles: ['organizer', 'security', 'volunteer', 'medical', 'fan'] },
    { name: t.broadcastCenter,       path: '/broadcast',    icon: TelemetryIcon, group: t.operations,
      roles: ['organizer'] },
    { name: t.securityCenter,        path: '/security',     icon: Shield,        group: t.operations,
      roles: ['organizer', 'security'] },
    { name: t.medicalCenter,         path: '/medical',      icon: Activity,      group: t.operations,
      roles: ['organizer', 'medical'] },
    { name: t.volunteerCommand,      path: '/volunteers',   icon: Users,         group: t.operations,
      roles: ['organizer', 'volunteer'] },
    { name: t.fanExperience,         path: '/fan',          icon: HelpCircle,    group: t.operations,
      roles: ['organizer', 'fan', 'volunteer'] },
    { name: t.aiDecisionSimulator,  path: '/simulator',    icon: Sliders,       group: t.operations,
      roles: ['organizer'] },
    { name: t.executiveIntelligence, path: '/executive',    icon: CheckCircle2,  badge: 'REPORT', group: t.operations,
      roles: ['organizer'] },

    // CONFIG
    { name: t.settingsOptions, path: '/settings', icon: SettingsIcon, group: t.config,
      roles: ['organizer', 'fan', 'volunteer', 'security', 'medical'] }
  ];

  // Filter nav items to only those the current persona can access
  const visibleNavItems = navItems.filter(item => item.roles.includes(role));

  // Role display metadata
  const roleLabels: Record<string, { label: string; color: string; textColor: string; Icon: React.ElementType }> = {
    organizer:  { label: t.commander,  color: 'bg-primary/10',      textColor: 'text-primary',    Icon: Compass },
    fan:        { label: t.fan,        color: 'bg-sky-500/10',      textColor: 'text-sky-400',    Icon: UserCircle2 },
    volunteer:  { label: t.volunteer,  color: 'bg-amber-500/10',    textColor: 'text-amber-400',  Icon: HardHat },
    security:   { label: t.security,   color: 'bg-red-500/10',      textColor: 'text-red-400',    Icon: Shield },
    medical:    { label: t.medical,    color: 'bg-emerald-500/10',  textColor: 'text-emerald-400', Icon: Stethoscope },
  };
  const activeMeta = roleLabels[role];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
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
      
      {/* Premium Dark Glass Header (Borderless & Frameless) */}
      <header className={`h-16 flex items-center justify-between px-6 z-40 sticky top-0 bg-[#020308]/60 backdrop-blur-md select-none ${isLanding ? 'hidden' : ''}`}>
        
        {/* Subtle accent glow line at the top */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* LEFT: Premium Corporate Brand Identity */}
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 md:hidden hover:bg-white/5 rounded text-secondary">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Clean minimalist logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-primary/20 to-primary/5 border border-primary/20 rounded-lg">
              <svg viewBox="0 0 36 36" className="w-5 h-5 text-primary">
                {/* Globe lines */}
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
                <ellipse cx="18" cy="18" rx="6" ry="16" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                <line x1="2" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1" className="opacity-30" />
                {/* Minimal Cup */}
                <path d="M12 10 h12 v3 a6 6 0 0 1-12 0 z" fill="currentColor" />
                <rect x="16.5" y="16" width="3" height="5" fill="currentColor" />
                <path d="M14 21 h8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className="hidden md:flex flex-col leading-none">
              <span className="font-display font-black text-white text-[14px] tracking-tight group-hover:text-primary transition-colors">FIFA FLOW</span>
              <span className="text-[7.5px] font-mono font-bold text-emerald-500 uppercase tracking-widest mt-0.5">{t.osOnline}</span>
            </div>
          </div>

          {/* Minimal breadcrumb style, no host badge */}
          <div className="hidden lg:block pl-4 border-l border-white/10">
            <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">{getBreadcrumbs().replace('FIFA FLOW > ', '')}</span>
          </div>
        </div>

        {/* CENTER: Floating Broadcast-Quality Scoreboard */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="flex items-center bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-2xl px-4 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5 mr-3 pr-3 border-r border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
              <span className="text-[8.5px] font-black font-mono text-error uppercase tracking-widest">{t.live}</span>
            </div>

            {/* Match Teams and Scores */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <USABadge className="w-5 h-5 rounded-full border border-white/10 shadow-sm" />
                <span className="font-display font-black text-xs text-white tracking-wide">USA</span>
                <span className="font-display font-black text-sm text-white/90 bg-white/5 px-2 py-0.5 rounded-md ml-1 font-mono">
                  {liveMatch.homeScore}
                </span>
              </div>

              <span className="text-gray-600 font-mono text-xs font-bold">:</span>

              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm text-white/90 bg-white/5 px-2 py-0.5 rounded-md mr-1 font-mono">
                  {liveMatch.awayScore}
                </span>
                <span className="font-display font-black text-xs text-white tracking-wide">ENG</span>
                <ENGBadge className="w-5 h-5 rounded-full border border-white/10 shadow-sm" />
              </div>
            </div>

            {/* Time Elapsed */}
            <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-white/10">
              <span className="text-primary font-mono font-black text-[11px] tracking-wider animate-pulse">
                {liveMatch.minute}'
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Minimalist Controls */}
        <div className="flex items-center gap-2.5">
          {/* Emergency HUD Toggle */}
          <button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-150 border cursor-pointer active:scale-95 ${
              emergencyMode
                ? 'bg-error border-error text-white shadow-[0_0_12px_rgba(192,57,43,0.35)]'
                : 'bg-white/5 border-white/10 hover:border-error/50 hover:text-error text-gray-400'
            }`}
          >
            <AlertCircle size={12} />
            <span className="hidden sm:inline">{emergencyMode ? t.emergency : t.emergencyHud}</span>
          </button>

          {/* Language Selector */}
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs gap-1.5">
            <Languages size={12} className="text-gray-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border-none outline-none text-white cursor-pointer font-bold text-xs"
            >
              <option value="en" className="bg-[#0b0f19]">EN</option>
              <option value="es" className="bg-[#0b0f19]">ES</option>
              <option value="fr" className="bg-[#0b0f19]">FR</option>
              <option value="pt" className="bg-[#0b0f19]">PT</option>
              <option value="ar" className="bg-[#0b0f19]">AR</option>
              <option value="hi" className="bg-[#0b0f19]">HI</option>
            </select>
          </div>
        </div>
      </header>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Left Navigation (Desktop Hover-Expanding Rail) */}
        <aside 
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          className={`hidden md:flex flex-col border-r border-outline-variant/60 bg-surface-container-low p-4 space-y-6 transition-all duration-300 ease-[0.16,1,0.3,1] z-30 ${isSidebarHovered ? 'w-64' : 'w-20'} ${isLanding ? '!hidden' : ''}`}
        >
            


            {/* Persona Role Indicator */}
            {isSidebarHovered ? (
              <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${activeMeta.color}`}>
                <activeMeta.Icon size={13} className={activeMeta.textColor} />
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${activeMeta.textColor}`}>
                    {activeMeta.label}
                  </span>
                  <span className="text-[8px] text-secondary font-mono">{t.activeSession}</span>
                </div>
              </div>
            ) : (
              <div className={`flex items-center justify-center w-9 h-9 rounded-xl mx-auto ${activeMeta.color}`}>
                <activeMeta.Icon size={15} className={activeMeta.textColor} />
              </div>
            )}

            {/* Grouped Nav Links */}
          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            
            {/* SYSTEM CONTROL GROUP */}
            <div className="space-y-1">
              {isSidebarHovered && visibleNavItems.some(i => i.group === 'SYSTEM CONTROL') && (
                <div className="text-[9px] text-secondary font-bold uppercase tracking-widest px-3 mb-1.5 font-mono">SYSTEM CONTROL</div>
              )}
              {visibleNavItems.filter(item => item.group === 'SYSTEM CONTROL').map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group cursor-pointer ${isActive ? 'bg-primary-fixed/40 border-l-2 border-primary text-primary font-bold shadow-ultra-soft' : 'text-secondary hover:text-primary hover:bg-surface-container'} ${isSidebarHovered ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon size={15} className={isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'} />
                      {isSidebarHovered && <span>{item.name}</span>}
                    </div>
                    {isSidebarHovered && item.badge && (
                      <span className="text-[8px] bg-primary/20 border border-primary/30 text-primary font-extrabold px-1 rounded uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* OPERATIONS MODULES GROUP */}
            <div className="space-y-1">
              {isSidebarHovered && visibleNavItems.some(i => i.group === 'OPERATIONS') && (
                <div className="text-[9px] text-secondary font-bold uppercase tracking-widest px-3 mb-1.5 font-mono font-bold">INTEGRATED MODULES</div>
              )}
              {visibleNavItems.filter(item => item.group === 'OPERATIONS').map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group cursor-pointer ${isActive ? 'bg-primary-fixed/40 border-l-2 border-primary text-primary font-bold shadow-ultra-soft' : 'text-secondary hover:text-primary hover:bg-surface-container'} ${isSidebarHovered ? 'justify-between' : 'justify-center'}`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon size={15} className={isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'} />
                      {isSidebarHovered && <span>{item.name}</span>}
                    </div>
                    {isSidebarHovered && item.badge && (
                      <span className="text-[8px] bg-primary/20 border border-primary/30 text-primary font-extrabold px-1 rounded uppercase">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Sidebar Footer — Settings + branding */}
          <div className="border-t border-outline-variant/60 pt-3 space-y-2">
            <button
              onClick={() => navigate('/settings')}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group cursor-pointer
                ${ location.pathname === '/settings'
                  ? 'bg-primary-fixed/40 border-l-2 border-primary text-primary font-bold shadow-ultra-soft'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
                } ${isSidebarHovered ? 'justify-start gap-2.5' : 'justify-center'}`}
            >
              <SettingsIcon size={15} className={location.pathname === '/settings' ? 'text-primary' : 'text-secondary group-hover:text-primary'} />
              {isSidebarHovered && <span>Settings</span>}
            </button>
            <div className="text-center text-[9px] text-outline-variant/70 font-mono pb-1">
              {isSidebarHovered ? <span>2026 World Cup · FIFA FLOW</span> : <span>'26</span>}
            </div>
          </div>
        </aside>

        {/* Sidebar Left Navigation (Mobile Drawer overlay) */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <aside className="w-64 h-full bg-surface border-r border-outline-variant p-4 flex flex-col space-y-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                <div className="flex items-center space-x-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary animate-pulse-slow">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                  <span className="font-display font-extrabold text-primary">FIFA FLOW</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded hover:bg-surface-container-high text-secondary">
                  <X size={18} />
                </button>
              </div>

              <div className="bg-surface-container p-3 rounded-lg border border-outline-variant/60">
                <div className="text-[10px] text-secondary font-bold uppercase mb-1">Select Persona</div>
                <select
                  value={role}
                  onChange={(e) => {
                    handleRoleChange(e.target.value as any);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-surface text-on-surface text-xs border border-outline-variant rounded p-2 outline-none cursor-pointer"
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm cursor-pointer ${isActive ? 'bg-primary/10 border-l-2 border-primary text-primary font-medium' : 'text-secondary hover:text-primary'}`}
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background relative z-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </main>

      </div>

      {/* 4. Command Palette Dialogue Overlay (Ctrl+K Modal) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCommandPaletteOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20, filter: 'blur(10px)' }}
              animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg glass-panel bg-surface border border-outline-variant/70 rounded-2xl shadow-ultra-soft overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-outline-variant/60 flex items-center space-x-3">
                <Search size={16} className="text-primary" />
                <input
                  type="text"
                  placeholder="Type a portal name or shortcut..."
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-on-surface w-full text-xs font-semibold focus:ring-0"
                  autoFocus
                />
                <span className="text-[9px] bg-surface-container border border-outline-variant px-1.5 py-0.5 rounded text-secondary font-mono">ESC</span>
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
                            '/matches': 'organizer',
                            '/live': 'organizer',
                            '/digital-twin': 'organizer',
                            '/broadcast': 'organizer',
                            '/security': 'security',
                            '/medical': 'medical',
                            '/volunteers': 'volunteer',
                            '/fan': 'fan',
                            '/simulator': 'organizer',
                            '/executive': 'organizer'
                          };
                          if (routeRoles[item.path]) {
                            setRole(routeRoles[item.path]);
                          }
                          navigate(item.path);
                          setCommandPaletteOpen(false);
                          setCmdQuery('');
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-left text-secondary hover:text-primary hover:bg-surface-container transition-all font-semibold cursor-pointer"
                      >
                        <Icon size={14} className="text-secondary" />
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
