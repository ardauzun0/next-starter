import { getPageBySlug } from '@/services/page';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOPageUrl, getSEOBaseUrl } from '@/utils/url-helper';
import { reverseTranslatePath } from '@/i18n/url-mapping';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

interface DynamicPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

const RESERVED_PATHS = ['products', 'urunler', 'usage', 'kullanim-alanlari', 'contact', 'iletisim', 'blog', 'api'];

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
    const fullUrl = getSEOPageUrl(slug);
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
  
  // Önce çevrilmiş path'i kontrol et
  const originalPath = reverseTranslatePath(`/${slug}`);
  const pathSegments = originalPath.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || slug;
  
  // Eğer slug bir reserved path ise veya çevrilmiş path bir reserved path'e dönüşüyorsa, 404 döndür
  if (RESERVED_PATHS.includes(slug) || RESERVED_PATHS.includes(firstSegment)) {
    notFound();
  }
  
  // Eğer çevrilmiş path farklı bir path'e dönüşüyorsa (örn: /urunler -> /products), bu bir reserved path'tir
  if (originalPath !== `/${slug}` && pathSegments.length > 0) {
    const translatedFirstSegment = pathSegments[0];
    if (RESERVED_PATHS.includes(translatedFirstSegment)) {
      notFound();
    }
  }
  
  const pageData = await getPageBySlug(slug);

  if (!pageData.success) {
    notFound();
  }

  const fullUrl = getSEOPageUrl(slug);
  const seoData = await getSEOData(fullUrl);

  return (
    <>
      {seoData && <JsonLd data={seoData.head.jsonLd} />}

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {pageData.data.content && (
            <BlockRenderer blocks={pageData.data.content} />
          )}
        </div>
      </div>
    </>
  );
}
