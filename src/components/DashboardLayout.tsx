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
    { name: t.globalMissionControl, path: '/mission-control', icon: Compass, group: 'SYSTEM_CONTROL',
      roles: ['organizer', 'security'] },
    { name: t.aiSituationRoom, path: '/commander', icon: Brain, badge: 'AI OS', group: 'SYSTEM_CONTROL',
      roles: ['organizer'] },

    // OPERATIONS
    { name: t.matchOperations,       path: '/matches',      icon: Terminal,      group: 'OPERATIONS',
      roles: ['organizer', 'security', 'volunteer', 'medical'] },
    { name: t.liveMatchControl,     path: '/live',         icon: Play,          group: 'OPERATIONS',
      roles: ['organizer'] },
    { name: t.stadiumDigitalTwin,   path: '/digital-twin', icon: Map,           group: 'OPERATIONS',
      roles: ['organizer', 'security', 'volunteer', 'medical', 'fan'] },
    { name: t.broadcastCenter,       path: '/broadcast',    icon: TelemetryIcon, group: 'OPERATIONS',
      roles: ['organizer'] },
    { name: t.securityCenter,        path: '/security',     icon: Shield,        group: 'OPERATIONS',
      roles: ['organizer', 'security'] },
    { name: t.medicalCenter,         path: '/medical',      icon: Activity,      group: 'OPERATIONS',
      roles: ['organizer', 'medical'] },
    { name: t.volunteerCommand,      path: '/volunteers',   icon: Users,         group: 'OPERATIONS',
      roles: ['organizer', 'volunteer'] },
    { name: t.fanExperience,         path: '/fan',          icon: HelpCircle,    group: 'OPERATIONS',
      roles: ['organizer', 'fan', 'volunteer'] },
    { name: t.aiDecisionSimulator,  path: '/simulator',    icon: Sliders,       group: 'OPERATIONS',
      roles: ['organizer'] },
    { name: t.executiveIntelligence, path: '/executive',    icon: CheckCircle2,  badge: 'REPORT', group: 'OPERATIONS',
      roles: ['organizer'] },

    // CONFIG
    { name: t.settingsOptions, path: '/settings', icon: SettingsIcon, group: 'CONFIG',
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
    return `FIFA FLOW > ${segments[segments.length - 1].toUpperCase()}`;
  };

  const isLanding = location.pathname === '/';

  return (
    <div className={`min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/30 ${highContrast ? 'high-contrast' : ''}`}>
      
      {/* Top Application Bar */}
      <header className="h-14 border-b border-outline-variant/60 bg-surface-container-low/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40 shadow-ultra-soft">
        
        {/* LEFT: Branding & Hamburger toggle */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-secondary hover:text-on-surface hover:bg-surface-container-high cursor-pointer transition-all"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-ultra-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>

            <div className="hidden md:flex flex-col leading-none">
              <span className="font-display font-black text-on-surface text-[14px] tracking-tight group-hover:text-primary transition-colors">FIFA FLOW</span>
              <span className="text-[7.5px] font-mono font-bold text-emerald-600 uppercase tracking-widest mt-0.5">{t.osOnline}</span>
            </div>
          </div>
        </div>

        {/* CENTER: Floating Broadcast-Quality Scoreboard */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="flex items-center bg-surface-container-high/95 backdrop-blur-sm border border-outline-variant/80 rounded-2xl px-4 py-1.5 shadow-ultra-soft">
            
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5 mr-3 pr-3 border-r border-outline-variant/60">
              <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse" />
              <span className="text-[8.5px] font-black font-mono text-error uppercase tracking-widest">{t.live}</span>
            </div>

            {/* Match Teams and Scores */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <USABadge className="w-5 h-5 rounded-full border border-outline-variant/60 shadow-sm" />
                <span className="font-display font-black text-xs text-on-surface tracking-wide">USA</span>
                <span className="font-display font-black text-sm text-on-surface bg-surface-container px-2 py-0.5 rounded-md ml-1 font-mono border border-outline-variant/40">
                  {liveMatch.homeScore}
                </span>
              </div>

              <span className="text-secondary font-mono text-xs font-bold">:</span>

              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm text-on-surface bg-surface-container px-2 py-0.5 rounded-md mr-1 font-mono border border-outline-variant/40">
                  {liveMatch.awayScore}
                </span>
                <span className="font-display font-black text-xs text-on-surface tracking-wide">ENG</span>
                <ENGBadge className="w-5 h-5 rounded-full border border-outline-variant/60 shadow-sm" />
              </div>
            </div>

            {/* Time Elapsed */}
            <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-outline-variant/60">
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
                : 'bg-surface-container border border-outline-variant/60 hover:border-error/50 hover:text-error text-secondary'
            }`}
          >
            <AlertCircle size={12} />
            <span className="hidden sm:inline">{emergencyMode ? t.emergency : t.emergencyHud}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-surface-container border border-outline-variant/60 rounded-xl px-2 py-1 text-xs">
            <Languages size={12} className="text-secondary" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-on-surface text-[11px] font-bold outline-none cursor-pointer"
            >
              <option value="en" className="bg-surface text-on-surface">EN</option>
              <option value="es" className="bg-surface text-on-surface">ES</option>
              <option value="fr" className="bg-surface text-on-surface">FR</option>
              <option value="pt" className="bg-surface text-on-surface">PT</option>
              <option value="ar" className="bg-surface text-on-surface">AR</option>
              <option value="hi" className="bg-surface text-on-surface">HI</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left Desktop Sidebar Navigation */}
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
              {isSidebarHovered && visibleNavItems.some(i => i.group === 'SYSTEM_CONTROL') && (
                <div className="text-[9px] text-secondary font-bold uppercase tracking-widest px-3 mb-1.5 font-mono">{t.systemControl}</div>
              )}
              {visibleNavItems.filter(item => item.group === 'SYSTEM_CONTROL').map((item) => {
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
                <div className="text-[9px] text-secondary font-bold uppercase tracking-widest px-3 mb-1.5 font-mono font-bold">{t.operations}</div>
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
