'use client';

import React from 'react';
import { SITE } from '@/lib/site';
import ECGLine from '@/components/effects/ECGLine';
import CharacterScramble from '@/components/effects/CharacterScramble';
import { useSound } from '@/lib/useSound';

export default function Layer1_GhostProtocol() {
  const { playHover, playClick } = useSound();

  const domainPills = [
    'MALWARE_ANALYSIS',
    'REVERSE_ENGINEERING',
    'DIGITAL_FORENSICS',
    'VULN_RESEARCH',
    'CTF_OPERATIONS',
    'AI_AUTOMATION',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-6 md:px-12 overflow-hidden"
    >
      {/* Top Cybernetic Telemetry Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center z-10 font-mono text-[10px] md:text-xs text-[#888888] border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest text-[#CCCCCC]">STATUS // ACTIVE_RESEARCH</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-[#888888]">AUTH: RESEARCHER_LEVEL_4</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#888888] hidden md:inline">GEO: 23.0225° N, 72.5714° E</span>
          <span className="text-[#C8A24B] border border-[#C8A24B]/30 px-2 py-0.5 rounded-sm bg-[#C8A24B]/5">
            CVE-2026-16577
          </span>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="z-10 flex flex-col items-center text-center my-auto max-w-4xl px-4">
        {/* Big Handle Title */}
        <h1 className="mb-3 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-[#ECECEC]">
          <CharacterScramble text={SITE.handle} />
        </h1>

        {/* Real Name & Tagline */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-mono text-sm md:text-base text-[#888888]">
          <span className="text-[#CCCCCC] font-bold">{SITE.realName}</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-[#8A5CF6]">{SITE.role}</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-[#666666]">{SITE.location}</span>
        </div>

        {/* Philosophy Quote */}
        <p className="font-mono text-xs md:text-sm text-[#AAAAAA] max-w-xl mb-8 leading-relaxed italic border-l-2 border-[#8A5CF6]/50 pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0">
          "{SITE.heroQuote}" — {SITE.tagline}
        </p>

        {/* Domain Pillar Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl font-mono text-[10px] md:text-xs">
          {domainPills.map((pill) => (
            <span
              key={pill}
              onMouseEnter={playHover}
              className="px-3 py-1 rounded-sm border border-white/10 bg-black/40 text-[#BBBBBB] hover:text-white hover:border-[#8A5CF6]/60 hover:bg-[#8A5CF6]/10 transition-all duration-200 select-none cursor-default"
            >
              [{pill}]
            </span>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 font-mono text-xs">
          <a
            href="#findings"
            onClick={playClick}
            onMouseEnter={playHover}
            className="px-6 py-3 bg-[#8A5CF6] hover:bg-[#7c4def] text-white font-bold tracking-wider uppercase rounded-sm shadow-[0_0_20px_rgba(138,92,246,0.3)] transition-all duration-300 flex items-center gap-2 group"
          >
            <span>VIEW CVE RECORD</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="#about"
            onClick={playClick}
            onMouseEnter={playHover}
            className="px-6 py-3 border border-white/20 hover:border-white/50 bg-black/40 text-[#CCCCCC] hover:text-white tracking-wider uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
          >
            <span>Research Background & Lab</span>
          </a>

          <a
            href="#credentials"
            onClick={playClick}
            onMouseEnter={playHover}
            className="px-6 py-3 border border-white/20 hover:border-[#38BDF8]/60 bg-black/40 text-[#CCCCCC] hover:text-[#38BDF8] tracking-wider uppercase rounded-sm transition-all duration-300"
          >
            <span>Publications & Credentials</span>
          </a>
        </div>
      </div>

      {/* Quick Metrics Bar & ECG Wave */}
      <div className="w-full max-w-6xl z-10 flex flex-col items-center gap-6 mt-8">
        {/* KPI Ticker */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-px border border-white/10 bg-white/5 backdrop-blur-md rounded-sm font-mono text-center overflow-hidden">
          <div className="flex flex-col gap-0.5 py-4 px-3 bg-black/50">
            <span className="text-xl md:text-2xl font-bold text-[#4ADE80]">04</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-wider">Published CVEs</span>
          </div>
          <div className="flex flex-col gap-0.5 py-4 px-3 bg-black/50 border-l border-white/10">
            <span className="text-xl md:text-2xl font-bold text-[#38BDF8]">30K+</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-wider">Plugin Installs</span>
          </div>
          <div className="flex flex-col gap-0.5 py-4 px-3 bg-black/50 border-l border-white/10">
            <span className="text-xl md:text-2xl font-bold text-[#FBBF24]">SSRF · RCE</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-wider">Vuln Classes</span>
          </div>
          <div className="flex flex-col gap-0.5 py-4 px-3 bg-black/50 border-l border-white/10">
            <span className="text-xl md:text-2xl font-bold text-[#C8A24B]">BAC · BOLA</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-wider">Auth Findings</span>
          </div>
          <div className="flex flex-col gap-0.5 py-4 px-3 bg-black/50 border-l border-white/10">
            <span className="text-xl md:text-2xl font-bold text-[#8A5CF6]">VERIFIED</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-wider">WPScan / NVD</span>
          </div>
        </div>

        {/* Live ECG line */}
        <div className="w-full h-8 opacity-40">
          <ECGLine scrollProgress={0} />
        </div>
      </div>
    </section>
  );
}
