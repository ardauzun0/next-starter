import { fetchAPI } from './core';
import type { GlobalOptions, SEOData } from '../types/index.ts';

export async function getGlobalOptions(): Promise<GlobalOptions> {
  return fetchAPI<GlobalOptions>('/options/v1');
}

export async function getSEOData(url: string): Promise<SEOData | null> {
  const encodedUrl = encodeURIComponent(url);

  try {
    return await fetchAPI<SEOData>(`/custom-seo/v1/getHead?url=${encodedUrl}`, {
      next: { revalidate: 0 },
    });
  } catch (error) {
    console.warn(`SEO API failed for ${url}:`, error);
    return null;
  }
}
