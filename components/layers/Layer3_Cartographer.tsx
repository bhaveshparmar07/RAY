'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CVE_DATA } from '@/data/cves';
import { CVEEntry, Severity, VulnClass, Status } from '@/lib/types';
import { useSound } from '@/lib/useSound';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

interface Layer3CartographerProps {
  onSelectCVE: (cve: CVEEntry) => void;
}

export default function Layer3_Cartographer({ onSelectCVE }: Layer3CartographerProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'all'>('all');
  const [activeCVEId, setActiveCVEId] = useState<string>(CVE_DATA[0].id);

  const { playSonar, playHover, playClick } = useSound();
  const { reducedMotion } = useReducedMotion();

  const activeCVE = useMemo(() => {
    return CVE_DATA.find((cve) => cve.id === activeCVEId) || CVE_DATA[0];
  }, [activeCVEId]);

  const filteredCVEs = useMemo(() => {
    return CVE_DATA.filter((cve) => {
      const matchSev = selectedSeverity === 'all' || cve.severity === selectedSeverity;
      return matchSev;
    });
  }, [selectedSeverity]);

  const lastPingTimes = useRef<Record<string, number>>({});
  const playSonarRef = useRef(playSonar);
  useEffect(() => {
    playSonarRef.current = playSonar;
  }, [playSonar]);

  // Radar sweep animation and sonar hit detection
  useEffect(() => {
    if (reducedMotion) return;

    let animId: number;
    let angle = 0;

    const tick = () => {
      const alignedSpeed = 0.0261;
      angle = (angle + alignedSpeed) % (Math.PI * 2);
      const center = { x: 0.5, y: 0.5 };

      CVE_DATA.forEach((cve) => {
        const dx = cve.coordinates.x - center.x;
        const dy = cve.coordinates.y - center.y;

        let pinAngle = Math.atan2(dy, dx);
        if (pinAngle < 0) pinAngle += Math.PI * 2;

        const adjustedAngle = (angle - Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
        const angleDiff = Math.abs(adjustedAngle - pinAngle);

        if (angleDiff < 0.08) {
          const now = Date.now();
          const lastPing = lastPingTimes.current[cve.id] || 0;

          if (now - lastPing > 3000) {
            lastPingTimes.current[cve.id] = now;
            const el = document.getElementById(`pin-wrapper-${cve.id}`);
            if (el) {
              el.classList.add('ping-active');
              setTimeout(() => {
                el.classList.remove('ping-active');
              }, 1200);
            }

            if (playSonarRef.current) {
              playSonarRef.current(850, 1.5);
            }
          }
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  return (
    <section
      id="findings"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-b border-white/5 z-10"
      aria-label="Vulnerabilities Atlas & Threat Radar"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Section Header & Severity Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-cyan-400/30 bg-cyan-400/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-300 font-bold tracking-widest uppercase">
                05 // THREAT INTEL CONSOLE & PUBLIC DISCLOSURES
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Published CVEs & Vulnerability Radar
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-xl">
              Real-world vulnerability research findings validated by WPScan, NVD, and MITRE.
            </p>
          </div>

          {/* Severity Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#94A3B8] font-bold">SEVERITY:</span>
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map((sev) => {
              const isActive = selectedSeverity === sev;
              return (
                <button
                  key={sev}
                  onClick={() => {
                    playClick();
                    setSelectedSeverity(sev);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 rounded-full border uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-[#05060A] border-transparent font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'border-white/10 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-white/30 bg-white/5'
                  }`}
                >
                  {sev}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Side-by-Side: Left = Spotlight Dossier, Right = Interactive Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spotlight Dossier Card (7 Columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden flex flex-col justify-between">
            {/* Quick CVE Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10">
              {CVE_DATA.map((cve) => {
                const isCurrent = cve.id === activeCVE.id;
                return (
                  <button
                    key={cve.id}
                    onClick={() => {
                      playClick();
                      setActiveCVEId(cve.id);
                    }}
                    onMouseEnter={playHover}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                        : 'bg-white/[0.03] text-[#94A3B8] border border-white/5 hover:text-[#F1F5F9] hover:bg-white/10'
                    }`}
                  >
                    {cve.id}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {/* Badge Row */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold border ${
                      activeCVE.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : activeCVE.severity === 'high'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                        : activeCVE.severity === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    CVSS {activeCVE.cvss.toFixed(1)} {activeCVE.severity.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-bold">
                    {activeCVE.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold">
                    {activeCVE.cwe} ({activeCVE.cweLabel})
                  </span>
                  {activeCVE.id === 'CVE-2026-16577' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold">
                      30K+ PLUGIN INSTALLS
                    </span>
                  )}
                </div>

                <div>
                  <span className="font-mono text-[11px] text-[#94A3B8] block uppercase tracking-wider">
                    TARGET: {activeCVE.target} {activeCVE.targetVersion}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#F1F5F9] mt-1">
                    {activeCVE.title}
                  </h3>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-sans">
                {activeCVE.summary}
              </p>

              {/* Technical Root Cause Code Snippet Box */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/10 pb-2">
                  <span className="font-bold text-cyan-400 flex items-center gap-2">
                    <span>▸</span>
                    <span>TECHNICAL ROOT CAUSE ANALYSIS</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">PATCHED</span>
                </div>
                <p className="text-[11px] text-[#CBD5E1] leading-relaxed line-clamp-4">
                  {activeCVE.rootCause}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 font-mono text-xs">
              <button
                onClick={() => {
                  playClick();
                  onSelectCVE(activeCVE);
                }}
                onMouseEnter={playHover}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-[#05060A] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <span>Read Full Autopsy Dossier</span>
                <span className="text-base">🔬</span>
              </button>

              <a
                href={activeCVE.references[0]}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="px-5 py-3.5 border border-white/20 hover:border-cyan-400 bg-white/5 hover:bg-white/10 text-[#F1F5F9] font-medium text-center rounded-full transition-all flex items-center justify-center gap-1.5"
              >
                <span>Advisory Record</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Cyber Radar (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative min-h-[420px]">
            {/* Header Telemetry */}
            <div className="w-full flex justify-between items-center mb-5 font-mono text-[10px] text-[#94A3B8]">
              <span>RADAR_TELEMETRY // SECTOR_SCAN</span>
              <span className="text-cyan-400 font-bold">
                {filteredCVEs.length} TARGET{filteredCVEs.length !== 1 ? 'S' : ''} ACQUIRED
              </span>
            </div>

            {/* Radar Scope Frame */}
            <div
              className="relative w-full aspect-square max-w-[340px] border border-cyan-400/30 bg-[#05060A] shadow-[inset_0_0_40px_rgba(34,211,238,0.1),0_0_30px_rgba(0,0,0,0.5)] rounded-full overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Radar Sweep Cone */}
              {!reducedMotion && (
                <div
                  className="absolute inset-0 pointer-events-none origin-center"
                  style={{
                    background:
                      'conic-gradient(from -90deg at 50% 50%, rgba(34, 211, 238, 0.35) 0deg, rgba(139, 92, 246, 0.15) 45deg, transparent 75deg)',
                    animation: 'radarSweep 4s linear infinite',
                  }}
                />
              )}

              {/* Crosshair Axes & Range Rings */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-400/20 -translate-x-1/2 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-400/20 -translate-y-1/2 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] rounded-full border border-cyan-400/20 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full border border-cyan-400/15 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-cyan-400/10 pointer-events-none" />

              {/* Quadrant Sector Markers */}
              <span className="absolute top-3 left-4 font-mono text-[8px] text-cyan-400/50 font-bold uppercase">
                Q1: WEB_APPS
              </span>
              <span className="absolute top-3 right-4 font-mono text-[8px] text-cyan-400/50 font-bold uppercase">
                Q2: APIS
              </span>
              <span className="absolute bottom-3 left-4 font-mono text-[8px] text-cyan-400/50 font-bold uppercase">
                Q3: AUTH
              </span>
              <span className="absolute bottom-3 right-4 font-mono text-[8px] text-cyan-400/50 font-bold uppercase">
                Q4: INFRA
              </span>

              {/* Target Pins */}
              {filteredCVEs.map((cve) => {
                const leftPct = `${cve.coordinates.x * 100}%`;
                const topPct = `${cve.coordinates.y * 100}%`;
                const isSelected = cve.id === activeCVE.id;
                const pinColor =
                  cve.severity === 'critical' ? '#EF4444' :
                  cve.severity === 'high' ? '#F97316' :
                  cve.severity === 'medium' ? '#FBBF24' :
                  '#34D399';

                return (
                  <div
                    key={cve.id}
                    id={`pin-wrapper-${cve.id}`}
                    className="cve-pin-wrapper absolute z-20 group cursor-pointer"
                    style={{
                      left: leftPct,
                      top: topPct,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => {
                      playClick();
                      setActiveCVEId(cve.id);
                      onSelectCVE(cve);
                    }}
                    onMouseEnter={playHover}
                  >
                    <div className="sonar-ring absolute -inset-3 rounded-full border border-cyan-400 opacity-0 pointer-events-none" />
                    <div className="relative flex items-center justify-center">
                      <span
                        className="absolute w-5 h-5 rounded-full animate-ping pointer-events-none"
                        style={{ backgroundColor: `${pinColor}4D` }}
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 border-[#05060A] shadow-md group-hover:scale-125 transition-transform ${
                          isSelected ? 'ring-2 ring-cyan-400 scale-125' : ''
                        }`}
                        style={{ backgroundColor: pinColor }}
                      />
                    </div>

                    <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0A0D14] text-[#F1F5F9] px-2.5 py-1 rounded-md font-mono text-[10px] shadow-xl opacity-95 pointer-events-none border border-cyan-400/30">
                      <div className="font-bold text-cyan-400">{cve.id}</div>
                      <div className="text-[9px] text-[#94A3B8]">{cve.target}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 text-center font-mono text-[11px] text-[#94A3B8]">
              CLICK ANY TARGET PIN TO OPEN AUTOPSY DOSSIER
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ping-active .sonar-ring {
          animation: pingRing 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes pingRing {
          0% { transform: scale(0.6); opacity: 1; border-color: #22D3EE; }
          100% { transform: scale(3.5); opacity: 0; border-color: #8B5CF6; }
        }
      `}} />
    </section>
  );
}
