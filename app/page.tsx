'use client';

import React, { useState } from 'react';
import Layer0VoidScanner from '@/components/layers/Layer0_VoidScanner';
import Layer1GhostProtocol from '@/components/layers/Layer1_GhostProtocol';
import Layer2_Watchmaker from '@/components/layers/Layer2_Watchmaker';
import Layer2_Arsenal from '@/components/layers/Layer2_Arsenal';
import Layer2_PublicationsCerts from '@/components/layers/Layer2_PublicationsCerts';
import Layer3_Cartographer from '@/components/layers/Layer3_Cartographer';
import Layer4DigitalAutopsy from '@/components/layers/Layer4_DigitalAutopsy';
import Layer5Contact from '@/components/layers/Layer5_Contact';
import ParticleNetwork from '@/components/three/ParticleNetwork';
import { CVEEntry } from '@/lib/types';

export default function Page() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [selectedCVE, setSelectedCVE] = useState<CVEEntry | null>(null);

  // State to manage whether the Watchmaker creed/about report is expanded
  const [isCreedOpen, setIsCreedOpen] = useState(false);

  const handleInspectBrokenGear = () => {
    setIsCreedOpen(true);
    // Smooth scroll down to the about section so they can see the creed open
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Layer 0 — Preloader */}
      {!preloaderDone && (
        <Layer0VoidScanner onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 3D Canvas Background Layer */}
      {preloaderDone && (
        <ParticleNetwork onInspectBrokenGear={handleInspectBrokenGear} />
      )}

      {/* Main Content Scroll Container */}
      <main id="main-content" className="relative z-10 w-full min-h-screen">
        {/* Layer 1 — Ghost Protocol (Hero & Telemetry HUD) */}
        <Layer1GhostProtocol />

        {/* Layer 2 — Watchmaker (Research Lab & Philosophy) */}
        <Layer2_Watchmaker
          onInspectBrokenGear={handleInspectBrokenGear}
          isCreedOpen={isCreedOpen}
          setIsCreedOpen={setIsCreedOpen}
        />

        {/* Layer 2.5 — Arsenal (Offensive & Defensive Tooling) */}
        <Layer2_Arsenal />

        {/* Layer 2.8 — Publications & Verified Credentials */}
        <Layer2_PublicationsCerts />

        {/* Layer 3 — Cartographer (Vulnerabilities Radar Map & Spotlight) */}
        <Layer3_Cartographer onSelectCVE={setSelectedCVE} />

        {/* Layer 5 — Encrypted Contact Terminal & Footer */}
        <Layer5Contact />
      </main>

      {/* Layer 4 — Digital Autopsy (CVE Details Modal) */}
      {selectedCVE && (
        <Layer4DigitalAutopsy
          cve={selectedCVE}
          onClose={() => setSelectedCVE(null)}
          onSelectCVE={setSelectedCVE}
        />
      )}
    </>
  );
}
