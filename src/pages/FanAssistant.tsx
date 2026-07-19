import React, { useState } from 'react';
import { useLiveData } from '../contexts/LiveDataContext';
import { useAI } from '../contexts/AIContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { useSpeech } from '../hooks/useSpeech';
import { 
  MapPin, Mic, Ticket, CloudSun, Clock, Sparkles 
} from 'lucide-react';

export const FanAssistant: React.FC = () => {
  const { state, reportIncident } = useLiveData();
  const { askCopilot } = useAI();
  const { voiceOutput } = useThemeSettings();

  const [ticketInput, setTicketInput] = useState('');
  const [ticketResult, setTicketResult] = useState<any | null>(null);
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

    const code = ticketInput.toUpperCase().trim();
    if (code.includes('C2') || code.includes('C')) {
      setTicketResult({
        sec: 'C2', row: '12', seat: '14',
        gate: 'Gate D (Alternative Egress active)',
        closestFood: 'Halal Bowls (Section C2 plaza)',
        alert: 'Gate C turnstiles are currently blocked. Reroute via west Gate D corridor.'
      });
    } else {
      setTicketResult({
        sec: 'A3', row: '24', seat: '8',
        gate: 'Gate A (North Entrance)',
        closestFood: 'FIFA Fan Grill (Section A3)'
      });
    }
  };

  const handleFanAsk = async (query: string) => {
    if (!query.trim()) return;
    
    // Simulate smart route outputs
    if (query.toLowerCase().includes('bathroom') || query.toLowerCase().includes('restroom')) {
      const resp = "Fastest accessible route is Concourse A Corridor West (1.2 min walk). Avoiding Section C2 elevator traffic bottlenecks.";
      setAiAnswer(resp);
      setAiWhy([
        "Main elevators are congested near Section C2 (85% queue load).",
        "Corridor West restroom has 0 reported wait times."
      ]);
      setAiAlternatives(["Concourse A South escalators to lower plaza"]);
      if (voiceOutput) speak(resp);
    } else {
      const trace = await askCopilot(query, 'fan');
      setAiAnswer(trace.recommendation);
      setAiWhy(trace.reasoning && trace.reasoning.length > 0 ? trace.reasoning : ["Optimization for current foot-traffic volumes.", "Dynamic bypass filters applied."]);
      setAiAlternatives(trace.alternatives && trace.alternatives.length > 0 ? trace.alternatives : ["Standard placard maps egress corridors"]);
      if (voiceOutput) speak(trace.recommendation);
    }
  };

  const triggerSOS = async () => {
    const confirmSOS = window.confirm("Confirm emergency SOS dispatch? Medical responders and nearby coordinators will receive your GPS section lock immediately.");
    if (!confirmSOS) return;

    await reportIncident({
      title: 'Fan Emergency SOS Triggered',
      type: 'medical',
      severity: 'critical',
      location: 'Section C2',
      details: 'Panic SOS button triggered by a spectator device in Sector C2.',
      priority: 1,
      department: 'Medical',
      resourcesRequired: ['AED Defibrillator', 'Paramedic Team'],
      nearbyResponders: ['Medical Unit B-3'],
      escalationLevel: 'Level 1',
      suggestedActions: ['Clear immediate vicinity corridors', 'Prepare CPR standby'],
      status: 'reported'
    });
    alert("Emergency alert transmitted. Medical unit B-3 has been dispatched.");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-sans tracking-wide text-on-surface">Fan Assistant Portal</h1>
          <p className="text-xs text-secondary font-medium">Navigation aids, restroom queue updates, and ticketing paths.</p>
        </div>

        {/* SOS Emergency button */}
        <button 
          onClick={triggerSOS}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase shadow-sm animate-pulse transition-all cursor-pointer active:scale-95"
        >
          🚨 Trigger Emergency SOS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Route Assistant & Ticket Helper */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Search & Assistant */}
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <Sparkles className="text-primary" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">Smart Stadium Assistant</h3>
            </div>

            <p className="text-xs text-secondary font-medium leading-normal">
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
                className="w-full bg-surface border border-outline-variant focus:border-primary rounded-xl px-4 py-3 text-xs outline-none text-on-surface placeholder-secondary/50 font-sans focus:ring-1 focus:ring-primary/30"
              />
              {voiceSupported && (
                <button 
                  onClick={isListening ? () => {} : startListening}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isListening ? 'bg-red-500/20 border-red-500/30 text-red-500 animate-pulse' : 'bg-surface-container-low border-outline-variant text-secondary hover:bg-surface-container-high'}`}
                >
                  <Mic size={16} />
                </button>
              )}
            </div>

            {/* Response Presentation */}
            {aiAnswer && (
              <div className="bg-surface-container-low border border-outline-variant/45 p-4 rounded-xl space-y-3.5 text-xs hover:border-outline-variant transition-colors">
                
                <div className="space-y-1">
                  <div className="text-[10px] text-primary font-bold uppercase tracking-wider">AI Navigation Instruction</div>
                  <p className="text-on-surface font-extrabold leading-normal bg-primary/10 border border-primary/20 p-3 rounded-lg">
                    {aiAnswer}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">Why this route? (Explainable AI)</div>
                  <ul className="list-disc list-inside text-secondary font-medium space-y-1.5 pl-1">
                    {aiWhy.map((why, idx) => <li key={idx}>{why}</li>)}
                  </ul>
                </div>

                {aiAlternatives.length > 0 && (
                  <div className="space-y-1 border-t border-outline-variant/30 pt-2.5">
                    <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">Alternative Route</div>
                    <ul className="list-disc list-inside text-secondary/80 font-medium space-y-0.5 pl-1">
                      {aiAlternatives.map((alt, idx) => <li key={idx}>{alt}</li>)}
                    </ul>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Ticket Helper */}
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <Ticket className="text-primary" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">QR Ticket Seat Finder</h3>
            </div>

            <form onSubmit={handleTicketSubmit} className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Enter Gate Code (e.g. SEC-C2)"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="w-full bg-surface border border-outline-variant focus:border-primary rounded-xl px-4 py-2.5 text-xs outline-none text-on-surface placeholder-secondary/50 font-sans focus:ring-1 focus:ring-primary/30"
              />
              <button 
                type="submit" 
                className="px-4 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Scan Ticket
              </button>
            </form>

            {ticketResult && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-surface-container-low border border-outline-variant/45 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] text-secondary font-semibold block">Section Seat coordinates</span>
                  <span className="font-extrabold text-on-surface text-sm">Sec {ticketResult.sec}, Row {ticketResult.row}, Seat {ticketResult.seat}</span>
                </div>
                <div>
                  <span className="text-[10px] text-secondary font-semibold block">Recommended Entry checkpoint</span>
                  <span className="font-extrabold text-on-surface text-sm">{ticketResult.gate}</span>
                </div>
                <div className="sm:col-span-2 border-t border-outline-variant/30 pt-2 space-y-1">
                  <span className="text-[10px] text-secondary font-semibold block">Closest Food Concession</span>
                  <span className="font-bold text-secondary">{ticketResult.closestFood}</span>
                </div>
                
                {ticketResult.alert && (
                  <div className="sm:col-span-2 bg-red-500/10 border border-red-500/25 p-2.5 rounded-lg text-error font-semibold mt-2">
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
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <CloudSun className="text-primary" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">Live Weather Telemetry</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-on-surface">{state.weather.tempC}&deg;C</span>
                <span className="text-xs text-secondary block mt-1 font-semibold uppercase">{state.weather.condition}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-secondary/85 font-mono">Humidity</span>
                <span className="font-extrabold text-on-surface">{state.weather.humidityPercent}%</span>
              </div>
            </div>

            {state.weather.condition === 'RAIN' && (
              <div className="bg-red-500/5 border border-red-500/15 p-3 rounded-lg text-xs text-error font-semibold">
                Wet Weather routing active. Outdoor plazas present slide slips risk.
              </div>
            )}
          </div>

          {/* Queue Predictions */}
          <div className="glass-panel p-5 rounded-2xl border border-outline-variant/60 space-y-4">
            <div className="flex items-center space-x-2 border-b border-outline-variant/60 pb-2">
              <Clock className="text-primary" size={16} />
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider font-sans">Queue Wait Predictors</h3>
            </div>

            <div className="space-y-3.5 text-xs font-semibold">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-secondary font-medium">Gate C Ingress queue</span>
                  <span className="text-error font-bold">{state.sections.C2.queueLength} mins</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-error h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-secondary font-medium">Food Stall 18 (Halal Bowls)</span>
                  <span className="text-orange-500 font-bold">18 mins</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-secondary font-medium">Metro platform queue</span>
                  <span className="text-emerald-600 font-bold">3 mins</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
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
