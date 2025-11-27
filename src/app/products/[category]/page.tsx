// Product Category Page
import { getProductCategory } from '@/services/product';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getProductCategoryUrl, getBaseUrl } from '@/utils/url-helper';
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

  // Construct the full URL
  const baseUrl = getBaseUrl();
  const fullUrl = getProductCategoryUrl(category);

  // Fetch SEO data
  const seoData = await getSEOData(fullUrl);

  // If SEO data is not available, use category data as fallback
  if (!seoData) {
    return {
      title: categoryData.data.name,
      description: categoryData.data.description || '',
    };
  }

  // Construct and return metadata
  return constructMetadata(seoData, baseUrl);
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { category } = await params;
  const categoryData = await getProductCategory(category);

  if (!categoryData.success) {
    notFound();
  }

  // Construct the full URL for JSON-LD
  const fullUrl = getProductCategoryUrl(category);

  // Fetch SEO data (Next.js will memoize this request)
  const seoData = await getSEOData(fullUrl);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {seoData && <JsonLd data={seoData.head.jsonLd} />}

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <h1 className="text-5xl font-bold mb-8 text-foreground">
            {categoryData.data.name}
          </h1>

          {categoryData.data.description && (
            <div
              className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80 mb-12"
              dangerouslySetInnerHTML={{ __html: categoryData.data.description }}
            />
          )}

          {categoryData.data.content && (
            <BlockRenderer blocks={categoryData.data.content} />
          )}
        </div>
      </div>
    </>
  );
}
