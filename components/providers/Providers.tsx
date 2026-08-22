'use client';

import { ReducedMotionProvider } from '@/components/providers/ReducedMotionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { AudioProvider } from '@/components/providers/AudioProvider';
import SkipLink from '@/components/shared/SkipLink';
import NavFallback from '@/components/ui/NavFallback';
import RevealLight from '@/components/cursor/RevealLight';
import FilmGrain from '@/components/effects/FilmGrain';
import Scanlines from '@/components/effects/Scanlines';
import MuteToggle from '@/components/ui/MuteToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <ThemeProvider>
        <AudioProvider>
          <CursorProvider>
            <SmoothScrollProvider>
              <SkipLink />
              <NavFallback />
              <RevealLight />
              <FilmGrain />
              <Scanlines />
              <MuteToggle />
              <ThemeToggle />
              {children}
            </SmoothScrollProvider>
          </CursorProvider>
        </AudioProvider>
      </ThemeProvider>
    </ReducedMotionProvider>
  );
}
