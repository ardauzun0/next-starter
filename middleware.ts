import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, type Locale } from './src/i18n/config';
import { reverseTranslatePath } from './src/i18n/url-mapping';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // API routes ve static dosyalar için middleware'i atla
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // URL'deki locale'i kontrol et
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // Eğer ilk segment bir locale ise
  if (firstSegment && locales.includes(firstSegment as typeof defaultLocale)) {
    const locale = firstSegment as Locale;
    const pathWithoutLocale = '/' + pathSegments.slice(1).join('/');
    
    // Çevrilmiş path'i orijinal path'e çevir (Next.js routing için)
    const originalPath = reverseTranslatePath(pathWithoutLocale);
    
    // Eğer path çevrilmişse, rewrite yap
    if (originalPath !== pathWithoutLocale) {
      const rewritePath = `/${locale}${originalPath}`;
      const url = request.nextUrl.clone();
      url.pathname = rewritePath;
      const response = NextResponse.rewrite(url);
      response.headers.set('x-pathname', pathname);
      return response;
    }
    
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Locale yoksa, varsayılan dil (tr) ile redirect yap
  const newUrl = new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url);
  const response = NextResponse.redirect(newUrl);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|.*\\.).*)',
  ],
};
