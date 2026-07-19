import React, { useState } from 'react';
import { useThemeSettings, type UserRole, type AppLanguage } from '../contexts/ThemeContext';
import { 
  Settings as SettingsIcon, Accessibility, Languages, Check, 
  Sliders, Brain, Shield, Activity, Users, HelpCircle, 
  Globe, Type, Eye, Ear, Armchair, Wifi
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPage: React.FC = () => {
  const {
    role, setRole,
    language, setLanguage,
    highContrast, setHighContrast,
    colorBlindSafe, setColorBlindSafe,
    voiceOutput, setVoiceOutput,
    accessibility, updateAccessibility
  } = useThemeSettings();

  const [activeSection, setActiveSection] = useState<'persona' | 'accessibility' | 'language'>('persona');

  const personas: { id: UserRole; title: string; desc: string; icon: React.ElementType; gradient: string; accent: string }[] = [
    { id: 'organizer', title: 'Tournament Commander', desc: 'Full AI operational access & mission control', icon: Brain, gradient: 'from-primary/20 to-primary/5', accent: 'border-primary/50 text-primary' },
    { id: 'fan', title: 'Fan Experience', desc: 'Visitor assistance & stadium wayfinding', icon: HelpCircle, gradient: 'from-sky-500/20 to-sky-500/5', accent: 'border-sky-500/50 text-sky-400' },
    { id: 'volunteer', title: 'Volunteer Command', desc: 'Workforce deployment & coordination grid', icon: Users, gradient: 'from-amber-500/20 to-amber-500/5', accent: 'border-amber-500/50 text-amber-400' },
    { id: 'security', title: 'Security Operations', desc: 'Threat monitoring & rapid response', icon: Shield, gradient: 'from-red-500/20 to-red-500/5', accent: 'border-red-500/50 text-red-400' },
    { id: 'medical', title: 'Medical Dispatch', desc: 'Health monitoring & emergency systems', icon: Activity, gradient: 'from-emerald-500/20 to-emerald-500/5', accent: 'border-emerald-500/50 text-emerald-400' },
  ];

  const languages: { id: AppLanguage; label: string; native: string; flag: string }[] = [
    { id: 'en', label: 'English', native: 'English', flag: 'GB' },
    { id: 'es', label: 'Spanish', native: 'Espanol', flag: 'ES' },
    { id: 'fr', label: 'French', native: 'Francais', flag: 'FR' },
    { id: 'pt', label: 'Portuguese', native: 'Portugues', flag: 'BR' },
    { id: 'ar', label: 'Arabic', native: 'العربية', flag: 'SA' },
    { id: 'hi', label: 'Hindi', native: 'हिन्दी', flag: 'IN' },
  ];

  const accessibilityOptions: { 
    key: string; title: string; desc: string; icon: React.ElementType; 
    checked: boolean; onChange: (val: boolean) => void; 
  }[] = [
    { key: 'wheelchair', title: 'Wheelchair Routing', desc: 'AI-generated accessible egress paths', icon: Armchair, checked: accessibility.wheelchair, onChange: (v) => updateAccessibility('wheelchair', v) },
    { key: 'largeText', title: 'Large Text Mode', desc: 'Scales UI typography for legibility', icon: Type, checked: accessibility.largeText, onChange: (v) => updateAccessibility('largeText', v) },
    { key: 'highContrast', title: 'High Contrast', desc: 'Maximum contrast for visibility', icon: Eye, checked: highContrast, onChange: setHighContrast },
    { key: 'colorBlind', title: 'Color-Blind Safe', desc: 'Pattern-based status indicators', icon: Eye, checked: colorBlindSafe, onChange: setColorBlindSafe },
    { key: 'voice', title: 'Voice Narrator', desc: 'Speak AI recommendations aloud', icon: Ear, checked: voiceOutput, onChange: setVoiceOutput },
  ];

  const sections = [
    { id: 'persona' as const, label: 'Active Persona', icon: Sliders },
    { id: 'accessibility' as const, label: 'Accessibility', icon: Accessibility },
    { id: 'language' as const, label: 'Language', icon: Globe },
  ];

  const activePersona = personas.find(p => p.id === role);

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low p-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
        </div>

        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(194,101,42,0.15)]">
              <SettingsIcon size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black text-on-surface tracking-tight">System Configuration</h1>
              <p className="text-[11px] text-secondary font-mono tracking-wider mt-0.5">CONFIGURE PERSONA · ACCESSIBILITY · LANGUAGE</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border bg-gradient-to-r ${activePersona?.gradient} ${activePersona?.accent} text-xs font-bold`}>
            <Wifi size={10} className="animate-pulse" />
            <span>{activePersona?.title}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 p-1.5 bg-surface-container rounded-2xl border border-outline-variant/40 w-fit">
        {sections.map(s => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer overflow-hidden ${isActive ? 'text-white' : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-md"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
              <Icon size={13} className="relative z-10" />
              <span className="relative z-10">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Persona Section */}
          {activeSection === 'persona' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-display font-bold text-on-surface">Command Persona</h2>
                <p className="text-[11px] text-secondary mt-0.5">Adapts dashboard modules, AI context, and data visibility to your operational role.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {personas.map((p, i) => {
                  const Icon = p.icon;
                  const isActive = role === p.id;
                  return (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      onClick={() => setRole(p.id)}
                      className={`group relative text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${isActive ? 'border-primary/50 shadow-[0_0_24px_rgba(194,101,42,0.12)]' : 'border-outline-variant/50 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container'}`}
                    >
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none`} />
                      )}
                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${isActive ? p.accent + ' bg-white/5' : 'bg-surface-container border-outline-variant/40 text-secondary group-hover:text-on-surface'}`}>
                            <Icon size={18} />
                          </div>
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0, rotate: -90 }} 
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', bounce: 0.5 }}
                              className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md"
                            >
                              <Check size={12} className="text-white" />
                            </motion.div>
                          )}
                        </div>
                        <h3 className={`text-xs font-bold mb-1 ${isActive ? 'text-on-surface' : 'text-on-surface/80'}`}>{p.title}</h3>
                        <p className="text-[10px] text-secondary leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accessibility Section */}
          {activeSection === 'accessibility' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-display font-bold text-on-surface">Accessibility Profiles</h2>
                <p className="text-[11px] text-secondary mt-0.5">Activate routing optimizations and visual adjustments for inclusive stadium experiences.</p>
              </div>

              <div className="space-y-2">
                {accessibilityOptions.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                    <motion.label
                      key={opt.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200 group ${opt.checked ? 'border-primary/40 bg-primary/5 shadow-[0_0_16px_rgba(194,101,42,0.06)]' : 'border-outline-variant/50 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${opt.checked ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface-container border-outline-variant/40 text-secondary'}`}>
                          <Icon size={15} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-on-surface block">{opt.title}</span>
                          <span className="text-[10px] text-secondary mt-0.5 block">{opt.desc}</span>
                        </div>
                      </div>
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${opt.checked ? 'bg-primary shadow-[0_0_10px_rgba(194,101,42,0.35)]' : 'bg-outline-variant/40'}`}>
                        <input type="checkbox" checked={opt.checked} onChange={(e) => opt.onChange(e.target.checked)} className="sr-only" />
                        <div className={`absolute top-[4px] w-[14px] h-[14px] rounded-full bg-white shadow-md transition-transform duration-300 ${opt.checked ? 'translate-x-[22px]' : 'translate-x-[4px]'}`} />
                      </div>
                    </motion.label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Language Section */}
          {activeSection === 'language' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-display font-bold text-on-surface">Interface Language</h2>
                <p className="text-[11px] text-secondary mt-0.5">Set UI localization and real-time translation for multi-language operations.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang, i) => {
                  const isActive = language === lang.id;
                  return (
                    <motion.button
                      key={lang.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      onClick={() => setLanguage(lang.id)}
                      className={`relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer group overflow-hidden ${isActive ? 'border-primary/50 bg-primary/8 shadow-[0_0_20px_rgba(194,101,42,0.10)]' : 'border-outline-variant/50 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container'}`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xl font-bold font-mono text-on-surface/60 tracking-widest">{lang.flag}</span>
                        {isActive && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Check size={11} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className={`text-xs font-bold ${isActive ? 'text-on-surface' : 'text-on-surface/80'}`}>{lang.label}</h3>
                      <p className="text-[10px] text-secondary mt-0.5">{lang.native}</p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container border border-outline-variant/40">
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Languages size={14} className="text-primary" />
                </div>
                <p className="text-[10px] text-secondary leading-relaxed">
                  <span className="font-bold text-on-surface">Real-time translation active</span> — All AI recommendations, alerts, and fan notifications are translated live via the language model pipeline. Stadium signage remains in the host country language.
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
