'use client';

import React from 'react';
import { COLORS } from '@/lib/constants';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface ECGLineProps {
  className?: string;
  color?: string;
  flatline?: boolean;
  scrollProgress?: number;
}

export function ECGLine({ 
  className = '', 
  color = COLORS.bone, 
  flatline = false,
  scrollProgress = 0
}: ECGLineProps) {
  const { reducedMotion } = useReducedMotion();
  const strokeColor = flatline ? COLORS.red : color;

  // Generate path data based on flatline state
  const normalPath = "M0 20 L20 20 L25 15 L35 35 L45 5 L55 20 L100 20 L120 20 L125 15 L135 35 L145 5 L155 20 L200 20";
  const flatPath = "M0 20 L200 20";
  const pathData = flatline ? flatPath : normalPath;

  // Apply dashoffset based on scroll progress if not reduced motion
  const dashOffset = reducedMotion ? 0 : Math.max(0, 1000 - (scrollProgress * 1000));

  return (
    <svg 
      className={`w-full h-10 ${className}`} 
      viewBox="0 0 200 40" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path 
        d={pathData} 
        fill="none" 
        stroke={strokeColor} 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: '1000',
          strokeDashoffset: reducedMotion ? 0 : dashOffset,
          transition: 'stroke-dashoffset 0.1s linear'
        }}
      />
    </svg>
  );
}

export default ECGLine;
