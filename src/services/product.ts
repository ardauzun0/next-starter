import { fetchAPI } from './core';
import type { ProductDetail, ProductCategory } from '../types/api';

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  try {
    return await fetchAPI<ProductDetail>(`/product/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as ProductDetail;
    }
    throw error;
  }
}

export async function getProductCategory(
  slug: string
): Promise<ProductCategory> {
  try {
    return await fetchAPI<ProductCategory>(`/product-category/v1/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as ProductCategory;
    }
    throw error;
  }
}
