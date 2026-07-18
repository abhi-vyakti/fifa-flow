import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface BroadcastIntroProps {
  onComplete: () => void;
  onToggleAudio: () => void;
  audioActive: boolean;
}

export const BroadcastIntro: React.FC<BroadcastIntroProps> = ({ onComplete, onToggleAudio, audioActive }) => {
  const [step, setStep] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    // Step 0: Fade in logo (1.5s)
    const t0 = setTimeout(() => setStep(1), 1500);
    
    // Step 1: Start Countdown clock (2.5s)
    const t1 = setTimeout(() => setStep(2), 2500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    if (step !== 2) return;

    if (countdown > 1) {
      const cd = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(cd);
    } else {
      const cdComplete = setTimeout(() => {
        setStep(3); // Step 3: Floodlights on & digital twin mapping
      }, 1000);
      return () => clearTimeout(cdComplete);
    }
  }, [step, countdown]);

  useEffect(() => {
    if (step === 3) {
      // Step 4: AI online reveal & slide dashboard
      const t3 = setTimeout(() => setStep(4), 1800);
      return () => clearTimeout(t3);
    }
  }, [step]);

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div 
          className="fixed inset-0 z-[2000] bg-[#020308] flex flex-col items-center justify-center overflow-hidden font-sans"
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: 'blur(15px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          {/* Subtle Stadium Grid mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Top Opt-in audio toggle pill */}
          <div className="absolute top-6 flex items-center space-x-3 z-[1000]">
            <button 
              onClick={onToggleAudio}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${audioActive ? 'bg-fifaGold/15 border-fifaGold text-fifaGold' : 'bg-white/5 border-darkBorder text-gray-400'}`}
            >
              {audioActive ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
              <span>{audioActive ? '🔊 Atmosphere Enabled' : '🔇 Enable Match Atmosphere'}</span>
            </button>
            
            <button 
              onClick={onComplete}
              className="px-4 py-2 bg-white/5 border border-darkBorder hover:bg-white/10 text-gray-300 text-xs font-bold rounded-full transition-all"
            >
              Skip Intro
            </button>
          </div>

          <div className="text-center space-y-8 max-w-md px-6 relative z-10">
            
            {/* Step 0 & 1: Logo pulse */}
            {step <= 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-fifaGold to-fifaRed rounded-2xl flex items-center justify-center font-black text-white text-3xl mx-auto shadow-glass">
                  F
                </div>
                <h2 className="text-xl font-bold tracking-widest text-white uppercase font-sans">
                  FIFA FLOW
                </h2>
                <div className="text-[10px] text-fifaGold uppercase tracking-widest font-mono">
                  Stadium intelligence Layer
                </div>
              </motion.div>
            )}

            {/* Step 2: Match countdown timer */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-mono">MATCH ENGAGEMENT COUNTDOWN</span>
                <motion.div 
                  key={countdown}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-8xl font-black text-white font-mono tracking-tight"
                >
                  0{countdown}
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Floodlights On & Digital twin mapping */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-aiCyan animate-ping" />
                  <span className="text-[10px] text-aiCyan font-bold uppercase tracking-widest">ACTIVATING STADIUM LIGHTS</span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">IGNITING PILOT CONNECTORS</h3>
                <div className="w-48 h-1 bg-white/5 mx-auto rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-aiCyan to-transparent"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: FLOW Online Reveal & Complete trigger */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                  <Sparkles size={11} className="animate-spin text-emerald-400" />
                  <span>AI SYSTEM ONLINE</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-wide uppercase font-sans">
                  FLOW CONNECTED
                </h2>
                <p className="text-xs text-gray-500">
                  Ready to manage match telemetries and crowd safety.
                </p>
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-gradient-to-r from-aiCyan to-blue-600 hover:brightness-110 text-white font-bold rounded-xl shadow-glow text-xs uppercase tracking-wider transition-all"
                >
                  Enter Control Room
                </button>
              </motion.div>
            )}

          </div>

          {/* Cinematic Flares (Visual spotlights) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-aiCyan/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-gradient-to-t from-aiPurple/5 to-transparent blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
