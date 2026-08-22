'use client';

import React from 'react';

export function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className="fixed top-0 left-0 z-[100] -translate-y-full focus:translate-y-0 bg-[#8A2BE2] text-white px-4 py-2 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-200"
    >
      Skip to main content
    </a>
  );
}

export default SkipLink;
