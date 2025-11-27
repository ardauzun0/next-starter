import type {
  GlobalOptions,
  PageData,
  PostsResponse,
  PostDetailResponse,
  CategoriesResponse,
  ProductDetail,
  ProductCategory,
  UsageAreasResponse,
  UsageAreaDetail,
  SEOData,
} from '../types';

// Base API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://frontend-example-panel.pentademo.com.tr/wp-json';

/**
 * Generic fetch wrapper to handle base URL and errors
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: {
        revalidate: 3600, // Revalidate every hour by default
        ...options?.next,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${url}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

// ============================================
// Global Services
// ============================================

/**
 * Get global options (Header, Footer, Socials, Languages)
 * Endpoint: /options/v1
 */
export async function getGlobalOptions(): Promise<GlobalOptions> {
  return fetchAPI<GlobalOptions>('/options/v1');
}

// ============================================
// Page Services
// ============================================

/**
 * Get page by slug
 * Endpoint: /page/v1/{slug}
 */
export async function getPageBySlug(slug: string): Promise<PageData> {
  return fetchAPI<PageData>(`/page/v1/${slug}`);
}

// ============================================
// Blog Services
// ============================================

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
  return fetchAPI<PostsResponse>(`/posts/v1/search/${encodeURIComponent(keyword)}`);
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

// ============================================
// Product Services
// ============================================

/**
 * Get product detail by slug (Block based)
 * Endpoint: /product/v1/detail/{slug}
 */
export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  return fetchAPI<ProductDetail>(`/product/v1/detail/${slug}`);
}

/**
 * Get product category with listing
 * Endpoint: /product-category/v1/{slug}
 */
export async function getProductCategory(
  slug: string
): Promise<ProductCategory> {
  return fetchAPI<ProductCategory>(`/product-category/v1/${slug}`);
}

// ============================================
// Usage Area Services
// ============================================

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

// ============================================
// SEO Services
// ============================================

/**
 * Get SEO data for a specific URL
 * Endpoint: /custom-seo/v1/getHead?url={url}
 * Note: This should be called server-side only
 */
export async function getSEOData(url: string): Promise<SEOData> {
  const encodedUrl = encodeURIComponent(url);
  return fetchAPI<SEOData>(`/custom-seo/v1/getHead?url=${encodedUrl}`, {
    cache: 'no-store', // SEO data should be fresh
  });
}

