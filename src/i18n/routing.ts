import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'tr'],

    // Used when no locale matches
    defaultLocale: 'en',

    localePrefix: 'as-needed',

    localeDetection: false,

    pathnames: {
        '/dashboard/support': {
            en: '/dashboard/support',
            tr: '/panel/destek',
        },
        '/dashboard/licenses': {
            en: '/dashboard/licenses',
            tr: '/panel/lisanslar',
        },
        '/dashboard/orders': {
            en: '/dashboard/orders',
            tr: '/panel/siparisler',
        },
        '/dashboard/account/billing': {
            en: '/dashboard/account/billing',
            tr: '/panel/hesap/faturalama',
        },
        '/dashboard/account': {
            en: '/dashboard/account',
            tr: '/panel/hesap',
        },
        '/dashboard': {
            en: '/dashboard',
            tr: '/panel',
        },
        '/login': {
            en: '/login',
            tr: '/giris',
        },
        '/register': {
            en: '/register',
            tr: '/kayit',
        },
        '/downloads/[slug]': {
            en: '/downloads/[slug]',
            tr: '/indir/[slug]',
        },
        '/downloads': {
            en: '/downloads',
            tr: '/indir',
        },
        '/academy/[slug]/[group]': {
            en: '/academy/[slug]/[group]',
            tr: '/akademi/[slug]/[group]',
        },
        '/academy/[slug]': {
            en: '/academy/[slug]',
            tr: '/akademi/[slug]',
        },
        '/academy': {
            en: '/academy',
            tr: '/akademi',
        },
        '/contact': {
            en: '/get-in-touch',
            tr: '/iletisim',
        },
        '/docs/[section]/[slug]': {
            en: '/documentation/[section]/[slug]',
            tr: '/dokumantasyon/[section]/[slug]',
        },
        '/docs/[section]': {
            en: '/documentation/[section]',
            tr: '/dokumantasyon/[section]',
        },
        '/products/[slug]': {
            en: '/products/[slug]',
            tr: '/urunler/[slug]',
        },
        '/docs': {
            en: '/documentation',
            tr: '/dokumantasyon',
        },
        '/posts/[slug]': {
            en: '/news/[slug]',
            tr: '/haberler/[slug]',
        },
        '/posts': {
            en: '/news',
            tr: '/haberler',
        },
        '/pricing/[uuid]/buy-module': {
            en: '/pricing/[uuid]/buy-module',
            tr: '/fiyatlandirma/[uuid]/modul-satin-al',
        },
        '/pricing/[uuid]/buy': {
            en: '/pricing/[uuid]/buy',
            tr: '/fiyatlandirma/[uuid]/satin-al',
        },
        '/pricing/[uuid]/buy/success': {
            en: '/pricing/[uuid]/buy/success',
            tr: '/fiyatlandirma/[uuid]/satin-al/basarili',
        },
        '/pricing/[uuid]/buy/fail': {
            en: '/pricing/[uuid]/buy/fail',
            tr: '/fiyatlandirma/[uuid]/satin-al/basarisiz',
        },
        '/pricing': {
            en: '/pricing',
            tr: '/fiyatlandirma',
        },
        '/pricing/buy': {
            en: '/pricing/buy',
            tr: '/fiyatlandirma/satin-al',
        },
        '/pricing/buy/success': {
            en: '/pricing/buy/success',
            tr: '/fiyatlandirma/satin-al/basarili',
        },
        '/pricing/buy/fail': {
            en: '/pricing/buy/fail',
            tr: '/fiyatlandirma/satin-al/basarisiz',
        },
        '/': '/',
    },
});