'use client';

import { useAudio } from '@/components/providers/AudioProvider';

/**
 * A custom hook to easily trigger synthesized sounds from components.
 */
export function useSound() {
  const { playSonarPing, playUiBlip, playHeartbeat, isMuted, toggleMute } = useAudio();

  const playHover = () => {
    // Light high-frequency blip for hovers
    playUiBlip(1500, 'triangle');
  };

  const playClick = () => {
    // Click tone
    playUiBlip(800, 'sine');
  };

  const playSystemError = () => {
    // Low, rough tone for failures or critical elements
    playUiBlip(150, 'sawtooth');
  };

  return {
    playSonar: playSonarPing,
    playBeats: playHeartbeat,
    playHover,
    playClick,
    playSystemError,
    isMuted,
    toggleMute,
  };
}
