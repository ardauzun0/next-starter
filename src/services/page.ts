import { fetchAPI } from './core';
import type { PageData } from '../types/api';

export async function getPageBySlug(slug: string): Promise<PageData> {
  return fetchAPI<PageData>(`/page/v1/${slug}`);
}
