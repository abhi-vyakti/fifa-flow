import React, { useState } from 'react';
import { AISituationRoom } from '../components/AISituationRoom';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  RefreshCw, Brain, FlaskConical
} from 'lucide-react';
import type { PresetScenario } from '../types';

type CommandCenterTab = 'situation' | 'simulator';

export const AICommandCenter: React.FC = () => {
  const { triggerScenario, loading } = useLiveData();
  const [activeTab, setActiveTab] = useState<CommandCenterTab>('situation');

  const handleScenarioChange = async (scenario: PresetScenario) => {
    await triggerScenario(scenario);
    setActiveTab('situation');
  };

  const scenariosList: { name: string; key: PresetScenario; desc: string }[] = [
    { name: 'Kickoff Rush', key: 'KICKOFF_RUSH', desc: 'Saturates Gates B & C to peak capacity.' },
    { name: 'Medical Emergency', key: 'MEDICAL_EMERGENCY', desc: 'Dispatches responder unit to Section B2.' },
    { name: 'Heavy Rain Downpour', key: 'HEAVY_RAIN', desc: 'Delays shuttle fleets & spikes indoor concourse load.' },
    { name: 'Metro Line Delay', key: 'METRO_DELAY', desc: 'Causes 25-minute platform backlog congestion.' },
    { name: 'Full Capacity Stadium', key: 'FULL_STADIUM', desc: 'Fills stadium seats to 99.9% occupancy.' },
    { name: 'VIP Motorcade Arrival', key: 'VIP_ARRIVAL', desc: 'Locks VIP parking and routes secure corridor.' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-4">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tight text-on-surface">AI Command Center</h1>
          <p className="text-xs text-secondary mt-0.5">Predictive crowd intelligence and situational analytics. Use the floating orb (bottom-right) for the AI Copilot.</p>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] bg-surface-container-low border border-outline-variant/60 px-3 py-1.5 rounded-xl text-secondary shrink-0 shadow-ultra-soft">
          <RefreshCw size={12} className="animate-spin text-primary" />
          <span className="font-mono font-bold">Continuous Telemetry Active</span>
        </div>
      </div>

      {/* Tab Controller */}
      <div className="flex border border-outline-variant/60 bg-surface-container-low p-1.5 rounded-2xl max-w-sm shadow-ultra-soft">
        <button
          onClick={() => setActiveTab('situation')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
            activeTab === 'situation' 
              ? 'bg-primary text-white shadow-ultra-soft' 
              : 'text-secondary hover:text-primary hover:bg-surface-container-high'
          }`}
        >
          <Brain size={14} />
          <span>Situation Room</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
            activeTab === 'simulator' 
              ? 'bg-primary text-white shadow-ultra-soft' 
              : 'text-secondary hover:text-primary hover:bg-surface-container-high'
          }`}
        >
          <FlaskConical size={14} />
          <span>What-If Simulator</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'situation' && (
          <div className="animate-soft-fade-in">
            <AISituationRoom />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="max-w-2xl mx-auto bg-surface-container-low border border-outline-variant/60 p-6 rounded-3xl space-y-4 animate-soft-fade-in shadow-ultra-soft">
            <div className="flex items-center space-x-2 border-b border-outline-variant/40 pb-2">
              <FlaskConical className="text-primary" size={16} />
              <h3 className="font-display font-black text-lg text-on-surface uppercase tracking-wider">Hypotheticals Simulation Desk</h3>
            </div>

            <p className="text-xs text-secondary leading-normal">
              Trigger a preset crisis scenario to observe how the telemetry state updates. FLOW AI automatically re-evaluates gate entry loads, power usages, and responder routes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {scenariosList.map((scen) => (
                <button
                  key={scen.key}
                  type="button"
                  onClick={() => handleScenarioChange(scen.key)}
                  disabled={loading}
                  className="bg-surface-container-lowest border border-outline-variant/60 hover:border-primary hover:text-primary rounded-2xl p-4 text-left transition-all group space-y-1.5 shadow-ultra-soft cursor-pointer"
                >
                  <span className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors block">
                    {scen.name}
                  </span>
                  <p className="text-[10px] text-secondary leading-relaxed">{scen.desc}</p>
                </button>
              ))}
            </div>

            <div className="text-[10px] text-secondary text-center border-t border-outline-variant/40 pt-3 font-mono">
              Activating overrides immediately updates the live situation room feeds.
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
