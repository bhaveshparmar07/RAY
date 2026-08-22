'use client';

import React from 'react';
import { useAudio } from '@/components/providers/AudioProvider';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

export default function MuteToggle() {
  const { isMuted, toggleMute, playUiBlip } = useAudio();
  const { reducedMotion } = useReducedMotion();

  if (reducedMotion) return null;

  const handleToggle = () => {
    toggleMute();
    // Play a click blip right after toggling to on state
    if (isMuted) {
      setTimeout(() => {
        // Synthesizer needs a brief moment to warm up after initial resume
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          playUiBlip(900, 'sine');
        }
      }, 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-violet-500/50 bg-black/40 hover:bg-black/80 font-mono text-xs text-white/70 hover:text-white rounded-sm transition-all duration-300 backdrop-blur-sm cursor-pointer"
      aria-label={isMuted ? 'Unmute system audio' : 'Mute system audio'}
    >
      <span className="relative flex h-2 w-2">
        {!isMuted && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isMuted ? 'bg-white/30' : 'bg-violet-500'}`}></span>
      </span>
      <span>
        {isMuted ? 'AUDIO_OFF' : 'AUDIO_ON'}
      </span>
    </button>
  );
}
