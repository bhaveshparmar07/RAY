'use client';

import React, { useState } from 'react';
import { SITE } from '@/lib/site';
import { ABOUT_PHILOSOPHY } from '@/content/about';
import { useSound } from '@/lib/useSound';

export default function Layer5_Contact() {
  const { playHover, playClick } = useSound();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const rawEmail = SITE.links.email.replace('mailto:', '');
    navigator.clipboard.writeText(rawEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPgp = () => {
    playClick();
    navigator.clipboard.writeText('4A8F C391 B902 77AE D412 88B1 F902 E311');
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2200);
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactLinks = [
    { label: 'DIRECT EMAIL', value: 'parmarbhavesh2075@gmail.com', href: SITE.links.email, icon: '✉' },
    { label: 'HACKERONE RESEARCHER', value: 'ethen_3616', href: SITE.links.hackerone, icon: '🎯' },
    { label: 'CTFTIME PROFILE', value: 'ctftime.org/user/263827', href: SITE.links.ctftime, icon: '🚩' },
    { label: 'GITHUB CODEBASE', value: 'bhaveshparmar07', href: SITE.links.github, icon: '⌨' },
    { label: 'LINKEDIN NETWORK', value: 'bhavesh-parmar-ray', href: SITE.links.linkedin, icon: '💼' },
    { label: 'TWITTER / X FEED', value: '@___bhavesh_07', href: SITE.links.twitter_x, icon: '𝕏' },
  ];

  return (
    <section
      id="contact"
      className="relative w-full flex flex-col justify-between items-center pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 z-10 border-t border-white/5"
      aria-label="Secure Transmission and Contact"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold">
              06 // ENCRYPTED TRANSMISSION CONSOLE
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            Initiate Direct Contact
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#94A3B8] max-w-lg mx-auto">
            Available for responsible vulnerability disclosure, malware triage, reverse engineering inquiries, and offensive security research collaboration.
          </p>
        </div>

        {/* Transmission Terminal Box */}
        <div className="w-full rounded-2xl border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl p-6 sm:p-8 font-mono text-xs shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden">
          {/* Terminal Status Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b border-white/10 text-[11px] text-[#94A3B8] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>CONSOLE_ID: NT-SEC-NODE // AHMEDABAD_GUJARAT_IN</span>
            </div>
            <span className="text-cyan-400 font-semibold">CIPHER: AES-256-GCM / TLS 1.3</span>
          </div>

          {/* Interactive Shell Prompt Header */}
          <div className="mb-6 p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-[#CBD5E1] flex items-center gap-2">
            <span className="text-violet-400 font-bold">ray@sec-node:~$</span>
            <span>initiate_transmission --secure --protocol=open</span>
            <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1 inline-block" />
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {contactLinks.map((link, idx) => {
              const isMail = link.href.startsWith('mailto');
              return (
                <a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={isMail ? handleCopyEmail : playClick}
                  className="group p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-cyan-400 group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <div>
                      <span className="text-[10px] text-[#94A3B8] block uppercase tracking-wider font-semibold">
                        {link.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#F1F5F9] group-hover:text-cyan-300 transition-colors truncate max-w-[150px] block">
                        {link.value}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#94A3B8] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-2 font-bold">
                    {isMail ? (copiedEmail ? '✓ COPIED' : 'COPY →') : 'CONNECT →'}
                  </span>
                </a>
              );
            })}
          </div>

          {/* PGP Block & Telemetry Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-[#94A3B8]">
            <button
              onClick={handleCopyPgp}
              onMouseEnter={playHover}
              className="flex items-center gap-2 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span className="text-cyan-400">🔑</span>
              <span>PGP: 4A8F C391 B902 77AE D412</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                {copiedPgp ? '✓ COPIED' : 'CLICK TO COPY'}
              </span>
            </button>
            <span className="text-emerald-400 font-bold">RESPONSE_SLA: &lt; 24 HOURS</span>
          </div>
        </div>
      </div>

      {/* Global Minimal Footer */}
      <footer className="w-full flex flex-col items-center gap-4 mt-20 pt-8 border-t border-white/10">
        {/* Animated Gradient Line */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <p className="text-[#94A3B8] font-mono text-xs sm:text-sm text-center max-w-md italic">
          "{ABOUT_PHILOSOPHY}"
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-[#94A3B8] uppercase tracking-widest">
          <span>© {currentYear} {SITE.handle}</span>
          <span>•</span>
          <span>{SITE.location}</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
