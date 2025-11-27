import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getGlobalOptions } from '@/services/global';
import { locales, type Locale } from '@/i18n/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'Next.js 15 Headless WordPress',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const globalOptions = await getGlobalOptions();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#e5e5e5] flex flex-col min-h-screen`}
      >
        <Header globalOptions={globalOptions} locale={locale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer globalOptions={globalOptions} locale={locale} />
      </body>
    </html>
  );
}

