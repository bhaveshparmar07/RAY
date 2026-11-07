'use client';

import React, { useState } from 'react';
import Preloader from '@/src/components/Preloader';
import Hero from '@/src/components/Hero';

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
    </main>
  );
}
