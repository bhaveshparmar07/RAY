import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

/**
 * Display heading font — bold geometric sans with character.
 * Used for hero "RAY" text, section headings, and display numbers.
 */
export const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/**
 * Body font — clean modern sans for paragraphs and UI text.
 */
export const displayFont = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

/**
 * Monospace font — terminal text, metadata, CVSS vectors, labels.
 */
export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});
