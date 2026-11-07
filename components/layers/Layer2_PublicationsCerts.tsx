'use client';

import React, { useState } from 'react';
import { PUBLICATIONS, CERTIFICATIONS, SECURITY_PROJECTS, ACHIEVEMENTS } from '@/content/credentials';
import { useSound } from '@/lib/useSound';

export default function Layer2_PublicationsCerts() {
  const { playHover, playClick } = useSound();
  const [activeTab, setActiveTab] = useState<'publications' | 'certifications' | 'projects' | 'achievements'>('publications');

  const tabs = [
    { key: 'publications', label: 'RESEARCH PAPERS', count: PUBLICATIONS.length },
    { key: 'certifications', label: 'CERTIFICATIONS', count: CERTIFICATIONS.length },
    { key: 'projects', label: 'SECURITY TOOLS', count: SECURITY_PROJECTS.length },
    { key: 'achievements', label: 'HONOURS & BOOTCAMPS', count: ACHIEVEMENTS.length },
  ] as const;

  return (
    <section
      id="credentials"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-b border-white/5 z-10"
      aria-label="Publications and Verified Credentials"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-violet-500/30 bg-violet-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="font-mono text-xs text-violet-300 tracking-widest uppercase font-bold">
                04 // RESEARCH OUTPUT & CREDENTIALS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Output, Credentials & Tooling
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-xl">
              Peer-reviewed research publications, verified offensive security certifications, and engineering projects.
            </p>
          </div>

          {/* Sliding Pill Tab Selector */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl font-mono text-xs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.key);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-[#05060A] font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#05060A]/20 text-[#05060A]' : 'bg-white/10 text-cyan-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Research Publications */}
        {activeTab === 'publications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                onMouseEnter={playHover}
                className="group p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-violet-500/50 bg-[#0A0D14]/70 hover:bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                      {pub.typeLabel || 'RESEARCH PUBLICATION'}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">{pub.date}</span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F1F5F9] group-hover:text-violet-300 mb-2 leading-snug transition-colors">
                    {pub.title}
                  </h3>

                  <div className="font-mono text-xs text-cyan-400 mb-4">
                    {pub.venue || pub.journal}
                    {pub.doi && (
                      <span className="block text-[11px] text-[#94A3B8] mt-1">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                    {pub.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#E2E8F0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 font-mono text-xs text-violet-400 hover:text-cyan-300 transition-colors font-bold group"
                  >
                    <span>Read Publication Record</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Certifications */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={playHover}
                className="group relative p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#0A0D14]/70 hover:bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Verified Shimmer Highlight */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-xl pointer-events-none" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="font-mono text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${cert.badgeColor}15`,
                        color: cert.badgeColor,
                        borderColor: `${cert.badgeColor}35`,
                        borderWidth: '1px',
                      }}
                    >
                      {cert.status}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">{cert.date}</span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#F1F5F9] group-hover:text-cyan-300 mb-2 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="font-mono text-xs text-[#94A3B8] mb-4">
                    {cert.issuer}
                    {cert.certNumber && (
                      <span className="block text-[11px] text-amber-400 mt-1 font-bold">
                        REG № {cert.certNumber}
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] text-[#94A3B8] block uppercase tracking-wider mb-2 font-bold">
                    Verified Competencies
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-[#CBD5E1]">
                    {cert.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Security Tools */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {SECURITY_PROJECTS.map((project) => (
              <div
                key={project.id}
                onMouseEnter={playHover}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#0A0D14]/70 hover:bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                      {project.type}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">{project.period}</span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F1F5F9] group-hover:text-cyan-300 mb-3 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-6 font-sans">
                    {project.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {project.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#E2E8F0]">
                        <span className="text-cyan-400 shrink-0 font-bold">▸</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-mono text-cyan-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Honours & Community (Timeline & Featured Cards) */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {ACHIEVEMENTS.map((ach, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="group p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-amber-400/50 bg-[#0A0D14]/70 hover:bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[10px] px-2.5 py-1 bg-amber-400/15 text-amber-300 border border-amber-400/30 rounded-full font-bold uppercase tracking-wider">
                      {ach.badge}
                    </span>
                    <span className="font-mono text-xs text-[#94A3B8]">{ach.period}</span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F1F5F9] group-hover:text-amber-300 mb-1 transition-colors">
                    {ach.title}
                  </h3>

                  <div className="font-mono text-xs text-cyan-400 mb-3 flex items-center justify-between">
                    <span>{ach.organization}</span>
                    {ach.location && <span className="text-[#94A3B8]">{ach.location}</span>}
                  </div>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-4 font-sans">
                    {ach.description}
                  </p>

                  {ach.details && (
                    <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-[11px] text-[#E2E8F0]">
                      {ach.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 shrink-0 font-bold">▸</span>
                          <span className="leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
