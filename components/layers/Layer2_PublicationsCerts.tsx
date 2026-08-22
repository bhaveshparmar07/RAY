'use client';

import React, { useState } from 'react';
import { PUBLICATIONS, CERTIFICATIONS, SECURITY_PROJECTS, ACHIEVEMENTS } from '@/content/credentials';
import { useSound } from '@/lib/useSound';

export default function Layer2_PublicationsCerts() {
  const { playHover, playClick } = useSound();
  const [activeTab, setActiveTab] = useState<'publications' | 'certifications' | 'projects' | 'achievements'>('publications');

  return (
    <section
      id="credentials"
      className="relative w-full py-20 px-6 md:px-12 bg-[#090A0C] text-bone border-t border-b border-white/5 z-10"
      aria-label="Publications and Verified Credentials"
    >
      <div className="max-w-6xl w-full mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full border border-[#8A5CF6]/30 bg-[#8A5CF6]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A5CF6]" />
              <span className="font-mono text-xs text-[#8A5CF6] tracking-widest uppercase font-bold">
                CREDENTIALS // RESEARCH OUTPUT & ARSENAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Research Output, Credentials & Tooling
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#888888] mt-1">
              Peer-reviewed research publications, verified offensive security certifications, and engineering projects.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { key: 'publications', label: 'RESEARCH PAPERS (2)' },
              { key: 'certifications', label: 'CERTIFICATIONS (3)' },
              { key: 'projects', label: 'SECURITY TOOLS (4)' },
              { key: 'achievements', label: 'HONOURS & BOOTCAMPS (3)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.key as any);
                }}
                onMouseEnter={playHover}
                className={`px-3.5 py-1.5 rounded-sm border uppercase transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#8A5CF6] text-white border-[#8A5CF6] font-bold shadow-[0_0_12px_rgba(138,92,246,0.3)]'
                    : 'border-white/10 text-[#888888] hover:text-white hover:border-white/30 bg-black/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Publications */}
        {activeTab === 'publications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {PUBLICATIONS.map((pub) => (
              <div
                key={pub.id}
                onMouseEnter={playHover}
                className="p-6 md:p-8 rounded-sm border border-white/10 hover:border-[#8A5CF6]/50 bg-black/40 hover:bg-black/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="font-mono text-[10px] text-[#8A5CF6] uppercase font-bold tracking-wider">
                      {pub.typeLabel || 'RESEARCH PUBLICATION'}
                    </span>
                    <span className="font-mono text-xs text-[#888888]">{pub.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-bone mb-2 leading-snug">
                    {pub.title}
                  </h3>

                  <div className="font-mono text-xs text-[#38BDF8] mb-4">
                    {pub.venue || pub.journal}
                    {pub.doi && (
                      <span className="block text-[11px] text-[#888888] mt-0.5">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-6">
                    {pub.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-xs bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
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
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#8A5CF6] hover:text-white transition-colors group"
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
                className="p-6 rounded-sm border border-white/10 hover:border-[#FF3B30]/50 bg-black/40 hover:bg-black/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 rounded-xs font-bold uppercase"
                      style={{
                        backgroundColor: `${cert.badgeColor}20`,
                        color: cert.badgeColor,
                        borderColor: `${cert.badgeColor}40`,
                        borderWidth: '1px',
                      }}
                    >
                      {cert.status}
                    </span>
                    <span className="font-mono text-[11px] text-[#888888]">{cert.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-bone mb-1">
                    {cert.title}
                  </h3>

                  <p className="font-mono text-xs text-[#888888] mb-4">
                    {cert.issuer}
                    {cert.certNumber && (
                      <span className="block text-[10px] text-[#C8A24B] mt-0.5 font-bold">
                        REG № {cert.certNumber}
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] text-[#666666] block uppercase mb-2">
                    Verified Competencies
                  </span>
                  <ul className="space-y-1 text-xs font-mono text-[#CCCCCC]">
                    {cert.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400">✓</span>
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
                className="p-6 md:p-8 rounded-sm border border-white/10 hover:border-[#38BDF8]/50 bg-black/40 hover:bg-black/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[10px] text-[#38BDF8] uppercase font-bold tracking-wider">
                      {project.type}
                    </span>
                    <span className="font-mono text-xs text-[#888888]">{project.period}</span>
                  </div>

                  <h3 className="text-xl font-bold text-bone mb-2">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    {project.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#CCCCCC]">
                        <span className="text-[#38BDF8] shrink-0">▸</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-xs bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[10px] font-mono text-[#38BDF8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Honours & Community */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeIn_0.3s_ease-out]">
            {ACHIEVEMENTS.map((ach, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="p-6 rounded-sm border border-white/10 hover:border-[#C8A24B]/50 bg-black/40 hover:bg-black/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] px-2 py-0.5 bg-[#C8A24B]/15 text-[#C8A24B] border border-[#C8A24B]/30 rounded-xs font-bold uppercase">
                      {ach.badge}
                    </span>
                    <span className="font-mono text-[11px] text-[#888888]">{ach.period}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-bone mb-1">
                    {ach.title}
                  </h3>

                  <div className="font-mono text-xs text-[#38BDF8] mb-3 flex items-center justify-between">
                    <span>{ach.organization}</span>
                    {ach.location && <span className="text-[#888888]">{ach.location}</span>}
                  </div>

                  <p className="text-xs text-[#AAAAAA] leading-relaxed mb-4">
                    {ach.description}
                  </p>

                  {ach.details && (
                    <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-[11px] text-[#CCCCCC]">
                      {ach.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-[#C8A24B] shrink-0">▸</span>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}
