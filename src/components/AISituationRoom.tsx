import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { StadiumDigitalTwin } from './StadiumDigitalTwin';
import { 
  ShieldCheck, AlertTriangle, Clock, Activity, ShieldAlert, Zap,
  CheckCircle2, Sparkles, ChevronRight, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AISituationRoom: React.FC = () => {
  const { state } = useLiveData();
  const [activeExplainId, setActiveExplainId] = useState<string | null>(null);

  // Compute threat level based on active incidents
  const activeIncidents = state.incidents.filter(i => i.status !== 'resolved');
  const criticalCount = activeIncidents.filter(i => i.severity === 'critical').length;
  const highCount = activeIncidents.filter(i => i.severity === 'high').length;
  
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let riskColor = 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5';
  
  if (criticalCount > 0 || highCount > 1 || state.occupancy.gates.C.congestion > 105) {
    riskLevel = 'HIGH';
    riskColor = 'border-red-500/30 text-red-400 bg-red-500/5 animate-pulse';
  } else if (activeIncidents.length > 0 || state.occupancy.gates.C.congestion > 90) {
    riskLevel = 'MEDIUM';
    riskColor = 'border-amber-500/30 text-amber-400 bg-amber-500/5';
  }

  // Next expected event countdown
  const nextMetroArrival = Math.min(
    state.transportation.metro.line1.nextArrivalMins,
    state.transportation.metro.line2.nextArrivalMins
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. HORIZONTAL STATUS BAR (Compact & Clean) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/[0.02] border border-darkBorder p-4 rounded-2xl items-center">
        
        {/* Risk Status Pill */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">System Threat Level</span>
          <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase tracking-wider -skew-x-6 ${riskColor}`}>
            <ShieldAlert size={12} className="shrink-0" />
            <span>{riskLevel} RISK</span>
          </div>
        </div>

        {/* Next critical countdown */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Transit Ingress Surge</span>
          <div className="flex items-center space-x-1.5 text-white">
            <Clock size={13} className="text-aiCyan" />
            <span className="text-xs font-bold font-mono">Metro: {nextMetroArrival} min</span>
          </div>
        </div>

        {/* Dynamic Stadium Health */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Overall Health</span>
          <div className="flex items-baseline space-x-1.5 text-white">
            <span className="text-sm font-extrabold text-white font-sans leading-none">{state.healthScore.overall}%</span>
            <span className="text-[9px] text-emerald-400 font-mono">STABLE</span>
          </div>
        </div>

        {/* Active Alarms */}
        <div className="space-y-1 text-left">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Dispatched Alarms</span>
          <div className="flex items-center space-x-1.5 text-white">
            <span className={`h-2 w-2 rounded-full ${activeIncidents.length > 0 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-xs font-bold">{activeIncidents.length} Active alerts</span>
          </div>
        </div>

      </div>

      {/* 2. THREE-COLUMN SPATIAL LAYOUT (Hero center maps) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left HUD: Granular health progress parameters */}
        <div className="space-y-5 lg:col-span-1">
          <div className="border-b border-darkBorder pb-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Health breakout</span>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Safety & Security', val: state.healthScore.safety, color: 'bg-emerald-500' },
              { label: 'Transportation', val: state.healthScore.transportation, color: 'bg-cyan-500' },
              { label: 'Concessions / Food', val: state.healthScore.food, color: 'bg-amber-500' },
              { label: 'Medical Dispatch', val: state.healthScore.medical, color: 'bg-red-500' },
              { label: 'Accessibility', val: state.healthScore.accessibility, color: 'bg-purple-500' },
              { label: 'Sustainability', val: state.healthScore.sustainability, color: 'bg-green-500' }
            ].map((score, idx) => (
              <div key={idx} className="space-y-1.5 text-xs text-left">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-[11px] font-medium leading-none">{score.label}</span>
                  <span className="font-bold font-mono text-[10px] text-white">{score.val}/100</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1">
                  <div className={`${score.color} h-1 rounded-full`} style={{ width: `${score.val}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Core Latency diagnostics indicator */}
          <div className="bg-gradient-to-r from-aiPurple/10 via-aiCyan/5 to-transparent border border-darkBorder p-3 rounded-xl space-y-2 text-left">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
              <Zap size={11} className="text-aiCyan animate-pulse" />
              <span>FLOW COGNITIVE DIAGNOSTIC</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Active telemetry updates validated every 10s. Decision confidence score is dynamically mapped based on model inputs.
            </p>
          </div>
        </div>

        {/* Center HUD: The visual centerpiece (Stands Map Heatmap) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border-b border-darkBorder pb-2 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Interactive Digital Twin Heatmap</span>
          </div>

          <div className="p-4 bg-black/30 border border-darkBorder rounded-3xl overflow-hidden shadow-inner">
            <StadiumDigitalTwin />
          </div>
        </div>

        {/* Right HUD: AI automation logs connected timeline */}
        <div className="space-y-5 lg:col-span-1">
          <div className="border-b border-darkBorder pb-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AI Decision Path</span>
          </div>

          <div className="space-y-4 pr-1">
            {state.aiTimeline.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 text-xs text-left relative">
                
                {/* Neon connecting circuit line */}
                {idx < Math.min(state.aiTimeline.length - 1, 3) && (
                  <div className="absolute top-5 left-2.5 bottom-[-16px] w-0.5 bg-darkBorder" />
                )}

                <div className="h-5 w-5 rounded-full bg-aiCyan/5 border border-aiCyan/25 flex items-center justify-center shrink-0 z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-aiCyan" />
                </div>

                <div className="flex-1 bg-white/5 border border-darkBorder/40 p-2.5 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-[11px] leading-tight">{item.event}</span>
                    <span className="text-[9px] font-mono text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">Operational telemetry protocol configured.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. LOWER SECTION: Copilot Actions (Inspect Details Drawer) */}
      <section className="glass-panel p-5 rounded-2xl text-left border border-darkBorder space-y-4">
        <div className="flex items-center justify-between border-b border-darkBorder pb-2">
          <div className="flex items-center space-x-2">
            <Sparkles size={14} className="text-aiCyan" />
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">AI Operations Action Queue</h3>
          </div>
          <span className="text-[9px] bg-aiPurple/15 text-aiPurple border border-aiPurple/20 px-2 py-0.5 rounded font-extrabold uppercase">
            Inference Actions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.copilotActions.map((action) => {
            const isOpened = activeExplainId === action.id;
            let priorityClass = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            if (action.priority === 'high') priorityClass = 'bg-red-500/15 border-red-500/35 text-red-400';
            if (action.priority === 'medium') priorityClass = 'bg-amber-500/15 border-amber-500/35 text-amber-400';

            return (
              <div 
                key={action.id}
                className="bg-white/5 border border-darkBorder/50 rounded-xl p-4 flex flex-col justify-between hover:border-darkBorderGlow transition-all duration-300 space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${priorityClass}`}>
                      {action.priority} Priority
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono">Conf: {action.confidence}%</span>
                  </div>
                  <h4 className="font-extrabold text-white text-xs leading-normal">{action.recommendation}</h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.02]">
                  <button
                    onClick={() => setActiveExplainId(isOpened ? null : action.id)}
                    className="text-[10px] text-aiCyan font-bold uppercase tracking-wider hover:underline flex items-center space-x-0.5"
                  >
                    <span>{isOpened ? 'Hide Explanation' : 'Inspect Why?'}</span>
                    <ChevronRight size={10} className={`transform transition-transform ${isOpened ? 'rotate-90' : ''}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {isOpened && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-black/35 border border-darkBorder p-2.5 rounded-lg text-[10px] text-gray-400 leading-relaxed font-sans overflow-hidden"
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
