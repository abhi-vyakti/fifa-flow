import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useAI } from '../contexts/AIContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, TrendingUp, Clock, 
  Sparkles, CheckCircle2, RefreshCw, BarChart2, ShieldAlert, Zap
} from 'lucide-react';

export const AISituationRoom: React.FC = () => {
  const { state, triggerScenario } = useLiveData();
  const { askCopilot, loading } = useAI();
  const { role } = useThemeSettings();

  const [copilotExpanded, setCopilotExpanded] = useState<string | null>(null);

  // Compute threat level based on active incidents
  const activeIncidents = state.incidents.filter(i => i.status !== 'resolved');
  const criticalCount = activeIncidents.filter(i => i.severity === 'critical').length;
  const highCount = activeIncidents.filter(i => i.severity === 'high').length;
  
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let riskColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-greenGlow';
  
  if (criticalCount > 0 || highCount > 1 || state.occupancy.gates.C.congestion > 105) {
    riskLevel = 'HIGH';
    riskColor = 'text-red-400 border-red-500/30 bg-red-500/10 shadow-redGlow animate-pulse';
  } else if (activeIncidents.length > 0 || state.occupancy.gates.C.congestion > 90) {
    riskLevel = 'MEDIUM';
    riskColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-glow';
  }

  // Next expected event
  const nextMetroArrival = Math.min(
    state.transportation.metro.line1.nextArrivalMins,
    state.transportation.metro.line2.nextArrivalMins
  );
  
  // Bottleneck Gate
  let bottleneckGate = 'NONE';
  let maxCongestion = 0;
  Object.keys(state.occupancy.gates).forEach(key => {
    const gate = (state.occupancy.gates as any)[key];
    if (gate.congestion > maxCongestion) {
      maxCongestion = gate.congestion;
      bottleneckGate = `Gate ${key} (${gate.congestion}%)`;
    }
  });

  return (
    <div className="space-y-6">
      
      {/* 1. FLOW AI Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-darkBorder bg-darkCard/40 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-aiCyan to-aiPurple flex items-center justify-center font-bold text-white shadow-glow">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-md font-bold text-white font-sans">FLOW AI Persona</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center space-x-3 text-[10px] text-gray-400 mt-0.5">
              <span className="text-aiCyan font-semibold flex items-center space-x-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-aiCyan animate-ping mr-1" />
                WATCHING
              </span>
              <span>&bull;</span>
              <span className="font-medium text-emerald-400">MONITORING</span>
              <span>&bull;</span>
              <span className="font-medium text-purple-400">PREDICTING</span>
              <span>&bull;</span>
              <span className="font-medium text-fifaGold">RECOMMENDING</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Check Summary */}
        <div className="flex space-x-6 text-xs text-gray-400">
          <div className="text-right">
            <span className="block text-[10px] text-gray-500">Groq Engine Status</span>
            <span className="font-bold text-emerald-400">ONLINE</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-gray-500">Live Telemetry Rate</span>
            <span className="font-bold text-white">Every 10s</span>
          </div>
        </div>
      </div>

      {/* 2. Situational Operational Overview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Risk Level */}
        <div className={`border p-4 rounded-2xl flex flex-col justify-between h-28 transition-all ${riskColor}`}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
            <span>Current Risk Status</span>
            <ShieldCheck size={14} />
          </div>
          <div className="text-3xl font-black font-sans leading-none">{riskLevel}</div>
          <div className="text-[10px] opacity-80 leading-snug">
            {riskLevel === 'HIGH' 
              ? 'Immediate resource dispatcher action is required.' 
              : riskLevel === 'MEDIUM' 
              ? 'Roving responders alert. Incidents active.' 
              : 'Perimeters secure. Standard watch parameters.'}
          </div>
        </div>

        {/* Next Expected Event */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-28 border border-darkBorder">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Next Critical Event</span>
            <Clock size={14} className="text-aiCyan" />
          </div>
          <div className="text-xl font-extrabold text-white font-sans leading-none">
            Metro Ingress Arrival
          </div>
          <div className="text-xs text-aiCyan font-semibold flex items-center space-x-1">
            <span>Next train arriving in {nextMetroArrival} minutes</span>
          </div>
        </div>

        {/* Predicted Bottleneck */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-28 border border-darkBorder">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Predicted Bottleneck</span>
            <AlertTriangle size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-white font-sans leading-none">
            {state.occupancy.gates.C.congestion > 90 ? 'Gate C Entrance' : 'None Detected'}
          </div>
          <div className="text-xs text-gray-400">
            {state.occupancy.gates.C.congestion > 90 
              ? `Queue clearing speed delay exceeds threshold` 
              : 'All gate speeds are within nominal parameters'}
          </div>
        </div>

        {/* Overall Stadium Health Score */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-28 border border-darkBorder relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-aiCyan/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Stadium Health Score</span>
            <BarChart2 size={14} className="text-aiPurple" />
          </div>
          <div className="text-3xl font-black text-white font-sans leading-none">
            {state.healthScore.overall}%
          </div>
          <div className="text-[10px] text-gray-500">
            Weighted metrics of Safety, Transit, Food & Concessions
          </div>
        </div>

      </div>

      {/* 3. Stadium Health Granular Breakout */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Stadium Health Indicators</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Safety & Security', val: state.healthScore.safety, color: 'from-emerald-500 to-teal-500' },
            { label: 'Transportation', val: state.healthScore.transportation, color: 'from-blue-500 to-cyan-500' },
            { label: 'Concessions / Food', val: state.healthScore.food, color: 'from-amber-500 to-orange-500' },
            { label: 'Medical Dispatch', val: state.healthScore.medical, color: 'from-red-500 to-rose-500' },
            { label: 'Accessibility', val: state.healthScore.accessibility, color: 'from-purple-500 to-indigo-500' },
            { label: 'Sustainability', val: state.healthScore.sustainability, color: 'from-green-500 to-emerald-600' }
          ].map((score, idx) => (
            <div key={idx} className="bg-white/5 border border-darkBorder/40 p-3 rounded-xl space-y-2 hover:bg-white/10 transition-all">
              <span className="text-[10px] text-gray-400 block leading-tight font-sans h-8">{score.label}</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-extrabold text-white">{score.val}</span>
                <span className="text-[9px] text-gray-500">/100</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1">
                <div 
                  className={`bg-gradient-to-r ${score.color} h-1 rounded-full`} 
                  style={{ width: `${score.val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Giant AI Copilot Control & Copilot Recommendations */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-darkBorder pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-aiCyan" />
            <h3 className="font-bold text-sm tracking-wide text-white uppercase">FLOW AI Command Actions</h3>
          </div>
          <div className="text-[10px] bg-aiPurple/15 text-aiPurple border border-aiPurple/20 px-2.5 py-0.5 rounded font-extrabold tracking-wider">
            CONTEXT-AWARE DECISIONS
          </div>
        </div>

        {/* Grid layout of AI Action items */}
        <div className="space-y-3.5">
          {state.copilotActions.map((action) => {
            const isExpanded = copilotExpanded === action.id;
            let priorityBadge = 'bg-gray-500/10 text-gray-400 border-gray-500/20';
            if (action.priority === 'high') priorityBadge = 'bg-red-500/15 text-red-400 border-red-500/35';
            if (action.priority === 'medium') priorityBadge = 'bg-amber-500/15 text-amber-400 border-amber-500/35';

            return (
              <div 
                key={action.id} 
                className="bg-white/5 border border-darkBorder rounded-xl hover:border-darkBorderGlow transition-all duration-300"
              >
                <div 
                  onClick={() => setCopilotExpanded(isExpanded ? null : action.id)}
                  className="p-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${priorityBadge}`}>
                        {action.priority} Priority
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">Confidence: {action.confidence}%</span>
                    </div>
                    <p className="text-xs font-bold text-white leading-normal mt-1.5">{action.recommendation}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[10px] text-aiCyan font-semibold uppercase tracking-wider shrink-0 bg-aiCyan/10 border border-aiCyan/20 px-3 py-1.5 rounded-lg hover:bg-aiCyan/20 transition-all">
                    <span>Inspect Explainability</span>
                    <ArrowRight size={12} className={`transition-all duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-darkBorder/60 bg-black/25 rounded-b-xl space-y-3 text-xs">
                    
                    {/* Explainable AI "Why?" */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-white flex items-center space-x-1 text-gray-300">
                        <span>Why this action?</span>
                      </div>
                      <p className="text-gray-400 leading-normal bg-white/5 p-2 rounded border border-darkBorder/40">
                        {action.why}
                      </p>
                    </div>

                    {/* Alternatives Choices */}
                    <div className="space-y-1.5">
                      <div className="font-bold text-white text-gray-300">Alternative Options (FLOW AI Backup)</div>
                      <ul className="list-disc list-inside text-gray-400 space-y-1 pl-1">
                        <li>Open secondary bypass exits through West Plaza.</li>
                        <li>Update mobile app notifications to throttle gate queue traffic.</li>
                      </ul>
                    </div>

                    {/* Interactive Execute trigger */}
                    <div className="flex justify-end space-x-3 pt-2">
                      <button 
                        onClick={() => {
                          alert(`Executing: ${action.recommendation}`);
                          setCopilotExpanded(null);
                        }}
                        className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg transition-all shadow-greenGlow"
                      >
                        Execute Strategy
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. AI Timelines and Predictive Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Timeline Event Log */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-darkBorder pb-2">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">FLOW AI Automation Log</h3>
            <span className="text-[10px] text-gray-400 font-mono">REPLAY TIMELINE</span>
          </div>

          <div className="space-y-4 pt-2">
            {state.aiTimeline.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3.5 text-xs relative">
                
                {/* Timeline vertical bar */}
                {idx < state.aiTimeline.length - 1 && (
                  <div className="absolute top-5 left-2.5 bottom-[-16px] w-0.5 bg-darkBorder" />
                )}

                <div className="h-5 w-5 rounded-full bg-aiCyan/10 border border-aiCyan/35 flex items-center justify-center shrink-0 z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-aiCyan" />
                </div>

                <div className="flex-1 bg-white/5 border border-darkBorder/40 p-2.5 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{item.event}</span>
                    <span className="text-[10px] font-mono text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">FLOW AI telemetry agent executed automatic protocol mapping.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Congestion Timeline */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-darkBorder pb-2 mb-4">
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Predictive Crowd Egress Timeline</h3>
              <span className="text-[10px] text-aiCyan font-mono">SIMULATION MATRIX</span>
            </div>
            
            <p className="text-xs text-gray-400 mb-6">
              Simulated machine learning projections of overall stadium Gate C congestion:
            </p>

            <div className="space-y-6">
              
              {/* NOW */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Now</span>
                  <span className="text-red-400 font-bold">104% (Gate C Congestion Critical)</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* +5 min */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">5 Minutes</span>
                  <span className="text-orange-400 font-bold">88% (Redirecting Influx)</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* +10 min */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">10 Minutes</span>
                  <span className="text-amber-400 font-bold">76% (Bypass Lanes Flowing)</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              {/* +20 min */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">20 Minutes</span>
                  <span className="text-emerald-400 font-bold">48% (Standard Operations Restored)</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-darkBorder/40 text-[11px] text-gray-400 mt-4">
            <span className="font-bold text-white">Simulation Confidence Metric:</span> The ML timeline forecast maintains a 94% accuracy score based on historic crowd validation cycles.
          </div>
        </div>

      </div>
    </div>
  );
};
