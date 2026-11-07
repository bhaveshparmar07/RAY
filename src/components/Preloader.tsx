'use client';

import React, { useEffect, useState } from 'react';

const HEX_CHARS = '0123456789ABCDEF';
const RAW_HEX_DUMPS = [
  '0x7fff5fbff8b0  48 89 e5 48 83 ec 40 48  89 7d f8 48 89 75 f0 48  |H..H..@H.}..H.u.H|',
  '0x7fff5fbff8c0  8b 45 f8 48 8b 40 18 48  89 45 e8 48 8b 45 e8 48  |.E.H.@.H..E.H.E.H|',
  '0x7fff5fbff8d0  83 78 10 00 74 23 48 8b  45 e8 48 8b 40 18 48 89  |.x..t#H.E.H.@.H..|',
  '0x7fff5fbff8e0  45 e0 48 8b 45 e0 48 8b  55 f0 48 89 50 20 48 8b  |E.H.E.H.U.H.P H..|',
  '0x7fff5fbff8f0  45 e8 48 8b 40 18 48 83  c0 10 48 89 45 d8 b8 00  |E.H.@.H...H.E...|',
  '0x7fff5fbff900  00 00 00 e8 8d fe ff ff  48 83 c4 40 5d c3 55 48  |........H..@]..UH|',
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [decompileStage, setDecompileStage] = useState<'streaming' | 'decompiling' | 'resolved' | 'done'>('streaming');
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Generate streaming lines
    const interval = setInterval(() => {
      const randomLine = RAW_HEX_DUMPS[Math.floor(Math.random() * RAW_HEX_DUMPS.length)];
      setLines((prev) => [...prev.slice(-12), randomLine]);
    }, 45);

    // Progress counter 0 to 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(interval);
          setDecompileStage('decompiling');
          setTimeout(() => setDecompileStage('resolved'), 300);
          setTimeout(() => {
            setDecompileStage('done');
            onComplete();
          }, 700);
          return 100;
        }
        // accelerate towards end
        const step = prev > 70 ? 4 : 2;
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  if (decompileStage === 'done') return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-[#07080A] flex flex-col justify-between p-6 sm:p-12 font-mono transition-opacity duration-500 ${decompileStage === 'resolved' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center text-xs text-[#9A9890] border-b border-white/10 pb-3">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8FF2E] animate-pulse" />
          <span>SYSTEM_INIT // BINARY_STREAM_PARSE</span>
        </span>
        <span className="text-[#C8FF2E] font-bold">XOR_CORE v4.0</span>
      </div>

      {/* Center Display: Stream or Decompiled Letter Transformation */}
      <div className="my-auto max-w-4xl w-full mx-auto">
        {decompileStage === 'streaming' ? (
          <div className="space-y-1 text-xs sm:text-sm text-[#62605B] select-none overflow-hidden max-h-[300px]">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-[#9A9890]">{line.slice(0, 14)}</span>
                <span className="text-[#6FE7FF]">{line.slice(14, 54)}</span>
                <span className="text-[#ECE9E2] hidden sm:inline">{line.slice(54)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="font-sans text-8xl sm:text-9xl font-black text-[#ECE9E2] tracking-tighter">
              <span className="text-[#C8FF2E]">R</span>
              <span>A</span>
              <span className="text-[#6FE7FF]">Y</span>
            </h1>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Bar with Percentage */}
      <div className="border-t border-white/10 pt-4 flex justify-between items-end">
        <div className="text-xs text-[#9A9890] space-y-1">
          <div>TARGET: 0x4D5A // DECOMPILING INSTRUCTION SETS</div>
          <div className="text-[#62605B]">STATUS: {progress < 100 ? 'PARSING_OPCODES' : 'TRUTH_LAYER_READY'}</div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-6xl font-black text-[#ECE9E2]">{progress}</span>
          <span className="text-[#C8FF2E] text-sm font-bold">%</span>
        </div>
      </div>
    </div>
  );
}
