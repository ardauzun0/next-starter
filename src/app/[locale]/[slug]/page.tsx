import { getPageBySlug } from '@/services/page';
import { getSEOData } from '@/services/global';
import { notFound, redirect } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOPageUrl, getSEOBaseUrl } from '@/utils/url-helper';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import type { PageTranslations, PageContent } from '@/types/api';

// SSR - render on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface DynamicPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

const RESERVED_PATHS = ['products', 'urunler', 'usage', 'kullanim-alanlari', 'contact', 'iletisim', 'blog', 'api'];

const getLocalizedSlug = (
  locale: Locale,
  fallbackSlug: string,
  translations?: PageTranslations,
): string => translations?.[locale]?.slug ?? fallbackSlug;

const extractBlocks = (content?: PageContent) => {
  if (!content) {
    return [];
  }
  if (Array.isArray(content)) {
    return content;
  }
  if (content.content && Array.isArray(content.content)) {
    return content.content;
  }
  return [];
};

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  if (RESERVED_PATHS.includes(slug)) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }
  
  try {
    const pageData = await getPageBySlug(slug);

    if (!pageData.success) {
      return {
        title: 'Sayfa Bulunamadı',
      };
    }

    const baseUrl = getSEOBaseUrl(locale);
    const localizedSlug = getLocalizedSlug(locale, slug, pageData.data.translations);
    const fullUrl = getSEOPageUrl(localizedSlug);
    const seoData = await getSEOData(fullUrl);

    return constructMetadata(seoData, baseUrl);
  } catch {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { locale, slug } = await params;
  
  // Eğer slug bir reserved path ise, 404 döndür
  if (RESERVED_PATHS.includes(slug)) {
    notFound();
  }
  
  const pageData = await getPageBySlug(slug);

  if (!pageData.success) {
    notFound();
  }

  const localizedSlug = getLocalizedSlug(locale, slug, pageData.data.translations);

  if (localizedSlug !== slug) {
    redirect(`/${locale}/${localizedSlug}`);
  }

  const blocks = extractBlocks(pageData.data.content);
  const fullUrl = getSEOPageUrl(localizedSlug);
  const seoData = await getSEOData(fullUrl);

  return (
    <>
      {seoData && <JsonLd data={seoData.head.jsonLd} />}

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {blocks.length > 0 && (
            <BlockRenderer blocks={blocks} />
          )}
        </div>
      </div>
    </>
  );
}
