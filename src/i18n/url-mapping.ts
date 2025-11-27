import type { Locale } from './config';

/**
 * URL mapping configuration
 * Her path için dil bazlı URL'ler tanımlanır
 */
export const urlMapping: Record<string, Record<Locale, string>> = {
  '/': {
    tr: '/',
    en: '/',
  },
  '/blog': {
    tr: '/blog',
    en: '/blog',
  },
  '/products': {
    tr: '/urunler',
    en: '/products',
  },
  '/usage': {
    tr: '/kullanim-alanlari',
    en: '/usage',
  },
  '/contact': {
    tr: '/iletisim',
    en: '/contact',
  },
  '/products/search': {
    tr: '/urunler/ara',
    en: '/products/search',
  },
  '/products/categories': {
    tr: '/urunler/kategoriler',
    en: '/products/categories',
  },
  '/products/category': {
    tr: '/urunler/kategori',
    en: '/products/category',
  },
  '/products/detail': {
    tr: '/urunler/detay',
    en: '/products/detail',
  },
  '/blog/search': {
    tr: '/blog/ara',
    en: '/blog/search',
  },
  '/blog/categories': {
    tr: '/blog/kategoriler',
    en: '/blog/categories',
  },
  '/blog/category': {
    tr: '/blog/kategori',
    en: '/blog/category',
  },
};

/**
 * Path'in base kısmını bulur (dinamik segmentler hariç)
 * Örnek: /products/detail/g-60 -> /products/detail
 */
function getBasePath(path: string): string {
  // Dinamik segmentleri kaldır
  const segments = path.split('/').filter(Boolean);
  
  // Özel path'leri kontrol et
  if (segments.length === 0) return '/';
  
  // İlk segment'e göre base path'i belirle
  const firstSegment = segments[0];
  
  if (firstSegment === 'urunler' || firstSegment === 'products') {
    if (segments.length >= 2) {
      const secondSegment = segments[1];
      if (secondSegment === 'ara' || secondSegment === 'search') {
        return '/products/search';
      }
      if (secondSegment === 'kategoriler' || secondSegment === 'categories') {
        return '/products/categories';
      }
      if (secondSegment === 'kategori' || secondSegment === 'category') {
        return '/products/category';
      }
      if (secondSegment === 'detay' || secondSegment === 'detail') {
        return '/products/detail';
      }
    }
    return '/products';
  }
  
  if (firstSegment === 'blog') {
    if (segments.length >= 2) {
      const secondSegment = segments[1];
      if (secondSegment === 'ara' || secondSegment === 'search') {
        return '/blog/search';
      }
      if (secondSegment === 'kategoriler' || secondSegment === 'categories') {
        return '/blog/categories';
      }
      if (secondSegment === 'kategori' || secondSegment === 'category') {
        return '/blog/category';
      }
    }
    return '/blog';
  }
  
  if (firstSegment === 'kullanim-alanlari' || firstSegment === 'usage') {
    return '/usage';
  }
  
  if (firstSegment === 'iletisim' || firstSegment === 'contact') {
    return '/contact';
  }
  
  return `/${firstSegment}`;
}

/**
 * Path'teki dinamik segmentleri korur
 * Örnek: /products/detail/g-60 -> g-60
 */
function getDynamicSegments(path: string, basePath: string): string {
  const pathSegments = path.split('/').filter(Boolean);
  const baseSegments = basePath.split('/').filter(Boolean);
  
  if (pathSegments.length <= baseSegments.length) {
    return '';
  }
  
  return '/' + pathSegments.slice(baseSegments.length).join('/');
}

/**
 * Locale'e göre path'i çevirir
 */
export function translatePath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Eğer path zaten locale prefix'i içeriyorsa, önce onu kaldır
  const pathWithoutLocale = cleanPath.replace(/^\/(tr|en)/, '') || '/';
  
  const basePath = getBasePath(pathWithoutLocale);
  const dynamicSegments = getDynamicSegments(pathWithoutLocale, basePath);
  
  // Mapping'de varsa kullan
  if (urlMapping[basePath]) {
    const translatedBase = urlMapping[basePath][locale];
    return translatedBase + dynamicSegments;
  }
  
  // Mapping'de yoksa orijinal path'i döndür
  return pathWithoutLocale;
}

/**
 * Ters çeviri: Türkçe/İngilizce path'ten orijinal path'e
 * Örnek: /urunler -> /products, /kullanim-alanlari -> /usage
 */
export function reverseTranslatePath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Tüm mapping'leri kontrol et (en uzun eşleşmeyi bul)
  let bestMatch = { original: cleanPath, translated: '', length: 0 };
  
  for (const [originalPath, translations] of Object.entries(urlMapping)) {
    for (const [locale, translatedPath] of Object.entries(translations)) {
      if (cleanPath.startsWith(translatedPath) && translatedPath.length > bestMatch.length) {
        const dynamicSegments = cleanPath.slice(translatedPath.length);
        bestMatch = {
          original: originalPath + dynamicSegments,
          translated: translatedPath,
          length: translatedPath.length,
        };
      }
    }
  }
  
  return bestMatch.original;
}

