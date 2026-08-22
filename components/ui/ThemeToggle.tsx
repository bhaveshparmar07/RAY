'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAudio } from '@/components/providers/AudioProvider';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

export default function ThemeToggle() {
  const { isLightTheme, toggleTheme } = useTheme();
  const { playUiBlip, isMuted } = useAudio();
  const { reducedMotion } = useReducedMotion();

  const handleToggle = () => {
    toggleTheme();
    if (!isMuted) {
      playUiBlip(750, 'sine');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 border font-mono text-xs rounded-sm transition-all duration-300 backdrop-blur-sm cursor-pointer ${
        isLightTheme
          ? 'border-black/15 bg-white/40 hover:bg-white/80 text-black/70 hover:text-black hover:border-violet-500/50'
          : 'border-white/10 bg-black/40 hover:bg-black/80 text-white/70 hover:text-white hover:border-violet-500/50'
      }`}
      aria-label={isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <span className="relative flex h-2 w-2">
        {!isLightTheme && !reducedMotion && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isLightTheme ? 'bg-violet-600' : 'bg-violet-400'}`}></span>
      </span>
      <span>
        {isLightTheme ? 'SYS_THEME: LIGHT' : 'SYS_THEME: DARK'}
      </span>
    </button>
  );
}
