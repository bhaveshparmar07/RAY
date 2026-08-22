'use client';

import React from 'react';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

export function Scanlines() {
  const { reducedMotion } = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[49] opacity-[0.04] scanlines-overlay"
      style={{
        background: 'repeating-linear-gradient(transparent, transparent 2px, #000 2px, #000 6px)',
      }}
      aria-hidden="true"
    />
  );
}

export default Scanlines;
