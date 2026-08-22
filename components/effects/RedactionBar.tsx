'use client';

import React, { useRef } from 'react';
import { useRevealLight } from '@/lib/useRevealLight';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface RedactionBarProps {
  children: React.ReactNode;
  className?: string;
  barColor?: string;
}

export function RedactionBar({ children, className = '', barColor = 'bg-[#0A0B0D]' }: RedactionBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isRevealed } = useRevealLight(ref);
  const { reducedMotion } = useReducedMotion();

  const isVisible = isRevealed || reducedMotion;

  return (
    <div className={`relative inline-flex overflow-hidden group ${className}`} ref={ref}>
      <div 
        className={`relative z-10 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-sm'}`}
      >
        {children}
      </div>
      
      {!reducedMotion && (
        <div 
          className={`absolute inset-0 z-20 ${barColor} origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isVisible ? 'translate-x-full' : 'translate-x-0'}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default RedactionBar;
