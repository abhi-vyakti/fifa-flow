import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeSettings, type UserRole } from '../contexts/ThemeContext';
import { 
  Brain, Shield, Activity, Users, HelpCircle, 
  ArrowRight, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonaOption {
  id: UserRole;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  badgeBg: string;
  route: string;
  capabilities: string[];
}

const personas: PersonaOption[] = [
  {
    id: 'organizer',
    title: 'Tournament Commander',
    subtitle: 'Full Operations & AI Oversight',
    description: 'Complete AI-powered oversight of all stadium systems, real-time telemetry, situation room intelligence, and decision simulations across the entire tournament network.',
    icon: Brain,
    accentBg: 'bg-amber-500/10 hover:bg-amber-500/15',
    accentText: 'text-amber-700',
    accentBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/15 text-amber-800 border-amber-500/30',
    route: '/commander',
    capabilities: ['AI Situation Room', 'Decision Simulator', 'Executive Reports', 'All Systems'],
  },
  {
    id: 'security',
    title: 'Security Director',
    subtitle: 'Threat & Surveillance Control',
    description: 'Monitor real-time threat levels, coordinate emergency response teams, inspect perimeter sensors, and broadcast multilingual safety alerts.',
    icon: Shield,
    accentBg: 'bg-red-500/10 hover:bg-red-500/15',
    accentText: 'text-red-700',
    accentBorder: 'border-red-500/40',
    badgeBg: 'bg-red-500/15 text-red-800 border-red-500/30',
    route: '/security',
    capabilities: ['CCTV Sensor Grid', 'Threat Matrix', 'Incident Response', 'Crowd Analytics'],
  },
  {
    id: 'medical',
    title: 'Medical Operations',
    subtitle: 'Triage & Emergency Dispatch',
    description: 'Oversee first aid post bed capacity, dispatch paramedic responder units, clear fast evacuation corridors, and manage medical triage queues.',
    icon: Activity,
    accentBg: 'bg-emerald-500/10 hover:bg-emerald-500/15',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30',
    route: '/medical',
    capabilities: ['First Aid Beds', 'Paramedic Units', 'Evacuation Corridors', 'Heat Triage'],
  },
  {
    id: 'volunteer',
    title: 'Volunteer Coordinator',
    subtitle: 'Workforce & Shift Management',
    description: 'Manage field volunteer task assignments, shift scheduling, lost-and-found cataloging, and real-time backup requests across stadium sectors.',
    icon: Users,
    accentBg: 'bg-orange-500/10 hover:bg-orange-500/15',
    accentText: 'text-orange-700',
    accentBorder: 'border-orange-500/40',
    badgeBg: 'bg-orange-500/15 text-orange-800 border-orange-500/30',
    route: '/volunteers',
    capabilities: ['Shift Grid', 'Task Dispatch', 'Backup Requests', 'Lost & Found'],
  },
  {
    id: 'fan',
    title: 'Fan Spectator Companion',
    subtitle: 'Visitor Navigation & Services',
    description: 'Navigate stadium stands, locate seat sections, check food queue wait times, find accessible pathways, and trigger emergency SOS assistance.',
    icon: HelpCircle,
    accentBg: 'bg-sky-500/10 hover:bg-sky-500/15',
    accentText: 'text-sky-700',
    accentBorder: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/15 text-sky-800 border-sky-500/30',
    route: '/fan',
    capabilities: ['Seat Finder', 'Food Queue Times', 'Accessible Routes', 'Emergency SOS'],
  },
];

export const PersonaSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, t } = useThemeSettings();
  const [hoveredId, setHoveredId] = useState<UserRole | null>(null);
  const [selectedId, setSelectedId] = useState<UserRole | null>(null);

  const handleSelect = (persona: PersonaOption) => {
    setSelectedId(persona.id);
    setRole(persona.id);
    setTimeout(() => {
      navigate(persona.route);
    }, 350);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-10 px-4 max-w-6xl mx-auto relative font-sans">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-primary/8 rounded-full blur-[140px]" />
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3.5 mb-10 relative z-10 max-w-2xl"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 border border-primary/25 rounded-full text-xs font-bold text-primary uppercase font-mono tracking-widest shadow-ultra-soft">
          <Sparkles size={12} className="animate-pulse" />
          <span>FIFA FLOW Operational Access Control</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-on-surface uppercase leading-tight">
          Select Your <span className="text-primary">Operational Workspace</span>
        </h1>
        
        <p className="text-xs sm:text-sm text-secondary font-medium leading-relaxed max-w-xl mx-auto">
          FIFA FLOW dynamically customizes telemetry layers, security overrides, and AI copilot models tailored to your operational assignment.
        </p>
      </motion.div>

      {/* Persona Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl relative z-10">
        <AnimatePresence>
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            const isHovered = hoveredId === persona.id;
            const isSelected = selectedId === persona.id;
            
            return (
              <motion.button
                key={persona.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ 
                  opacity: isSelected && selectedId !== persona.id ? 0.35 : 1, 
                  y: 0,
                  scale: isSelected ? 0.98 : 1,
                }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => handleSelect(persona)}
                onMouseEnter={() => setHoveredId(persona.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  group relative text-left p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between
                  bg-surface-container-low/95 backdrop-blur-md shadow-ultra-soft
                  ${isSelected 
                    ? 'border-primary ring-2 ring-primary/40 bg-surface-container-high shadow-lg scale-[1.01]'
                    : isHovered 
                      ? `${persona.accentBorder} bg-surface-container-high shadow-md -translate-y-1` 
                      : 'border-outline-variant/60 hover:border-outline-variant'
                  }
                  ${persona.id === 'organizer' ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon Badge & Role Pill */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${persona.accentBorder} ${persona.accentBg} ${persona.accentText} transition-transform group-hover:scale-110 shadow-sm`}>
                      <Icon size={24} />
                    </div>

                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider border ${persona.badgeBg}`}>
                      {persona.id}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-display font-black text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">
                      {persona.title}
                    </h3>
                    <p className={`text-xs font-mono font-bold uppercase tracking-wider mt-0.5 ${persona.accentText}`}>
                      {persona.subtitle}
                    </p>
                  </div>

                  {/* High Readability Description */}
                  <p className="text-xs text-on-surface/85 font-sans font-medium leading-relaxed">
                    {persona.description}
                  </p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {persona.capabilities.map((cap) => (
                      <span 
                        key={cap}
                        className="px-2.5 py-1 bg-surface-container border border-outline-variant/50 rounded-xl text-[10px] font-mono font-bold text-on-surface/90 uppercase tracking-wider group-hover:border-outline-variant transition-colors"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Launch Button */}
                <div className="mt-6 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-bold font-mono text-primary group-hover:text-primary-container transition-colors">
                  <span className="uppercase tracking-wider">Launch Workspace</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md"
                  >
                    <CheckCircle2 size={14} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Info Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 px-5 py-2.5 bg-surface-container-low border border-outline-variant/60 rounded-2xl text-[11px] text-secondary font-mono tracking-wide text-center max-w-xl shadow-ultra-soft"
      >
        <span>💡 Roles customize dashboard modules and security scopes. Switch workspace anytime from Settings.</span>
      </motion.div>
    </div>
  );
};
