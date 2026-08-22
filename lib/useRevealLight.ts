import { useEffect, useState, RefObject } from 'react';
import { useCursor } from '@/components/providers/CursorProvider';
import { REVEAL } from '@/lib/constants';

interface RevealLightResult {
  isRevealed: boolean;
  revealProgress: number; // 0 to 1
}

export function useRevealLight(ref: RefObject<HTMLElement | null>): RevealLightResult {
  const { x, y, isTouch, isLowEnd } = useCursor();
  const [result, setResult] = useState<RevealLightResult>({
    isRevealed: false,
    revealProgress: 0,
  });

  useEffect(() => {
    if (isTouch || isLowEnd) {
      setResult({ isRevealed: true, revealProgress: 1 });
      return;
    }

    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    
    // Calculate distance from cursor to element center
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    
    const distanceX = x - elementCenterX;
    const distanceY = y - elementCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const radius = REVEAL?.radius ?? 400; // fallback if undefined
    
    if (distance > radius) {
      setResult({ isRevealed: false, revealProgress: 0 });
    } else {
      // revealProgress is 1 when distance is 0, and 0 when distance is radius
      const progress = Math.max(0, 1 - distance / radius);
      setResult({ isRevealed: progress > 0, revealProgress: progress });
    }
  }, [x, y, isTouch, isLowEnd, ref]);

  return result;
}
