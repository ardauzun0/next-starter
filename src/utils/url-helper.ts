const PRODUCTION_URL = 'https://frontend-example-panel.pentademo.com.tr';

export function getBaseUrl(locale?: string): string {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl && process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (!baseUrl) {
    baseUrl = 'http://localhost:3000';
  }
  
  if (locale && locale !== 'tr') {
    return `${baseUrl}/${locale}`;
  }
  return baseUrl;
}

// SEO API çağrıları için production URL döndürür
export function getSEOBaseUrl(locale?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL;
  if (locale && locale !== 'tr') {
    return `${baseUrl}/${locale}`;
  }
  return baseUrl;
}

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
  return constructSEOUrl(slug);
}

export function getSEOProductDetailUrl(slug: string): string {
  return constructSEOUrl('product', slug);
}

export function getSEOProductCategoryUrl(category: string): string {
  return constructSEOUrl('products', category);
}
