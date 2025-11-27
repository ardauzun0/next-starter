import { getProductBySlug } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOProductDetailUrl, getSEOBaseUrl } from '@/utils/url-helper';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  const baseUrl = getSEOBaseUrl(locale);
  const fullUrl = getSEOProductDetailUrl(slug);
  const seoData = await getSEOData(fullUrl);

  return constructMetadata(seoData, baseUrl);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    notFound();
  }

  const fullUrl = getSEOProductDetailUrl(slug);
  const seoData = await getSEOData(fullUrl);

  return (
    <>
      {seoData && <JsonLd data={seoData.head.jsonLd} />}

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {productData.data.content && (
            <BlockRenderer blocks={productData.data.content} />
          )}
        </div>
      </div>
    </>
  );
}

