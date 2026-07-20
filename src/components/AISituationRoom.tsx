import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { StadiumDigitalTwin } from './StadiumDigitalTwin';
import { 
  ShieldCheck, AlertTriangle, Clock, Activity, ShieldAlert, Zap,
  CheckCircle2, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AISituationRoom: React.FC = () => {
  const { state } = useLiveData();
  const { t } = useThemeSettings();
  const [activeExplainId, setActiveExplainId] = useState<string | null>(null);

  // Compute threat level based on active incidents
  const activeIncidents = state.incidents.filter(i => i.status !== 'resolved');
  const criticalCount = activeIncidents.filter(i => i.severity === 'critical').length;
  const highCount = activeIncidents.filter(i => i.severity === 'high').length;
  
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let riskColor = 'border-emerald-600/30 text-emerald-700 bg-emerald-600/10';
  
  if (criticalCount > 0 || highCount > 1 || state.occupancy.gates.C.congestion > 105) {
    riskLevel = 'HIGH';
    riskColor = 'border-red-600/30 text-red-700 bg-red-600/10 animate-pulse';
  } else if (activeIncidents.length > 0 || state.occupancy.gates.C.congestion > 90) {
    riskLevel = 'MEDIUM';
    riskColor = 'border-amber-600/30 text-amber-700 bg-amber-600/10';
  }

  // Next expected event countdown
  const nextMetroArrival = Math.min(
    state.transportation.metro.line1.nextArrivalMins,
    state.transportation.metro.line2.nextArrivalMins
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. HORIZONTAL STATUS BAR (Compact & Clean) */}
      <div 
        role="region" 
        aria-label="System status metrics" 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-low border border-outline-variant/60 p-4 rounded-2xl items-center shadow-ultra-soft"
      >
        
        {/* Risk Status Pill */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-secondary font-bold uppercase tracking-widest block">{t.systemThreatLevel}</span>
          <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase tracking-wider -skew-x-6 ${riskColor}`}>
            <ShieldAlert size={12} className="shrink-0" aria-hidden="true" />
            <span>{riskLevel} RISK</span>
          </div>
        </div>

        {/* Next critical countdown */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-secondary font-bold uppercase tracking-widest block">{t.transitIngressSurge}</span>
          <div className="flex items-center space-x-1.5 text-on-surface">
            <Clock size={13} className="text-primary" aria-hidden="true" />
            <span className="text-xs font-extrabold font-mono">Metro: {nextMetroArrival} min</span>
          </div>
        </div>

        {/* Dynamic Stadium Health */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-secondary font-bold uppercase tracking-widest block">{t.healthScore}</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-black text-on-surface font-sans leading-none">{state.healthScore.overall}%</span>
            <span className="text-[9px] text-emerald-600 font-mono font-bold">{t.stable}</span>
          </div>
        </div>

        {/* Active Alarms */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-secondary font-bold uppercase tracking-widest block">{t.dispatchedAlarms}</span>
          <div className="flex items-center space-x-1.5 text-on-surface">
            <span className={`h-2 w-2 rounded-full ${activeIncidents.length > 0 ? 'bg-error animate-ping' : 'bg-emerald-500'}`} aria-hidden="true" />
            <span className="text-xs font-extrabold">{activeIncidents.length} Active alerts</span>
          </div>
        </div>

      </div>

      {/* 2. THREE-COLUMN SPATIAL LAYOUT (Hero center maps) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left HUD: Granular health progress parameters */}
        <div className="space-y-5 lg:col-span-1" role="region" aria-label="Stadium health breakout">
          <div className="border-b border-outline-variant/60 pb-2">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{t.healthBreakout}</span>
          </div>
          
          <div className="space-y-4">
            {[
              { label: t.safetySecurity, val: state.healthScore.safety, color: 'bg-emerald-600' },
              { label: t.transportation, val: state.healthScore.safety, color: 'bg-primary' },
              { label: t.concessionsFood, val: state.healthScore.food, color: 'bg-primary' },
              { label: t.medicalDispatch, val: state.healthScore.medical, color: 'bg-error' },
              { label: t.accessibility, val: state.healthScore.accessibility, color: 'bg-primary' },
              { label: t.sustainability, val: state.healthScore.sustainability, color: 'bg-emerald-600' }
            ].map((score, idx) => (
              <div key={idx} className="space-y-1.5 text-xs text-left">
                <div className="flex items-center justify-between text-secondary">
                  <span className="text-[11px] font-bold leading-none">{score.label}</span>
                  <span className="font-extrabold font-mono text-[10px] text-on-surface">{score.val}/100</span>
                </div>
                <div 
                  className="w-full bg-surface-container rounded-full h-1"
                  role="progressbar"
                  aria-label={`${score.label} score`}
                  aria-valuenow={score.val}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={`${score.color} h-1 rounded-full`} style={{ width: `${score.val}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Core Latency diagnostics indicator */}
          <div className="bg-primary/5 border border-outline-variant/60 p-4 rounded-2xl space-y-2 text-left shadow-ultra-soft">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
              <Zap size={11} className="text-primary animate-pulse" aria-hidden="true" />
              <span>FLOW COGNITIVE DIAGNOSTIC</span>
            </div>
            <p className="text-[10px] text-secondary leading-normal">
              Active telemetry updates validated every 10s. Decision confidence score is dynamically mapped based on model inputs.
            </p>
          </div>
        </div>

        {/* Center HUD: The visual centerpiece (Stands Map Heatmap) */}
        <div className="lg:col-span-2 space-y-4" role="region" aria-label="Digital Twin Heatmap">
          <div className="border-b border-outline-variant/60 pb-2 text-center">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{t.digitalTwinTitle}</span>
          </div>

          <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-3xl overflow-hidden shadow-ultra-soft">
            <StadiumDigitalTwin />
          </div>
        </div>

        {/* Right HUD: AI automation logs connected timeline */}
        <div className="space-y-5 lg:col-span-1" role="region" aria-label="AI Decision Path timeline">
          <div className="border-b border-outline-variant/60 pb-2">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">{t.aiDecisionPath}</span>
          </div>

          <div className="space-y-4 pr-1">
            {state.aiTimeline.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 text-xs text-left relative">
                
                {/* Neon connecting circuit line */}
                {idx < Math.min(state.aiTimeline.length - 1, 3) && (
                  <div className="absolute top-5 left-2.5 bottom-[-16px] w-0.5 bg-outline-variant/60" />
                )}

                <div className="h-5 w-5 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                </div>

                <div className="flex-1 bg-surface-container-low border border-outline-variant/40 p-2.5 rounded-xl shadow-ultra-soft">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-on-surface text-[11px] leading-tight">{item.event}</span>
                    <span className="text-[9px] font-mono text-secondary">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-secondary leading-normal">Operational telemetry protocol configured.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. LOWER SECTION: Copilot Actions (Inspect Details Drawer) */}
      <section role="region" aria-label="AI Operations Action Queue" className="bg-surface-container-low p-5 rounded-3xl text-left border border-outline-variant/60 space-y-4 shadow-ultra-soft">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2">
          <div className="flex items-center space-x-2">
            <Sparkles size={14} className="text-primary animate-pulse" aria-hidden="true" />
            <h3 className="font-display font-black text-lg text-on-surface uppercase tracking-wider">AI Operations Action Queue</h3>
          </div>
          <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-extrabold uppercase font-mono">
            Inference Actions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.copilotActions.map((action) => {
            const isOpened = activeExplainId === action.id;
            let priorityClass = 'bg-secondary/10 text-secondary border-outline-variant/40';
            if (action.priority === 'high') priorityClass = 'bg-error/10 border-error/25 text-error';
            if (action.priority === 'medium') priorityClass = 'bg-primary/10 border-primary/25 text-primary';

            return (
              <div 
                key={action.id}
                className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-4 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 space-y-3 shadow-ultra-soft"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${priorityClass}`}>
                      {action.priority} Priority
                    </span>
                    <span className="text-[9px] text-secondary font-mono">Conf: {action.confidence}%</span>
                  </div>
                  <h4 className="font-extrabold text-on-surface text-xs leading-normal">{action.recommendation}</h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                  <button
                    onClick={() => setActiveExplainId(isOpened ? null : action.id)}
                    aria-expanded={isOpened}
                    aria-label={`Inspect why for recommendation: ${action.recommendation}`}
                    className="text-[10px] text-primary font-bold uppercase tracking-wider hover:underline flex items-center space-x-0.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded"
                  >
                    <span>{isOpened ? 'Hide Explanation' : 'Inspect Why?'}</span>
                    <ChevronRight size={10} className={`transform transition-transform ${isOpened ? 'rotate-90' : ''}`} aria-hidden="true" />
                  </button>
                </div>

                <AnimatePresence>
                  {isOpened && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-surface-container border border-outline-variant/60 p-2.5 rounded-xl text-[10px] text-secondary leading-relaxed font-sans overflow-hidden"
                    >
                      {action.why}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
