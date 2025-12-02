import { fetchAPI } from './core';
import type { PageData } from '../types/index.ts';

export async function getPageBySlug(slug: string): Promise<PageData> {
  try {
    return await fetchAPI<PageData>(`/page/v1/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as PageData;
    }
    throw error;
  }
}
