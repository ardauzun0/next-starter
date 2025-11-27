import type { Metadata } from 'next';
import { getTranslations } from '@/i18n/getTranslations';
import type { Locale } from '@/i18n/config';

interface UsageLayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: UsageLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as Locale;
  const t = getTranslations(locale);
  
  return {
    title: t.usage.title,
    description: t.usage.title,
  };
}

export default async function UsageLayout({ children }: UsageLayoutProps) {
  return <>{children}</>;
}
