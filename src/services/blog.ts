import { fetchAPI } from './core';
import type {
  PostsResponse,
  PostDetailResponse,
  CategoriesResponse,
} from '../types/api';

export async function getPosts(page: number = 1): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(`/posts/v1?page=${page}`);
}

export async function getPostBySlug(slug: string): Promise<PostDetailResponse> {
  return fetchAPI<PostDetailResponse>(`/posts/v1/detail/${slug}`);
}

export async function searchPosts(keyword: string): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1/search/${encodeURIComponent(keyword)}`
  );
}

export async function getPostsByCategory(
  categorySlug: string,
  page: number = 1
): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(`/posts/v1/category/${categorySlug}?page=${page}`);
}

export async function getBlogCategories(): Promise<CategoriesResponse> {
  return fetchAPI<CategoriesResponse>('/posts/v1/categories');
}
