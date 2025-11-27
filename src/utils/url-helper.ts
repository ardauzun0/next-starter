/**
 * URL Helper Utilities
 * Handles URL construction for SEO and API calls
 */

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
 * Construct full URL from path segments
 * Ensures proper formatting with trailing slash handling
 * 
 * @param pathSegments - Array of path segments (e.g., ['blog', 'slug'])
 * @returns Full URL (e.g., https://example.com/blog/slug/)
 */
export function constructFullUrl(...pathSegments: string[]): string {
  const baseUrl = getBaseUrl().replace(/\/$/, ''); // Remove trailing slash from base
  
  // Filter out empty segments and join
  const path = pathSegments
    .filter(Boolean)
    .map((segment) => segment.replace(/^\/|\/$/g, '')) // Remove leading/trailing slashes
    .filter(Boolean)
    .join('/');

  // Construct full URL
  const fullUrl = path ? `${baseUrl}/${path}` : baseUrl;
  
  // Add trailing slash (WordPress style)
  return `${fullUrl}/`;
}

/**
 * Construct URL for dynamic pages
 * @param slug - Page slug
 * @returns Full URL
 */
export function getPageUrl(slug: string): string {
  return constructFullUrl(slug);
}

/**
 * Construct URL for blog posts
 * @param slug - Post slug
 * @returns Full URL
 */
export function getBlogPostUrl(slug: string): string {
  return constructFullUrl('blog', slug);
}

/**
 * Construct URL for product details
 * @param slug - Product slug
 * @returns Full URL
 */
export function getProductDetailUrl(slug: string): string {
  return constructFullUrl('products', 'detail', slug);
}

/**
 * Construct URL for product categories
 * @param category - Category slug
 * @returns Full URL
 */
export function getProductCategoryUrl(category: string): string {
  return constructFullUrl('products', category);
}

