'use client';

import React, { useState } from 'react';
import { ARSENAL_TOOLKIT } from '@/content/research';
import { useSound } from '@/lib/useSound';

const MARQUEE_TOOLS = [
  'Ghidra',
  'IDA Pro / x64dbg',
  'Burp Suite Professional',
  'Wireshark',
  'Volatility 3',
  'KAPE / Eric Zimmerman Tools',
  'Autopsy & FTK Imager',
  'PEStudio & DIE',
  'Frida & Objection',
  'Pwntools',
  'YARA',
  'Python 3 / Asyncio',
  'Docker Research Labs',
];

export default function Layer2_Arsenal() {
  const { playHover, playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? ARSENAL_TOOLKIT
      : ARSENAL_TOOLKIT.filter((cat) => cat.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section
      id="arsenal"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-b border-white/5 z-10"
      aria-label="Security Arsenal and Tooling"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Infinite Tool Marquee Strip */}
        <div className="w-full overflow-hidden py-3 border-y border-white/10 bg-white/[0.01]">
          <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] font-mono text-xs text-[#94A3B8]">
            {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((item, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">⚡</span>
                <span className="text-[#CBD5E1] tracking-wider uppercase">{item}</span>
                <span className="text-white/20">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">
                03 // ARSENAL MATRIX
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Offensive & Defensive Tooling
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-xl">
              Industrial-grade static decompilers, dynamic protocol interceptors, and forensic triage instruments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: 'all', label: 'ALL SUITES' },
              { id: 'binary', label: 'BINARY' },
              { id: 'dynamic', label: 'DYNAMIC' },
              { id: 'forensics', label: 'FORENSICS' },
              { id: 'development', label: 'DEV & AUTOMATION' },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setActiveCategory(tab.id);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3.5 py-1.5 rounded-full border uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-[#05060A] border-transparent font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'border-white/10 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-white/30 bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Arsenal Category Groups */}
        <div className="space-y-10">
          {filteredCategories.map((group, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <h3 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-2">
                  <span>▸</span>
                  <span>{group.category}</span>
                </h3>
                <span className="font-mono text-[10px] text-[#94A3B8]">
                  [{group.items.length} ACTIVE TOOLS]
                </span>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((tool, toolIdx) => {
                  const isAdvanced = tool.proficiency === 'ADVANCED' || tool.proficiency === 'EXPERT';
                  const percentWidth = isAdvanced ? '85%' : '70%';

                  return (
                    <div
                      key={toolIdx}
                      onMouseEnter={playHover}
                      className="p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                    >
                      <div>
                        {/* Tool Name and Badge */}
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <span className="font-heading font-bold text-[#F1F5F9] group-hover:text-cyan-300 text-sm transition-colors">
                            {tool.name}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                              isAdvanced
                                ? 'border-cyan-400/40 text-cyan-400 bg-cyan-400/10'
                                : 'border-violet-400/40 text-violet-400 bg-violet-400/10'
                            }`}
                          >
                            {tool.proficiency}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-[#94A3B8] leading-snug line-clamp-2">
                          {tool.type}
                        </p>
                      </div>

                      {/* Mini Proficiency Glow Bar */}
                      <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                        <div className="flex justify-between items-center font-mono text-[9px] text-[#94A3B8]">
                          <span>CALIBRATION</span>
                          <span className="text-cyan-400 font-semibold">{tool.proficiency}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-500"
                            style={{ width: percentWidth }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
