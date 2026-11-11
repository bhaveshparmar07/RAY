'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/src/components/Preloader';
import Hero from '@/src/components/Hero';
import Manifesto from '@/src/components/Manifesto';

const ResearchDomains = dynamic(() => import('@/src/components/ResearchDomains'), { ssr: false });
const Arsenal = dynamic(() => import('@/src/components/Arsenal'), { ssr: false });
const CVEShowpiece = dynamic(() => import('@/src/components/CVEShowpiece'), { ssr: false });

export default function Page() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-[#07080A] text-[#ECE9E2]">
      {/* Section 0: Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Manifesto — Pinned word-by-word scrub */}
      <Manifesto />

      {/* Section 3: Research Domains — Horizontal scroll, generative visuals */}
      <ResearchDomains />

      {/* Section 4: Arsenal — Physics playground & equipment rig */}
      <Arsenal />

      {/* Section 5: Published CVE Showpiece — Logic Flaws & Exploit Chains */}
      <CVEShowpiece />
    </main>
  );
}
