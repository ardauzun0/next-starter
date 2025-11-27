// Global Services: Options & SEO

import { fetchAPI } from './core';
import type { GlobalOptions, SEOData } from '../types/api';

/**
 * Get global options (Header, Footer, Socials, Languages)
 * Endpoint: /options/v1
 */
export async function getGlobalOptions(): Promise<GlobalOptions> {
  return fetchAPI<GlobalOptions>('/options/v1');
}

/**
 * Get SEO data for a specific URL
 * Endpoint: /custom-seo/v1/getHead?url={url}
 * Note: This should be called server-side only
 */
export async function getSEOData(url: string): Promise<SEOData> {
  const encodedUrl = encodeURIComponent(url);
  return fetchAPI<SEOData>(`/custom-seo/v1/getHead?url=${encodedUrl}`, {
    cache: 'no-store', // SEO data should be fresh
  });
}

