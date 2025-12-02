import { getProductBySlug } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@components/Blocks/Block';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOProductDetailUrl, getSEOBaseUrl } from '@/utils/url-helper';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/request';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
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
  } catch {
    return {
      title: 'Ürün Bulunamadı',
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  
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
