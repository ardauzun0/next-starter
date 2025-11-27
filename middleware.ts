import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

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

  // Eğer ilk segment bir locale ise, devam et
  if (firstSegment && locales.includes(firstSegment as typeof defaultLocale)) {
    const response = NextResponse.next();
    // Pathname'i header'a ekle ki not-found.tsx'te kullanabilelim
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
