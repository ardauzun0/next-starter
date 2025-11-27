// Product Category Page
import { getProductCategory } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import type { Metadata } from 'next';

interface ProductCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: ProductCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getProductCategory(category);

  if (!categoryData.success) {
    return {
      title: 'Kategori Bulunamadı',
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com'}/products/${category}`;
  const seoData = await getSEOData(url);

  return {
    title: seoData.head.title || categoryData.data.name,
    description: seoData.head.description || categoryData.data.description,
    openGraph: seoData.head.openGraph,
    alternates: {
      canonical: seoData.head.alternates?.canonical,
    },
  };
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { category } = await params;
  const categoryData = await getProductCategory(category);

  if (!categoryData.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{categoryData.data.name}</h1>

      {categoryData.data.description && (
        <div
          className="prose mb-8"
          dangerouslySetInnerHTML={{ __html: categoryData.data.description }}
        />
      )}

      {categoryData.data.content && (
        <BlockRenderer blocks={categoryData.data.content} />
      )}
    </div>
  );
}

