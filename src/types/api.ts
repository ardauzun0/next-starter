// Shared TypeScript Interfaces for WordPress Headless API

// 4.1. Global Options
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

// 4.2. Dynamic Blocks (ACF Flexible Content)
// Base interface for all blocks
export interface BaseBlock {
  acf_fc_layout: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// 4.3. Page Data
export interface PageData {
  success: boolean;
  data: {
    content: BaseBlock[]; // Array of dynamic blocks
  };
}

// 4.4. Blog & Categories
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
  count: number;
}

// Blog API Response Types
export interface PostsResponse {
  success: boolean;
  data: Post[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
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

// 4.5. Products
export interface ProductDetail {
  success: boolean;
  data: {
    content: BaseBlock[]; // Flexible content
  };
}

export interface ProductCategory {
  success: boolean;
  data: {
    name: string;
    description: string;
    content: BaseBlock[];
  };
}

// 4.6. Usage Areas
export interface UsageArea {
  id: number;
  name: string;
  slug: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface UsageAreasResponse {
  success: boolean;
  data: UsageArea[];
}

export interface UsageAreaDetail {
  success: boolean;
  data: UsageArea & {
    content?: BaseBlock[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

// 4.7. SEO Data
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
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonLd?: any[];
  };
}

