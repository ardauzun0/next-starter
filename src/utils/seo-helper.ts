import type { Metadata } from 'next';
import type { SEOData } from '@/types/api';

/**
 * Constructs absolute URL from relative URL
 */
function getAbsoluteUrl(url: string | undefined, baseUrl: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

/**
 * Transforms SEOData from API into Next.js Metadata object
 * @param seoData - SEO data from API
 * @param baseUrl - Base URL of the site (for absolute URLs)
 * @returns Next.js Metadata object
 */
export function constructMetadata(
  seoData: SEOData | null,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
): Metadata {
  // If SEO data is null or invalid, return default metadata
  if (!seoData || !seoData.success || !seoData.head) {
    return {
      title: 'Sayfa',
      description: '',
    };
  }

  const { head } = seoData;

  // Prepare OpenGraph images (ensure absolute URLs)
  const openGraphImages = head.openGraph?.images?.map((image) => ({
    url: getAbsoluteUrl(image, baseUrl) || image,
    alt: head.openGraph?.title || head.title,
  })) || [];

  // Construct OpenGraph object
  const openGraph: Metadata['openGraph'] = head.openGraph
    ? {
        title: head.openGraph.title || head.title,
        description: head.openGraph.description || head.description,
        url: getAbsoluteUrl(head.openGraph.url, baseUrl) || head.openGraph.url,
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Site',
        images: openGraphImages.length > 0 ? openGraphImages : undefined,
        type: (head.openGraph.type as Metadata['openGraph']['type']) || 'website',
        locale: head.openGraph.locale || 'tr_TR',
      }
    : undefined;

  // Construct Twitter card from OpenGraph data (fallback)
  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: head.openGraph?.title || head.title,
    description: head.openGraph?.description || head.description,
    images:
      head.openGraph?.images && head.openGraph.images.length > 0
        ? [getAbsoluteUrl(head.openGraph.images[0], baseUrl) || head.openGraph.images[0]]
        : undefined,
  };

  // Construct metadata object
  const metadata: Metadata = {
    title: head.title || 'Sayfa',
    description: head.description || '',
    alternates: head.alternates?.canonical
      ? {
          canonical: getAbsoluteUrl(head.alternates.canonical, baseUrl) || head.alternates.canonical,
        }
      : undefined,
    openGraph,
    twitter,
  };

  return metadata;
}

