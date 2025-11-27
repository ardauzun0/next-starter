// Blog Services: Posts, Categories, Search

import { fetchAPI } from './core';
import type {
  PostsResponse,
  PostDetailResponse,
  CategoriesResponse,
} from '../types/api';

/**
 * Get posts list with pagination
 * Endpoint: /posts/v1
 */
export async function getPosts(
  page: number = 1,
  perPage: number = 10
): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1?page=${page}&per_page=${perPage}`
  );
}

/**
 * Get single post by slug
 * Endpoint: /posts/v1/detail/{slug}
 */
export async function getPostBySlug(slug: string): Promise<PostDetailResponse> {
  return fetchAPI<PostDetailResponse>(`/posts/v1/detail/${slug}`);
}

/**
 * Search posts by keyword
 * Endpoint: /posts/v1/search/{keyword}
 */
export async function searchPosts(keyword: string): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1/search/${encodeURIComponent(keyword)}`
  );
}

/**
 * Get posts by category slug
 * Endpoint: /posts/v1/category/{slug}
 */
export async function getPostsByCategory(
  slug: string,
  page: number = 1,
  perPage: number = 10
): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1/category/${slug}?page=${page}&per_page=${perPage}`
  );
}

/**
 * Get all blog categories
 * Endpoint: /posts/v1/categories
 */
export async function getBlogCategories(): Promise<CategoriesResponse> {
  return fetchAPI<CategoriesResponse>('/posts/v1/categories');
}

