'use client';

import React, { useRef } from 'react';
import { useInView } from '@/lib/useInView';
import { useRevealLight } from '@/lib/useRevealLight';
import { useCharacterScramble } from '@/lib/useCharacterScramble';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface CharacterScrambleProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: 'span' | 'h1' | 'h2' | 'p' | 'div';
  delay?: number;
}

export function CharacterScramble({ text, as: Component = 'span', className = '', delay = 0, ...props }: CharacterScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { isRevealed } = useRevealLight(ref);
  const { reducedMotion } = useReducedMotion();

  const isTriggered = isInView || isRevealed;
  
  const displayText = useCharacterScramble({ 
    text, 
    isRevealed: isTriggered,
    delay: reducedMotion ? 0 : delay,
    disabled: reducedMotion
  });

  return (
    <Component ref={ref as any} className={`relative inline-block ${className}`} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={isTriggered ? 'font-mono' : ''}>
        {displayText}
      </span>
    </Component>
  );
}

export default CharacterScramble;

