'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ABOUT_TITLE, ABOUT_BIO, ABOUT_PARAGRAPHS, ABOUT_PHILOSOPHY } from '@/content/about';
import { RESEARCH_DOMAINS, ResearchDomain } from '@/content/research';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';
import { useSound } from '@/lib/useSound';

interface Layer2WatchmakerProps {
  onInspectBrokenGear?: () => void;
  isCreedOpen?: boolean;
  setIsCreedOpen?: (open: boolean) => void;
}

export default function Layer2_Watchmaker({
  onInspectBrokenGear,
  isCreedOpen: externalIsCreedOpen,
  setIsCreedOpen: externalSetIsCreedOpen,
}: Layer2WatchmakerProps) {
  const [internalIsCreedOpen, setInternalIsCreedOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<ResearchDomain | null>(null);
  const { reducedMotion } = useReducedMotion();
  const { playClick, playHover, playSystemError } = useSound();
  const sectionRef = useRef<HTMLDivElement>(null);

  const isCreedOpen = externalIsCreedOpen !== undefined ? externalIsCreedOpen : internalIsCreedOpen;
  const setIsCreedOpen = externalSetIsCreedOpen !== undefined ? externalSetIsCreedOpen : setInternalIsCreedOpen;

  const handleInspect = () => {
    playSystemError();
    setIsCreedOpen(!isCreedOpen);
    if (!isCreedOpen && onInspectBrokenGear) {
      onInspectBrokenGear();
    }
  };

  const handleCloseCreed = () => {
    playClick();
    setIsCreedOpen(false);
  };

  // Keyboard listener to close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDomain) setSelectedDomain(null);
        else if (isCreedOpen) handleCloseCreed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreedOpen, selectedDomain]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 z-10"
      aria-label="About and Research Domains"
    >
      <div className="max-w-6xl w-full mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-violet-500/30 bg-violet-500/10 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs text-violet-300 tracking-widest uppercase font-bold">
              01 // RESEARCH BACKGROUND & PRINCIPLES
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F1F5F9] mb-4">
            The Architecture of Inquiry
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto italic">
            "{ABOUT_PHILOSOPHY}"
          </p>
        </div>

        {/* 2-Column Split: Left = Terminal Bio Card, Right = Profile Tilt Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Glass Terminal Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden group">
            {/* Top Terminal Bar */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-[#94A3B8] text-[11px]">sec-ops://researcher_dossier.sh</span>
                </div>
                <span className="text-cyan-400 text-[10px] uppercase font-bold tracking-wider">
                  AUTH_VERIFIED
                </span>
              </div>

              {/* Terminal Prompt & Bio */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                  <span className="text-violet-400 font-bold">ray@sec-lab:~$</span>
                  <span>cat /etc/researcher_bio.md</span>
                </div>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-sans">
                  {ABOUT_BIO}
                </p>
              </div>
            </div>

            {/* Bottom Creed Trigger Button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="font-mono text-xs text-[#94A3B8]">
                <span className="text-emerald-400 font-bold">STATUS:</span> ACTIVE_RESEARCHER
              </div>
              <button
                onClick={handleInspect}
                onMouseEnter={playHover}
                className="px-5 py-2.5 rounded-full border border-violet-500/40 hover:border-violet-400 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              >
                <span>{isCreedOpen ? 'Close Methodology' : 'Read Investigative Creed'}</span>
                <span>⚙</span>
              </button>
            </div>
          </div>

          {/* Right Column: Cyber-Noir Profile Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative group">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header with Monogram */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                  <div className="w-full h-full rounded-2xl bg-[#05060A] flex items-center justify-center">
                    <span className="font-heading font-extrabold text-2xl text-cyan-400">
                      RAY
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#F1F5F9]">
                    Bhaveshkumar Parmar
                  </h3>
                  <span className="font-mono text-xs text-cyan-400">
                    Cybersecurity Researcher
                  </span>
                </div>
              </div>

              {/* Education & Focus Chips */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[#94A3B8] text-[10px] block uppercase mb-1">Degree & Alma Mater</span>
                  <span className="text-[#F1F5F9] font-medium block">
                    M.Sc. Cybersecurity & Forensic Science
                  </span>
                  <span className="text-cyan-400 text-[11px]">
                    Gujarat University, Ahmedabad
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <span className="text-[#94A3B8] text-[10px] block uppercase mb-1">Primary Vectors</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['Vulnerability Research', 'Malware Analysis', 'Reverse Engineering', 'Digital Forensics'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-[#E2E8F0]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Verification Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CVE Author (WPScan)</span>
              </span>
              <span className="text-violet-400">AHMEDABAD, IN</span>
            </div>
          </div>
        </div>

        {/* Expandable Creed Panel */}
        {isCreedOpen && (
          <div
            className={`w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl border border-violet-500/40 bg-[#0A0D14]/95 backdrop-blur-2xl shadow-[0_12px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.15)] relative ${
              reducedMotion ? '' : 'animate-[slideIn_0.4s_ease-out]'
            }`}
          >
            <button
              onClick={handleCloseCreed}
              className="absolute top-6 right-6 text-white/50 hover:text-white font-mono text-xl transition-colors cursor-pointer w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10"
              aria-label="Close creed panel"
            >
              ×
            </button>

            <div className="mb-6 border-b border-violet-500/20 pb-4">
              <span className="font-mono text-xs text-violet-400 block mb-1 uppercase tracking-wider font-bold">
                OPERATIONAL PRINCIPLES // ETHICAL RECONNAISSANCE
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                {ABOUT_TITLE}
              </h3>
            </div>

            <div className="space-y-4 text-[#CBD5E1] text-sm sm:text-base leading-relaxed font-sans">
              {ABOUT_PARAGRAPHS.map((para, idx) => (
                <p key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-between items-center border-t border-white/10 pt-4 font-mono text-xs text-[#94A3B8]">
              <span>STATUS: EMPIRICALLY_VERIFIED</span>
              <span className="text-cyan-400 font-bold">STANDARDS: RESPONSIBLE_DISCLOSURE</span>
            </div>
          </div>
        )}

        {/* SECTION 3: PRIMARY RESEARCH DOMAINS BENTO GRID */}
        <div id="domains" className="w-full pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full border border-cyan-400/30 bg-cyan-400/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">
                  02 // CORE COMPETENCIES
                </span>
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
                Primary Research Domains
              </h3>
            </div>
            <span className="font-mono text-xs text-[#94A3B8]">
              [06 SPECIALIZED VECTORS]
            </span>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_DOMAINS.map((domain, index) => {
              // Accent color mapping for diverse cyber feel
              const accentColor =
                index === 0 ? 'cyan' :
                index === 1 ? 'violet' :
                index === 2 ? 'emerald' :
                index === 3 ? 'amber' :
                index === 4 ? 'sky' : 'rose';

              return (
                <div
                  key={domain.id}
                  onClick={() => {
                    playClick();
                    setSelectedDomain(domain);
                  }}
                  onMouseEnter={playHover}
                  className="group relative p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#0A0D14]/70 hover:bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-400/5 group-hover:bg-cyan-400/15 rounded-full blur-2xl transition-all pointer-events-none" />

                  <div>
                    {/* Top Row: Tag & Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-[10px] text-cyan-400 tracking-wider uppercase font-bold px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                        {domain.tag}
                      </span>
                      <span className="text-2xl transform group-hover:scale-110 transition-transform">
                        {domain.icon}
                      </span>
                    </div>

                    <h4 className="font-heading text-xl font-bold text-[#F1F5F9] group-hover:text-cyan-300 mb-1 transition-colors">
                      {domain.title}
                    </h4>
                    <p className="font-mono text-xs text-[#94A3B8] mb-4">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6 line-clamp-3 font-sans">
                      {domain.description}
                    </p>
                  </div>

                  <div>
                    {/* Tool Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {domain.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#E2E8F0]"
                        >
                          {tool}
                        </span>
                      ))}
                      {domain.tools.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#94A3B8]">
                          +{domain.tools.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Bottom Status Row */}
                    <div className="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[11px] text-[#94A3B8]">
                      <span className="text-cyan-400 font-medium">{domain.metrics}</span>
                      <span className="text-violet-400 group-hover:translate-x-1 transition-transform font-bold flex items-center gap-1">
                        Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Domain Detail Modal */}
        {selectedDomain && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05060A]/85 backdrop-blur-xl"
            data-lenis-prevent="true"
          >
            <div
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto overscroll-contain p-6 sm:p-8 rounded-2xl border border-cyan-400/40 bg-[#0A0D14] shadow-2xl text-[#F1F5F9] animate-[slideIn_0.3s_ease-out] custom-scrollbar"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  playClick();
                  setSelectedDomain(null);
                }}
                className="absolute top-5 right-5 text-white/50 hover:text-white font-mono text-lg cursor-pointer w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10"
                aria-label="Close dialog"
              >
                ×
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{selectedDomain.icon}</span>
                <div>
                  <span className="font-mono text-xs text-cyan-400 block uppercase font-bold">
                    {selectedDomain.tag}
                  </span>
                  <h3 className="font-heading text-2xl font-bold">{selectedDomain.title}</h3>
                </div>
              </div>

              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                {selectedDomain.description}
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-3 border-b border-white/10 pb-1 font-bold">
                  Key Focus Areas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[#E2E8F0]">
                  {selectedDomain.focusAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                      <span className="text-cyan-400">▸</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-3 border-b border-white/10 pb-1 font-bold">
                  Primary Tooling Suite
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDomain.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 text-xs font-mono text-cyan-300 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
