import { Metadata } from 'next';
import { serifFont, sansFont, monoFont } from '@/src/lib/fonts';
import { SITE_IDENTITY } from '@/src/content/site';
import { RayCursorProvider } from '@/src/hooks/useRayCursor';
import './globals.css';

export const metadata: Metadata = {
  title: `${SITE_IDENTITY.handle} (${SITE_IDENTITY.realName}) // ${SITE_IDENTITY.role}`,
  description: SITE_IDENTITY.bio,
  openGraph: {
    title: `${SITE_IDENTITY.handle} // Security Researcher`,
    description: SITE_IDENTITY.tagline,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#07080A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <body className="antialiased bg-[#07080A] text-[#ECE9E2] overflow-x-hidden">
        <RayCursorProvider>
          {/* Subtle Grain Overlay */}
          <div className="xor-grain" aria-hidden="true" />
          {children}
        </RayCursorProvider>
      </body>
    </html>
  );
}
