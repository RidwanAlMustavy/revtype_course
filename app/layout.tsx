import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#171D19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Earn Academy',
  description:
    'Master earning through an organized, sequential video learning course. Learn how micro tasks, tools, courses, and wallet withdrawals operate.',
  keywords: [
    'Earn',
    'Earn Academy',
    'Earn Course',
    'Micro Tasks',
    'Video Tutorial',
    'Learn to Earn',
  ],
  authors: [{ name: 'Earn Team' }],
  openGraph: {
    title: 'Earn Academy',
    description:
      'Learn how to navigate micro tasks, courses, and platform features safely.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Earn Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earn Academy',
    description:
      'Learn how to navigate micro tasks, courses, and platform features safely.',
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
