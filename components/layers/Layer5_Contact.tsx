'use client';

import React, { useState } from 'react';
import { SITE } from '@/lib/site';
import { ABOUT_PHILOSOPHY } from '@/content/about';
import { useSound } from '@/lib/useSound';

export default function Layer5_Contact() {
  const { playHover, playClick } = useSound();
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    const rawEmail = SITE.links.email.replace('mailto:', '');
    navigator.clipboard.writeText(rawEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      className="relative w-full bg-[#050505] flex flex-col justify-between items-center py-20 px-6 md:px-12 z-10 border-t border-white/10"
      aria-label="Secure Transmission and Contact"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-5xl space-y-10">
        {/* Terminal Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold">
              LAYER_05 // DIRECT_COMMUNICATION_CHANNELS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-bone">
            Initiate Direct Contact
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#888888] max-w-lg mx-auto">
            Available for responsible vulnerability disclosure, malware triage, reverse engineering inquiries, and security collaboration.
          </p>
        </div>

        {/* Transmission Console Box */}
        <div className="w-full rounded-sm border border-white/15 bg-[#0A0B0D] p-6 sm:p-8 font-mono text-xs shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b border-white/10 text-[11px] text-[#666666] gap-2">
            <span>CONSOLE_ID: NT-SEC-NODE // AHMEDABAD_GUJARAT_IN</span>
            <span className="text-[#8A5CF6]">CIPHER: AES-256-GCM / TLS 1.3</span>
          </div>

          {/* Contact Channels Grid (3 cols on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {contactLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={link.href.startsWith('mailto') ? handleCopyEmail : playClick}
                className="group p-4 rounded-sm border border-white/10 hover:border-[#8A5CF6]/50 bg-black/40 hover:bg-white/5 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base text-[#8A5CF6] group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <div>
                    <span className="text-[10px] text-[#666666] block uppercase tracking-wider">
                      {link.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-bone group-hover:text-white transition-colors truncate max-w-[150px] block">
                      {link.value}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-[#888888] group-hover:text-[#8A5CF6] group-hover:translate-x-1 transition-all shrink-0 ml-2">
                  {link.href.startsWith('mailto') ? (copied ? '✓ COPIED' : 'COPY →') : 'CONNECT →'}
                </span>
              </a>
            ))}
          </div>

          {/* Telemetry Status Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-[#555555]">
            <span>PGP_FINGERPRINT: 4A8F C391 B902 77AE D412</span>
            <span className="text-emerald-400 font-bold">RESPONSE_TIME: &lt; 24 HOURS</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center gap-3 mt-16 pt-8 border-t border-white/10">
        <p className="text-[#AAAAAA] font-mono text-xs text-center max-w-lg italic">
          "{ABOUT_PHILOSOPHY}"
        </p>
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#555555] uppercase tracking-widest">
          <span>© {currentYear} {SITE.handle}</span>
          <span>•</span>
          <span>AHMEDABAD, GUJARAT, INDIA</span>
        </div>
      </footer>
    </section>
  );
}
