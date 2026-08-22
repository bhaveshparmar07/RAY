'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Fallback = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(138,92,246,0.1)_0%,transparent_70%)]" />
);

const Network = dynamic(() => import('./Network').then(mod => mod.Network), {
  ssr: false,
  loading: () => <Fallback />
});

interface ParticleNetworkProps {
  onInspectBrokenGear?: () => void;
}

export default function ParticleNetwork({ onInspectBrokenGear }: ParticleNetworkProps) {
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    if ('ontouchstart' in window || navigator.hardwareConcurrency <= 4) {
      setIsLowEnd(true);
    }
  }, []);

  if (isLowEnd) {
    return <Fallback />;
  }

  return <Network onInspectBrokenGear={onInspectBrokenGear} />;
}
