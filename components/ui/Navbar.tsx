'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAudio } from '@/components/providers/AudioProvider';
import { useSound } from '@/lib/useSound';
import { useReducedMotion } from '@/components/providers/ReducedMotionProvider';

const NAV_LINKS = [
  { href: '#hero', label: 'INDEX', code: '00' },
  { href: '#about', label: 'RESEARCH', code: '01' },
  { href: '#domains', label: 'DOMAINS', code: '02' },
  { href: '#arsenal', label: 'TOOLKIT', code: '03' },
  { href: '#credentials', label: 'OUTPUT', code: '04' },
  { href: '#findings', label: 'CVE RADAR', code: '05' },
  { href: '#contact', label: 'CONTACT', code: '06' },
];

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLightTheme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useAudio();
  const { playHover, playClick } = useSound();
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section
      const sectionIds = ['hero', 'about', 'domains', 'arsenal', 'credentials', 'findings', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Glass Pill Navbar */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-[#0A0D14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] light-theme:bg-white/80 light-theme:border-black/10 light-theme:shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-w-5xl w-full transition-all duration-300"
          aria-label="Primary navigation"
        >
          {/* Logo / Moniker */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            onMouseEnter={playHover}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <div className="w-full h-full rounded-full bg-[#05060A] light-theme:bg-white flex items-center justify-center">
                <span className="font-heading font-bold text-xs tracking-tighter text-cyan-400 group-hover:scale-110 transition-transform">
                  R
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xs sm:text-sm tracking-widest text-[#F1F5F9] light-theme:text-slate-900 leading-none">
                RAY
              </span>
              <span className="font-mono text-[9px] text-cyan-400 font-medium tracking-tight">
                SEC_LAB
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-mono text-[11px] tracking-wider text-[#94A3B8] light-theme:text-slate-600">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={playHover}
                  className={`relative px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#F1F5F9] light-theme:text-slate-900 font-bold bg-white/10 light-theme:bg-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                      : 'hover:text-[#F1F5F9] light-theme:hover:text-slate-900 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                playClick();
                toggleMute();
              }}
              onMouseEnter={playHover}
              title={isMuted ? 'Audio Muted' : 'Audio Active'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-cyan-400 font-mono text-[10px] transition-all cursor-pointer"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isMuted ? 'bg-slate-600' : 'bg-cyan-400 animate-pulse'
                }`}
              />
              <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'AUDIO'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              title={isLightTheme ? 'Switch to Cyber-Noir' : 'Switch to Blueprint'}
              aria-label="Toggle Theme"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 hover:border-violet-400/40 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-violet-400 font-mono text-[10px] transition-all cursor-pointer"
            >
              <span>{isLightTheme ? '☀️ LIGHT' : '🌙 NOIR'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-[#F1F5F9] font-mono text-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex flex-col justify-center items-center bg-[#05060A]/95 backdrop-blur-2xl p-6">
          <div className="w-full max-w-xs space-y-3 font-mono">
            <div className="text-[10px] tracking-widest text-cyan-400 font-bold mb-4 border-b border-white/10 pb-2">
              NAVIGATION // SECTORS
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-[#F1F5F9] hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
              >
                <span>{link.label}</span>
                <span className="text-xs text-cyan-400 font-bold">{link.code}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
