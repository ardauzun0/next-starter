import type { Metadata } from 'next';
import Header from '@components/SiteHeader';
import Footer from '@components/SiteFooter';
import { getGlobalOptions } from '@/services/global';
import { locales, type Locale } from '@/i18n/request';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'Next.js 15 Headless WordPress',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const globalOptions = await getGlobalOptions();

  return (
    <>
      <Header globalOptions={globalOptions} locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <Footer globalOptions={globalOptions} locale={locale} />
    </>
  );
}

