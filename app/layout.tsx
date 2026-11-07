import { Metadata } from 'next';
import { headingFont, displayFont, monoFont } from '@/lib/fonts';
import { SITE } from '@/lib/site';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ray-sec.vercel.app'),
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, images: [SITE.ogImage] },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  colorScheme: 'dark light',
  themeColor: '#05060A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[#05060A] text-[#F1F5F9] selection:bg-[#8B5CF6]/30 selection:text-[#F1F5F9]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
