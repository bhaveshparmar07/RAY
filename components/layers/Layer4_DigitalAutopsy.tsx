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
  const { playSystemError, playClick, playSonar } = useSound();

  // Play opening chime when CVE is loaded
  useEffect(() => {
    if (cve) {
      // Play high clinical sonar scan chime
      playSonar(900, 1.0);
    }
  }, [cve]);

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
    cve.severity === 'critical' ? 'text-red-500' :
    cve.severity === 'high' ? 'text-orange-500' :
    cve.severity === 'medium' ? 'text-yellow-500' : 'text-green-500';

  const statusColor = cve.status === 'patched' ? 'text-green-400 border-green-400/30' : 
                      cve.status === 'unpatched' ? 'text-red-400 border-red-400/30' : 
                      'text-yellow-400 border-yellow-400/30';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      data-lenis-prevent="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0B0D] border border-white/10 overflow-y-auto overscroll-contain rounded-sm shadow-2xl z-10 custom-scrollbar"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cve-title"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white font-mono text-xl z-20 transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="p-8 md:p-12 relative overflow-hidden">
          
          {/* Declassified Stamp */}
          <div className={`absolute top-12 right-12 md:right-24 rotate-[-15deg] border-4 border-red-600/30 text-red-600/30 p-2 md:p-4 rounded pointer-events-none select-none z-0 ${reducedMotion ? '' : 'animate-[stampIn_0.5s_ease-out_forwards]'}`}>
            <div className="text-2xl md:text-4xl font-black tracking-widest uppercase">DECLASSIFIED</div>
            <div className="text-xs md:text-sm font-mono text-center mt-1">{cve.dates.disclosed}</div>
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Header */}
            <div className="mb-8">
              <CharacterScramble as="h2" id="cve-title" text={cve.id} className="text-4xl md:text-6xl font-mono font-bold text-[#ECECEC] mb-2" />
              <div className="flex flex-wrap gap-3 items-center font-mono text-sm">
                <span className="text-[#888888]">{cve.target} <span className="text-white/30">v</span>{cve.targetVersion}</span>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm text-xs text-white/70">{cve.cwe}</span>
                <span className={`px-2 py-0.5 border rounded-sm text-xs uppercase ${statusColor}`}>{cve.status}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              
              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Summary</h3>
                <CharacterScramble as="p" text={cve.summary} className="text-[#CCCCCC] leading-relaxed" />
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Affected Versions</h3>
                  <CharacterScramble as="p" text={cve.affectedVersions} className="text-[#CCCCCC] font-mono text-sm" />
                </section>
                
                <section>
                  <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">CVSS Base Score</h3>
                  <div className="flex items-end gap-4">
                    <div className={`text-6xl font-black font-mono leading-none ${severityColor}`}>
                      {cve.cvss.toFixed(1)}
                    </div>
                    <div className="text-xs font-mono text-[#888888] mb-1">
                      {cve.cvssVector || 'CVSS vector not published'}
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Root Cause Analysis</h3>
                <CharacterScramble as="p" text={cve.rootCause} className="text-[#CCCCCC] leading-relaxed" />
              </section>

              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Exploit Chain</h3>
                <div className="relative pl-6 space-y-8 border-l border-white/10">
                  {cve.chain.map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-[#0A0B0D] border border-white/20 flex items-center justify-center font-mono text-xs text-white/50">
                        {step.step}
                      </div>
                      <h4 className="font-bold text-[#ECECEC] mb-1">{step.action}</h4>
                      <p className="text-[#888888] text-sm">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Disclosure Timeline</h3>
                <div className="flex flex-col md:flex-row justify-between gap-4 font-mono text-xs">
                  <div className="flex flex-col">
                    <span className="text-white/40 mb-1">FOUND</span>
                    <span className="text-[#CCCCCC]">{cve.dates.found}</span>
                  </div>
                  <div className="hidden md:block flex-1 border-t border-white/10 mt-2 mx-4" />
                  <div className="flex flex-col">
                    <span className="text-white/40 mb-1">REPORTED</span>
                    <span className="text-[#CCCCCC]">{cve.dates.reported}</span>
                  </div>
                  {cve.dates.reserved && (
                    <>
                      <div className="hidden md:block flex-1 border-t border-white/10 mt-2 mx-4" />
                      <div className="flex flex-col">
                        <span className="text-white/40 mb-1">CVE RESERVED</span>
                        <span className="text-[#CCCCCC]">{cve.dates.reserved}</span>
                      </div>
                    </>
                  )}
                  {cve.dates.vendorContacted && (
                    <>
                      <div className="hidden md:block flex-1 border-t border-white/10 mt-2 mx-4" />
                      <div className="flex flex-col">
                        <span className="text-white/40 mb-1">VENDOR CONTACTED</span>
                        <span className="text-[#CCCCCC]">{cve.dates.vendorContacted}</span>
                      </div>
                    </>
                  )}
                  <div className="hidden md:block flex-1 border-t border-white/10 mt-2 mx-4" />
                  <div className="flex flex-col">
                    <span className="text-white/40 mb-1">PATCHED</span>
                    <span className="text-[#CCCCCC]">{cve.dates.patched || '---'}</span>
                  </div>
                  <div className="hidden md:block flex-1 border-t border-white/10 mt-2 mx-4" />
                  <div className="flex flex-col">
                    <span className="text-white/40 mb-1">DISCLOSED</span>
                    <span className="text-[#CCCCCC]">{cve.dates.disclosed}</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Outcome</h3>
                <CharacterScramble as="p" text={cve.outcome} className="text-[#CCCCCC] leading-relaxed" />
              </section>

              <section>
                <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Vulnerability Taxonomy</h3>
                <TaxonomyGraph activeClass={cve.vulnClass} activeCveId={cve.id} onSelectCVE={onSelectCVE} />
              </section>

              {cve.references.length > 0 && (
                <section>
                  <h3 className="font-mono text-xs text-[#666666] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">References</h3>
                  <ul className="space-y-2">
                    {cve.references.map((ref, i) => (
                      <li key={i}>
                        <a href={ref} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-blue-400 hover:text-blue-300 break-all transition-colors">
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes stampIn {
          0% { transform: scale(1.5) rotate(0deg); opacity: 0; }
          100% { transform: scale(1) rotate(-15deg); opacity: 1; }
        }
      `}} />
    </div>
  );
}
