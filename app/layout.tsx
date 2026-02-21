import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VisionVault – Real-World Questing on Bitcoin Cash',
  description:
    'Community engagement is hard to verify. VisionVault is a real-world questing app where sponsors post bounties, and users earn instant CashToken NFTs and BCH by uploading verified photo proof.',
  openGraph: {
    title: 'VisionVault',
    description:
      'Sponsors post bounties. Users earn instant CashToken NFTs and BCH by uploading verified photo proof.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
