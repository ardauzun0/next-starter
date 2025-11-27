// Dynamic Catch-all Page (for Pages like "About Us", "Contact", etc.)
import { getPageBySlug } from '@/services/page';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/blocks/BlockRenderer';
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

  // Construct the correct URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const url = `${baseUrl}/${slug}`;

  // Wrap SEO data fetch in try/catch to handle 404 errors
  let seoData;
  try {
    seoData = await getSEOData(url);
  } catch (error) {
    // If SEO API fails, return default metadata
    console.warn(`SEO API failed for ${url}:`, error);
    return {
      title: 'Sayfa',
      description: '',
    };
  }

  return {
    title: seoData.head.title || 'Sayfa',
    description: seoData.head.description || '',
    openGraph: seoData.head.openGraph,
    alternates: {
      canonical: seoData.head.alternates?.canonical,
    },
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  if (!pageData.success) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {pageData.data.content && (
          <BlockRenderer blocks={pageData.data.content} />
        )}
      </div>
    </div>
  );
}
