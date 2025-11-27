// Page Services: Dynamic Page fetching

import { fetchAPI } from './core';
import type { PageData } from '../types/api';

/**
 * Get page by slug
 * Endpoint: /page/v1/{slug}
 */
export async function getPageBySlug(slug: string): Promise<PageData> {
  return fetchAPI<PageData>(`/page/v1/${slug}`);
}

