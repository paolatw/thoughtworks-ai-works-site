import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Card Showcase',
  description: 'Visual reference for all card components',
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: 'auto', overflow: 'auto' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ height: 'auto', overflow: 'auto' }}>{children}</body>
    </html>
  );
}
