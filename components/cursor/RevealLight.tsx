'use client';

import React from 'react';
import { useCursor } from '@/components/providers/CursorProvider';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

export function RevealLight() {
  const { x, y, isTouch, isLowEnd } = useCursor();
  const { reducedMotion } = useReducedMotion();
  const { isLightTheme } = useTheme();

  if (isTouch || isLowEnd || reducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: isLightTheme
          ? `radial-gradient(650px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.04), transparent 60%)`
          : `radial-gradient(650px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.07), rgba(139, 92, 246, 0.04) 40%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}

export default RevealLight;
