import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'Next.js 15 Headless WordPress',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
