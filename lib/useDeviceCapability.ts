import { useEffect, useState } from 'react';
import { DEVICE } from '@/lib/constants';

interface DeviceCapability {
  isLowEnd: boolean;
  isTouchDevice: boolean;
  particleCount: number;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isLowEnd: false,
    isTouchDevice: false,
    particleCount: 0, // Default to safe value for SSR
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lowEndCores = DEVICE?.lowEndCores ?? 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowEnd = hardwareConcurrency <= lowEndCores;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    let particleCount: number = DEVICE?.particlesHigh ?? 100;
    if (isLowEnd) {
      particleCount = 0;
    } else if (hardwareConcurrency < 8) {
      particleCount = DEVICE?.particlesMid ?? 50;
    }

    setCapability({
      isLowEnd,
      isTouchDevice,
      particleCount,
    });
  }, []);

  return capability;
}
