'use client';

import React from 'react';
import { useCursor } from '@/components/providers/CursorProvider';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

interface RevealLightProps {
  className?: string;
}

export function RevealLight({ className = '' }: RevealLightProps) {
  const { x, y, isTouch, isLowEnd } = useCursor();
  const { reducedMotion } = useReducedMotion();
  const { isLightTheme } = useTheme();

  if (isTouch || isLowEnd || reducedMotion || isLightTheme) {
    return null;
  }

  const revealStyle = {
    '--cursor-x': `${x}px`,
    '--cursor-y': `${y}px`,
    '--reveal-radius': '120px',
  } as React.CSSProperties;

  return (
    <>
      <div
        className={`fixed inset-0 pointer-events-none z-40 ${className}`}
        style={{
          ...revealStyle,
          backgroundColor: 'var(--reveal-bg, rgba(10, 11, 13, 0.85))',
          maskImage: 'radial-gradient(circle var(--reveal-radius) at var(--cursor-x) var(--cursor-y), transparent 0%, transparent 65%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle var(--reveal-radius) at var(--cursor-x) var(--cursor-y), transparent 0%, transparent 65%, black 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(circle var(--reveal-radius) at ${x}px ${y}px, var(--reveal-glow, rgba(138, 43, 226, 0.4)) 0%, transparent 80%)`,
          mixBlendMode: 'var(--reveal-blend, screen)' as any,
          opacity: 'var(--reveal-glow-opacity, 0.1)' as any,
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default RevealLight;
