// Product Detail Page
import { getProductBySlug } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getProductDetailUrl, getBaseUrl } from '@/utils/url-helper';
import type { Metadata } from 'next';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  // Construct the full URL
  const baseUrl = getBaseUrl();
  const fullUrl = getProductDetailUrl(slug);

  // Fetch SEO data
  const seoData = await getSEOData(fullUrl);

  // Construct and return metadata
  return constructMetadata(seoData, baseUrl);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    notFound();
  }

  // Construct the full URL for JSON-LD
  const fullUrl = getProductDetailUrl(slug);

  // Fetch SEO data (Next.js will memoize this request)
  const seoData = await getSEOData(fullUrl);

  return (
    <>
      {/* JSON-LD Structured Data */}
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
