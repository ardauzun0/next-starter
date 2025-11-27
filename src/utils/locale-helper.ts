import { defaultLocale, type Locale } from '@/i18n/config';

/**
 * Locale'e göre URL oluşturur
 * Varsayılan dil (tr) için prefix eklemez, diğer diller için ekler
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (locale === defaultLocale) {
    return cleanPath;
  }
  
  return `/${locale}${cleanPath}`;
}

export function getLocalizedPathWithQuery(path: string, locale: Locale, query?: string): string {
  const basePath = getLocalizedPath(path, locale);
  return query ? `${basePath}?${query}` : basePath;
}

/**
 * URL'den locale'i çıkarır
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && ['tr', 'en'].includes(firstSegment)) {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

/**
 * URL'den locale prefix'ini kaldırır
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0 && ['tr', 'en'].includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

