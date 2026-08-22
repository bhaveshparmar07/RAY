import { Inter, JetBrains_Mono } from 'next/font/google';

/**
 * Display font — precise grotesque (Suisse / Neue Haas / Aeonik vibe).
 * Inter is the closest free match with optical sizing and variable weight.
 */
export const displayFont = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

/**
 * Monospace font — terminal text, metadata, coordinates, CVSS vectors.
 */
export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});
