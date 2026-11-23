import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#171D19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'RevType Academy',
  description:
    'Master RevType through an organized, sequential video learning course. Learn how micro tasks, the digital marketplace, courses, and wallet withdrawals operate.',
  keywords: [
    'RevType',
    'RevType Academy',
    'RevType Course',
    'Micro Tasks',
    'Digital Marketplace',
    'Video Tutorial',
    'Learn RevType',
  ],
  authors: [{ name: 'RevType Team' }],
  openGraph: {
    title: 'RevType Academy',
    description:
      'Learn how to navigate micro tasks, digital marketplaces, courses, and platform features safely on revtype.com.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RevType Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RevType Academy',
    description:
      'Learn how to navigate micro tasks, digital marketplaces, courses, and platform features safely on revtype.com.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="bg-dark-bg text-text-primary antialiased selection:bg-green-vivid selection:text-dark-deep">
        {/* Accessibility: Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 rounded-lg bg-green-vivid text-dark-deep font-bold shadow-glow-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
