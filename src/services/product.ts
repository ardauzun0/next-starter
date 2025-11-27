import { fetchAPI } from './core';
import type { ProductDetail, ProductCategory, ProductsResponse } from '../types/api';

export async function getAllProducts(
  perPage: number = 10,
  page: number = 1
): Promise<ProductsResponse> {
  try {
    return await fetchAPI<ProductsResponse>(
      `/product/v1/all?per_page=${perPage}&page=${page}`
    );
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false, data: { products: [], total: 0, pages: 0, current_page: 1 } } as ProductsResponse;
    }
    throw error;
  }
}

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

export async function searchProducts(keyword: string): Promise<ProductsResponse> {
  try {
    return await fetchAPI<ProductsResponse>(
      `/product/v1/search/${encodeURIComponent(keyword)}`
    );
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false, data: { products: [], total: 0, pages: 0, current_page: 1 } } as ProductsResponse;
    }
    throw error;
  }
}
