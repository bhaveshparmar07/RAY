'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSonarPing: (frequency?: number, duration?: number) => void;
  playUiBlip: (frequency?: number, type?: OscillatorType) => void;
  playHeartbeat: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSonarPing: () => {},
  playUiBlip: () => {},
  playHeartbeat: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const { reducedMotion } = useReducedMotion();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first user interaction or when unmute is toggled
  const initAudio = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    // Resume context if suspended (browser security autoplays policy)
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        initAudio();
      }
      return next;
    });
  };

  // Play a synthesized sonar ping
  const playSonarPing = (frequency = 880, duration = 2.0) => {
    if (isMuted || reducedMotion) return;
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    // Slight pitch drop over time
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);

    // Highpass filter for that distinct sonar airiness
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(150, ctx.currentTime);

    // Exponential gain decay
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  // Play a quick UI click/blip
  const playUiBlip = (frequency = 1200, type: OscillatorType = 'triangle') => {
    if (isMuted || reducedMotion) return;
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    // Rapid pitch slide down for click click click feel
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.1, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  };

  // Play a double heartbeat thump (low frequency)
  const playHeartbeat = () => {
    if (isMuted || reducedMotion) return;
    const ctx = initAudio();
    if (!ctx) return;

    const playThump = (timeOffset: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const time = ctx.currentTime + timeOffset;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, time); // 65Hz low frequency thump
      osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

      gainNode.gain.setValueAtTime(volume, time);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.15);
    };

    // First thump (Lub)
    playThump(0, 0.45);
    // Second thump (Dub) - slightly quieter, 150ms later
    playThump(0.15, 0.35);
  };

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSonarPing, playUiBlip, playHeartbeat }}>
      {children}
    </AudioContext.Provider>
  );
}
