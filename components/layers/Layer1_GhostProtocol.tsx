'use client';

import React, { useState, useEffect } from 'react';
import { SITE } from '@/lib/site';
import CharacterScramble from '@/components/effects/CharacterScramble';
import CountUp from '@/components/ui/CountUp';
import { useSound } from '@/lib/useSound';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

const DOMAIN_PILLS = [
  'MALWARE_ANALYSIS',
  'REVERSE_ENGINEERING',
  'DIGITAL_FORENSICS',
  'VULN_RESEARCH',
  'CTF_OPERATIONS',
  'AI_AUTOMATION',
];

export default function Layer1_GhostProtocol() {
  const { playHover, playClick } = useSound();
  const { reducedMotion } = useReducedMotion();
  const [activePillIndex, setActivePillIndex] = useState(0);

  // Rotating highlight effect through domain pills
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActivePillIndex((prev) => (prev + 1) % DOMAIN_PILLS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-28 sm:pt-32 pb-12 px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      {/* Background Ambient Aurora Gradient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] rounded-full pointer-events-none blur-[120px] sm:blur-[160px] opacity-25 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.45) 0%, rgba(139, 92, 246, 0.35) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top HUD Telemetry Chips Row */}
      <div className="w-full max-w-6xl z-10 flex flex-wrap justify-between items-center gap-3 font-mono text-[11px] text-[#94A3B8] border-b border-white/10 pb-4">
        {/* Left Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(52,211,153,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-widest">ACTIVE_RESEARCH</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-[#94A3B8]">
            SECURITY_CLEARANCE // L4
          </span>
        </div>

        {/* Right Chips */}
        <div className="flex items-center gap-2.5">
          <span className="hidden md:inline px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-[#94A3B8]">
            GEO: 23.0225° N, 72.5714° E // AHMEDABAD
          </span>
          <a
            href="#findings"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 font-bold transition-all shadow-[0_0_12px_rgba(34,211,238,0.2)]"
          >
            <span>CVE-2026-16577</span>
            <span className="text-[9px]">↗</span>
          </a>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="z-10 flex flex-col items-center text-center my-auto max-w-5xl px-4 py-8">
        {/* Giant Outlined / Gradient Display Name */}
        <div className="relative mb-2">
          <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tighter leading-none select-none">
            <span className="bg-gradient-to-b from-[#F1F5F9] via-[#E2E8F0] to-[#94A3B8]/60 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(34,211,238,0.15)]">
              <CharacterScramble text={SITE.handle} />
            </span>
          </h1>
          {/* Subtle Ambient Glow Behind Moniker */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-violet-500/20 blur-3xl -z-10 pointer-events-none" />
        </div>

        {/* Real Name, Academic Role & Specialization */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-mono text-sm sm:text-base text-[#94A3B8] mb-4">
          <span className="text-[#F1F5F9] font-bold text-base sm:text-lg tracking-tight">
            {SITE.realName}
          </span>
          <span className="hidden sm:inline text-cyan-400/60">•</span>
          <span className="text-cyan-400 font-medium">
            {SITE.role}
          </span>
          <span className="hidden sm:inline text-violet-400/60">•</span>
          <span className="text-[#94A3B8] text-xs sm:text-sm">
            {SITE.location}
          </span>
        </div>

        {/* Philosophy Creed Tagline */}
        <div className="max-w-2xl mb-8">
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] leading-relaxed italic bg-white/[0.03] border border-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
            <span className="text-cyan-400 font-bold not-italic">"</span>
            {SITE.heroQuote}
            <span className="text-cyan-400 font-bold not-italic">"</span>
            <span className="text-white/40 mx-2">—</span>
            <span className="text-[#CBD5E1]">{SITE.tagline}</span>
          </p>
        </div>

        {/* Domain Pillar Tags Matrix */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl font-mono text-[10px] sm:text-xs">
          {DOMAIN_PILLS.map((pill, idx) => {
            const isHighlighted = activePillIndex === idx;
            return (
              <span
                key={pill}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-full border transition-all duration-300 cursor-default select-none ${
                  isHighlighted
                    ? 'border-cyan-400/80 bg-cyan-400/15 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.3)] scale-105'
                    : 'border-white/10 bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-violet-500/50 hover:bg-violet-500/10'
                }`}
              >
                [{pill}]
              </span>
            );
          })}
        </div>

        {/* High-Impact CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 font-mono text-xs">
          {/* Primary Glow Button */}
          <a
            href="#findings"
            onClick={playClick}
            onMouseEnter={playHover}
            className="group relative px-6 sm:px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 bg-[length:200%_auto] hover:bg-right transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 font-bold text-[#05060A] tracking-wider uppercase">
              <span>VIEW CVE RECORD</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>

          {/* Secondary Ghost Button */}
          <a
            href="#about"
            onClick={playClick}
            onMouseEnter={playHover}
            className="px-6 py-3.5 rounded-full border border-white/20 hover:border-cyan-400/60 bg-white/5 hover:bg-white/10 text-[#F1F5F9] font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>RESEARCH LAB & BIO</span>
          </a>

          {/* Tertiary Button */}
          <a
            href="#credentials"
            onClick={playClick}
            onMouseEnter={playHover}
            className="px-6 py-3.5 rounded-full border border-white/10 hover:border-violet-400/60 bg-black/40 hover:bg-violet-950/20 text-[#94A3B8] hover:text-violet-300 font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>PUBLICATIONS & CREDENTIALS</span>
          </a>
        </div>
      </div>

      {/* Quick Metrics Bento Bar with CountUp */}
      <div className="w-full max-w-6xl z-10 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-2 sm:p-3 rounded-2xl border border-white/10 bg-[#0A0D14]/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] font-mono text-center">
          {/* Metric 1 */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group">
            <span className="font-heading text-2xl sm:text-3xl font-bold text-emerald-400 group-hover:scale-105 transition-transform">
              <CountUp end={4} duration={1200} />
            </span>
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
              Published CVEs
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-all group">
            <div className="flex items-baseline font-heading text-2xl sm:text-3xl font-bold text-cyan-400 group-hover:scale-105 transition-transform">
              <CountUp end={30} duration={1400} suffix="K+" />
            </div>
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
              Plugin Installs
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 transition-all group">
            <span className="font-heading text-xl sm:text-2xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
              SSRF · RCE
            </span>
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
              Vuln Classes
            </span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-violet-400/30 transition-all group">
            <span className="font-heading text-xl sm:text-2xl font-bold text-violet-400 group-hover:scale-105 transition-transform">
              BAC · BOLA
            </span>
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
              Auth Findings
            </span>
          </div>

          {/* Metric 5 */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-all group">
            <span className="font-heading text-xl sm:text-2xl font-bold text-cyan-300 group-hover:scale-105 transition-transform">
              VERIFIED
            </span>
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">
              WPScan / NVD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
