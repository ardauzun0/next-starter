import { fetchAPI } from './core';
import type {
  PostsResponse,
  PostsByCategoryResponse,
  PostDetailResponse,
  CategoriesResponse,
} from '../types/index.ts';

export async function getPosts(page: number = 1): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(`/posts/v1?page=${page}`);
}

export async function getPostBySlug(slug: string): Promise<PostDetailResponse> {
  try {
    return await fetchAPI<PostDetailResponse>(`/posts/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as PostDetailResponse;
    }
    throw error;
  }
}

export async function searchPosts(keyword: string): Promise<PostsResponse> {
  return fetchAPI<PostsResponse>(
    `/posts/v1/search/${encodeURIComponent(keyword)}`
  );
}

export async function getPostsByCategory(
  categorySlug: string,
  page: number = 1
): Promise<PostsByCategoryResponse> {
  return fetchAPI<PostsByCategoryResponse>(`/posts/v1/category/${categorySlug}?page=${page}`);
}

export async function getBlogCategories(): Promise<CategoriesResponse> {
  return fetchAPI<CategoriesResponse>('/posts/v1/categories');
}
