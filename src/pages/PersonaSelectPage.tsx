import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeSettings, type UserRole } from '../contexts/ThemeContext';
import { 
  Brain, Shield, Activity, Users, HelpCircle, 
  ArrowRight, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonaOption {
  id: UserRole;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;       // accent ring/highlight color
  gradient: string;    // card hover gradient
  route: string;       // default landing route for this persona
  capabilities: string[];
}

const personas: PersonaOption[] = [
  {
    id: 'organizer',
    title: 'Tournament Commander',
    subtitle: 'Full Operations Access',
    description: 'Complete AI-powered oversight of all stadium systems, real-time telemetry, and decision intelligence across the entire tournament infrastructure.',
    icon: Brain,
    color: 'text-primary',
    gradient: 'from-primary/15 to-primary/5',
    route: '/commander',
    capabilities: ['AI Situation Room', 'Decision Simulator', 'Executive Reports', 'All Systems'],
  },
  {
    id: 'security',
    title: 'Security Director',
    subtitle: 'Threat & Surveillance Control',
    description: 'Monitor threat levels, coordinate incident response teams, and manage crowd flow intelligence with AI-driven anomaly detection.',
    icon: Shield,
    color: 'text-red-400',
    gradient: 'from-red-500/15 to-red-500/5',
    route: '/security',
    capabilities: ['CCTV Grid', 'Threat Matrix', 'Incident Response', 'Crowd Analytics'],
  },
  {
    id: 'medical',
    title: 'Medical Operations',
    subtitle: 'Health & Emergency Response',
    description: 'Oversee medical station readiness, track patient flow, and coordinate emergency response units with predictive health analytics.',
    icon: Activity,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
    route: '/medical',
    capabilities: ['Station Status', 'Response Units', 'Patient Flow', 'Heat Alerts'],
  },
  {
    id: 'volunteer',
    title: 'Volunteer Coordinator',
    subtitle: 'Workforce & Deployment Grid',
    description: 'Manage volunteer assignments, shift scheduling, and real-time task allocation across all stadium zones and checkpoints.',
    icon: Users,
    color: 'text-amber-400',
    gradient: 'from-amber-500/15 to-amber-500/5',
    route: '/volunteers',
    capabilities: ['Shift Grid', 'Task Dispatch', 'Zone Coverage', 'Performance'],
  },
  {
    id: 'fan',
    title: 'Fan Experience',
    subtitle: 'Visitor & Accessibility Assistant',
    description: 'Navigate stadium facilities, find food and services, get real-time wait times, and access multilingual assistance and accessibility features.',
    icon: HelpCircle,
    color: 'text-sky-400',
    gradient: 'from-sky-500/15 to-sky-500/5',
    route: '/fan',
    capabilities: ['Wayfinding', 'Wait Times', 'Accessibility', 'Translations'],
  },
];

export const PersonaSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useThemeSettings();
  const [hoveredId, setHoveredId] = useState<UserRole | null>(null);
  const [selectedId, setSelectedId] = useState<UserRole | null>(null);

  const handleSelect = (persona: PersonaOption) => {
    setSelectedId(persona.id);
    setRole(persona.id);
    // Brief delay for visual feedback before navigating
    setTimeout(() => {
      navigate(persona.route);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-12 px-4 max-w-6xl mx-auto relative">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-primary/3 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-12 relative z-10"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-primary/10 border border-primary/25 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
          <Sparkles size={11} />
          <span>Identity Verification</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-headline font-black tracking-tight text-on-surface uppercase leading-tight">
          Select Your
          <span className="block text-primary">Operational Persona</span>
        </h1>
        
        <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
          FIFA FLOW adapts its AI intelligence layer, dashboard modules, and data priority based on your operational role.
        </p>
      </motion.div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl relative z-10">
        <AnimatePresence>
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            const isHovered = hoveredId === persona.id;
            const isSelected = selectedId === persona.id;
            
            return (
              <motion.button
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: isSelected && selectedId !== persona.id ? 0.3 : 1, 
                  y: 0,
                  scale: isSelected ? 0.97 : 1,
                }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleSelect(persona)}
                onMouseEnter={() => setHoveredId(persona.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--color-primary-rgb,59,130,246),0.15)] scale-[1.02]'
                    : isHovered 
                      ? 'border-outline-variant bg-surface-container-high shadow-ultra-soft' 
                      : 'border-outline-variant/60 bg-surface-container-low hover:border-outline-variant'
                  }
                  ${persona.id === 'organizer' ? 'sm:col-span-2 lg:col-span-1' : ''}
                `}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-3">
                  {/* Icon + Title Row */}
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 rounded-xl bg-surface-container border border-outline-variant/40 ${persona.color} group-hover:border-current/30 transition-colors`}>
                      <Icon size={20} />
                    </div>
                    <ChevronRight 
                      size={16} 
                      className={`text-secondary mt-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} 
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-display font-bold text-sm text-on-surface group-hover:text-on-surface transition-colors">
                      {persona.title}
                    </h3>
                    <p className={`text-[10px] font-mono font-bold uppercase tracking-wider mt-0.5 ${persona.color} opacity-80`}>
                      {persona.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-secondary leading-relaxed line-clamp-2">
                    {persona.description}
                  </p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {persona.capabilities.map((cap) => (
                      <span 
                        key={cap}
                        className="px-2 py-0.5 bg-surface-container border border-outline-variant/40 rounded-md text-[9px] font-mono font-semibold text-secondary uppercase tracking-wider"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <ArrowRight size={11} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-[10px] text-secondary/60 mt-10 text-center font-mono tracking-wide relative z-10"
      >
        Your persona determines AI priority layers, data visibility, and module access. You can switch roles anytime from Settings.
      </motion.p>
    </div>
  );
};
