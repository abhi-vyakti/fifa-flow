import React from 'react';
import { useThemeSettings, type UserRole, type AppLanguage } from '../contexts/ThemeContext';
import { 
  Settings as SettingsIcon, Accessibility, Eye, Volume2, Shield, Languages, Check, Sliders
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    role, setRole,
    language, setLanguage,
    highContrast, setHighContrast,
    colorBlindSafe, setColorBlindSafe,
    voiceOutput, setVoiceOutput,
    accessibility, updateAccessibility
  } = useThemeSettings();

  const roleLabels: Record<UserRole, string> = {
    organizer: 'Organizer Command',
    fan: 'Fan Assistant',
    volunteer: 'Volunteer Portal',
    security: 'Security Patrol',
    medical: 'Medical Dispatch'
  };

  const languageLabels: Record<AppLanguage, string> = {
    en: 'English',
    es: 'Español (Spanish)',
    fr: 'Français (French)',
    pt: 'Português (Portuguese)',
    ar: 'العربية (Arabic)',
    hi: 'हिन्दी (Hindi)'
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black font-sans tracking-wide text-white">User Preferences</h1>
        <p className="text-xs text-gray-400">Configure accessibility profiles, persona views, and AI model parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column - Persona & Language */}
        <div className="space-y-6">
          
          {/* Persona View Switcher */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Sliders className="text-aiCyan" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Active Persona View</h3>
            </div>
            
            <p className="text-xs text-gray-400 leading-normal">
              Toggle the active dashboard view. Adapts context parameters and security validation rules in the AI reasoning backend:
            </p>

            <div className="space-y-2 pt-1">
              {(Object.keys(roleLabels) as UserRole[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all duration-150 ${role === key ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-aiCyan text-white shadow-glow' : 'bg-black/20 border-darkBorder text-gray-400 hover:text-white'}`}
                >
                  <span>{roleLabels[key]}</span>
                  {role === key && <Check size={14} className="text-aiCyan" />}
                </button>
              ))}
            </div>
          </div>

          {/* Language translation */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Languages className="text-aiPurple" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Language Translation</h3>
            </div>
            
            <p className="text-xs text-gray-400 leading-normal">
              Update UI localization settings and live translation helper options:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {(Object.keys(languageLabels) as AppLanguage[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setLanguage(key)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all duration-150 ${language === key ? 'bg-white/5 border-aiPurple text-white' : 'bg-black/10 border-darkBorder text-gray-500 hover:text-white'}`}
                >
                  <div className="font-bold">{languageLabels[key]}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Accessibility Options */}
        <div className="space-y-6">
          
          {/* Accessibility profiles */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Accessibility className="text-fifaGold" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Accessibility Profiles</h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Activate specialized routing and visual adjustments for impaired spectators:
            </p>

            <div className="space-y-3 pt-1">
              
              {/* Wheelchair */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-darkBorder bg-black/20 cursor-pointer hover:border-darkBorderGlow transition-all">
                <div className="text-xs">
                  <span className="font-bold text-white block">Wheelchair Egress Routing</span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">AI generates paths avoiding stairs and escalator slopes.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={accessibility.wheelchair}
                  onChange={(e) => updateAccessibility('wheelchair', e.target.checked)}
                  className="rounded border-darkBorder bg-darkBg text-aiCyan focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                />
              </label>

              {/* Large Text */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-darkBorder bg-black/20 cursor-pointer hover:border-darkBorderGlow transition-all">
                <div className="text-xs">
                  <span className="font-bold text-white block">Large Text / Typography Layout</span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">Scales browser root font values (18px) for legibility.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={accessibility.largeText}
                  onChange={(e) => updateAccessibility('largeText', e.target.checked)}
                  className="rounded border-darkBorder bg-darkBg text-aiCyan focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                />
              </label>

              {/* High Contrast */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-darkBorder bg-black/20 cursor-pointer hover:border-darkBorderGlow transition-all">
                <div className="text-xs">
                  <span className="font-bold text-white block">High Contrast Mode</span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">Sets background colors to absolute solid black & details to solid white.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="rounded border-darkBorder bg-darkBg text-aiCyan focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                />
              </label>

              {/* Color blind */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-darkBorder bg-black/20 cursor-pointer hover:border-darkBorderGlow transition-all">
                <div className="text-xs">
                  <span className="font-bold text-white block">Color-Blind Safe Telemetries</span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">Swaps red/green warning states with specific high-contrast shapes.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={colorBlindSafe}
                  onChange={(e) => setColorBlindSafe(e.target.checked)}
                  className="rounded border-darkBorder bg-darkBg text-aiCyan focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                />
              </label>

              {/* Voice Output */}
              <label className="flex items-center justify-between p-3 rounded-xl border border-darkBorder bg-black/20 cursor-pointer hover:border-darkBorderGlow transition-all">
                <div className="text-xs">
                  <span className="font-bold text-white block">Voice Synthesizer Narrator</span>
                  <span className="text-[10px] text-gray-500 mt-0.5 block">Speak AI recommendation cards out loud automatically.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={voiceOutput}
                  onChange={(e) => setVoiceOutput(e.target.checked)}
                  className="rounded border-darkBorder bg-darkBg text-aiCyan focus:ring-0 focus:ring-offset-0 h-4 w-4 cursor-pointer"
                />
              </label>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
