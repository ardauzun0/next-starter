import { fetchAPI } from './core';
import type {
  UsageAreasResponse,
  UsageAreaDetail,
  UsageCategoriesResponse,
} from '../types/api';

export async function getUsageAreas(): Promise<UsageAreasResponse> {
  return fetchAPI<UsageAreasResponse>('/usage/v1');
}

export async function getUsageAreaDetail(
  slug: string
): Promise<UsageAreaDetail> {
  try {
    return await fetchAPI<UsageAreaDetail>(`/usage/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as UsageAreaDetail;
    }
    throw error;
  }
}

export async function getUsageCategories(): Promise<UsageCategoriesResponse> {
  return fetchAPI<UsageCategoriesResponse>('/usage/v1/categories');
}

export async function getUsageAreasByCategory(
  categorySlug: string
): Promise<UsageAreasResponse> {
  return fetchAPI<UsageAreasResponse>(`/usage/v1/category/${categorySlug}`);
}
