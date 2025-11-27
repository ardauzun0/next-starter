import { fetchAPI } from './core';
import type {
  PostsResponse,
  PostDetailResponse,
  CategoriesResponse,
} from '../types/api';

export async function getPosts(
  page: number = 1,
  perPage: number = 10
): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1?page=${page}&per_page=${perPage}`
  );
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
  slug: string,
  page: number = 1,
  perPage: number = 10
): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1/category/${slug}?page=${page}&per_page=${perPage}`
  );
}

export async function getBlogCategories(): Promise<CategoriesResponse> {
  return fetchAPI<CategoriesResponse>('/posts/v1/categories');
}
