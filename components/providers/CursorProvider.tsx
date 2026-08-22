'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface CursorContextType {
  x: number;
  y: number;
  isTouch: boolean;
  isLowEnd: boolean;
}

const CursorContext = createContext<CursorContextType>({
  x: 0,
  y: 0,
  isTouch: false,
  isLowEnd: false,
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorContextType>({
    x: 0,
    y: 0,
    isTouch: false,
    isLowEnd: false,
  });

  const requestRef = useRef<number | undefined>(undefined);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isLowEndDevice = (navigator.hardwareConcurrency || 4) <= 4;

    setState((s) => ({ ...s, isTouch: isTouchDevice, isLowEnd: isLowEndDevice }));

    // If touch or low-end, set default center positions and don't track
    if (isTouchDevice || isLowEndDevice) {
      document.documentElement.style.setProperty('--cursor-x', `${window.innerWidth / 2}px`);
      document.documentElement.style.setProperty('--cursor-y', `${window.innerHeight / 2}px`);
      return;
    }

    const updateProperties = () => {
      document.documentElement.style.setProperty('--cursor-x', `${cursorRef.current.x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${cursorRef.current.y}px`);
      
      setState((s) => {
          if (s.x === cursorRef.current.x && s.y === cursorRef.current.y) return s;
          return { ...s, x: cursorRef.current.x, y: cursorRef.current.y };
      });
      requestRef.current = requestAnimationFrame(updateProperties);
    };

    const handlePointerMove = (e: PointerEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handlePointerMove);
    requestRef.current = requestAnimationFrame(updateProperties);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <CursorContext.Provider value={state}>
      {children}
    </CursorContext.Provider>
  );
}
