'use client';

import { ReducedMotionProvider } from '@/components/providers/ReducedMotionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CursorProvider } from '@/components/providers/CursorProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { AudioProvider } from '@/components/providers/AudioProvider';
import SkipLink from '@/components/shared/SkipLink';
import Navbar from '@/components/ui/Navbar';
import RevealLight from '@/components/cursor/RevealLight';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <ThemeProvider>
        <AudioProvider>
          <CursorProvider>
            <SmoothScrollProvider>
              <SkipLink />
              <Navbar />
              <RevealLight />
              {children}
            </SmoothScrollProvider>
          </CursorProvider>
        </AudioProvider>
      </ThemeProvider>
    </ReducedMotionProvider>
  );
}
