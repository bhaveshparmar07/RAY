'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_IDENTITY } from '@/src/content/site';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.manifesto-word');

      if (words && words.length > 0) {
        // Scrub words from dimmed to sharp bone, with glitch effect on "assumptions"
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            y: 10,
            filter: 'blur(3px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=120%',
              scrub: 0.8,
              pin: true,
            },
          }
        );
      }

      // Bio block fades and slides in alongside manifesto
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top+=20%',
              end: '+=90%',
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const manifestoHeadline = 'The world runs on assumptions. I test them.';
  const words = manifestoHeadline.split(' ');

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#07080A] flex flex-col justify-center px-6 sm:px-12 md:px-20 pt-24 pb-16 md:py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background Section Index Header */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 md:left-20 right-6 sm:right-12 md:right-20 flex justify-between items-center font-mono text-[11px] sm:text-xs text-[#9A9890] border-b border-white/10 pb-3 z-10">
        <span className="flex items-center gap-2">
          <span className="text-[#C8FF2E] font-bold">// 02</span>
          <span>MANIFESTO & OPERATIONAL CREED</span>
        </span>
        <span className="text-[#62605B] hidden sm:inline">PHILOSOPHY_STATION</span>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mt-6 sm:mt-0">
        {/* Left Column: Big Statement Scrubbed Word by Word */}
        <div ref={textRef} className="lg:col-span-8 space-y-6 sm:space-y-8 select-none">
          <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C8FF2E] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8FF2E] animate-pulse" />
            <span>CORE_TENET</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.08] text-[#ECE9E2]">
            {words.map((word, i) => {
              const isAssumptions = word.toLowerCase().includes('assumption');
              const isTest = word.toLowerCase().includes('test');

              return (
                <span
                  key={i}
                  className={`manifesto-word inline-block mr-[0.3em] ${
                    isAssumptions
                      ? 'text-[#6FE7FF] font-mono tracking-normal underline decoration-[#6FE7FF]/40 underline-offset-4 sm:underline-offset-8'
                      : isTest
                      ? 'text-[#C8FF2E] font-serif italic font-normal'
                      : ''
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>

          <div className="pt-2 font-mono text-xs sm:text-sm text-[#9A9890] flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="text-[#ECE9E2] font-bold">"{SITE_IDENTITY.heroQuote}"</span>
            <span className="text-[#62605B] hidden sm:inline">—</span>
            <span className="text-[#62605B] italic">{SITE_IDENTITY.subQuote}</span>
          </div>
        </div>

        {/* Right Column: Monospace Bio & Verification Creed */}
        <div
          ref={bioRef}
          className="lg:col-span-4 p-5 sm:p-8 rounded-xl bg-[#0E1015] border border-white/10 font-mono text-xs space-y-4 sm:space-y-6 shadow-2xl relative"
        >
          {/* Status Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-3 text-[#9A9890]">
            <span className="text-[#C8FF2E] font-bold">RESEARCHER_PROFILE</span>
            <span className="text-[10px]">VERIFIED_RESEARCH</span>
          </div>

          {/* Academic & Professional Bio */}
          <div className="space-y-3 sm:space-y-4 text-[#ECE9E2] leading-relaxed">
            <p className="text-xs sm:text-[13px] text-[#ECE9E2]">
              {SITE_IDENTITY.bio}
            </p>
          </div>

          {/* Core Tenets Checklist */}
          <div className="border-t border-white/10 pt-3 sm:pt-4 space-y-2 sm:space-y-2.5 text-[#9A9890] text-[10px] sm:text-[11px]">
            <div className="flex items-start gap-2">
              <span className="text-[#C8FF2E] font-bold">▸</span>
              <span>Empirical reverse engineering of undocumented protocols</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#6FE7FF] font-bold">▸</span>
              <span>Authorization bypass & logic flaw discovery</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#C8FF2E] font-bold">▸</span>
              <span>Volatile memory preservation & forensic artifact triage</span>
            </div>
          </div>

          {/* Verification Badge Footer */}
          <div className="pt-3 sm:pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-[#62605B]">
            <span>GUJARAT UNIVERSITY</span>
            <span className="text-[#C8FF2E] font-bold">AHMEDABAD, IN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
