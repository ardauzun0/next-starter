const PRODUCTION_URL = 'https://frontend-example-panel.pentademo.com.tr';

/**
 * Get the base URL from environment variable or fallback
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3001';
}

/**
 * Get production URL for SEO API calls
 * Always returns production URL regardless of environment
 */
export function getSEOBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL;
}

/**
 * Construct full URL from path segments with trailing slash
 */
export function constructFullUrl(...pathSegments: string[]): string {
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  const path = pathSegments
    .filter(Boolean)
    .map((segment) => segment.replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/');
  const fullUrl = path ? `${baseUrl}/${path}` : baseUrl;
  return `${fullUrl}/`;
}

export function getPageUrl(slug: string): string {
  return constructFullUrl(slug);
}

export function getBlogPostUrl(slug: string): string {
  return constructFullUrl('blog', slug);
}

export function getProductDetailUrl(slug: string): string {
  return constructFullUrl('products', 'detail', slug);
}

export function getProductCategoryUrl(category: string): string {
  return constructFullUrl('products', category);
}

/**
 * Construct SEO URL using production base URL
 */
function constructSEOUrl(...pathSegments: string[]): string {
  const baseUrl = getSEOBaseUrl().replace(/\/$/, '');
  const path = pathSegments
    .filter(Boolean)
    .map((segment) => segment.replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/');
  const fullUrl = path ? `${baseUrl}/${path}` : baseUrl;
  return `${fullUrl}/`;
}

export function getSEOPageUrl(slug: string): string {
  return constructSEOUrl(slug);
}

export function getSEOBlogPostUrl(slug: string): string {
  return constructSEOUrl('blog', slug);
}

export function getSEOProductDetailUrl(slug: string): string {
  return constructSEOUrl('products', 'detail', slug);
}

export function getSEOProductCategoryUrl(category: string): string {
  return constructSEOUrl('products', category);
}
