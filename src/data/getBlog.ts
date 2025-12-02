import { CategoriesResponse, PageMeta, PaginatedData, Post, PostDetailResponse, PostsByCategoryResponse, Resource } from '@/types';

import axios from '@lib/axios';

import { notFound } from 'next/navigation';

export async function getPosts({ page = 1, locale }: { page?: number; locale?: string }): Promise<PaginatedData<Post> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/posts?page=${page}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch posts');
        }

        return response.data as PaginatedData<Post> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
}

export async function getPost({ slug, locale }: { slug: string; locale?: string }): Promise<Resource<PostDetailResponse['data']> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/posts/${slug}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch post');
        }

        return response.data as Resource<PostDetailResponse['data']> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching post:', error);
        throw new Error('Failed to fetch post');
    }
}

export async function searchPosts({ keyword, locale }: { keyword: string; locale?: string }): Promise<PaginatedData<Post> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/posts/search/${encodeURIComponent(keyword)}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to search posts');
        }

        return response.data as PaginatedData<Post> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error searching posts:', error);
        throw new Error('Failed to search posts');
    }
}

export async function getPostsByCategory({ categorySlug, page = 1, locale }: { categorySlug: string; page?: number; locale?: string }): Promise<PostsByCategoryResponse & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/posts/category/${categorySlug}?page=${page}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch posts by category');
        }

        return response.data as PostsByCategoryResponse & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching posts by category:', error);
        throw new Error('Failed to fetch posts by category');
    }
}

export async function getBlogCategories({ locale }: { locale?: string }): Promise<CategoriesResponse & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/posts/categories`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch blog categories');
        }

        return response.data as CategoriesResponse & { meta: PageMeta };
    } catch (error: any) {
        console.error('Error fetching blog categories:', error);
        throw new Error('Failed to fetch blog categories');
    }
}