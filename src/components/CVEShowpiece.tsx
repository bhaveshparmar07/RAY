'use client';

import React, { useState } from 'react';
import { CVES, CVEData } from '@/src/content/site';

const SEVERITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  critical: { text: '#FF3B30', bg: 'rgba(255, 59, 48, 0.1)', border: 'rgba(255, 59, 48, 0.4)' },
  high: { text: '#FF9500', bg: 'rgba(255, 149, 0, 0.1)', border: 'rgba(255, 149, 0, 0.4)' },
  medium: { text: '#C8FF2E', bg: 'rgba(200, 255, 46, 0.1)', border: 'rgba(200, 255, 46, 0.4)' },
  low: { text: '#6FE7FF', bg: 'rgba(111, 231, 255, 0.1)', border: 'rgba(111, 231, 255, 0.4)' },
};

export default function CVEShowpiece() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'chain' | 'rootCause' | 'dates'>('chain');

  const cve: CVEData = CVES[selectedIndex];
  const sevStyle = SEVERITY_COLORS[cve.severity] || SEVERITY_COLORS.medium;

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const el = document.getElementById('cve-console');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="cves" className="relative w-full bg-[#07080A] py-24 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute right-0 top-1/3 -translate-y-1/2 font-sans text-[25vw] font-black text-white/[0.015] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        CVE
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 mb-12">
        <div>
          <div className="font-mono text-xs text-[#9A9890] flex items-center gap-2 mb-3">
            <span className="text-[#C8FF2E] font-bold">// 05</span>
            <span>PUBLISHED VULNERABILITY ADVISORIES</span>
            <span className="text-[#62605B]">|</span>
            <span>PUBLIC_SECURITY_RECORDS</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-black text-[#ECE9E2] tracking-tighter">
            Zero-Trust <span className="font-serif italic font-normal text-[#C8FF2E]">Logic</span> Flaws
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#9A9890] max-w-2xl mt-3">
            4 authorially discovered and disclosed Common Vulnerabilities and Exposures affecting 30,000+ active enterprise WordPress and multi-vendor installations.
          </p>
        </div>

        <div className="font-mono text-xs text-[#9A9890] flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-[#C8FF2E]/10 border border-[#C8FF2E]/30 text-[#C8FF2E] font-bold">
            04 CONFIRMED ADVISORIES
          </span>
          <span className="text-[#62605B] hidden sm:inline">WPScan · NVD · CVE.org</span>
        </div>
      </div>

      {/* Main Dual-Column Showcase */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4 CVE Selector Stack */}
        <div className="lg:col-span-5 space-y-3">
          {CVES.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            const itemSev = SEVERITY_COLORS[item.severity];

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#0E1015] border-[#C8FF2E] shadow-[0_0_30px_rgba(200,255,46,0.12)]'
                    : 'bg-[#0E1015]/40 border-white/5 hover:border-white/20 hover:bg-[#0E1015]/80'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#C8FF2E] rounded-r" />
                )}

                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-base sm:text-lg font-black text-[#ECE9E2] tracking-tight">
                    {item.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded font-mono text-[10px] font-bold"
                      style={{
                        color: itemSev.text,
                        backgroundColor: itemSev.bg,
                        border: `1px solid ${itemSev.border}`,
                      }}
                    >
                      CVSS {item.cvss} · {item.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="font-sans text-xs sm:text-sm font-semibold text-[#ECE9E2] line-clamp-1 mb-2">
                  {item.title}
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#9A9890]">
                  <span className="text-[#6FE7FF]">{item.vulnClass}</span>
                  <span className="text-[#62605B]">|</span>
                  <span>{item.target}</span>
                  <span className="text-[#62605B]">|</span>
                  <span className="text-[#C8FF2E]">{item.cwe}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Advisory Console */}
        <div id="cve-console" className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 shadow-2xl space-y-6 relative">
          {/* Header Metadata */}
          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="text-[#C8FF2E] font-bold">{cve.id}</span>
                <span className="text-[#62605B]">/</span>
                <span className="text-[#6FE7FF]">{cve.cweLabel} ({cve.cwe})</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-black text-[#ECE9E2] tracking-tight">
                {cve.title}
              </h3>
            </div>

            {/* Severity Pill */}
            <div
              className="px-3 py-1.5 rounded font-mono text-xs font-bold text-center flex flex-col items-center"
              style={{
                color: sevStyle.text,
                backgroundColor: sevStyle.bg,
                border: `1px solid ${sevStyle.border}`,
              }}
            >
              <span className="text-lg font-black leading-none">{cve.cvss}</span>
              <span className="text-[9px] uppercase tracking-wider">{cve.severity}</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono p-3 rounded-lg bg-black/40 border border-white/5">
            <div>
              <div className="text-[10px] text-[#62605B]">TARGET_SOFTWARE</div>
              <div className="text-[#ECE9E2] font-bold truncate">{cve.target}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#62605B]">AFFECTED_VERSIONS</div>
              <div className="text-[#C8FF2E] font-bold truncate">{cve.affectedVersions}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#62605B]">VULN_CLASS</div>
              <div className="text-[#6FE7FF] font-bold truncate">{cve.vulnClass}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#62605B]">STATUS</div>
              <div className="text-[#C8FF2E] font-bold uppercase">{cve.status}</div>
            </div>
          </div>

          {/* Summary */}
          <p className="font-sans text-xs sm:text-sm text-[#9A9890] leading-relaxed">
            {cve.summary}
          </p>

          {/* Console Sub-Navigation Tabs */}
          <div className="flex border-b border-white/10 font-mono text-xs gap-4">
            <button
              onClick={() => setActiveTab('chain')}
              className={`pb-2 transition-all cursor-pointer ${
                activeTab === 'chain'
                  ? 'text-[#C8FF2E] border-b-2 border-[#C8FF2E] font-bold'
                  : 'text-[#9A9890] hover:text-[#ECE9E2]'
              }`}
            >
              [ATTACK_CHAIN]
            </button>
            <button
              onClick={() => setActiveTab('rootCause')}
              className={`pb-2 transition-all cursor-pointer ${
                activeTab === 'rootCause'
                  ? 'text-[#C8FF2E] border-b-2 border-[#C8FF2E] font-bold'
                  : 'text-[#9A9890] hover:text-[#ECE9E2]'
              }`}
            >
              [ROOT_CAUSE_ANALYSIS]
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`pb-2 transition-all cursor-pointer ${
                activeTab === 'dates'
                  ? 'text-[#C8FF2E] border-b-2 border-[#C8FF2E] font-bold'
                  : 'text-[#9A9890] hover:text-[#ECE9E2]'
              }`}
            >
              [TIMELINE]
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[160px]">
            {activeTab === 'chain' && (
              <div className="space-y-4">
                {cve.chain.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 text-xs font-mono">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C8FF2E]/10 border border-[#C8FF2E]/40 text-[#C8FF2E] font-bold flex items-center justify-center text-[11px]">
                      0{step.step}
                    </span>
                    <div className="space-y-1">
                      <div className="text-[#ECE9E2] font-bold">{step.action}</div>
                      <div className="text-[#9A9890] font-sans leading-relaxed text-[11px] sm:text-xs">
                        {step.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rootCause' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded bg-black/60 border border-white/10 text-[#6FE7FF] leading-relaxed break-words font-sans text-xs">
                  {cve.rootCause}
                </div>
                <div className="text-[11px] text-[#9A9890]">
                  <span className="text-[#C8FF2E] font-bold">OUTCOME: </span>
                  <span className="font-sans">{cve.outcome}</span>
                </div>
              </div>
            )}

            {activeTab === 'dates' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#62605B]">DISCOVERED</span>
                  <div className="text-[#ECE9E2] font-bold">{cve.dates.found}</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#62605B]">REPORTED</span>
                  <div className="text-[#ECE9E2] font-bold">{cve.dates.reported}</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#62605B]">PATCHED</span>
                  <div className="text-[#C8FF2E] font-bold">{cve.dates.patched || 'CONFIRMED'}</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#62605B]">DISCLOSED</span>
                  <div className="text-[#6FE7FF] font-bold">{cve.dates.disclosed}</div>
                </div>
                <div className="p-3 rounded bg-white/[0.02] border border-white/5 col-span-2">
                  <span className="text-[10px] text-[#62605B]">CVSS_VECTOR</span>
                  <div className="text-[#9A9890] text-[10px] truncate">{cve.cvssVector}</div>
                </div>
              </div>
            )}
          </div>

          {/* Action Row with Direct Verification Links */}
          <div className="border-t border-white/10 pt-4 flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {cve.references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 text-[#9A9890] hover:text-[#C8FF2E] hover:border-[#C8FF2E]/40 transition-all flex items-center gap-1.5"
                >
                  <span>{ref.includes('wpscan') ? 'WPScan Record' : ref.includes('nvd') ? 'NVD Record' : 'CVE.org'}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>

            <a
              href={cve.references[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C8FF2E] text-[#07080A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(200,255,46,0.3)] flex items-center gap-2"
            >
              <span>VIEW CVE RECORD →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
