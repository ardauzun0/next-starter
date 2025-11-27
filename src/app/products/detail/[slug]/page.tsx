// Product Detail Page
import { getProductBySlug } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
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

  // Construct the correct URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const url = `${baseUrl}/products/detail/${slug}`;

  // Wrap SEO data fetch in try/catch to handle 404 errors
  let seoData;
  try {
    seoData = await getSEOData(url);
  } catch (error) {
    // If SEO API fails, return default metadata
    console.warn(`SEO API failed for ${url}:`, error);
    return {
      title: 'Ürün',
      description: '',
    };
  }

  return {
    title: seoData.head.title || 'Ürün',
    description: seoData.head.description || '',
    openGraph: seoData.head.openGraph,
    alternates: {
      canonical: seoData.head.alternates?.canonical,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {productData.data.content && (
          <BlockRenderer blocks={productData.data.content} />
        )}
      </div>
    </div>
  );
}
