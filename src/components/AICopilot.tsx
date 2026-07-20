import React, { useState, useEffect } from 'react';
import { useAI, type AIReasoningTrace } from '../contexts/AIContext';
import { useLiveData } from '../contexts/LiveDataContext';
import { useThemeSettings } from '../contexts/ThemeContext';
import { useSpeech } from '../hooks/useSpeech';
import { 
  Sparkles, Send, Mic, ShieldAlert, AlertTriangle, 
  X, Loader2, MessageSquare, ChevronLeft, Brain, Volume2, Shield, Users, Compass, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AICopilot: React.FC = () => {
  const { askCopilot, loading, activeStep } = useAI();
  const { state } = useLiveData();
  const { t } = useThemeSettings();
  
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
  const [lastIncidentCount, setLastIncidentCount] = useState(activeIncidents.length);

  // Auto-transition to summary alert ONLY when a NEW incident is created
  useEffect(() => {
    if (activeIncidents.length > lastIncidentCount) {
      setHudState('summary');
    } else if (activeIncidents.length === 0) {
      setHudState('orb');
    }
    setLastIncidentCount(activeIncidents.length);
  }, [activeIncidents.length, lastIncidentCount]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hudState === 'panel') {
        setHudState('orb');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hudState]);

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
    setHudState('orb');
  };

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end space-y-3 pointer-events-none">
      <AnimatePresence>
        
        {/* STATE 1: Floating pulsing orb */}
        {hudState === 'orb' && (
          <motion.button
            key="orb"
            type="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setHudState('panel')}
            aria-label="Open AI Copilot Chat"
            aria-expanded={false}
            className="pointer-events-auto h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary-container hover:brightness-110 flex items-center justify-center text-white shadow-ultra-soft relative border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            title="Open AI OS Console"
          >
            <MessageSquare size={20} aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-surface animate-ping" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-surface" />
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
            aria-label="View active incident alert details in AI Console"
            className="pointer-events-auto flex items-center space-x-3 bg-red-500/10 border border-red-500/35 pl-3 pr-4 py-2.5 rounded-full shadow-ultra-soft hover:brightness-105 transition-all text-xs font-semibold text-error cursor-pointer focus-visible:ring-2 focus-visible:ring-error focus-visible:outline-none"
          >
            <ShieldAlert className="text-error animate-pulse shrink-0" size={14} aria-hidden="true" />
            <span className="max-w-[200px] truncate">
              {criticalAlert 
                ? `${criticalAlert.title}` 
                : `${activeIncidents.length} Active Alerts`}
            </span>
            <ChevronLeft size={12} className="text-secondary -rotate-180 shrink-0" aria-hidden="true" />
          </motion.button>
        )}

        {/* STATE 3: Full slide-out frosted console drawer */}
        {hudState === 'panel' && (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="AI OS Consensus Console"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 210 }}
            className="pointer-events-auto w-80 sm:w-[360px] bg-surface/95 border border-outline-variant/60 backdrop-blur-2xl rounded-2xl flex flex-col shadow-ultra-soft"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-outline-variant p-4 shrink-0">
              <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-primary animate-pulse" aria-hidden="true" />
                <h2 className="font-display font-black text-xs text-on-surface uppercase tracking-wider">AI OS Consensus Console</h2>
              </div>
              <button 
                onClick={handleClose}
                aria-label="Close AI OS Console"
                className="p-1 rounded hover:bg-surface-container-high text-secondary hover:text-primary transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable response area with live region */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0" aria-live="polite" aria-atomic="false">
              
              {/* Loading state */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-8 space-y-3" role="status">
                  <Loader2 className="text-primary animate-spin" size={22} aria-hidden="true" />
                  <span className="text-[10px] text-secondary font-mono tracking-widest uppercase">
                    {activeStep?.step ?? 'Analyzing...'}
                  </span>
                  {activeStep?.message && (
                    <span className="text-[10px] text-secondary text-center max-w-[240px] leading-relaxed font-sans">
                      {activeStep.message}
                    </span>
                  )}
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200/50 p-3 rounded-xl text-xs space-y-1" role="alert">
                  <div className="font-bold text-red-600 flex items-center space-x-1.5">
                    <AlertTriangle size={12} aria-hidden="true" />
                    <span>Inference Error</span>
                  </div>
                  <p className="text-[10px] text-secondary leading-normal">{error}</p>
                </div>
              )}

              {/* Empty state */}
              {!loading && !response && !error && (
                <div className="text-center py-8 space-y-2">
                  <Brain className="mx-auto text-secondary" size={28} aria-hidden="true" />
                  <p className="text-[10px] text-secondary leading-relaxed max-w-[200px] mx-auto">
                    Ask about crowd flows, gate congestion, or incident response.
                  </p>
                  {/* Quick prompt suggestions */}
                  <div className="flex flex-col space-y-1.5 mt-4" role="group" aria-label="Suggested prompts">
                    {['Explain Gate C anomaly', 'Predict next transport issue', 'Show consensus on South Stand incident'].map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-[10px] text-left px-3 py-2 bg-surface-container border border-outline-variant/40 rounded-lg text-secondary hover:text-primary hover:border-primary transition-all cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Response */}
              {!loading && response && (
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Multi-Agent Consensus Flow graphic */}
                  <div className="bg-surface-container p-3 rounded-xl border border-outline-variant/60 space-y-2" aria-label="Multi-Agent Negotiation Status">
                    <div className="text-[9px] text-secondary font-mono uppercase font-bold">Multi-Agent Negotiation Status</div>
                    <div className="flex items-center justify-between text-[8px] font-mono text-secondary">
                      <div className="flex flex-col items-center">
                        <Shield size={12} className="text-primary" aria-hidden="true" />
                        <span>Security</span>
                      </div>
                      <span>➔</span>
                      <div className="flex flex-col items-center">
                        <Users size={12} className="text-primary" aria-hidden="true" />
                        <span>Volunteers</span>
                      </div>
                      <span>➔</span>
                      <div className="flex flex-col items-center">
                        <Compass size={12} className="text-primary" aria-hidden="true" />
                        <span>Transport</span>
                      </div>
                      <span>➔</span>
                      <div className="flex flex-col items-center font-bold text-primary">
                        <Activity size={12} className="animate-pulse" aria-hidden="true" />
                        <span>Consensus</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation card */}
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl space-y-2 shadow-ultra-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-primary font-bold uppercase tracking-widest font-mono">FLOW Recommendation</span>
                      <span className="text-primary font-mono font-bold text-[10px]">{response.confidence}% Conf.</span>
                    </div>
                    <p className="text-on-surface leading-relaxed text-[11px] font-bold">{response.recommendation}</p>
                    
                    {/* Explainability factors */}
                    <div className="pt-2 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-[9px] font-mono">
                      <div>
                        <span className="text-secondary block">Expected Effect</span>
                        <span className="font-extrabold text-emerald-600">Wait time ↓ 4m</span>
                      </div>
                      <div>
                        <span className="text-secondary block">Rollback Plan</span>
                        <span className="font-extrabold text-on-surface">Auto-revert 15m</span>
                      </div>
                    </div>
                  </div>

                  {/* Logic trace */}
                  {response.reasoning?.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-secondary font-bold uppercase tracking-widest font-mono">Explainable Logic</span>
                      <div className="space-y-1 pl-2 border-l border-outline-variant">
                        {response.reasoning.map((item, idx) => (
                          <p key={idx} className="text-secondary text-[10px] leading-relaxed flex items-start">
                            <span className="text-primary mr-1.5 shrink-0">›</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ask again */}
                  <button
                    onClick={() => setResponse(null)}
                    className="text-[9px] text-secondary hover:text-primary transition-colors uppercase tracking-wider font-mono font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    Clear & ask again
                  </button>
                </div>
              )}
            </div>

            {/* Input console */}
            <form onSubmit={handleSubmit} className="border-t border-outline-variant p-3 flex items-center space-x-2 shrink-0">
              <input
                type="text"
                aria-label="Ask FLOW AI question"
                placeholder="Ask FLOW AI anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
                className="bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-[11px] text-on-surface placeholder:text-secondary outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary flex-1 transition-colors"
                autoFocus
              />

              {voiceSupported && (
                <button
                  type="button"
                  onClick={() => !isListening && startListening()}
                  aria-label="Voice input"
                  className={`p-2 rounded-xl border transition-all shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${isListening ? 'bg-error/10 border-error text-error animate-pulse' : 'bg-surface-container border-outline-variant text-secondary hover:text-primary'}`}
                  title="Voice input"
                >
                  <Mic size={13} aria-hidden="true" />
                </button>
              )}

              <button
                type="submit"
                disabled={loading || !query.trim()}
                aria-label="Send query to AI Copilot"
                className="p-2 rounded-xl bg-primary hover:bg-primary-container text-white disabled:opacity-40 disabled:pointer-events-none shadow-ultra-soft transition-all shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Send size={13} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
