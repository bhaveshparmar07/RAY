import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';
import { TIMING } from '@/lib/constants';

interface ScrambleOptions {
  text: string;
  isRevealed: boolean;
  speed?: number;
  delay?: number;
  disabled?: boolean;
}

const GLYPHS = '!@#$%^&*(){}[]|;:<>?/~';

export function useCharacterScramble({ text, isRevealed, speed = 30, delay = 0, disabled = false }: ScrambleOptions) {
  const { reducedMotion } = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const shouldDisable = reducedMotion || disabled;
    if (shouldDisable) {
      setDisplayText(text);
      return;
    }

    if (!isRevealed) {
      setDisplayText('');
      return;
    }

    const duration = TIMING?.scrambleDuration ?? 1000;
    const totalFrames = duration / speed;
    let currentFrame = 0;
    
    const scramble = () => {
      let nextText = '';
      
      // Expo-out easing approximation for character resolution
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - Math.pow(2, -10 * progress);
      let resolvedCount = Math.floor(easedProgress * text.length);
      resolvedCount = Math.min(text.length, Math.max(0, resolvedCount));

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          nextText += ' ';
          continue;
        }
        
        if (i < resolvedCount) {
          nextText += text[i];
        } else {
          nextText += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(nextText);
      currentFrame++;

      if (resolvedCount < text.length && currentFrame <= totalFrames * 2) {
        timeoutRef.current = setTimeout(scramble, speed);
      } else {
        setDisplayText(text);
      }
    };

    if (delay > 0) {
      delayTimeoutRef.current = setTimeout(scramble, delay);
    } else {
      scramble();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [text, isRevealed, reducedMotion, speed, delay, disabled]);

  return displayText;
}

