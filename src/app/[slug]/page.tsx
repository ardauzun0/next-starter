import { getPageBySlug } from '@/services/page';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOPageUrl, getSEOBaseUrl } from '@/utils/url-helper';
import type { Metadata } from 'next';

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  if (!pageData.success) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }

  const baseUrl = getSEOBaseUrl();
  const fullUrl = getSEOPageUrl(slug);
  const seoData = await getSEOData(fullUrl);

  return constructMetadata(seoData, baseUrl);
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
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
