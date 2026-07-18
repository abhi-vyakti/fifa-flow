import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useAI } from '../contexts/AIContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { useSpeech } from '../hooks/useSpeech';
import { 
  Compass, MapPin, Search, Mic, Volume2, AlertTriangle, 
  Map, Ticket, CloudSun, Navigation, Clock, ShieldAlert, Sparkles 
} from 'lucide-react';

export const FanAssistant: React.FC = () => {
  const { state, reportIncident } = useLiveData();
  const { askCopilot, loading } = useAI();
  const { accessibility, voiceOutput } = useThemeSettings();

  const [ticketInput, setTicketInput] = useState('');
  const [ticketResult, setTicketResult] = useState<any | null>(null);
  const [voiceQueryActive, setVoiceQueryActive] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiWhy, setAiWhy] = useState<string[]>([]);
  const [aiAlternatives, setAiAlternatives] = useState<string[]>([]);

  // Speech hooks
  const { supported: voiceSupported, isListening, startListening, speak } = useSpeech((text) => {
    handleFanAsk(text);
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    // Simulate ticketing parsing (e.g. TICKET-SEC-C2-ROW-12)
    setTicketResult({
      sec: 'C2',
      row: '12',
      seat: '108',
      gate: 'Gate C',
      accessible: 'Elevator Lobby 3',
      closestFood: 'Stall 18 (Halal Grill)',
      alert: state.sections.C2.crowdDensity === 'red' ? 'Gate C queues are currently 22 mins. Rerouting suggested.' : null
    });
  };

  const handleFanAsk = async (promptText: string) => {
    setAiAnswer(null);
    try {
      const response = await askCopilot(promptText, 'fan');
      setAiAnswer(response.recommendation);
      setAiWhy(response.reasoning);
      setAiAlternatives(response.alternatives);
      if (voiceOutput) {
        speak(response.recommendation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // SOS trigger
  const triggerSOS = async () => {
    const confirmSOS = window.confirm('WARNING: This triggers an Emergency SOS. Medical and Security responders will be dispatched to your current location. Do you wish to proceed?');
    if (!confirmSOS) return;

    await reportIncident({
      title: 'Fan Emergency SOS Triggered',
      type: 'medical',
      severity: 'critical',
      location: 'Section C2',
      details: 'SOS distress alert submitted from mobile fan assistant portal. Dispatching immediate response.',
      priority: 1,
      department: 'Medical',
      resourcesRequired: ['First Aid Responders', 'Emergency Escort'],
      nearbyResponders: ['Medic Unit 3', 'Patrol 2'],
      escalationLevel: 'Level 1',
      suggestedActions: ['Roving volunteer contact patient', 'Clear row paths']
    });

    alert('SOS alert broadcast successful. Nearby volunteers and medic units have been dispatched. Stand by.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-white">Fan Assistant Portal</h1>
          <p className="text-xs text-gray-400">Navigation aids, restroom queue updates, and ticketing paths.</p>
        </div>

        {/* SOS Emergency button */}
        <button 
          onClick={triggerSOS}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase shadow-redGlow animate-pulse transition-all"
        >
          🚨 Trigger Emergency SOS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Route Assistant & Ticket Helper */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Search & Assistant */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Sparkles className="text-aiCyan" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Smart Stadium Assistant</h3>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              Ask about accessibility paths, closest restrooms, food recommendations, and departures:
            </p>

            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Ask e.g. 'What is the fastest route to Lot D avoiding stairs?'"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFanAsk((e.target as HTMLInputElement).value);
                  }
                }}
                className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-xl px-4 py-3 text-xs outline-none text-white placeholder-slate-400 font-sans focus:ring-1 focus:ring-aiCyan/30"
              />
              {voiceSupported && (
                <button 
                  onClick={isListening ? () => {} : startListening}
                  className={`p-2.5 rounded-xl border transition-all ${isListening ? 'bg-red-500/20 border-red-500/30 text-red-500 animate-pulse' : 'bg-white/5 border-darkBorder text-gray-400'}`}
                >
                  <Mic size={16} />
                </button>
              )}
            </div>

            {/* Response Presentation */}
            {aiAnswer && (
              <div className="bg-white/5 border border-darkBorder p-4 rounded-xl space-y-3 text-xs">
                
                <div className="space-y-1">
                  <div className="text-[10px] text-aiCyan font-bold uppercase">AI Navigation Instruction</div>
                  <p className="text-white font-extrabold leading-normal bg-aiCyan/10 border border-aiCyan/25 p-3 rounded-lg">
                    {aiAnswer}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Why this route? (Explainable AI)</div>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 pl-1">
                    {aiWhy.map((why, idx) => <li key={idx}>{why}</li>)}
                  </ul>
                </div>

                {aiAlternatives.length > 0 && (
                  <div className="space-y-1 border-t border-darkBorder/40 pt-2.5">
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Alternative Route</div>
                    <ul className="list-disc list-inside text-gray-400 space-y-0.5 pl-1">
                      {aiAlternatives.map((alt, idx) => <li key={idx}>{alt}</li>)}
                    </ul>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Ticket Helper */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Ticket className="text-fifaGold" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">QR Ticket Seat Finder</h3>
            </div>

            <form onSubmit={handleTicketSubmit} className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Enter Gate Code (e.g. SEC-C2)"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-xl px-4 py-2.5 text-xs outline-none text-white placeholder-slate-400 font-sans focus:ring-1 focus:ring-aiCyan/30"
              />
              <button 
                type="submit" 
                className="px-4 py-2.5 bg-gradient-to-r from-aiCyan to-aiPurple hover:brightness-110 text-white text-xs font-bold rounded-xl transition-all"
              >
                Scan Ticket
              </button>
            </form>

            {ticketResult && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/5 border border-darkBorder p-4 rounded-xl">
                <div>
                  <span className="text-[10px] text-gray-500 block">Section Seat coordinates</span>
                  <span className="font-bold text-white text-sm">Sec {ticketResult.sec}, Row {ticketResult.row}, Seat {ticketResult.seat}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">Recommended Entry checkpoint</span>
                  <span className="font-bold text-white text-sm">{ticketResult.gate}</span>
                </div>
                <div className="sm:col-span-2 border-t border-darkBorder/40 pt-2 space-y-1">
                  <span className="text-[10px] text-gray-500 block">Closest Food Concession</span>
                  <span className="font-semibold text-gray-300">{ticketResult.closestFood}</span>
                </div>
                
                {ticketResult.alert && (
                  <div className="sm:col-span-2 bg-red-950/20 border border-red-900/50 p-2.5 rounded-lg text-red-400 mt-2">
                    {ticketResult.alert}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Telemetry Widgets & Match Weather */}
        <div className="space-y-6">
          
          {/* Weather card */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <CloudSun className="text-aiCyan" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Live Weather Telemetry</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-white">{state.weather.tempC}&deg;C</span>
                <span className="text-xs text-gray-400 block mt-1 font-semibold uppercase">{state.weather.condition}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-gray-500">Humidity</span>
                <span className="font-bold text-white">{state.weather.humidityPercent}%</span>
              </div>
            </div>

            {state.weather.condition === 'RAIN' && (
              <div className="bg-blue-950/20 border border-blue-900/50 p-3 rounded-lg text-xs text-blue-300 font-medium">
                Wet Weather routing active. Outdoor plazas present slide slips risk.
              </div>
            )}
          </div>

          {/* Queue Predictions */}
          <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
            <div className="flex items-center space-x-2 border-b border-darkBorder pb-2">
              <Clock className="text-aiPurple" size={16} />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">Queue Wait Predictors</h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Gate C Ingress queue</span>
                  <span className="text-red-400 font-bold">{state.sections.C2.queueLength} mins</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Food Stall 18 (Halal Bowls)</span>
                  <span className="text-orange-400 font-bold">18 mins</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Metro Terminal platform queue</span>
                  <span className="text-emerald-400 font-bold">3 mins</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
