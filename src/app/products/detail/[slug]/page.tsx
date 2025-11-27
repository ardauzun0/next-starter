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

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com'}/products/detail/${slug}`;
  const seoData = await getSEOData(url);

  return {
    title: seoData.head.title,
    description: seoData.head.description,
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
    <div className="container mx-auto px-4 py-8">
      {productData.data.content && (
        <BlockRenderer blocks={productData.data.content} />
      )}
    </div>
  );
}

