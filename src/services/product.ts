import { fetchAPI } from './core';
import type { ProductDetail, ProductCategory } from '../types/api';

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  return fetchAPI<ProductDetail>(`/product/v1/detail/${slug}`);
}

export async function getProductCategory(
  slug: string
): Promise<ProductCategory> {
  return fetchAPI<ProductCategory>(`/product-category/v1/${slug}`);
}
