// Usage Area Services

import { fetchAPI } from './core';
import type { UsageAreasResponse, UsageAreaDetail } from '../types/api';

/**
 * Get all usage areas
 * Endpoint: /usage/v1
 */
export async function getUsageAreas(): Promise<UsageAreasResponse> {
  return fetchAPI<UsageAreasResponse>('/usage/v1');
}

/**
 * Get single usage area detail by slug
 * Endpoint: /usage/v1/detail/{slug}
 */
export async function getUsageAreaDetail(
  slug: string
): Promise<UsageAreaDetail> {
  return fetchAPI<UsageAreaDetail>(`/usage/v1/detail/${slug}`);
}

