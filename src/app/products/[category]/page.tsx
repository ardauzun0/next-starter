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

  // Construct the correct URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const url = `${baseUrl}/products/${category}`;

  // Wrap SEO data fetch in try/catch to handle 404 errors
  let seoData;
  try {
    seoData = await getSEOData(url);
  } catch (error) {
    // If SEO API fails, use category data as fallback
    console.warn(`SEO API failed for ${url}:`, error);
    return {
      title: categoryData.data.name,
      description: categoryData.data.description || '',
    };
  }

  return {
    title: seoData.head.title || categoryData.data.name,
    description: seoData.head.description || categoryData.data.description || '',
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
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-5xl font-bold mb-8 text-[#e5e5e5]">
          {categoryData.data.name}
        </h1>

        {categoryData.data.description && (
          <div
            className="prose prose-lg max-w-none prose-invert prose-headings:text-[#e5e5e5] prose-p:text-[#d4d4d4] prose-a:text-[#60a5fa] prose-a:hover:text-[#93c5fd] mb-12"
            dangerouslySetInnerHTML={{ __html: categoryData.data.description }}
          />
        )}

        {categoryData.data.content && (
          <BlockRenderer blocks={categoryData.data.content} />
        )}
      </div>
    </div>
  );
}
