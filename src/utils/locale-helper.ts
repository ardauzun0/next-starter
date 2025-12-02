import { defaultLocale, type Locale } from '@/i18n/request';

// Path çevirisi için mapping
const pathTranslations: Record<string, Record<Locale, string>> = {
  '/kullanim-alanlari': { tr: '/kullanim-alanlari', en: '/usage' },
  '/usage': { tr: '/kullanim-alanlari', en: '/usage' },
  '/urunler': { tr: '/urunler', en: '/products' },
  '/products': { tr: '/urunler', en: '/products' },
  '/urunler/kategoriler': { tr: '/urunler/kategoriler', en: '/products/categories' },
  '/products/categories': { tr: '/urunler/kategoriler', en: '/products/categories' },
  '/urunler/ara': { tr: '/urunler/ara', en: '/products/search' },
  '/products/search': { tr: '/urunler/ara', en: '/products/search' },
  '/blog/kategoriler': { tr: '/blog/kategoriler', en: '/blog/categories' },
  '/blog/categories': { tr: '/blog/kategoriler', en: '/blog/categories' },
  '/blog/ara': { tr: '/blog/ara', en: '/blog/search' },
  '/blog/search': { tr: '/blog/ara', en: '/blog/search' },
};

/**
 * Path'i hedef dile çevirir
 * @param path - Çevrilecek path (locale olmadan)
 * @param targetLocale - Hedef dil
 * @returns Çevrilmiş path
 */
export function translatePath(path: string, targetLocale: Locale): string {
  // Exact match için kontrol et
  if (pathTranslations[path]) {
    return pathTranslations[path][targetLocale];
  }

  // Detay sayfaları için pattern matching
  // /kullanim-alanlari/slug veya /usage/slug
  const usageMatch = path.match(/^\/(kullanim-alanlari|usage)\/(.+)$/);
  if (usageMatch) {
    const slug = usageMatch[2];
    const basePath = targetLocale === 'tr' ? '/kullanim-alanlari' : '/usage';
    return `${basePath}/${slug}`;
  }

  // /urunler/detay/slug veya /products/detail/slug
  const productDetailMatch = path.match(/^\/(urunler\/detay|products\/detail)\/(.+)$/);
  if (productDetailMatch) {
    const slug = productDetailMatch[2];
    const basePath = targetLocale === 'tr' ? '/urunler/detay' : '/products/detail';
    return `${basePath}/${slug}`;
  }

  // /urunler/kategori/slug veya /products/category/slug
  const productCategoryMatch = path.match(/^\/(urunler\/kategori|products\/category)\/(.+)$/);
  if (productCategoryMatch) {
    const slug = productCategoryMatch[2];
    const basePath = targetLocale === 'tr' ? '/urunler/kategori' : '/products/category';
    return `${basePath}/${slug}`;
  }

  // /blog/kategori/slug veya /blog/category/slug
  const blogCategoryMatch = path.match(/^\/(blog\/kategori|blog\/category)\/(.+)$/);
  if (blogCategoryMatch) {
    const slug = blogCategoryMatch[2];
    const basePath = targetLocale === 'tr' ? '/blog/kategori' : '/blog/category';
    return `${basePath}/${slug}`;
  }

  // /blog/slug
  const blogMatch = path.match(/^\/blog\/([^\/]+)$/);
  if (blogMatch && !['kategoriler', 'categories', 'ara', 'search'].includes(blogMatch[1])) {
    return path; // Blog detay sayfaları slug'ı değişmez
  }

  // Eğer hiçbir pattern uymazsa, path'i olduğu gibi döndür
  return path;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const translatedPath = translatePath(cleanPath, locale);
  return `/${locale}${translatedPath}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && ['tr', 'en'].includes(firstSegment)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0 && ['tr', 'en'].includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}
