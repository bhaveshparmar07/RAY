import { Metadata } from 'next';
import { displayFont, monoFont } from '@/lib/fonts';
import { SITE } from '@/lib/site';
import Providers from '@/components/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  openGraph: { title: SITE.title, description: SITE.description, images: [SITE.ogImage] },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  colorScheme: 'light dark',
  themeColor: '#F7F5EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light-theme ${displayFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[#F7F5EE] text-[#111318]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
