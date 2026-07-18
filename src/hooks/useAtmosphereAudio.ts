import { useEffect, useRef, useState } from 'react';

export const useAtmosphereAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API is not supported in this browser.');
        return;
      }
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // 1. Create a 4-second buffer of white noise
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill with noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      // 2. Create audio nodes
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // 3. Filters to simulate the distant muffled roar of a stadium
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 400; // Cut off high static frequencies

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 320; // Frame hum around human vocal range
      bandpass.Q.value = 1.0;

      // 4. Main Gain node for volume control
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.05;

      // 5. Low Frequency Oscillator (LFO) to modulate crowd wave volume surges (swelling)
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.07; // Slow swell cycle (approx 14 seconds)

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.02; // Modulate volume envelope up/down

      // Connect nodes
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);

      source.connect(lowpass);
      lowpass.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Start playbacks
      source.start(0);
      lfo.start(0);

      // Save references
      noiseNodeRef.current = source;
      gainNodeRef.current = gainNode;
      lfoRef.current = lfo;
      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to initialize stadium atmosphere audio:', err);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      try {
        if (noiseNodeRef.current) noiseNodeRef.current.stop();
        if (lfoRef.current) lfoRef.current.stop();
        audioCtxRef.current.close();
      } catch (err) {
        console.error('Error stopping audio context:', err);
      }
      audioCtxRef.current = null;
      noiseNodeRef.current = null;
      gainNodeRef.current = null;
      lfoRef.current = null;
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleAudio };
};
