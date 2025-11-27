// Shared TypeScript Interfaces for WordPress Headless API

export interface GlobalOptions {
  option: {
    addresses: Array<{
      title: string;
      exp: string;
      address: string;
      phone: string;
      email: string;
      map_image: string;
    }>;
    socials: Array<{ select: string; url: string }>;
    menu: Array<{ name: string; url: string }>;
    footer_menu: Array<{ name: string; url: string }>;
    menu_2: Array<{
      name: string;
      url: string;
      sub_menu_select: string;
      sub_menu?: Array<{ name: string; url: string }>;
    }>;
  };
  languages: {
    default: string;
    list: Record<string, { slug: string; name: string; url: string; flag: string }>;
  };
}

export interface BaseBlock {
  acf_fc_layout: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PageData {
  success: boolean;
  data: {
    content: BaseBlock[];
  };
}

export interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  slug: string;
  link: string;
  thumbnail: string;
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  description?: string;
  count: number;
}

export interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
    total_pages: number;
    current_page: number;
    total_posts: number;
  };
}

export interface PostsByCategoryResponse {
  success: boolean;
  data: Post[];
}

export interface PostDetailResponse {
  success: boolean;
  data: Post & {
    content?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface ProductDetail {
  success: boolean;
  data: {
    content: BaseBlock[];
  };
}

export interface ProductCategoryItem {
  category: string;
  image: string;
  products: Array<{
    ID: number;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    thumbnail: {
      url: string;
    };
    description: string;
    category: string;
    category_slug: string;
    category_id: number;
  }>;
}

export interface ProductCategory {
  success: boolean;
  data: {
    name: string;
    description: string;
    content: BaseBlock[];
  };
}

export interface UsageArea {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  count: number;
  type: string;
}

export interface UsageAreasResponse {
  success: boolean;
  data: UsageArea[];
}

export interface UsageAreaProduct {
  image: string;
  title: string;
  slug: string;
  category: string;
}

export interface UsageAreaDetail {
  success: boolean;
  data: {
    id: number;
    bc_type?: string;
    bc_select?: string;
    bc_image?: string;
    bc_video?: string;
    bc_exp?: string;
    title: string;
    content?: string;
    products?: UsageAreaProduct[];
  };
}

export interface UsageCategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface SEOData {
  success: boolean;
  head: {
    title: string;
    description: string;
    alternates?: { canonical: string };
    openGraph?: {
      title: string;
      description: string;
      images: string[];
      url: string;
      type: string;
      locale?: string;
      site_name?: string;
      card?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonLd?: any[];
  };
}
