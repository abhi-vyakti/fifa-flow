import React, { useState } from 'react';
import { useAI, AIReasoningTrace } from '../contexts/AIContext';
import { useLiveData } from '../contexts/LiveDataContext';
import { useSpeech } from '../hooks/useSpeech';
import { 
  Sparkles, Send, Mic, Volume2, ShieldAlert, AlertTriangle, 
  HelpCircle, CheckCircle2, CornerDownRight, X, ArrowUpRight, Play, Loader2
} from 'lucide-react';

export const AICopilot: React.FC = () => {
  const { askCopilot, askCopilotStream, cancelActiveRequest, loading } = useAI();
  const { state } = useLiveData();
  
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AIReasoningTrace | null>(null);
  
  // Pipeline streaming states
  const [streamStep, setStreamStep] = useState<string | null>(null);
  const [streamMessage, setStreamMessage] = useState<string | null>(null);

  // Audio Speech synthesis
  const { supported: voiceSupported, isListening, startListening, speak } = useSpeech((text) => {
    setQuery(text);
  });

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    triggerAISearch(query);
  };

  const triggerAISearch = (text: string) => {
    setResult(null);
    setStreamStep('COLLECTING_CONTEXT');
    setStreamMessage('Context Collector: Scanning role details, crowd density, weather parameters, and safety levels...');

    askCopilotStream(
      text,
      'organizer',
      (step, message) => {
        setStreamStep(step);
        setStreamMessage(message);
      },
      (data) => {
        setResult(data);
        setStreamStep(null);
        setStreamMessage(null);
        
        // Read out loud if query was voice or accessibility is on
        if (data.recommendation) {
          speak(data.recommendation);
        }
      },
      (err) => {
        setStreamStep(null);
        setStreamMessage(null);
        alert(err);
      }
    );
  };

  const triggerWhatNext = () => {
    setQuery('What should I do next?');
    triggerAISearch('What should I do next?');
  };

  // Preset Top 5 actions quick list
  const copilotActionsPreset = [
    'Deploy 3 volunteers from Gate D to Gate C',
    'Replenish inventory stocks at Food Stall 18',
    'Redirect concourse flows from Gate C to Gate D',
    'Broadcast shuttle delay advisories on Metro Platform 2',
    'Dim outer structural ring lights to mitigate energy loads'
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-darkBorder space-y-4">
      <div className="flex items-center justify-between border-b border-darkBorder pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-aiCyan animate-pulse" size={18} />
          <h3 className="font-bold text-sm text-white uppercase tracking-wider font-sans">FLOW AI Copilot</h3>
        </div>
        <button 
          onClick={triggerWhatNext}
          className="text-xs bg-gradient-to-r from-aiCyan/20 to-aiPurple/20 border border-aiCyan/30 hover:border-aiCyan/65 text-aiCyan px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>What should I do next?</span>
          <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Input box */}
      <form onSubmit={handleQuerySubmit} className="relative flex items-center">
        <input 
          type="text" 
          placeholder="Ask FLOW AI (e.g., 'What happens if Gate B closes?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="w-full bg-black/40 border border-darkBorder focus:border-aiCyan rounded-xl pl-4 pr-24 py-3 text-xs outline-none text-white placeholder-gray-500 font-sans"
        />
        
        <div className="absolute right-2 flex items-center space-x-1.5">
          {voiceSupported && (
            <button 
              type="button" 
              onClick={isListening ? () => {} : startListening}
              className={`p-1.5 rounded-lg border transition-all ${isListening ? 'bg-red-500/20 border-red-500/30 text-red-500 animate-pulse' : 'hover:bg-white/5 border-transparent text-gray-400'}`}
              title="Voice Input"
            >
              <Mic size={15} />
            </button>
          )}

          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-aiCyan to-aiPurple text-white text-[11px] font-bold tracking-wide hover:brightness-110 disabled:opacity-50 transition-all flex items-center space-x-1"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            <span>Send</span>
          </button>
        </div>
      </form>

      {/* Streaming Pipeline Progress */}
      {streamStep && (
        <div className="bg-white/5 border border-darkBorder/60 p-4 rounded-xl space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Loader2 size={13} className="animate-spin text-aiCyan" />
            <span>Reasoning Pipeline Stream</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${streamStep === 'COLLECTING_CONTEXT' ? 'bg-aiCyan animate-ping' : 'bg-emerald-500'}`} />
              <span className={streamStep === 'COLLECTING_CONTEXT' ? 'text-white font-medium' : 'text-gray-500'}>Context Collector</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${streamStep === 'DECISION_ENGINE' ? 'bg-aiCyan animate-ping' : streamStep === 'COLLECTING_CONTEXT' ? 'bg-gray-700' : 'bg-emerald-500'}`} />
              <span className={streamStep === 'DECISION_ENGINE' ? 'text-white font-medium' : 'text-gray-500'}>Decision Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${streamStep === 'MODEL_INFERENCE' ? 'bg-aiCyan animate-ping' : streamStep === 'COLLECTING_CONTEXT' || streamStep === 'DECISION_ENGINE' ? 'bg-gray-700' : 'bg-emerald-500'}`} />
              <span className={streamStep === 'MODEL_INFERENCE' ? 'text-white font-medium' : 'text-gray-500'}>Model Inference (Groq/Llama)</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 bg-black/30 p-2.5 rounded border border-darkBorder/40 leading-relaxed italic">
            {streamMessage}
          </div>
          
          <button 
            type="button"
            onClick={cancelActiveRequest}
            className="text-[10px] text-red-400 font-bold uppercase hover:underline"
          >
            Cancel Reasoning Request
          </button>
        </div>
      )}

      {/* Structured Output Presentation */}
      {result && (
        <div className="bg-white/5 border border-darkBorder p-4 rounded-xl space-y-4">
          
          {/* Header metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-darkBorder pb-2.5">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-mono">FLOW AI Recommendation</span>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mt-0.5">
                {result.department} Strategy Group
              </h4>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="block text-[9px] text-gray-500">Confidence</span>
                <span className="text-xs font-bold text-white glow-badge">{result.confidence}%</span>
              </div>
              <div className="h-8 w-px bg-darkBorder" />
              <button 
                onClick={() => speak(result.recommendation)}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                title="Speak Recommendation"
              >
                <Volume2 size={14} />
              </button>
            </div>
          </div>

          {/* Primary recommendation content */}
          <div className="space-y-2">
            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Recommended Action</span>
            </div>
            <p className="text-xs font-black text-white bg-emerald-950/15 border border-emerald-500/20 p-3 rounded-lg leading-relaxed shadow-greenGlow">
              {result.recommendation}
            </p>
          </div>

          {/* Explainable AI Why List */}
          <div className="space-y-2">
            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              Indicators & Why
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {result.reasoning.map((why, idx) => (
                <li key={idx} className="flex items-start space-x-2 pl-0.5">
                  <CornerDownRight size={12} className="text-aiCyan shrink-0 mt-0.5" />
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives choices */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="space-y-2 border-t border-darkBorder pt-3">
              <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                Backup Action Strategies
              </div>
              <ul className="space-y-1 text-xs text-gray-400">
                {result.alternatives.map((alt, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-aiPurple font-bold shrink-0">{idx + 1}.</span>
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* Preset Action Recommendations listing (Top 5 Actions) */}
      {!result && !streamStep && (
        <div className="space-y-2 pt-2">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            Top 5 Simulated Action Checklist
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {copilotActionsPreset.map((act, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(act);
                  triggerAISearch(act);
                }}
                className="text-left p-2.5 rounded-lg border border-darkBorder hover:border-darkBorderGlow hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-200 truncate flex items-center space-x-2"
              >
                <span className="h-4 w-4 rounded bg-white/5 border border-darkBorder text-[9px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{act}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
