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
  return fetchAPI<UsageAreaDetail>(`/usage/v1/detail/${slug}`);
}

export async function getUsageCategories(): Promise<UsageCategoriesResponse> {
  return fetchAPI<UsageCategoriesResponse>('/usage/v1/categories');
}

export async function getUsageAreasByCategory(
  categorySlug: string
): Promise<UsageAreasResponse> {
  return fetchAPI<UsageAreasResponse>(`/usage/v1/category/${categorySlug}`);
}
