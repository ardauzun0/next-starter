import { fetchAPI } from './core';
import type { UsageAreasResponse, UsageAreaDetail } from '../types/api';

export async function getUsageAreas(): Promise<UsageAreasResponse> {
  return fetchAPI<UsageAreasResponse>('/usage/v1');
}

export async function getUsageAreaDetail(
  slug: string
): Promise<UsageAreaDetail> {
  return fetchAPI<UsageAreaDetail>(`/usage/v1/detail/${slug}`);
}
