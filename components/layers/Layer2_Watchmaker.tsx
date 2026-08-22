'use client';

import React, { useState, useEffect, useRef } from 'react';
import CharacterScramble from '@/components/effects/CharacterScramble';
import RedactionBar from '@/components/effects/RedactionBar';
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
    setIsCreedOpen(true);
    if (onInspectBrokenGear) {
      onInspectBrokenGear();
    }
  };

  const handleClose = () => {
    playClick();
    setIsCreedOpen(false);
  };

  // Keyboard navigation listener to close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDomain) setSelectedDomain(null);
        else if (isCreedOpen) handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreedOpen, selectedDomain]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-start py-24 px-6 md:px-12 overflow-hidden bg-void z-10"
      aria-label="About and Philosophy"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[#C8A24B]/30 bg-[#C8A24B]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24B]" />
            <span className="font-mono text-xs text-[#C8A24B] tracking-widest uppercase font-bold">
              ABOUT // RESEARCH BACKGROUND & PRINCIPLES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-bone mb-4">
            The Architecture of Inquiry
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#888888] max-w-xl mx-auto italic">
            "{ABOUT_PHILOSOPHY}"
          </p>
        </div>

        {/* Factual Biographical Summary Card */}
        <div className="w-full max-w-4xl mb-12 p-6 md:p-8 rounded-sm border border-white/15 bg-black/60 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8A5CF6] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8A5CF6] animate-pulse" />
            <span className="uppercase tracking-wider font-bold">BIOGRAPHICAL BACKGROUND // BHAVESHKUMAR PARMAR (RAY)</span>
          </div>
          <p className="text-sm md:text-base text-[#D0D0D0] leading-relaxed mb-4">
            {ABOUT_BIO}
          </p>
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#888888]">
            <span>EDUCATION: M.Sc. Cybersecurity & Forensic Science (Gujarat University)</span>
            <span className="text-[#38BDF8]">SPECIALIZATION: Vulnerability Research & Malware Analysis</span>
          </div>
        </div>

        {/* Creed Inspection Trigger */}
        <div className="w-full mb-16 p-6 md:p-8 rounded-sm border border-[#C8A24B]/30 bg-black/60 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-[#C8A24B]">
              <span className="w-2 h-2 rounded-full bg-[#C8A24B] animate-ping" />
              <span className="font-bold">INVESTIGATIVE METHODOLOGY & PHILOSOPHY</span>
            </div>
            <p className="text-sm text-[#CCCCCC]">
              Read the research philosophy, recon creed, and operational standards.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleInspect}
              onMouseEnter={playHover}
              className="px-6 py-3 border border-[#C8A24B] bg-[#C8A24B]/10 hover:bg-[#C8A24B]/20 text-[#C8A24B] font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer shadow-[0_0_15px_rgba(200,162,75,0.15)] hover:shadow-[0_0_25px_rgba(200,162,75,0.3)] flex items-center gap-2 font-bold"
            >
              <span>{isCreedOpen ? 'Viewing Methodology' : 'Read Investigative Creed'}</span>
              <span>⚙</span>
            </button>
          </div>
        </div>

        {/* Creed Report Card Panel (When Open) */}
        {isCreedOpen && (
          <div
            className={`w-full max-w-3xl bg-black/90 border border-[#C8A24B]/50 p-8 md:p-12 mb-16 rounded-sm shadow-2xl relative backdrop-blur-lg ${
              reducedMotion ? '' : 'animate-[slideIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]'
            }`}
            role="document"
            aria-labelledby="creed-title"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white font-mono text-xl transition-colors cursor-pointer"
              aria-label="Close report"
            >
              ×
            </button>

            <div className="mb-6 border-b border-[#C8A24B]/20 pb-4">
              <span className="font-mono text-xs text-[#C8A24B] block mb-1 uppercase tracking-wider font-bold">
                OPERATIONAL PRINCIPLES // ETHICAL RECONNAISSANCE
              </span>
              <h3 id="creed-title" className="text-2xl font-bold tracking-tight text-bone">
                {ABOUT_TITLE}
              </h3>
            </div>

            <div className="space-y-6 text-[#CCCCCC] text-sm md:text-base leading-relaxed">
              {ABOUT_PARAGRAPHS.map((para, idx) => (
                <RedactionBar key={idx}>
                  <p>{para}</p>
                </RedactionBar>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-end border-t border-[#C8A24B]/20 pt-4 font-mono text-xs text-white/40">
              <div>
                <span>STATUS: EMPIRICALLY_VERIFIED</span>
                <span className="block">STANDARDS: RESPONSIBLE_DISCLOSURE</span>
              </div>
              <span className="text-[#C8A24B] font-bold">ACTIVE_DISCLOSURE</span>
            </div>
          </div>
        )}

        {/* 6 Research Domains Grid */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-[#8A5CF6] block uppercase tracking-widest">
                CORE_COMPETENCIES
              </span>
              <h3 className="text-2xl font-bold text-bone">
                Primary Research Domains
              </h3>
            </div>
            <span className="font-mono text-xs text-[#666666] hidden sm:inline">
              [6 SPECIALIZED VECTORS]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                onClick={() => {
                  playClick();
                  setSelectedDomain(domain);
                }}
                onMouseEnter={playHover}
                className="group relative p-6 rounded-sm border border-white/10 hover:border-[#8A5CF6]/60 bg-black/40 hover:bg-black/70 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[10px] text-[#8A5CF6] tracking-wider uppercase">
                      {domain.tag}
                    </span>
                    <span className="text-lg opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {domain.icon}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-bone group-hover:text-white mb-1 transition-colors">
                    {domain.title}
                  </h4>
                  <p className="font-mono text-xs text-[#888888] mb-4">
                    {domain.subtitle}
                  </p>

                  <p className="text-xs text-[#AAAAAA] leading-relaxed mb-6 line-clamp-3">
                    {domain.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {domain.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-xs bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                      >
                        {tool}
                      </span>
                    ))}
                    {domain.tools.length > 3 && (
                      <span className="px-2 py-0.5 rounded-xs bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                        +{domain.tools.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[10px] text-[#888888]">
                    <span className="text-[#38BDF8]">{domain.metrics}</span>
                    <span className="group-hover:translate-x-1 transition-transform text-[#8A5CF6]">
                      Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Detail Modal */}
        {selectedDomain && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            data-lenis-prevent="true"
          >
            <div 
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto overscroll-contain p-8 rounded-sm border border-[#8A5CF6]/50 bg-[#0A0B0D] shadow-2xl text-bone animate-[slideIn_0.3s_ease-out] custom-scrollbar"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  playClick();
                  setSelectedDomain(null);
                }}
                className="absolute top-4 right-4 text-white/40 hover:text-white font-mono text-xl cursor-pointer"
              >
                ×
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{selectedDomain.icon}</span>
                <div>
                  <span className="font-mono text-xs text-[#8A5CF6] block uppercase">
                    {selectedDomain.tag}
                  </span>
                  <h3 className="text-2xl font-bold">{selectedDomain.title}</h3>
                </div>
              </div>

              <p className="text-sm text-[#CCCCCC] leading-relaxed mb-6">
                {selectedDomain.description}
              </p>

              <div className="mb-6">
                <h4 className="font-mono text-xs text-[#888888] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Key Focus Areas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#CCCCCC]">
                  {selectedDomain.focusAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#8A5CF6]">▸</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#888888] uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                  Primary Tooling Suite
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDomain.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/15 text-xs font-mono text-white/90"
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}} />
    </section>
  );
}
