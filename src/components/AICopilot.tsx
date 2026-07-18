import React, { useState, useEffect } from 'react';
import { useAI, type AIReasoningTrace } from '../contexts/AIContext';
import { useLiveData } from '../contexts/LiveDataContext';
import { useSpeech } from '../hooks/useSpeech';
import { 
  Sparkles, Send, Mic, ShieldAlert, AlertTriangle, 
  X, Loader2, MessageSquare, ChevronLeft, Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AICopilot: React.FC = () => {
  const { askCopilot, loading, activeStep } = useAI();
  const { state } = useLiveData();
  
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AIReasoningTrace | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hudState, setHudState] = useState<'orb' | 'summary' | 'panel'>('orb');

  const { supported: voiceSupported, isListening, startListening, speak } = useSpeech((text) => {
    setQuery(text);
  });

  // Track active alerts
  const activeIncidents = state.incidents.filter(i => i.status !== 'resolved');
  const criticalAlert = activeIncidents.find(i => i.severity === 'critical' || i.severity === 'high');

  // Auto-transition to summary alert when incidents fire
  useEffect(() => {
    setHudState(prev => {
      if (activeIncidents.length > 0 && prev === 'orb') return 'summary';
      if (activeIncidents.length === 0 && prev === 'summary') return 'orb';
      return prev;
    });
  }, [activeIncidents.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    
    const textToSend = query;
    setQuery('');
    setError(null);
    setHudState('panel');
    
    try {
      const result = await askCopilot(textToSend, 'organizer');
      setResponse(result);
      if (result?.recommendation) {
        speak(result.recommendation);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI inference failed. Please retry.');
    }
  };

  const handleClose = () => {
    setHudState(activeIncidents.length > 0 ? 'summary' : 'orb');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-3 pointer-events-none">
      <AnimatePresence mode="wait">
        
        {/* STATE 1: Floating pulsing orb */}
        {hudState === 'orb' && (
          <motion.button
            key="orb"
            type="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setHudState('panel')}
            className="pointer-events-auto h-14 w-14 rounded-full bg-gradient-to-br from-aiCyan to-blue-600 hover:brightness-110 flex items-center justify-center text-white shadow-glow relative border border-white/10 cursor-pointer"
            title="Open AI Copilot (FLOW)"
          >
            <MessageSquare size={20} />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-aiCyan border-2 border-[#020308] animate-ping" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-aiCyan border-2 border-[#020308]" />
          </motion.button>
        )}

        {/* STATE 2: Mini incident summary pill */}
        {hudState === 'summary' && (
          <motion.button
            key="summary"
            type="button"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            onClick={() => setHudState('panel')}
            className="pointer-events-auto flex items-center space-x-3 bg-red-950/90 border border-red-500/35 pl-3 pr-4 py-2.5 rounded-full shadow-glass hover:brightness-105 transition-all text-xs font-semibold text-white cursor-pointer"
          >
            <ShieldAlert className="text-red-400 animate-pulse shrink-0" size={14} />
            <span className="max-w-[200px] truncate">
              {criticalAlert 
                ? `${criticalAlert.title}` 
                : `${activeIncidents.length} Active Alerts`}
            </span>
            <ChevronLeft size={12} className="text-gray-400 -rotate-180 shrink-0" />
          </motion.button>
        )}

        {/* STATE 3: Full slide-out frosted console drawer */}
        {hudState === 'panel' && (
          <motion.div
            key="panel"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 210 }}
            className="pointer-events-auto w-80 sm:w-[360px] bg-darkCard/95 border border-darkBorder backdrop-blur-2xl rounded-2xl flex flex-col shadow-glass"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-darkBorder p-4 shrink-0">
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-aiCyan animate-pulse" />
                <span className="font-extrabold text-xs text-white uppercase tracking-wider">FLOW AI Copilot</span>
              </div>
              <button 
                onClick={handleClose}
                className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable response area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              
              {/* Loading state */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <Loader2 className="text-aiCyan animate-spin" size={22} />
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    {activeStep?.step ?? 'Analyzing...'}
                  </span>
                  {activeStep?.message && (
                    <span className="text-[10px] text-gray-600 text-center max-w-[240px] leading-relaxed">
                      {activeStep.message}
                    </span>
                  )}
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="bg-red-950/20 border border-red-500/20 p-3 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-red-400 flex items-center space-x-1.5">
                    <AlertTriangle size={12} />
                    <span>Inference Error</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal">{error}</p>
                </div>
              )}

              {/* Empty state */}
              {!loading && !response && !error && (
                <div className="text-center py-8 space-y-2">
                  <Brain className="mx-auto text-gray-700" size={28} />
                  <p className="text-[10px] text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                    Ask about crowd flows, gate congestion, or incident response.
                  </p>
                  {/* Quick prompt suggestions */}
                  <div className="flex flex-col space-y-1.5 mt-4">
                    {['What should I do about Gate C?', 'Metro delay impact?', 'Any medical alerts?'].map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-[10px] text-left px-3 py-2 bg-white/5 border border-darkBorder rounded-lg text-gray-400 hover:text-aiCyan hover:border-aiCyan/30 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Response */}
              {!loading && response && (
                <div className="space-y-4 text-xs">
                  
                  {/* Recommendation card — glows as the focal point */}
                  <div className="bg-gradient-to-br from-aiCyan/10 to-transparent border border-aiCyan/25 p-4 rounded-xl space-y-1.5 shadow-glow">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-aiCyan font-bold uppercase tracking-widest">FLOW Recommendation</span>
                      <span className="text-aiCyan font-mono font-bold text-[10px]">{response.confidence}%</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-[11px]">{response.recommendation}</p>
                  </div>

                  {/* Logic trace */}
                  {response.reasoning?.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Explainable Logic</span>
                      <div className="space-y-1 pl-2 border-l border-darkBorder">
                        {response.reasoning.map((item, idx) => (
                          <p key={idx} className="text-gray-400 text-[10px] leading-relaxed flex items-start">
                            <span className="text-aiCyan mr-1.5 shrink-0">›</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alternatives */}
                  {response.alternatives?.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Fallback Options</span>
                      <div className="space-y-1.5">
                        {response.alternatives.map((alt, idx) => (
                          <div key={idx} className="bg-white/[0.03] border border-darkBorder p-2.5 rounded-lg text-[10px] text-gray-400 leading-relaxed">
                            {alt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ask again */}
                  <button
                    onClick={() => setResponse(null)}
                    className="text-[9px] text-gray-500 hover:text-aiCyan transition-colors uppercase tracking-wider"
                  >
                    Clear & ask again
                  </button>
                </div>
              )}
            </div>

            {/* Input console */}
            <form onSubmit={handleSubmit} className="border-t border-darkBorder p-3 flex items-center space-x-2 shrink-0">
              <input
                type="text"
                placeholder="Ask FLOW AI anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                className="bg-white/5 border border-darkBorder rounded-xl px-3 py-2 text-[11px] text-white placeholder-gray-600 outline-none focus:border-aiCyan/40 flex-1 transition-colors"
              />

              {voiceSupported && (
                <button
                  type="button"
                  onClick={() => !isListening && startListening()}
                  className={`p-2 rounded-xl border transition-all shrink-0 ${isListening ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-pulse' : 'bg-white/5 border-darkBorder text-gray-400 hover:text-white'}`}
                  title="Voice input"
                >
                  <Mic size={13} />
                </button>
              )}

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-aiCyan to-blue-600 hover:brightness-110 text-white disabled:opacity-40 disabled:pointer-events-none shadow-glow transition-all shrink-0"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
