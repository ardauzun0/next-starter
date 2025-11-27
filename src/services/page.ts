import { fetchAPI } from './core';
import type { PageData } from '../types/api';

export async function getPageBySlug(slug: string): Promise<PageData> {
  try {
    return await fetchAPI<PageData>(`/page/v1/${slug}`);
  } catch (error) {
    // 404 hatası geldiğinde success: false döndür
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as PageData;
    }
    // Diğer hatalar için tekrar fırlat
    throw error;
  }
}
