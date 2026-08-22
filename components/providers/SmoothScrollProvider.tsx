'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from './ReducedMotionProvider';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
