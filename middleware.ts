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

  // Eğer ilk segment bir locale ise
  if (firstSegment && locales.includes(firstSegment as typeof defaultLocale)) {
    // Varsayılan dil (tr) için prefix'i kaldır ve redirect yap
    if (firstSegment === defaultLocale) {
      const pathWithoutLocale = '/' + pathSegments.slice(1).join('/');
      const newUrl = new URL(pathWithoutLocale || '/', request.url);
      return NextResponse.redirect(newUrl);
    }
    // Diğer diller için devam et
    return NextResponse.next();
  }

  // Locale yoksa, varsayılan dil (tr) için prefix eklemeden devam et
  // Diğer diller için browser'dan gelen Accept-Language header'ına göre yönlendirme yapılabilir
  // Şimdilik varsayılan dil olarak devam ediyoruz
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|.*\\.).*)',
  ],
};
