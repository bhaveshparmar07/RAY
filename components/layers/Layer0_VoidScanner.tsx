'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface VoidScannerProps {
  onComplete: () => void;
}

export default function Layer0_VoidScanner({ onComplete }: VoidScannerProps) {
  const { reducedMotion } = useReducedMotion();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isRedacting, setIsRedacting] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Parse navigator data
  const [scanData, setScanData] = useState<{
    platform: string;
    userAgent: string;
    viewport: string;
    language: string;
    connection: string;
  } | null>(null);

  useEffect(() => {
    // Client-side only
    const getBrowserInfo = () => {
      const ua = navigator.userAgent;
      let browser = 'UNKNOWN';
      if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
      else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
      else if (ua.indexOf('Safari') > -1) browser = 'Safari';
      else if (ua.indexOf('Edge') > -1) browser = 'Edge';

      const conn = (navigator as any).connection;
      const effectiveType = conn ? conn.effectiveType : 'UNKNOWN';

      return {
        platform: navigator.platform || 'UNKNOWN',
        userAgent: browser,
        viewport: `${window.innerWidth} × ${window.innerHeight}`,
        language: navigator.language || 'UNKNOWN',
        connection: effectiveType,
      };
    };
    setScanData(getBrowserInfo());
  }, []);

  const fullLines = scanData ? [
    '> INITIATING SCAN...',
    `> TARGET: [${scanData.platform}]`,
    `> USER-AGENT: [${scanData.userAgent}]`,
    `> VIEWPORT: [${scanData.viewport}]`,
    `> LANGUAGE: [${scanData.language}]`,
    `> CONNECTION: [${scanData.connection}]`,
    '> SCANNING FOR EXPOSURES...',
    '> ████████████████████ 100%',
    "> EXPOSURES FOUND: 0 — YOU'RE CLEAN. FOR NOW."
  ] : [];

  useEffect(() => {
    if (reducedMotion) {
      if (fullLines.length > 0) {
        setLines(fullLines);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 500);
        }, 1000);
      }
      return;
    }

    if (!scanData || fullLines.length === 0) return;

    if (currentLineIndex < fullLines.length) {
      const currentFullLine = fullLines[currentLineIndex];
      
      if (currentCharIndex < currentFullLine.length) {
        const timeout = setTimeout(() => {
          setLines(prev => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) {
              newLines[currentLineIndex] = '';
            }
            newLines[currentLineIndex] += currentFullLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, currentLineIndex === fullLines.length - 1 ? 50 : 20); // Last line slower
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 100);
        return () => clearTimeout(timeout);
      }
    } else if (currentLineIndex === fullLines.length) {
      // All typed
      const timeout1 = setTimeout(() => {
        setIsRedacting(true);
      }, 500);
      
      const timeout2 = setTimeout(() => {
        setIsFadingOut(true);
      }, 1500);

      const timeout3 = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [currentLineIndex, currentCharIndex, scanData, fullLines, reducedMotion, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[60] flex flex-col justify-center items-start p-8 md:p-24 bg-[#0A0B0D] text-[#ECECEC] transition-opacity duration-1000 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="font-mono text-sm md:text-base relative z-10 w-full max-w-3xl">
        {lines.map((line, i) => (
          <div key={i} className="relative mb-2 min-h-[1.5em] overflow-hidden">
            <span className="relative z-10 break-all">{line}</span>
            {i === currentLineIndex && currentCharIndex < (fullLines[i]?.length || 0) && (
              <span className="inline-block w-2 h-4 bg-[#ECECEC] ml-1 animate-pulse align-middle" />
            )}
            {i === currentLineIndex && currentCharIndex === (fullLines[i]?.length || 0) && currentLineIndex < fullLines.length - 1 && (
              <span className="inline-block w-2 h-4 bg-[#ECECEC] ml-1 animate-pulse align-middle" />
            )}
            
            {/* Redaction bar */}
            <div 
              className={`absolute top-0 left-0 h-full bg-[#0A0B0D] z-20 transition-all duration-500 ease-in-out`}
              style={{
                width: '100%',
                transformOrigin: 'left',
                transform: isRedacting ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: `${i * 100}ms`
              }}
            />
          </div>
        ))}
        {currentLineIndex === fullLines.length && !isRedacting && (
           <span className="inline-block w-2 h-4 bg-[#ECECEC] ml-1 animate-pulse align-middle" />
        )}
      </div>
      
      {/* Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-violet-600/10 blur-[100px] pointer-events-none" />
    </div>
  );
}
