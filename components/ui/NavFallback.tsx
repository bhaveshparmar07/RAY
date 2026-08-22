'use client';

import React, { useState, useEffect } from 'react';

export default function NavFallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const links = [
    { href: '#hero', label: '00 // INDEX' },
    { href: '#about', label: '01 // ABOUT' },
    { href: '#findings', label: '02 // FINDINGS' },
    { href: '#contact', label: '03 // CONTACT' },
  ];

  return (
    <>
      {/* Mobile Toggle Button - visually hidden on desktop unless focused */}
      <button
        className="fixed top-6 right-6 z-[56] p-3 text-white/70 hover:text-white bg-[#0A0B0D]/80 backdrop-blur border border-white/10 rounded-sm md:sr-only focus:not-sr-only focus:outline-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className="font-mono text-xl leading-none">
          {isOpen ? '×' : '☰'}
        </span>
      </button>

      {/* Navigation Menu */}
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className={`
          fixed inset-y-0 right-0 z-[55] w-full md:w-auto bg-[#0A0B0D]/95 backdrop-blur-md border-l border-white/5 
          transition-transform duration-300 ease-in-out flex flex-col justify-center px-12
          ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          ${!isFocused && !isOpen ? 'md:opacity-0 md:pointer-events-none md:-translate-y-full' : 'md:opacity-100 md:pointer-events-auto md:translate-y-0'}
          md:inset-auto md:top-0 md:left-0 md:right-0 md:w-full md:h-20 md:flex-row md:items-center md:justify-center md:gap-8 md:px-6 md:border-l-0 md:border-b
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsFocused(false);
          }
        }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {links.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="font-mono text-[#CCCCCC] hover:text-white text-lg md:text-sm tracking-widest transition-colors focus:outline-white focus:outline-offset-4"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[54] bg-black/60 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
