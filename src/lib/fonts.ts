import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google';

/**
 * Editorial Serif — Instrument Serif italic for high-fashion typographic contrast.
 */
export const serifFont = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

/**
 * Editorial Grotesk — tight, confident display and structural typography.
 */
export const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Monospace — Raw hex dumps, ASM mnemonics, disassembly, and telemetry.
 */
export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});
