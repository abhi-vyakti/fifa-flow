import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  Sliders, Cloud, Zap, Shield, HelpCircle, CheckCircle2, ArrowRight, Play, Cpu, AlertTriangle, 
  Users, Clock, Navigation, CheckSquare, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DecisionSimulator: React.FC = () => {
  const { state, triggerScenario } = useLiveData();
  const { emergencyMode, t } = useThemeSettings();
  
  // What-if states
  const [crowdMultiplier, setCrowdMultiplier] = useState(1.0);
  const [metroDelayMins, setMetroDelayMins] = useState(5);
  const [sustainabilityPowerTarget, setSustainabilityPowerTarget] = useState(800);
  
  // Track active scenario triggered in this session
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const handleScenarioChange = (scenario: string) => {
    triggerScenario(scenario as any);
    setActiveScenario(scenario);
  };

  // Severity color calculation helper for Telemetry
  const getQueueSeverity = (mins: number) => {
    if (mins <= 10) return { label: 'Optimal', style: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25', progressColor: 'bg-emerald-500' };
    if (mins <= 15) return { label: 'Warning', style: 'text-amber-600 bg-amber-500/10 border-amber-500/25', progressColor: 'bg-amber-500' };
    return { label: 'Critical', style: 'text-error bg-error/10 border-error/25 animate-pulse', progressColor: 'bg-error' };
  };

  const getStoppageSeverity = (mins: number) => {
    if (mins <= 2) return { label: 'Normal', style: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25', progressColor: 'bg-emerald-500' };
    if (mins <= 6) return { label: 'Elevated', style: 'text-amber-600 bg-amber-500/10 border-amber-500/25', progressColor: 'bg-amber-500' };
    return { label: 'Severe', style: 'text-error bg-error/10 border-error/25', progressColor: 'bg-error' };
  };

  const getThreatSeverity = (percent: string) => {
    if (parseInt(percent) <= 5) return { label: 'Nominal', style: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25', progressColor: 'bg-emerald-500' };
    if (parseInt(percent) <= 20) return { label: 'Medium', style: 'text-amber-600 bg-amber-500/10 border-amber-500/25', progressColor: 'bg-amber-500' };
    return { label: 'High Threat', style: 'text-error bg-error/10 border-error/25 animate-pulse', progressColor: 'bg-error' };
  };

  // Telemetry computations
  const simulatedQueue = Math.round(12 * crowdMultiplier + (metroDelayMins * 0.6));
  const simulatedStoppage = Math.round(1.5 * crowdMultiplier + (metroDelayMins * 0.4));
  const threatPercentage = crowdMultiplier > 1.5 || activeScenario ? (crowdMultiplier > 1.7 ? '34%' : '12%') : '2%';

  const queueData = getQueueSeverity(simulatedQueue);
  const stoppageData = getStoppageSeverity(simulatedStoppage);
  const threatData = getThreatSeverity(threatPercentage);

  return (
    <div className="space-y-6">
      
      {/* AI OS Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase font-mono tracking-wider">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI OS &bull; {t.aiDecisionSimulator}
          </div>
          <h1 className="font-display font-black text-3xl text-on-surface mt-1">
            {emergencyMode 
              ? "AI detected simulated disaster state. Directing all simulator resources to evacuation routes." 
              : t.aiDecisionSimulator
            }
          </h1>
          <p className="text-secondary text-xs font-sans mt-0.5">
            {t.contextAwareIntelligence}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Preset Scenarios & Sliders (Span 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Preset Scenarios Card */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/50 shadow-ultra-soft space-y-4">
            <div className="border-b border-outline-variant/30 pb-2 flex justify-between items-center">
              <h3 className="font-display font-black text-lg text-on-surface">Launch Preset Crisis</h3>
              <span className="text-[8px] text-secondary font-mono bg-surface-container px-1.5 py-0.5 rounded font-black uppercase">Preset Scripts</span>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5 text-xs font-mono font-bold">
              {[
                { label: '🔥 Crowd Surge', value: 'CROWD_SURGE', color: 'border-red-500/30 text-red-600 bg-red-500/5' },
                { label: '⚡ Lusail Power Outage', value: 'POWER_OUTAGE', color: 'border-amber-500/30 text-amber-600 bg-amber-500/5' },
                { label: '📡 Cyber Attack Gates', value: 'CYBER_ATTACK', color: 'border-rose-500/30 text-rose-600 bg-rose-500/5' },
                { label: '🛸 Unauthorized Drone', value: 'DRONE_INTRUSION', color: 'border-orange-500/30 text-orange-600 bg-orange-500/5' },
                { label: '🌧️ Storm Downpour', value: 'HEAVY_RAIN', color: 'border-blue-500/30 text-blue-600 bg-blue-500/5' },
                { label: '🚇 Metro Terminal Delay', value: 'METRO_DELAY', color: 'border-cyan-500/30 text-cyan-600 bg-cyan-500/5' }
              ].map(s => {
                const isActive = activeScenario === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => handleScenarioChange(s.value)}
                    className={`w-full text-left py-2.5 px-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm active:scale-[0.98] ${
                      isActive 
                        ? `border-primary ring-1 ring-primary/45 bg-primary/10 text-primary font-black` 
                        : 'bg-surface-container-low border-outline-variant/50 text-on-surface hover:border-primary/50 hover:bg-surface-container-high/60'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />}
                      <span className={isActive ? 'text-primary' : 'text-on-surface font-extrabold'}>{s.label}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <span className="text-[8px] bg-primary/15 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">Active</span>
                      ) : (
                        <ArrowRight size={12} className="text-secondary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What-If Telemetry Sliders */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/50 shadow-ultra-soft space-y-5">
            <div className="border-b border-outline-variant/30 pb-2 flex justify-between items-center">
              <h3 className="font-display font-black text-lg text-on-surface">Fine Parameter Controls</h3>
              <span className="text-[8px] text-secondary font-mono bg-surface-container px-1.5 py-0.5 rounded font-black uppercase font-mono">Analog Tuning</span>
            </div>
            
            <div className="space-y-5 text-xs font-sans">
              
              {/* Slider 1 */}
              <div className="space-y-2 bg-surface-container-low/40 p-3 rounded-2xl border border-outline-variant/30">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-on-surface flex items-center gap-1.5 font-bold">
                    <Users size={14} className="text-primary" />
                    <span>Expected Crowd Multiplier</span>
                  </span>
                  <span className="text-primary font-mono text-sm font-black bg-primary/5 border border-primary/20 px-2 py-0.5 rounded">{crowdMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  value={crowdMultiplier} 
                  onChange={(e) => setCrowdMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1 bg-surface-container rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2 bg-surface-container-low/40 p-3 rounded-2xl border border-outline-variant/30">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-on-surface flex items-center gap-1.5 font-bold">
                    <Clock size={14} className="text-primary" />
                    <span>Metro Ingress Delay</span>
                  </span>
                  <span className="text-primary font-mono text-sm font-black bg-primary/5 border border-primary/20 px-2 py-0.5 rounded">{metroDelayMins} mins</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  step="5" 
                  value={metroDelayMins} 
                  onChange={(e) => setMetroDelayMins(parseInt(e.target.value))}
                  className="w-full accent-primary h-1 bg-surface-container rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-2 bg-surface-container-low/40 p-3 rounded-2xl border border-outline-variant/30">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-on-surface flex items-center gap-1.5 font-bold">
                    <Zap size={14} className="text-primary" />
                    <span>Power Threshold Target</span>
                  </span>
                  <span className="text-primary font-mono text-sm font-black bg-primary/5 border border-primary/20 px-2 py-0.5 rounded">{sustainabilityPowerTarget} kW</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="1200" 
                  step="50" 
                  value={sustainabilityPowerTarget} 
                  onChange={(e) => setSustainabilityPowerTarget(parseInt(e.target.value))}
                  className="w-full accent-primary h-1 bg-surface-container rounded-lg appearance-none cursor-pointer"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Centerpiece: Simulation Outcomes (Span 5) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-5 space-y-5 shadow-ultra-soft">
            <div className="flex justify-between items-center border-b border-outline-variant/60 pb-3">
              <h3 className="font-display font-black text-xl text-on-surface">Simulated Telemetry Projections</h3>
              <span className="text-[9px] text-secondary font-mono font-bold uppercase tracking-wider">AI Projections Feed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Card 1 */}
              <div className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-2xl text-center flex flex-col justify-between h-28 relative overflow-hidden group">
                <span className="text-secondary text-[9px] font-mono font-bold uppercase block tracking-wider">Queue Prediction</span>
                <span className="text-2xl font-black text-on-surface font-mono my-1.5 block">
                  {simulatedQueue} min
                </span>
                
                {/* Visual severity badge */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase ${queueData.style}`}>
                    {queueData.label}
                  </span>
                  {/* Dynamic Progress line */}
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${queueData.progressColor}`} style={{ width: `${Math.min(100, (simulatedQueue / 25) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-2xl text-center flex flex-col justify-between h-28 relative overflow-hidden group">
                <span className="text-secondary text-[9px] font-mono font-bold uppercase block tracking-wider">Stoppage Time</span>
                <span className="text-2xl font-black text-on-surface font-mono my-1.5 block">
                  +{simulatedStoppage} min
                </span>
                
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase ${stoppageData.style}`}>
                    {stoppageData.label}
                  </span>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${stoppageData.progressColor}`} style={{ width: `${Math.min(100, (simulatedStoppage / 12) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-2xl text-center flex flex-col justify-between h-28 relative overflow-hidden group">
                <span className="text-secondary text-[9px] font-mono font-bold uppercase block tracking-wider">AI Threat Risk</span>
                <span className="text-2xl font-black text-on-surface font-mono my-1.5 block">
                  {threatPercentage}
                </span>
                
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase ${threatData.style}`}>
                    {threatData.label}
                  </span>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${threatData.progressColor}`} style={{ width: `${Math.min(100, (parseInt(threatPercentage) / 40) * 100)}%` }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Event Graph Flow overlay */}
            <div className="bg-surface-container-low p-4.5 rounded-2xl border border-outline-variant/60 space-y-3">
              <span className="text-[10px] font-bold text-secondary uppercase font-mono tracking-widest block font-black">Simulation Event Propagation</span>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold font-sans">
                <div className="bg-surface-container-lowest py-2.5 px-4 rounded-xl border border-outline-variant/60 shadow-sm text-on-surface flex items-center gap-2 flex-1 w-full justify-center">
                  <Zap size={14} className="text-amber-500 animate-pulse" />
                  <span>Outage Event</span>
                </div>
                
                <div className="text-outline-variant rotate-90 sm:rotate-0 font-mono text-sm">➔</div>
                
                <div className="bg-surface-container-lowest py-2.5 px-4 rounded-xl border border-outline-variant/60 shadow-sm text-on-surface flex items-center gap-2 flex-1 w-full justify-center">
                  <Cpu size={14} className="text-primary animate-pulse" />
                  <span>Backup Active</span>
                </div>
                
                <div className="text-outline-variant rotate-90 sm:rotate-0 font-mono text-sm">➔</div>
                
                <div className="bg-surface-container-lowest py-2.5 px-4 rounded-xl border border-primary/20 shadow-sm text-primary flex items-center gap-2 flex-1 w-full justify-center bg-primary/5">
                  <Navigation size={14} className="text-primary animate-bounce" />
                  <span>AI Dynamic Route</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Details Panel: AI Recommended Simulator Response (Span 3) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="glass-panel rounded-3xl p-5 border-l-4 border-primary space-y-4 shadow-ultra-soft">
            <div className="border-b border-outline-variant/40 pb-2 flex items-center justify-between">
              <h3 className="font-display font-black text-lg text-on-surface">Simulated Actions</h3>
              <span className="text-[8px] text-secondary font-mono bg-surface-container px-1.5 py-0.5 rounded font-black uppercase">Decisions</span>
            </div>
            
            <div className="space-y-4 text-xs font-sans">
              
              {/* Recommendation 1 */}
              <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/40 space-y-2 shadow-sm">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                  <span className="text-secondary uppercase">Recommendation</span>
                  <span className="text-primary font-black bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">96% Conf.</span>
                </div>
                <p className="font-extrabold text-on-surface leading-normal text-[11.5px]">
                  Reroute incoming Gate B traffic to Gate A immediately.
                </p>
                <div className="bg-surface-container-lowest p-2 rounded-xl text-[10px] font-mono text-secondary leading-normal border border-outline-variant/30 font-medium">
                  Why: Gate B occupancy is predicted to peak at 114% design capacity due to crowd surge.
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/40 space-y-2 shadow-sm">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                  <span className="text-secondary uppercase">Sustainability Action</span>
                  <span className="text-primary font-black bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">94% Conf.</span>
                </div>
                <p className="font-extrabold text-on-surface leading-normal text-[11.5px]">
                  Dim auxiliary visual structures outside by 30%.
                </p>
                <div className="bg-surface-container-lowest p-2 rounded-xl text-[10px] font-mono text-secondary leading-normal border border-outline-variant/30 font-medium">
                  Why: Power usage targets exceeded threshold of {sustainabilityPowerTarget} kW during ingress peak.
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
