'use client';

import React, { useState } from 'react';
import { PUBLICATIONS, CERTIFICATIONS, SECURITY_PROJECTS, ACHIEVEMENTS } from '@/src/content/site';

type CredentialSection = 'publications' | 'certifications' | 'projects' | 'achievements';

export default function Credentials() {
  const [activeSection, setActiveSection] = useState<CredentialSection>('publications');

  return (
    <section id="credentials" className="relative w-full bg-[#07080A] py-24 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden">
      {/* Background Section Index Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 mb-12">
        <div>
          <div className="font-mono text-xs text-[#9A9890] flex items-center gap-2 mb-3">
            <span className="text-[#C8FF2E] font-bold">// 06</span>
            <span>VERIFIED DOSSIER & CITATIONS</span>
            <span className="text-[#62605B]">|</span>
            <span>ACADEMIC_PEER_REVIEWS</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-black text-[#ECE9E2] tracking-tighter">
            Verified <span className="font-serif italic font-normal text-[#C8FF2E]">Scholarship</span> & Tools
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#9A9890] max-w-2xl mt-3">
            Peer-reviewed research, first-author digital forensic methodologies, international offensive security selection, and engineered tools.
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveSection('publications')}
            className={`px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeSection === 'publications'
                ? 'bg-[#C8FF2E] text-[#07080A] font-bold shadow-[0_0_15px_rgba(200,255,46,0.25)]'
                : 'bg-[#0E1015] text-[#9A9890] border border-white/10 hover:border-white/20'
            }`}
          >
            PUBLICATIONS ({PUBLICATIONS.length})
          </button>
          <button
            onClick={() => setActiveSection('certifications')}
            className={`px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeSection === 'certifications'
                ? 'bg-[#C8FF2E] text-[#07080A] font-bold shadow-[0_0_15px_rgba(200,255,46,0.25)]'
                : 'bg-[#0E1015] text-[#9A9890] border border-white/10 hover:border-white/20'
            }`}
          >
            CERTIFICATIONS ({CERTIFICATIONS.length})
          </button>
          <button
            onClick={() => setActiveSection('projects')}
            className={`px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeSection === 'projects'
                ? 'bg-[#C8FF2E] text-[#07080A] font-bold shadow-[0_0_15px_rgba(200,255,46,0.25)]'
                : 'bg-[#0E1015] text-[#9A9890] border border-white/10 hover:border-white/20'
            }`}
          >
            SECURITY_PROJECTS ({SECURITY_PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveSection('achievements')}
            className={`px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeSection === 'achievements'
                ? 'bg-[#C8FF2E] text-[#07080A] font-bold shadow-[0_0_15px_rgba(200,255,46,0.25)]'
                : 'bg-[#0E1015] text-[#9A9890] border border-white/10 hover:border-white/20'
            }`}
          >
            HONORS ({ACHIEVEMENTS.length})
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* 1. PUBLICATIONS */}
        {activeSection === 'publications' && (
          <div className="space-y-6">
            {PUBLICATIONS.map((pub) => {
              const isPeerReviewed = pub.typeLabel.includes('PEER-REVIEWED');
              return (
                <div
                  key={pub.id}
                  className="p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 hover:border-white/20 transition-all space-y-4 relative group"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 font-mono text-xs">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            isPeerReviewed
                              ? 'bg-[#C8FF2E]/10 text-[#C8FF2E] border border-[#C8FF2E]/40'
                              : 'bg-[#6FE7FF]/10 text-[#6FE7FF] border border-[#6FE7FF]/40'
                          }`}
                        >
                          {pub.typeLabel}
                        </span>
                        <span className="text-[#62605B]">|</span>
                        <span className="text-[#9A9890]">{pub.venue}</span>
                        <span className="text-[#62605B] hidden sm:inline">|</span>
                        <span className="text-[#62605B] hidden sm:inline">{pub.date}</span>
                      </div>
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-[#ECE9E2] tracking-tight group-hover:text-[#C8FF2E] transition-colors pt-1">
                        {pub.title}
                      </h3>
                    </div>

                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded bg-white/[0.04] border border-white/15 text-[#ECE9E2] font-mono text-xs hover:bg-[#C8FF2E] hover:text-[#07080A] font-bold transition-all flex items-center gap-1.5 flex-shrink-0"
                    >
                      <span>READ PAPER</span>
                      <span>↗</span>
                    </a>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#9A9890] leading-relaxed">
                    {pub.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                    <div className="flex flex-wrap gap-2">
                      {pub.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-[#9A9890] border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    {pub.doi && (
                      <span className="text-[10px] text-[#6FE7FF]">DOI: {pub.doi}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. CERTIFICATIONS */}
        {activeSection === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-xl bg-[#0E1015] border border-white/10 flex flex-col justify-between space-y-6 relative hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cert.badgeColor }}
                    />
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[#9A9890]">
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-black text-[#ECE9E2] tracking-tight mb-1">
                    {cert.title}
                  </h3>
                  <div className="font-serif italic text-xs text-[#9A9890] mb-4">
                    {cert.issuer}
                  </div>

                  {cert.certNumber && (
                    <div className="font-mono text-[10px] text-[#6FE7FF] mb-4">
                      ID: {cert.certNumber}
                    </div>
                  )}

                  <div className="space-y-1.5 border-t border-white/10 pt-4">
                    {cert.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 font-mono text-[11px] text-[#ECE9E2]">
                        <span className="text-[#C8FF2E]">▸</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-[#62605B] border-t border-white/10 pt-3 flex justify-between">
                  <span>ISSUANCE_DATE</span>
                  <span className="text-[#ECE9E2]">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. SECURITY PROJECTS */}
        {activeSection === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECURITY_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 space-y-5 hover:border-white/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] text-[#C8FF2E] font-bold uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-black text-[#ECE9E2] tracking-tight mt-1">
                      {project.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#62605B]">{project.period}</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#9A9890] leading-relaxed">
                  {project.summary}
                </p>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-[#ECE9E2]">
                      <span className="text-[#6FE7FF] font-bold">▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-[#9A9890]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. ACHIEVEMENTS & HONORS */}
        {activeSection === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((ach, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2 py-0.5 rounded bg-[#C8FF2E]/10 border border-[#C8FF2E]/40 text-[#C8FF2E] font-mono text-[10px] font-bold">
                      {ach.badge}
                    </span>
                    <span className="font-mono text-[10px] text-[#62605B]">{ach.period}</span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-black text-[#ECE9E2] tracking-tight mb-1">
                    {ach.title}
                  </h3>
                  <div className="font-serif italic text-xs text-[#9A9890] mb-3">
                    {ach.organization} {ach.location && `· ${ach.location}`}
                  </div>

                  <p className="font-sans text-xs text-[#9A9890] leading-relaxed mb-4">
                    {ach.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {ach.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] font-mono text-[#ECE9E2]">
                        <span className="text-[#C8FF2E]">▸</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-[#62605B] border-t border-white/10 pt-3">
                  SELECTION: COMPETITIVE_MERIT
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
