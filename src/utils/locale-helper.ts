import { defaultLocale, type Locale } from '@/i18n/config';
import { translatePath } from '@/i18n/url-mapping';

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
