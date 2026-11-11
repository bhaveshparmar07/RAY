'use client';

import React, { useState } from 'react';
import { SITE_IDENTITY } from '@/src/content/site';

export default function ContactTerminal() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_IDENTITY.links.rawEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(SITE_IDENTITY.pgp.fingerprint);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2500);
  };

  return (
    <footer id="contact" className="relative w-full bg-[#07080A] pt-24 pb-12 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute left-0 bottom-12 font-sans text-[22vw] font-black text-white/[0.012] leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        TRANSMIT
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs text-[#9A9890] flex items-center gap-2 mb-3">
              <span className="text-[#C8FF2E] font-bold">// 07</span>
              <span>SECURE DISCLOSURE & TRANSMISSION</span>
              <span className="text-[#62605B]">|</span>
              <span>PGP_VERIFIED</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-6xl font-black text-[#ECE9E2] tracking-tighter">
              Initiate <span className="font-serif italic font-normal text-[#C8FF2E]">Transmission</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#9A9890] max-w-xl mt-3">
              Direct communication for coordinated vulnerability disclosure, academic research inquiries, or threat intelligence collaborations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 bg-[#C8FF2E] text-[#07080A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(200,255,46,0.3)] cursor-pointer flex items-center gap-2"
            >
              <span>{copiedEmail ? '✓ COPIED_TO_CLIPBOARD' : 'COPY_DIRECT_EMAIL'}</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Dual Command Bento: PGP Key Block + Secure Channel Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Cryptographic Verification Console */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-xs text-[#9A9890]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8FF2E] animate-pulse" />
                  <span className="text-[#ECE9E2] font-bold">PGP_FINGERPRINT</span>
                </span>
                <span className="text-[10px] text-[#6FE7FF]">ED25519 // RSA_4096</span>
              </div>

              <div className="p-4 rounded bg-black/60 border border-white/10 font-mono text-xs sm:text-sm text-[#ECE9E2] tracking-wider break-all select-all">
                {SITE_IDENTITY.pgp.fingerprint}
              </div>

              <p className="font-mono text-xs text-[#9A9890] leading-relaxed">
                Send encrypted security advisories, memory crash dumps, or zero-day PoCs. Always verify signatures against the master fingerprint above.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono">
              <button
                onClick={handleCopyPgp}
                className="text-[#C8FF2E] hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <span>{copiedPgp ? '✓ COPIED FINGERPRINT' : 'COPY FINGERPRINT'}</span>
              </button>
              <span className="text-[#62605B]">{SITE_IDENTITY.geoCoordinates.lat}, {SITE_IDENTITY.geoCoordinates.lng}</span>
            </div>
          </div>

          {/* Right: Direct Platform Access Matrix */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 space-y-4 flex flex-col justify-between shadow-2xl">
            <div className="border-b border-white/10 pb-3 font-mono text-xs text-[#9A9890] flex justify-between items-center">
              <span className="text-[#C8FF2E] font-bold">VERIFIED_PLATFORMS</span>
              <span className="text-[10px]">DIRECT_ROUTING</span>
            </div>

            <div className="space-y-2.5">
              <a
                href={SITE_IDENTITY.links.hackerone}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#C8FF2E]/40 hover:bg-white/[0.04] transition-all flex justify-between items-center font-mono text-xs text-[#ECE9E2]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#C8FF2E]">▸</span>
                  <span>HackerOne</span>
                </div>
                <span className="text-[#9A9890] text-[11px]">@{SITE_IDENTITY.links.hackeroneUser} ↗</span>
              </a>

              <a
                href={SITE_IDENTITY.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#6FE7FF]/40 hover:bg-white/[0.04] transition-all flex justify-between items-center font-mono text-xs text-[#ECE9E2]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#6FE7FF]">▸</span>
                  <span>GitHub</span>
                </div>
                <span className="text-[#9A9890] text-[11px]">@{SITE_IDENTITY.links.githubUser} ↗</span>
              </a>

              <a
                href={SITE_IDENTITY.links.ctftime}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#C8FF2E]/40 hover:bg-white/[0.04] transition-all flex justify-between items-center font-mono text-xs text-[#ECE9E2]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#C8FF2E]">▸</span>
                  <span>CTFtime</span>
                </div>
                <span className="text-[#9A9890] text-[11px]">{SITE_IDENTITY.links.ctftimeUser} ↗</span>
              </a>

              <a
                href={SITE_IDENTITY.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#6FE7FF]/40 hover:bg-white/[0.04] transition-all flex justify-between items-center font-mono text-xs text-[#ECE9E2]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#6FE7FF]">▸</span>
                  <span>LinkedIn</span>
                </div>
                <span className="text-[#9A9890] text-[11px]">@{SITE_IDENTITY.links.linkedinUser} ↗</span>
              </a>

              <a
                href={SITE_IDENTITY.links.twitter_x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-white/30 hover:bg-white/[0.04] transition-all flex justify-between items-center font-mono text-xs text-[#ECE9E2]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[#ECE9E2]">▸</span>
                  <span>Twitter / X</span>
                </div>
                <span className="text-[#9A9890] text-[11px]">{SITE_IDENTITY.links.twitterUser} ↗</span>
              </a>
            </div>

            <div className="border-t border-white/10 pt-3 text-[10px] font-mono text-[#62605B] flex justify-between">
              <span>STATUS: ROUTED</span>
              <span className="text-[#C8FF2E] font-bold">STATION_ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bottom Colophon / Copyright Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#62605B]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#ECE9E2]">{SITE_IDENTITY.handle}</span>
            <span>//</span>
            <span>{SITE_IDENTITY.realName}</span>
            <span>© 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>{SITE_IDENTITY.location}</span>
            <span className="text-white/10">|</span>
            <a href="#hero" className="text-[#C8FF2E] hover:underline">
              RETURN_TO_TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
