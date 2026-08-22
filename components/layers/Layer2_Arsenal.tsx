'use client';

import React, { useState } from 'react';
import { ARSENAL_TOOLKIT } from '@/content/research';
import { useSound } from '@/lib/useSound';

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
      className="relative min-h-screen w-full flex flex-col items-center justify-start py-24 px-6 md:px-12 bg-[#08090B] border-t border-b border-white/5 z-10"
      aria-label="Security Arsenal and Tooling"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase">
                LAYER_02.5 // ARSENAL_MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-bone">
              Offensive & Defensive Tooling
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#888888] mt-1">
              Industrial-grade static decompilers, dynamic interceptors, and forensic triage instruments.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['all', 'binary', 'dynamic', 'forensics', 'development'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playClick();
                  setActiveCategory(tab);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-sm border uppercase transition-all cursor-pointer ${
                  activeCategory === tab
                    ? 'bg-[#38BDF8] text-[#0A0B0D] border-[#38BDF8] font-bold'
                    : 'border-white/10 text-[#888888] hover:text-white hover:border-white/30 bg-black/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Arsenal Category Blocks */}
        <div className="space-y-10">
          {filteredCategories.map((group, idx) => (
            <div key={idx} className="p-6 md:p-8 rounded-sm border border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <h3 className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#38BDF8] uppercase flex items-center gap-2">
                  <span>▸</span>
                  <span>{group.category}</span>
                </h3>
                <span className="font-mono text-[10px] text-[#666666]">
                  [{group.items.length} ACTIVE SUITES]
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((tool, toolIdx) => (
                  <div
                    key={toolIdx}
                    onMouseEnter={playHover}
                    className="p-4 rounded-sm border border-white/5 hover:border-[#38BDF8]/40 bg-white/2 hover:bg-white/5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-bone text-sm">{tool.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs border ${
                            tool.proficiency === 'EXPERT'
                              ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                              : tool.proficiency === 'ADVANCED'
                              ? 'border-[#38BDF8]/40 text-[#38BDF8] bg-[#38BDF8]/10'
                              : 'border-amber-500/40 text-amber-400 bg-amber-500/10'
                          }`}
                        >
                          {tool.proficiency}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#888888] leading-snug">
                        {tool.type}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-[#555555]">
                      <span>VERIFIED</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
