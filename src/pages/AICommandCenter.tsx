import React, { useState } from 'react';
import { AISituationRoom } from '../components/AISituationRoom';
import { AICopilot } from '../components/AICopilot';
import { useLiveData } from '../contexts/LiveDataContext';
import { 
  Sparkles, Sliders, AlertCircle, RefreshCw, BarChart2, Shield, Heart,
  Brain, MessagesSquare, FlaskConical
} from 'lucide-react';
import type { PresetScenario } from '../types';

type CommandCenterTab = 'situation' | 'copilot' | 'simulator';

export const AICommandCenter: React.FC = () => {
  const { triggerScenario, loading, state } = useLiveData();
  const [activeTab, setActiveTab] = useState<CommandCenterTab>('situation');

  const handleScenarioChange = async (scenario: PresetScenario) => {
    await triggerScenario(scenario);
    // Auto shift view back to situation room to inspect changes
    setActiveTab('situation');
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
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-darkBorder pb-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-white">AI Command Center</h1>
          <p className="text-xs text-gray-400">Predictive crowd intelligence and situation analytics.</p>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] bg-white/5 border border-darkBorder px-3 py-1.5 rounded-lg text-gray-400 shrink-0">
          <RefreshCw size={12} className="animate-spin text-aiCyan" />
          <span>Continuous Telemetry Optimization Active</span>
        </div>
      </div>

      {/* 1. TAB CONTROLLER HEADER (Premium UX design) */}
      <div className="flex border-b border-darkBorder/40 bg-black/20 p-1.5 rounded-xl max-w-lg">
        <button
          onClick={() => setActiveTab('situation')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 ${activeTab === 'situation' ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-b-2 border-aiCyan text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Brain size={14} className={activeTab === 'situation' ? 'text-aiCyan' : 'text-gray-400'} />
          <span>AI Situation Room</span>
        </button>

        <button
          onClick={() => setActiveTab('copilot')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 ${activeTab === 'copilot' ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-b-2 border-aiCyan text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <MessagesSquare size={14} className={activeTab === 'copilot' ? 'text-aiCyan' : 'text-gray-400'} />
          <span>FLOW AI Copilot</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 ${activeTab === 'simulator' ? 'bg-gradient-to-r from-aiCyan/15 to-transparent border-b-2 border-aiCyan text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <FlaskConical size={14} className={activeTab === 'simulator' ? 'text-aiCyan' : 'text-gray-400'} />
          <span>What-If Simulator</span>
        </button>
      </div>

      {/* 2. TAB CONTENT SWITCHER */}
      <div className="transition-all duration-300">
        {activeTab === 'situation' && (
          <div className="animate-soft-fade-in">
            <AISituationRoom />
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="max-w-3xl mx-auto animate-soft-fade-in">
            <AICopilot />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="max-w-2xl mx-auto bg-darkCard/25 border border-darkBorder p-6 rounded-2xl space-y-4 animate-soft-fade-in">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <FlaskConical className="text-aiPurple" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">Hypotheticals Simulation Desk</h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Trigger a preset crisis scenario to observe how the telemetry state updates. FLOW AI automatically re-evaluates gate entry loads, power usages, and responder routes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {scenariosList.map((scen) => (
                <button
                  key={scen.key}
                  type="button"
                  onClick={() => handleScenarioChange(scen.key)}
                  disabled={loading}
                  className="bg-white/5 border border-darkBorder hover:border-darkBorderGlow rounded-xl p-4 text-left transition-all hover:bg-white/10 group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white group-hover:text-aiCyan transition-colors">
                      {scen.name}
                    </span>
                    <span className="text-xs">{scen.emoji}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{scen.desc}</p>
                </button>
              ))}
            </div>

            <div className="text-[10px] text-gray-500 text-center border-t border-darkBorder pt-3">
              Activating overrides immediately updates the live situation room feeds.
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
