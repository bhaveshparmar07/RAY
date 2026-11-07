'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface CursorContextType {
  x: number;
  y: number;
  radius: number;
  setRadius: (r: number) => void;
  isHoveringInteractive: boolean;
  setIsHoveringInteractive: (h: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  x: 0,
  y: 0,
  radius: 140,
  setRadius: () => {},
  isHoveringInteractive: false,
  setIsHoveringInteractive: () => {},
});

export const useRayCursor = () => useContext(CursorContext);

export function RayCursorProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [radius, setRadius] = useState(140);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    let animId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    };

    const update = () => {
      // Smooth lerp 0.15
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      document.documentElement.style.setProperty('--cursor-x', `${currentX.toFixed(1)}px`);
      document.documentElement.style.setProperty('--cursor-y', `${currentY.toFixed(1)}px`);
      document.documentElement.style.setProperty('--lens-radius', `${radius}px`);

      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [radius]);

  return (
    <CursorContext.Provider value={{ x: pos.x, y: pos.y, radius, setRadius, isHoveringInteractive, setIsHoveringInteractive }}>
      {/* Physical Ray Lens Ring Cursor */}
      <div
        className="ray-lens-cursor hidden md:block"
        style={{
          transform: `translate(${pos.x - radius}px, ${pos.y - radius}px)`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
        aria-hidden="true"
      />
      {children}
    </CursorContext.Provider>
  );
}
