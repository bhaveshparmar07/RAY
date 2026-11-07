'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SITE_IDENTITY } from '@/src/content/site';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const ROLE_TAGS = [
  'MALWARE_ANALYSIS',
  'REVERSE_ENGINEERING',
  'DIGITAL_FORENSICS',
  'VULN_RESEARCH',
  'CTF_OPERATIONS',
  'AI_AUTOMATION',
];

export default function Hero() {
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [scrambleText, setScrambleText] = useState(ROLE_TAGS[0]);

  // Role tag rotation with character scramble
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => {
        const next = (prev + 1) % ROLE_TAGS.length;
        const target = ROLE_TAGS[next];
        let iteration = 0;
        const scrambleInterval = setInterval(() => {
          setScrambleText(
            target
              .split('')
              .map((letter, index) => {
                if (index < iteration) return target[index];
                return '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
              })
              .join('')
          );
          if (iteration >= target.length) {
            clearInterval(scrambleInterval);
          }
          iteration += 1 / 2;
        }, 25);
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-[#07080A]">
      {/* 3D WebGL Shader Truth Layer Canvas */}
      <HeroScene />

      {/* Top Header Row */}
      <header className="relative z-10 w-full flex justify-between items-center text-xs font-mono border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF2E] shadow-[0_0_10px_#C8FF2E]" />
          <span className="font-bold tracking-widest text-[#ECE9E2] text-[11px] sm:text-xs">
            {SITE_IDENTITY.handle} // SEC_LAB
          </span>
          <span className="text-[#62605B] hidden sm:inline">|</span>
          <span className="text-[#9A9890] text-[11px] hidden sm:inline">RESEARCHER_LEVEL_4</span>
        </div>

        <div className="flex items-center gap-3 text-[#9A9890] text-xs">
          <span className="hidden md:inline">AHMEDABAD, IN [{SITE_IDENTITY.geoCoordinates.lat}]</span>
          <a
            href="#cves"
            className="px-2.5 py-1 rounded bg-[#C8FF2E]/10 border border-[#C8FF2E]/40 text-[#C8FF2E] hover:bg-[#C8FF2E] hover:text-[#07080A] font-bold transition-all text-[11px]"
          >
            CVE-2026-16577 ↗
          </a>
        </div>
      </header>

      {/* Hero Core Visual Center */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto py-8 sm:py-12 flex flex-col items-start justify-center">
        {/* Massive Dual-Layer Moniker */}
        <div className="relative w-full select-none">
          {/* Surface Layer: Huge Clean Crisp Typography */}
          <h1 className="font-sans text-[22vw] sm:text-[18vw] font-black tracking-tighter leading-none text-[#ECE9E2] uppercase">
            RAY
          </h1>

          {/* Truth Layer (revealed under lens via CSS clip-path mask) */}
          <div
            className="truth-layer-mask absolute inset-0 font-mono text-[22vw] sm:text-[18vw] font-black tracking-tighter leading-none uppercase overflow-hidden"
            aria-hidden="true"
          >
            <div className="text-[#6FE7FF] opacity-95 drop-shadow-[0_0_25px_#6FE7FF]">
              XOR
            </div>
            {/* Hex code matrix overlay inside truth layer */}
            <div className="absolute inset-0 text-[10px] sm:text-xs font-mono text-[#6FE7FF]/90 leading-none whitespace-pre-wrap select-none p-4 opacity-80">
              {Array.from({ length: 40 })
                .map(() => '0x4D5A 9000 0300 0000 0400 0000 FFFF 0000 B800 0000 0000 0000 4000 0000')
                .join('\n')}
            </div>
          </div>
        </div>

        {/* Editorial Subtitle with Serif Italic Accent */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 font-mono text-xs sm:text-base text-[#9A9890]">
          <span className="font-bold text-[#ECE9E2]">{SITE_IDENTITY.realName}</span>
          <span className="text-[#62605B] hidden sm:inline">—</span>
          <span className="font-serif italic text-lg sm:text-2xl text-[#C8FF2E]">
            Empirical Security Research
          </span>
          <span className="text-[11px] sm:text-xs text-[#62605B]">({SITE_IDENTITY.degree})</span>
        </div>

        {/* Dynamic Scrambling Role Tag Pill */}
        <div className="mt-5 font-mono text-[11px] sm:text-xs text-[#ECE9E2] flex flex-wrap items-center gap-2">
          <span className="text-[#C8FF2E] font-bold">FOCUS_VECTOR:</span>
          <span className="px-2.5 sm:px-3 py-1 rounded bg-[#0E1015] border border-white/10 text-[#6FE7FF] tracking-wider font-bold">
            [{scrambleText}]
          </span>
        </div>

        {/* Minimal High-Contrast CTAs */}
        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 font-mono text-xs">
          <a
            href="#cves"
            className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#C8FF2E] text-[#07080A] font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(200,255,46,0.35)] flex items-center gap-2"
          >
            <span>Examine CVE Record</span>
            <span>→</span>
          </a>
          <a
            href="#manifesto"
            className="px-5 sm:px-6 py-3 sm:py-3.5 border border-white/20 text-[#ECE9E2] uppercase tracking-wider hover:border-[#C8FF2E] hover:text-[#C8FF2E] transition-all bg-white/[0.02]"
          >
            The Manifesto
          </a>
        </div>
      </div>

      {/* Slim Mono Stats Ticker at Bottom Edge */}
      <div className="relative z-10 w-full border-t border-white/10 pt-4 font-mono text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-left">
          <div className="border-l-2 border-[#C8FF2E] pl-2 sm:pl-3">
            <div className="text-xl sm:text-2xl font-black text-[#C8FF2E]">
              0{SITE_IDENTITY.stats.publishedCVEs}
            </div>
            <div className="text-[10px] text-[#9A9890] uppercase tracking-tight">Published CVEs</div>
          </div>
          <div className="border-l-2 border-white/20 pl-2 sm:pl-3">
            <div className="text-xl sm:text-2xl font-black text-[#ECE9E2]">
              {SITE_IDENTITY.stats.affectedInstalls}
            </div>
            <div className="text-[10px] text-[#9A9890] uppercase tracking-tight">Plugin Installs</div>
          </div>
          <div className="border-l-2 border-[#6FE7FF] pl-2 sm:pl-3">
            <div className="text-xl sm:text-2xl font-black text-[#6FE7FF]">
              {SITE_IDENTITY.stats.vulnClasses}
            </div>
            <div className="text-[10px] text-[#9A9890] uppercase tracking-tight">Vuln Classes</div>
          </div>
          <div className="border-l-2 border-white/20 pl-2 sm:pl-3">
            <div className="text-xl sm:text-2xl font-black text-[#ECE9E2]">
              {SITE_IDENTITY.stats.authFindings}
            </div>
            <div className="text-[10px] text-[#9A9890] uppercase tracking-tight">Auth Findings</div>
          </div>
          <div className="col-span-2 sm:col-span-1 border-l-2 border-[#C8FF2E] pl-2 sm:pl-3">
            <div className="text-xl sm:text-2xl font-black text-[#C8FF2E]">
              VERIFIED
            </div>
            <div className="text-[10px] text-[#9A9890] uppercase tracking-tight">{SITE_IDENTITY.stats.verification}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
