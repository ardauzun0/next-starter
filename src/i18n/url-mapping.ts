import type { Locale } from './config';

// URL mapping: Her path için dil bazlı URL'ler
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

function getBasePath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  
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

function getDynamicSegments(path: string, basePath: string): string {
  const pathSegments = path.split('/').filter(Boolean);
  const baseSegments = basePath.split('/').filter(Boolean);
  
  if (pathSegments.length <= baseSegments.length) {
    return '';
  }
  
  return '/' + pathSegments.slice(baseSegments.length).join('/');
}

export function translatePath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const pathWithoutLocale = cleanPath.replace(/^\/(tr|en)/, '') || '/';
  const basePath = getBasePath(pathWithoutLocale);
  const dynamicSegments = getDynamicSegments(pathWithoutLocale, basePath);
  
  if (urlMapping[basePath]) {
    return urlMapping[basePath][locale] + dynamicSegments;
  }
  
  return pathWithoutLocale;
}

export function reverseTranslatePath(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
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

