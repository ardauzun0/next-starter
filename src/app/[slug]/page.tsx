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

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com'}/${slug}`;
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

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  if (!pageData.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {pageData.data.content && (
        <BlockRenderer blocks={pageData.data.content} />
      )}
    </div>
  );
}

