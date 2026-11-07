'use client';

import React, { useEffect } from 'react';
import { CVEEntry } from '@/lib/types';
import CharacterScramble from '@/components/effects/CharacterScramble';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';
import TaxonomyGraph from '@/components/ui/TaxonomyGraph';
import { useSound } from '@/lib/useSound';

interface DigitalAutopsyProps {
  cve: CVEEntry | null;
  onClose: () => void;
  onSelectCVE?: (cve: CVEEntry) => void;
}

export default function Layer4_DigitalAutopsy({ cve, onClose, onSelectCVE }: DigitalAutopsyProps) {
  const { reducedMotion } = useReducedMotion();
  const { playClick, playSonar } = useSound();

  // Play opening chime when CVE is loaded
  useEffect(() => {
    if (cve) {
      playSonar(900, 1.0);
    }
  }, [cve, playSonar]);

  const handleClose = () => {
    playClick();
    onClose();
  };

  // Focus trap and scroll lock
  useEffect(() => {
    if (cve) {
      const originalOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [cve]);

  if (!cve) return null;

  const severityColor =
    cve.severity === 'critical' ? 'text-red-400' :
    cve.severity === 'high' ? 'text-orange-400' :
    cve.severity === 'medium' ? 'text-amber-300' : 'text-emerald-400';

  const severityBadgeBg =
    cve.severity === 'critical' ? 'bg-red-500/15 border-red-500/30 text-red-300' :
    cve.severity === 'high' ? 'bg-orange-500/15 border-orange-500/30 text-orange-300' :
    cve.severity === 'medium' ? 'bg-amber-400/15 border-amber-400/30 text-amber-300' :
    'bg-emerald-400/15 border-emerald-400/30 text-emerald-300';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-lenis-prevent="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#05060A]/90 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={handleClose}
      />

      {/* Main Dossier Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[88vh] bg-[#0A0D14]/95 border border-cyan-400/30 overflow-y-auto overscroll-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.15)] z-10 custom-scrollbar animate-[slideIn_0.3s_ease-out]"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cve-title"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white font-mono text-xl z-20 transition-all cursor-pointer w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/15"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="p-6 sm:p-10 md:p-12 relative overflow-hidden">
          {/* Declassified Stamp */}
          <div
            className={`absolute top-10 right-16 sm:right-24 rotate-[-12deg] border-2 border-red-500/30 text-red-400/40 px-3 py-1.5 rounded-lg pointer-events-none select-none z-0 ${
              reducedMotion ? '' : 'animate-[stampIn_0.5s_ease-out_forwards]'
            }`}
          >
            <div className="text-xl sm:text-2xl font-black font-heading tracking-widest uppercase">DECLASSIFIED</div>
            <div className="text-[10px] font-mono text-center">{cve.dates.disclosed}</div>
          </div>

          <div className="relative z-10 max-w-3xl space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 font-mono text-[11px] font-bold mb-3">
                <span>SECURITY_DOSSIER // CONFIRMED</span>
              </div>
              <CharacterScramble
                as="h2"
                id="cve-title"
                text={cve.id}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#F1F5F9] mb-3"
              />
              <div className="flex flex-wrap gap-2.5 items-center font-mono text-xs">
                <span className="text-[#CBD5E1]">
                  {cve.target} <span className="text-cyan-400">v{cve.targetVersion}</span>
                </span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[11px] text-[#E2E8F0]">
                  {cve.cwe} ({cve.cweLabel})
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase font-bold border ${severityBadgeBg}`}>
                  {cve.status}
                </span>
              </div>
            </div>

            {/* Summary */}
            <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 font-bold">
                Executive Vulnerability Summary
              </h3>
              <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed font-sans">
                {cve.summary}
              </p>
            </section>

            {/* 2-Column CVSS & Affected Versions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-2 font-bold">
                  Affected Target Scope
                </h3>
                <p className="text-[#F1F5F9] font-mono text-sm">
                  {cve.affectedVersions}
                </p>
              </section>

              <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-2 font-bold">
                  CVSS v3.1 Severity Score
                </h3>
                <div className="flex items-baseline gap-3">
                  <div className={`text-4xl sm:text-5xl font-black font-heading leading-none ${severityColor}`}>
                    {cve.cvss.toFixed(1)}
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8] leading-tight break-all">
                    {cve.cvssVector || 'Vector recorded at CNA'}
                  </div>
                </div>
              </section>
            </div>

            {/* Root Cause Analysis */}
            <section className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>▸</span>
                <span>Root Cause Analysis & Architecture Flaw</span>
              </h3>
              <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed font-sans">
                {cve.rootCause}
              </p>
            </section>

            {/* Exploit Chain Tree */}
            <section>
              <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-4 font-bold border-b border-white/10 pb-2">
                Validated Exploit Chain Tree
              </h3>
              <div className="relative pl-6 space-y-6 border-l-2 border-cyan-400/30">
                {cve.chain.map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#05060A] border-2 border-cyan-400 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold">
                      {step.step}
                    </div>
                    <h4 className="font-heading font-bold text-[#F1F5F9] text-sm mb-1">{step.action}</h4>
                    <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Disclosure Timeline */}
            <section>
              <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-4 font-bold border-b border-white/10 pb-2">
                Coordinated Disclosure Timeline
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#94A3B8] text-[10px] block mb-1">FOUND</span>
                  <span className="text-[#F1F5F9] font-bold">{cve.dates.found}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#94A3B8] text-[10px] block mb-1">REPORTED</span>
                  <span className="text-[#F1F5F9] font-bold">{cve.dates.reported}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#94A3B8] text-[10px] block mb-1">PATCHED</span>
                  <span className="text-emerald-400 font-bold">{cve.dates.patched || 'VERIFIED'}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[#94A3B8] text-[10px] block mb-1">DISCLOSED</span>
                  <span className="text-cyan-400 font-bold">{cve.dates.disclosed}</span>
                </div>
              </div>
            </section>

            {/* Outcome */}
            <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-2 font-bold">
                Vendor Resolution & Outcome
              </h3>
              <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed font-sans">
                {cve.outcome}
              </p>
            </section>

            {/* Taxonomy Graph */}
            <section>
              <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-3 font-bold border-b border-white/10 pb-2">
                Vulnerability Taxonomy Graph
              </h3>
              <TaxonomyGraph activeClass={cve.vulnClass} activeCveId={cve.id} onSelectCVE={onSelectCVE} />
            </section>

            {/* External References */}
            {cve.references.length > 0 && (
              <section className="pt-4 border-t border-white/10">
                <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest mb-3 font-bold">
                  Official Public Advisories & CNA References
                </h3>
                <ul className="space-y-2">
                  {cve.references.map((ref, i) => (
                    <li key={i}>
                      <a
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-cyan-400 hover:text-cyan-300 break-all transition-colors flex items-center gap-1.5"
                      >
                        <span>▸</span>
                        <span className="underline underline-offset-2">{ref}</span>
                        <span>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes stampIn {
          0% { transform: scale(1.5) rotate(0deg); opacity: 0; }
          100% { transform: scale(1) rotate(-12deg); opacity: 1; }
        }
      `}} />
    </div>
  );
}
