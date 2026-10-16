import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

import { pages } from '../components/types';
import CustomCursor from '../components/ui/CustomCursor';
import SmoothScroll from '../components/ui/SmoothScroll';

export const metadata: Metadata = {
  title: pages.home?.metadata?.title || 'Valmere - Luxury Resort & Retreat',
  description: pages.home?.metadata?.description || 'Where Every Stay Feels Exceptional. Award-winning luxury resort in the paradise island.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans bg-[#fcfaf7] text-[#222923]">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
