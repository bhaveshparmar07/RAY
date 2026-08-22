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
  const [selectedClass, setSelectedClass] = useState<VulnClass | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');

  const { playSonar, playHover, playClick } = useSound();
  const { reducedMotion } = useReducedMotion();
  const primaryCVE = CVE_DATA[0];

  const filteredCVEs = useMemo(() => {
    return CVE_DATA.filter((cve) => {
      const matchSev = selectedSeverity === 'all' || cve.severity === selectedSeverity;
      const matchClass = selectedClass === 'all' || cve.vulnClass === selectedClass;
      const matchStat = selectedStatus === 'all' || cve.status === selectedStatus;
      return matchSev && matchClass && matchStat;
    });
  }, [selectedSeverity, selectedClass, selectedStatus]);

  const lastPingTimes = useRef<Record<string, number>>({});
  const playSonarRef = useRef(playSonar);
  useEffect(() => {
    playSonarRef.current = playSonar;
  }, [playSonar]);

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

          if (now - lastPing > 3500) {
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
      className="relative w-full bg-[#D9CBB0] text-[#0A0B0D] z-10 py-20 px-6 md:px-12 border-t border-b border-[#0A0B0D]/10"
      aria-label="Vulnerabilities Atlas"
    >
      <div className="max-w-6xl w-full mx-auto space-y-10">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#0A0B0D]/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full border border-[#8A5CF6]/30 bg-[#8A5CF6]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5CF6]" />
              <span className="font-mono text-[10px] md:text-xs text-[#5b24c6] font-bold tracking-widest uppercase">
                RESEARCH // PUBLIC VULNERABILITY DISCLOSURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Published CVEs & Vulnerability Radar
            </h2>
          </div>

          {/* Severity Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#666666] font-bold">SEVERITY:</span>
            {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
              <button
                key={sev}
                onClick={() => {
                  playClick();
                  setSelectedSeverity(sev as any);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1 rounded-sm border uppercase transition-all cursor-pointer ${
                  selectedSeverity === sev
                    ? 'bg-[#0A0B0D] text-[#D9CBB0] border-[#0A0B0D] font-bold shadow-md'
                    : 'border-[#0A0B0D]/20 text-[#0A0B0D]/70 hover:border-[#0A0B0D] hover:text-[#0A0B0D] bg-white/40'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Side-by-Side: Left = Spotlight Card, Right = Radar Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spotlight Case Card */}
          {primaryCVE && (
            <div className="lg:col-span-7 bg-[#E8DFC8] border border-[#0A0B0D]/20 rounded-sm p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                {/* Badge Row */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-0.5 bg-[#4ADE80]/20 text-[#0F602B] font-bold border border-[#4ADE80]/50 rounded-sm">
                      CVSS {primaryCVE.cvss.toFixed(1)} LOW
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#0A0B0D]/10 font-bold rounded-sm text-[#0A0B0D]">
                      {primaryCVE.id}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#8A5CF6]/15 text-[#5b24c6] font-bold rounded-sm">
                      {primaryCVE.cwe} ({primaryCVE.cweLabel})
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/15 text-amber-900 font-bold rounded-sm">
                      30K+ PLUGIN INSTALLS
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#666666] block uppercase tracking-wider">
                      TARGET: {primaryCVE.target} {primaryCVE.targetVersion}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0B0D] mt-1">
                      {primaryCVE.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {primaryCVE.summary}
                </p>

                <div className="p-4 rounded-sm bg-black/5 border border-[#0A0B0D]/10 font-mono text-xs space-y-1.5">
                  <div className="font-bold text-[#0A0B0D] flex items-center gap-2">
                    <span>▸</span>
                    <span>TECHNICAL ROOT CAUSE SUMMARY</span>
                  </div>
                  <p className="text-[11px] text-[#555555] leading-relaxed line-clamp-3">
                    {primaryCVE.rootCause}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#0A0B0D]/15 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    playClick();
                    onSelectCVE(primaryCVE);
                  }}
                  onMouseEnter={playHover}
                  className="flex-1 px-6 py-3 bg-[#0A0B0D] hover:bg-[#222222] text-[#F7F5EE] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <span className="text-[#F7F5EE] font-bold">Read Vulnerability Report & PoC</span>
                  <span className="text-base">🔬</span>
                </button>

                <a
                  href={primaryCVE.references[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  className="px-5 py-3 border border-[#0A0B0D]/30 hover:border-[#0A0B0D] text-[#0A0B0D] font-mono text-xs font-bold text-center rounded-sm transition-all hover:bg-black/5"
                >
                  WPScan Record Advisory ↗
                </a>
              </div>
            </div>
          )}

          {/* Right Column: Live Radar Visualizer (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-sm border border-[#0A0B0D]/20 bg-[#ECE5D4] shadow-md relative min-h-[380px]">
            <div className="w-full flex justify-between items-center mb-4 font-mono text-[10px] text-[#666666]">
              <span>RADAR_TELEMETRY // SECTOR_SCAN</span>
              <span className="text-[#8A5CF6] font-bold">1 TARGET ACQUIRED</span>
            </div>

            {/* Radar Scope Frame */}
            <div
              className="relative w-full aspect-square max-w-[340px] border border-[#0A0B0D]/25 bg-[#D2C3A8] shadow-[inset_0_0_30px_rgba(0,0,0,0.12)] rounded-sm overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(#0a0b0d 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Radar Sweep */}
              {!reducedMotion && (
                <div
                  className="absolute inset-0 pointer-events-none origin-center"
                  style={{
                    background:
                      'conic-gradient(from -90deg at 50% 50%, rgba(138, 92, 246, 0.3) 0deg, rgba(138, 92, 246, 0) 65deg, transparent 65deg)',
                    animation: 'radarSweep 4s linear infinite',
                  }}
                />
              )}

              {/* Crosshair Axes & Range Rings */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#0A0B0D]/20 -translate-x-1/2 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#0A0B0D]/20 -translate-y-1/2 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full border border-[#0A0B0D]/15 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-[#0A0B0D]/10 pointer-events-none" />

              {/* Quadrant Sector Markers */}
              <span className="absolute top-2 left-2 font-mono text-[8px] text-[#0A0B0D]/40 font-bold uppercase">
                Q1: WEB_APPS
              </span>
              <span className="absolute top-2 right-2 font-mono text-[8px] text-[#0A0B0D]/40 font-bold uppercase">
                Q2: APIS
              </span>
              <span className="absolute bottom-2 left-2 font-mono text-[8px] text-[#0A0B0D]/40 font-bold uppercase">
                Q3: AUTH
              </span>
              <span className="absolute bottom-2 right-2 font-mono text-[8px] text-[#0A0B0D]/40 font-bold uppercase">
                Q4: INFRA
              </span>

              {/* Target Pins */}
              {filteredCVEs.map((cve) => {
                const leftPct = `${cve.coordinates.x * 100}%`;
                const topPct = `${cve.coordinates.y * 100}%`;

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
                      onSelectCVE(cve);
                    }}
                    onMouseEnter={playHover}
                  >
                    <div className="sonar-ring absolute -inset-3 rounded-full border border-[#8A5CF6] opacity-0 pointer-events-none" />
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-5 h-5 rounded-full bg-[#4ADE80]/30 animate-ping pointer-events-none" />
                      <span className="w-3.5 h-3.5 rounded-full bg-[#4ADE80] border-2 border-[#0A0B0D] shadow-md group-hover:scale-125 transition-transform" />
                    </div>

                    <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0A0B0D] text-[#EDECE6] px-2.5 py-1 rounded-sm font-mono text-[10px] shadow-xl opacity-95 pointer-events-none border border-white/20">
                      <div className="font-bold text-[#38BDF8]">{cve.id}</div>
                      <div className="text-[9px] text-[#CCCCCC]">{cve.target}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center font-mono text-[10px] text-[#666666]">
              CLICK PIN TO OPEN CASE DOSSIER
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
          0% { transform: scale(0.6); opacity: 1; border-color: #8A5CF6; }
          100% { transform: scale(3.5); opacity: 0; border-color: #38BDF8; }
        }
      `}} />
    </section>
  );
}
