import React from 'react';
import { AISituationRoom } from '../components/AISituationRoom';
import { AICopilot } from '../components/AICopilot';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  Sparkles, Sliders, AlertCircle, RefreshCw, BarChart2, Shield, Heart 
} from 'lucide-react';
import { PresetScenario } from '../types';

export const AICommandCenter: React.FC = () => {
  const { triggerScenario, loading, state } = useLiveData();

  const handleScenarioChange = async (scenario: PresetScenario) => {
    await triggerScenario(scenario);
  };

  const scenariosList: { name: string; key: PresetScenario; desc: string; emoji: string }[] = [
    { name: 'Kickoff Rush', key: 'KICKOFF_RUSH', desc: 'Saturates Gates B & C to peak capacity.', emoji: '🏟️' },
    { name: 'Medical Emergency', key: 'MEDICAL_EMERGENCY', desc: 'Dispatches responder unit to Section B2.', emoji: '🚨' },
    { name: 'Heavy Rain Downpour', key: 'HEAVY_RAIN', desc: 'Delays shuttle fleets & spikes indoor concourse load.', emoji: '🌧️' },
    { name: 'Metro Line Delay', key: 'METRO_DELAY', desc: 'Causes 25-minute platform backlog congestion.', emoji: '🚇' },
    { name: 'Full Capacity Stadium', key: 'FULL_STADIUM', desc: 'Fills stadium seats to 99.9% occupancy.', emoji: '🔥' },
    { name: 'VIP Motorcade Arrival', key: 'VIP_ARRIVAL', desc: 'Locks VIP parking and routes secure corridor.', emoji: '🕴️' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-white">AI Command Center</h1>
          <p className="text-xs text-gray-400">Predictive crowd intelligence and situation analytics.</p>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] bg-white/5 border border-darkBorder px-3 py-1.5 rounded-lg text-gray-400">
          <RefreshCw size={12} className="animate-spin text-aiCyan" />
          <span>Continuous Telemetry Optimization Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Columns - Situation Room Details */}
        <div className="xl:col-span-2 space-y-6">
          <AISituationRoom />
        </div>

        {/* Right Column - Copilot Input & What-If Simulator */}
        <div className="space-y-6">
          
          {/* AI Copilot Panel */}
          <AICopilot />

          {/* What-If Simulator Panel */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-3">
              <Sliders className="text-aiPurple" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">What-If Simulator</h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Select an operational event to simulate changes in crowd flows, wait times, transportation, and safety protocols:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {scenariosList.map((scen) => (
                <button
                  key={scen.key}
                  type="button"
                  onClick={() => handleScenarioChange(scen.key)}
                  disabled={loading}
                  className="bg-white/5 border border-darkBorder hover:border-darkBorderGlow rounded-xl p-3 text-left transition-all hover:bg-white/10 group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white group-hover:text-aiCyan transition-colors">
                      {scen.name}
                    </span>
                    <span className="text-xs">{scen.emoji}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-snug">{scen.desc}</p>
                </button>
              ))}
            </div>
            
            <div className="text-[10px] text-gray-500 text-center border-t border-darkBorder pt-3">
              Triggers simulate real-time telemetry model overrides.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
