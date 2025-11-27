# Next.js 15 Headless WordPress Starter Template

Bu proje, Next.js 15 App Router kullanarak Headless WordPress entegrasyonu için hazırlanmış bir starter template'dir. Çok dilli (i18n) desteği, SEO optimizasyonu, dinamik block rendering ve modern UI component'leri içerir.

## 📋 İçindekiler

- [Kurulum](#kurulum)
- [Proje Yapısı](#proje-yapısı)
- [API Yapısı ve Formatları](#api-yapısı-ve-formatları)
- [Block Component'leri Ekleme](#block-componentleri-ekleme)
- [Yeni Dil Ekleme](#yeni-dil-ekleme)
- [Component Ekleme](#component-ekleme)
- [Modül Ekleme](#modül-ekleme)
- [Build ve Deployment](#build-ve-deployment)
- [Next.js Özellikleri](#nextjs-özellikleri)
- [Syntax ve Best Practices](#syntax-ve-best-practices)
- [Public Klasörü Kullanımı](#public-klasörü-kullanımı)
- [Yol Haritası](#yol-haritası)

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn
- WordPress Headless API (REST API)

### Adımlar

1. **Projeyi klonlayın veya indirin**
   ```bash
   git clone <repository-url>
   cd next-starter
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Environment değişkenlerini ayarlayın**
   
   `.env.local` dosyası oluşturun:
   ```env
   NEXT_PUBLIC_API_URL=https://your-wordpress-site.com/wp-json
   NEXT_PUBLIC_SITE_URL=https://your-frontend-site.com
   NEXT_PUBLIC_SITE_NAME=Site Adı
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

   Tarayıcıda `http://localhost:3001` adresini açın.

---

## 📁 Proje Yapısı

### Kök Dizin

```
next-starter/
├── public/                 # Statik dosyalar (resimler, videolar, fontlar)
├── src/                    # Kaynak kodlar
├── middleware.ts          # Next.js middleware (i18n routing)
├── next.config.ts         # Next.js konfigürasyonu
├── tsconfig.json          # TypeScript konfigürasyonu
├── package.json           # Proje bağımlılıkları
└── README.md              # Bu dosya
```

### `src/` Klasör Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── [locale]/          # Locale bazlı route'lar
│   │   ├── layout.tsx     # Locale layout (dil bazlı)
│   │   ├── page.tsx       # Ana sayfa
│   │   ├── not-found.tsx  # 404 sayfası (locale bazlı)
│   │   ├── [slug]/        # Dinamik sayfalar
│   │   ├── blog/          # Blog sayfaları
│   │   ├── products/      # Ürün sayfaları
│   │   └── usage/         # Kullanım alanı sayfaları
│   ├── api/               # API route'ları
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global CSS
│   └── not-found.tsx      # Global 404 sayfası
│
├── components/            # React component'leri
│   ├── blocks/            # Block component'leri (ACF Flexible Content)
│   ├── seo/               # SEO component'leri
│   └── ui/                # UI component'leri (shadcn/ui)
│
├── services/              # API service fonksiyonları
│   ├── core.ts            # Temel fetch wrapper
│   ├── global.ts          # Global options & SEO
│   ├── blog.ts            # Blog API'leri
│   ├── product.ts         # Ürün API'leri
│   ├── page.ts            # Sayfa API'leri
│   └── usage.ts           # Kullanım alanı API'leri
│
├── types/                 # TypeScript type tanımları
│   └── api.ts             # API response type'ları
│
├── utils/                 # Yardımcı fonksiyonlar
│   ├── locale-helper.ts   # Locale URL helper'ları
│   ├── seo-helper.ts      # SEO metadata helper
│   └── url-helper.ts      # URL construction helper'ları
│
├── i18n/                  # Çok dilli (i18n) yapılandırma
│   ├── config.ts          # Locale konfigürasyonu
│   ├── getTranslations.ts # Çeviri yükleme fonksiyonu
│   └── messages/          # Çeviri dosyaları
│       ├── tr.json        # Türkçe çeviriler
│       └── en.json        # İngilizce çeviriler
│
└── lib/                   # Kütüphane helper'ları
    └── utils.ts           # Genel utility fonksiyonları
```

---

## 📄 Dosya Açıklamaları

### Root Dosyalar

#### `middleware.ts`
**Ne işe yarar:** Next.js middleware, her istekte çalışır ve locale routing'i yönetir.

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Locale routing mantığı

**Ne zaman değiştirilir:**
- Yeni bir locale eklediğinizde `src/i18n/config.ts` dosyasını güncelleyin, middleware otomatik çalışır.

#### `next.config.ts`
**Ne işe yarar:** Next.js konfigürasyonu (image domains, redirects, vb.)

**Değiştirilmesi gerekenler:**
- ✅ `images.remotePatterns` - WordPress API'den gelen resimlerin domain'ini ekleyin
- ✅ `redirects` - Özel yönlendirmeler ekleyebilirsiniz

**Örnek:**
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "your-wordpress-site.com",
      },
    ],
  },
};
```

#### `tsconfig.json`
**Ne işe yarar:** TypeScript derleyici ayarları ve path alias'ları

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Path alias'lar proje genelinde kullanılıyor

### `src/services/` Klasörü

#### `core.ts`
**Ne işe yarar:** Tüm API çağrıları için temel `fetchAPI` wrapper fonksiyonu.

**Değiştirilmesi gerekenler:**
- ✅ `API_URL` - WordPress API URL'inizi ayarlayın (`.env.local` dosyasından okunur)
- ❌ **DEĞİŞTİRMEYİN** - Fetch mantığı ve error handling

**Önemli:** Tüm service fonksiyonları bu `fetchAPI` fonksiyonunu kullanmalıdır.

#### `global.ts`
**Ne işe yarar:** Global options (menu, footer, settings) ve SEO data fetching.

**Değiştirilmesi gerekenler:**
- ✅ API endpoint'leri (eğer WordPress API yapınız farklıysa)
- ❌ **DEĞİŞTİRMEYİN** - `getSEOData` fonksiyonu (SEO API formatı sabit)

#### `blog.ts`, `product.ts`, `page.ts`, `usage.ts`
**Ne işe yarar:** Domain-specific API çağrıları.

**Değiştirilmesi gerekenler:**
- ✅ API endpoint'leri (eğer WordPress API yapınız farklıysa)
- ✅ Return type'ları (eğer API response formatı değişirse)

**Örnek:**
```typescript
// src/services/blog.ts
export async function getPostBySlug(slug: string): Promise<PostDetailResponse> {
  try {
    return await fetchAPI<PostDetailResponse>(`/posts/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as PostDetailResponse;
    }
    throw error;
  }
}
```

### `src/types/api.ts`
**Ne işe yarar:** Tüm API response type tanımları.

**Değiştirilmesi gerekenler:**
- ✅ **MUTLAKA DEĞİŞTİRİN** - WordPress API'nizin döndürdüğü veri yapısına göre güncelleyin
- ✅ Yeni block type'ları için interface'ler ekleyin
- ✅ Yeni API endpoint'leri için response type'ları ekleyin

**Önemli:** Bu dosya API'nizin contract'ını tanımlar. API değişikliklerinde burayı güncelleyin.

### `src/utils/` Klasörü

#### `locale-helper.ts`
**Ne işe yarar:** Locale bazlı URL oluşturma ve parsing fonksiyonları.

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Locale routing mantığı

#### `seo-helper.ts`
**Ne işe yarar:** SEO metadata'yı Next.js Metadata formatına dönüştürür.

**Değiştirilmesi gerekenler:**
- ✅ SEO API'nizin döndürdüğü veri yapısına göre güncelleyin
- ❌ **DEĞİŞTİRMEYİN** - Metadata transformation mantığı

#### `url-helper.ts`
**Ne işe yarar:** SEO API çağrıları için URL oluşturma.

**Değiştirilmesi gerekenler:**
- ✅ `PRODUCTION_URL` - Production URL'inizi ayarlayın
- ✅ URL formatları (eğer SEO API formatı farklıysa)

**SEO URL Formatları:**
- `getSEOPageUrl(slug)` - Genel sayfalar için: `/{slug}/`
- `getSEOBlogPostUrl(slug)` - Blog yazıları için: `/{slug}/`
- `getSEOProductDetailUrl(slug)` - Ürün detay için: `/product/{slug}/`
- `getSEOProductCategoryUrl(category)` - Ürün kategorileri için: `/products/{category}/`

**Önemli:** SEO API çağrıları için her zaman production URL kullanılır (`getSEOBaseUrl()`).

### `src/i18n/` Klasörü

#### `config.ts`
**Ne işe yarar:** Desteklenen dilleri ve varsayılan dili tanımlar.

**Değiştirilmesi gerekenler:**
- ✅ `locales` - Yeni dil eklerken buraya ekleyin
- ✅ `defaultLocale` - Varsayılan dili değiştirebilirsiniz
- ✅ `localeNames` - Dil isimlerini güncelleyin

**Örnek:**
```typescript
export const locales = ['tr', 'en', 'de'] as const; // Yeni dil: 'de'
export const defaultLocale = 'tr' as const;

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch', // Yeni dil
};
```

#### `getTranslations.ts`
**Ne işe yarar:** Çeviri dosyalarını yükler ve cache'ler.

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Çeviri yükleme mantığı

#### `messages/tr.json`, `messages/en.json`
**Ne işe yarar:** Statik metinlerin çevirileri.

**Değiştirilmesi gerekenler:**
- ✅ **MUTLAKA DEĞİŞTİRİN** - Tüm statik metinleri buraya ekleyin
- ✅ Yeni çeviri key'leri ekleyin
- ✅ Mevcut çevirileri güncelleyin

**Örnek:**
```json
{
  "common": {
    "back": "Geri",
    "search": "Ara"
  },
  "blog": {
    "title": "Blog",
    "backToBlog": "Blog'a Dön"
  }
}
```

### `src/components/` Klasörü

#### `blocks/BlockRenderer.tsx`
**Ne işe yarar:** ACF Flexible Content block'larını dinamik olarak render eder.

**Değiştirilmesi gerekenler:**
- ✅ Yeni block component'i eklediğinizde buraya import edin ve `blockMap`'e ekleyin

**Örnek:**
```typescript
import NewBlock from './NewBlock';

const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  newblock: NewBlock, // Yeni block
};
```

#### `blocks/*.tsx`
**Ne işe yarar:** Her block component'i, ACF Flexible Content'ten gelen bir block type'ını render eder.

**Değiştirilmesi gerekenler:**
- ✅ **MUTLAKA DEĞİŞTİRİN** - Block'ların görünümü ve davranışı projeye özeldir
- ✅ Interface'leri API'nizin döndürdüğü veri yapısına göre güncelleyin
- ✅ Stil ve layout'u projenize göre özelleştirin

**Önemli:** Her block component'i kendi interface'ini içinde tanımlamalıdır (co-located types).

#### `Header.tsx`
**Ne işe yarar:** Site header component'i. GlobalOptions'tan menu, sub-menu ve language switcher verilerini çeker.

**Değiştirilmesi gerekenler:**
- ✅ Logo ve branding'i özelleştirin
- ✅ Menu yapısını ve stilini özelleştirin
- ✅ Sub-menu dropdown davranışını özelleştirebilirsiniz

**Kullanım:**
```typescript
import Header from '@/components/Header';
import { getGlobalOptions } from '@/services/global';

const globalOptions = await getGlobalOptions();
<Header globalOptions={globalOptions} locale={locale} />
```

**Özellikler:**
- Ana menü (`option.menu`)
- Alt menülü menü (`option.menu_2` - sub_menu_select: 'yes' olanlar için dropdown)
- Language switcher entegrasyonu
- Responsive tasarım

#### `Footer.tsx`
**Ne işe yarar:** Site footer component'i. GlobalOptions'tan footer menu, adresler ve sosyal medya linklerini çeker.

**Değiştirilmesi gerekenler:**
- ✅ Footer layout'unu özelleştirin
- ✅ Adres ve iletişim bilgileri formatını özelleştirin
- ✅ Sosyal medya linklerini özelleştirin

**Kullanım:**
```typescript
import Footer from '@/components/Footer';
import { getGlobalOptions } from '@/services/global';

const globalOptions = await getGlobalOptions();
<Footer globalOptions={globalOptions} locale={locale} />
```

**Özellikler:**
- Footer menü (`option.footer_menu`)
- İletişim adresleri (`option.addresses`)
- Sosyal medya linkleri (`option.socials`)
- Map görselleri (address.map_image)

#### `ContactForm.tsx`
**Ne işe yarar:** İletişim formu component'i. React Hook Form ve Zod validation kullanır.

**Değiştirilmesi gerekenler:**
- ✅ Form alanlarını özelleştirin
- ✅ Validation kurallarını güncelleyin
- ✅ Form action URL'ini güncelleyin (`FORM_ACTION_URL`)
- ✅ Başarı/hata mesajlarını özelleştirin

**Kullanım:**
```typescript
import ContactForm from '@/components/ContactForm';

<ContactForm />
```

**Form Alanları:**
- Name (İsim) - Zorunlu, min 2 karakter
- Phone (Telefon) - Zorunlu, min 10 karakter
- Email (E-posta) - Zorunlu, email formatı
- Subject (Konu) - Zorunlu, min 3 karakter
- Message (Mesaj) - Zorunlu, min 10 karakter
- GDPR (KVKK Onayı) - Zorunlu checkbox
- CreatedAt - Otomatik eklenir (form submit sırasında)

**Form Action:**
Form, WordPress admin-ajax.php endpoint'ine POST request gönderir:
```
https://frontend-example-panel.pentademo.com.tr/wp-admin/admin-ajax.php
```

**Form Data Formatı:**
```javascript
{
  action: 'contact_form_submit',
  name: string,
  phone: string,
  email: string,
  subject: string,
  message: string,
  gdpr: '1' | '0',
  createdAt: ISO string
}
```

#### `LanguageSwitcher.tsx`
**Ne işe yarar:** Dil değiştirme dropdown component'i.

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Locale routing mantığı
- ✅ Stil ve görünümü özelleştirebilirsiniz

#### `seo/JsonLd.tsx`
**Ne işe yarar:** JSON-LD structured data'yı sayfaya ekler.

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - JSON-LD formatı standarttır

#### `ui/*.tsx`
**Ne işe yarar:** shadcn/ui component'leri (Button, Card, Input, vb.)

**Değiştirilmesi gerekenler:**
- ✅ Stil ve görünümü özelleştirebilirsiniz
- ✅ Yeni UI component'leri ekleyebilirsiniz

### `src/app/` Klasörü

#### `[locale]/layout.tsx`
**Ne işe yarar:** Locale bazlı root layout (HTML, body, header, vb.)

**Değiştirilmesi gerekenler:**
- ✅ Font ayarlarını özelleştirin
- ✅ Global styles ekleyin
- ✅ Header ve Footer component'leri zaten entegre edilmiştir

**Mevcut Yapı:**
- Header component'i (GlobalOptions'tan menu verilerini çeker)
- Footer component'i (GlobalOptions'tan footer verilerini çeker)
- Language switcher (Header içinde)

#### `[locale]/page.tsx`
**Ne işe yarar:** Ana sayfa.

**Değiştirilmesi gerekenler:**
- ✅ **MUTLAKA DEĞİŞTİRİN** - Ana sayfa içeriği projeye özeldir
- ✅ ContactForm component'i mevcut (kaldırabilir veya özelleştirebilirsiniz)

#### `[locale]/[slug]/page.tsx`
**Ne işe yarar:** Dinamik sayfalar (örn: /tr/hakkimizda).

**Değiştirilmesi gerekenler:**
- ❌ **DEĞİŞTİRMEYİN** - Dinamik sayfa mantığı
- ✅ SEO metadata'yı özelleştirebilirsiniz

#### `[locale]/blog/*`, `[locale]/products/*`, `[locale]/usage/*`
**Ne işe yarar:** Blog, ürün ve kullanım alanı sayfaları.

**Değiştirilmesi gerekenler:**
- ✅ Sayfa içeriklerini ve layout'ları özelleştirin
- ✅ Yeni sayfa türleri ekleyebilirsiniz

**Mevcut Sayfalar:**
- `blog/page.tsx` - Blog listesi (pagination destekler)
- `blog/search/page.tsx` - Blog arama (URL query parameter: `?q=keyword`)
- `blog/categories/page.tsx` - Blog kategorileri
- `blog/category/[slug]/page.tsx` - Kategoriye göre blog yazıları
- `blog/[slug]/page.tsx` - Blog detay sayfası
- `products/page.tsx` - Ürünler ana sayfa (kullanım alanları listesi)
- `products/search/page.tsx` - Ürün arama (URL query parameter: `?q=keyword`)
- `products/categories/page.tsx` - Ürün kategorileri
- `products/category/[slug]/page.tsx` - Kategoriye göre kullanım alanları
- `products/detail/[slug]/page.tsx` - Ürün detay sayfası
- `products/[category]/page.tsx` - Ürün kategori sayfası
- `usage/[slug]/page.tsx` - Kullanım alanı detay sayfası

#### `api/blog/search/route.ts`
**Ne işe yarar:** Blog arama için API route.

**Değiştirilmesi gerekenler:**
- ✅ Arama mantığını özelleştirebilirsiniz
- ✅ Yeni API route'ları ekleyebilirsiniz

#### `api/products/search/route.ts`
**Ne işe yarar:** Ürün arama için API route.

**Değiştirilmesi gerekenler:**
- ✅ Arama mantığını özelleştirebilirsiniz
- ✅ API endpoint'ini güncelleyebilirsiniz (şu an `/usage/v1/search/{keyword}` kullanıyor)

---

## 🔌 API Yapısı ve Formatları

### API Base URL

API base URL'i `.env.local` dosyasında tanımlanır:

```env
NEXT_PUBLIC_API_URL=https://your-wordpress-site.com/wp-json
```

### API Response Formatı

Tüm API response'ları şu formatı kullanmalıdır:

```typescript
{
  success: boolean;
  data: any; // Response verisi
}
```

### Mevcut API Endpoint'leri

#### Blog API'leri
- `GET /posts/v1` - Tüm blog yazıları (pagination destekler)
- `GET /posts/v1?page=2` - Sayfalama
- `GET /posts/v1/detail/{slug}` - Blog detay
- `GET /posts/v1/search/{keyword}` - Blog arama
- `GET /posts/v1/category/{category_slug}` - Kategoriye göre postlar
- `GET /posts/v1/categories` - Tüm kategoriler

#### Ürün API'leri
- `GET /product/v1/detail/{slug}` - Ürün detay
- `GET /product-category/v1/{category_slug}` - Ürün kategori
- `GET /usage/v1/search/{keyword}` - Ürün arama (kullanım alanları üzerinden)

#### Kullanım Alanı API'leri
- `GET /usage/v1` - Tüm kullanım alanları
- `GET /usage/v1/detail/{slug}` - Kullanım alanı detay
- `GET /usage/v1/categories` - Kullanım alanı kategorileri
- `GET /usage/v1/category/{category_slug}` - Kategoriye göre kullanım alanları

#### Sayfa API'leri
- `GET /page/v1/{slug}` - Dinamik sayfa

#### SEO API
- `GET /custom-seo/v1/getHead?url={full_url}` - SEO metadata

### API Response Type'ları

Tüm API response type'ları `src/types/api.ts` dosyasında tanımlıdır. API'nizin döndürdüğü veri yapısına göre bu type'ları güncelleyin.

**Önemli:** API formatı değiştiğinde:
1. `src/types/api.ts` dosyasını güncelleyin
2. İlgili service fonksiyonlarını kontrol edin
3. İlgili sayfa component'lerini kontrol edin

---

## 🧩 Block Component'leri Ekleme

Block component'leri, WordPress ACF Flexible Content'ten gelen block'ları render eder.

### Adım 1: Block Interface'ini Tanımlayın

Yeni bir block component'i oluşturun: `src/components/blocks/NewBlock.tsx`

```typescript
import { BaseBlock } from '@/types/api';

// Block interface'ini component içinde tanımlayın (co-located types)
export interface NewBlockProps extends BaseBlock {
  acf_fc_layout: 'newblock'; // API'den gelen block type adı
  title: string;
  description?: string;
  image?: string;
  // ... diğer field'lar
}

export default function NewBlock({ 
  title, 
  description, 
  image 
}: NewBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
        {image && (
          <Image 
            src={image} 
            alt={title} 
            width={800} 
            height={600} 
          />
        )}
      </div>
    </section>
  );
}
```

### Adım 2: BlockRenderer'a Ekleyin

`src/components/blocks/BlockRenderer.tsx` dosyasını güncelleyin:

```typescript
import NewBlock from './NewBlock';

const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  imagecontent: ImageContent,
  newblock: NewBlock, // Yeni block'u ekleyin
  // ... diğer block'lar
};
```

**Önemli:** `acf_fc_layout` değeri, `blockMap` key'i ile tam olarak eşleşmelidir (case-sensitive).

### Adım 3: Type Tanımını Güncelleyin (Opsiyonel)

Eğer block'unuz `BaseBlock`'tan farklı bir yapıya sahipse, `src/types/api.ts` dosyasına özel bir interface ekleyebilirsiniz:

```typescript
export interface NewBlockData extends BaseBlock {
  acf_fc_layout: 'newblock';
  title: string;
  description?: string;
}
```

### Block Component Best Practices

1. **Co-located Types:** Interface'i component dosyasının içinde tanımlayın
2. **SSR First:** Varsayılan olarak Server Component kullanın
3. **Client Component:** Sadece interactivity gerektiğinde `'use client'` ekleyin
4. **Error Handling:** Null/undefined kontrolü yapın
5. **Accessibility:** Semantic HTML ve ARIA attribute'ları kullanın

---

## 🌍 Yeni Dil Ekleme

### Adım 1: Locale Config'e Ekleyin

`src/i18n/config.ts` dosyasını güncelleyin:

```typescript
export const locales = ['tr', 'en', 'de'] as const; // Yeni dil: 'de'
export const defaultLocale = 'tr' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch', // Yeni dil
};
```

### Adım 2: Çeviri Dosyası Oluşturun

`src/i18n/messages/de.json` dosyası oluşturun:

```json
{
  "common": {
    "back": "Zurück",
    "search": "Suchen",
    "categories": "Kategorien"
  },
  "blog": {
    "title": "Blog",
    "backToBlog": "Zurück zum Blog"
  },
  "products": {
    "title": "Produkte",
    "backToProducts": "Zurück zu Produkten"
  },
  "notFound": {
    "title": "404 - Seite nicht gefunden",
    "description": "Die gesuchte Seite konnte nicht gefunden werden.",
    "backToHome": "Zurück zur Startseite"
  }
}
```

### Adım 3: getTranslations Fonksiyonunu Güncelleyin

`src/i18n/getTranslations.ts` dosyasını güncelleyin:

```typescript
import trMessages from './messages/tr.json';
import enMessages from './messages/en.json';
import deMessages from './messages/de.json'; // Yeni dil

const messages: Record<Locale, Messages> = {
  tr: trMessages,
  en: enMessages,
  de: deMessages, // Yeni dil
};
```

### Adım 4: Middleware'i Test Edin

Middleware otomatik olarak yeni locale'i algılar. Test edin:

```bash
npm run dev
# http://localhost:3001/de/hakkimizda
```

### Çeviri Dosyası Yapısı

Çeviri dosyaları nested object yapısını destekler:

```json
{
  "common": {
    "back": "Geri",
    "search": "Ara"
  },
  "blog": {
    "title": "Blog",
    "categories": {
      "title": "Kategoriler",
      "empty": "Kategori bulunamadı"
    }
  }
}
```

Kullanım:
```typescript
const t = getTranslations(locale);
t.blog.categories.title // "Kategoriler"
```

---

## 🎨 Component Ekleme

### Yeni UI Component'i Ekleme

#### shadcn/ui Kullanarak

```bash
npx shadcn@latest add [component-name]
```

Örnek:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

#### Manuel Olarak

1. `src/components/ui/` klasörüne yeni component ekleyin
2. shadcn/ui pattern'ini takip edin
3. `src/lib/utils.ts` dosyasındaki `cn()` fonksiyonunu kullanın

### Yeni Feature Component'i Ekleme

1. `src/components/` klasörüne yeni component ekleyin
2. Server Component olarak başlayın
3. Interactivity gerekiyorsa `'use client'` ekleyin

**Örnek:**
```typescript
// src/components/Newsletter.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
        <form className="flex gap-2">
          <Input type="email" placeholder="E-posta" />
          <Button type="submit">Abone Ol</Button>
        </form>
      </div>
    </section>
  );
}
```

---

## 📦 Modül Ekleme

### Yeni Service Modülü Ekleme

1. `src/services/` klasörüne yeni dosya ekleyin: `news.ts`

```typescript
// src/services/news.ts
import { fetchAPI } from './core';
import type { NewsResponse } from '../types/api';

export async function getNews(): Promise<NewsResponse> {
  return fetchAPI<NewsResponse>('/news/v1');
}

export async function getNewsBySlug(slug: string): Promise<NewsDetailResponse> {
  try {
    return await fetchAPI<NewsDetailResponse>(`/news/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes('404')) {
      return { success: false } as NewsDetailResponse;
    }
    throw error;
  }
}
```

2. `src/types/api.ts` dosyasına type'ları ekleyin:

```typescript
export interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
}

export interface NewsResponse {
  success: boolean;
  data: News[];
}
```

3. Yeni sayfa oluşturun: `src/app/[locale]/news/page.tsx`

### Yeni Utility Modülü Ekleme

1. `src/utils/` klasörüne yeni dosya ekleyin: `date-helper.ts`

```typescript
// src/utils/date-helper.ts
export function formatDate(date: string, locale: string = 'tr'): string {
  return new Date(date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

2. Kullanım:
```typescript
import { formatDate } from '@/utils/date-helper';
formatDate(post.date, locale);
```

---

## 🏗️ Build ve Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Build Alırken Dikkat Edilmesi Gerekenler

1. **Environment Variables:**
   - `.env.local` dosyasını production'da kullanmayın
   - Production'da environment variable'ları hosting platform'unuzda ayarlayın

2. **Image Optimization:**
   - `next.config.ts` dosyasında `images.remotePatterns` ayarlarını kontrol edin
   - WordPress API'den gelen resimlerin domain'ini ekleyin

3. **Static Generation:**
   - `generateStaticParams()` fonksiyonlarını kullanarak statik sayfalar oluşturun
   - `revalidate` değerlerini ayarlayın (ISR - Incremental Static Regeneration)

4. **API Routes:**
   - Client-side API route'ları production'da çalışmayabilir
   - Server-side API route'ları kullanın

5. **Type Checking:**
   ```bash
   npm run build
   # TypeScript hatalarını kontrol edin
   ```

### Deployment Platform'ları

#### Vercel
```bash
vercel
```

#### Netlify
```bash
netlify deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## ⚡ Next.js Özellikleri

### Server Components (Varsayılan)

Next.js 15'te tüm component'ler varsayılan olarak Server Component'tir.

```typescript
// Server Component (varsayılan)
export default async function Page() {
  const data = await fetchData(); // Server-side data fetching
  return <div>{data}</div>;
}
```

### Client Components

Interactivity gerektiğinde `'use client'` ekleyin:

```typescript
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Data Fetching

#### Server-Side Fetching

```typescript
// Sayfa component'inde
export default async function Page() {
  const data = await fetchAPI<Data>('/endpoint');
  return <div>{data.title}</div>;
}
```

#### Client-Side Fetching

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}
```

### Metadata ve SEO

```typescript
// generateMetadata fonksiyonu
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      images: [data.image],
    },
  };
}
```

### Dynamic Routes

```typescript
// [slug]/page.tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // slug kullan
}
```

### Route Handlers (API Routes)

```typescript
// app/api/route/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = await fetchData();
  return NextResponse.json(data);
}
```

---

## 📝 Syntax ve Best Practices

### TypeScript Syntax

#### Interface Tanımlama

```typescript
// Co-located types (component içinde)
export interface ComponentProps {
  title: string;
  description?: string; // Optional
}

// Shared types (types/api.ts)
export interface ApiResponse {
  success: boolean;
  data: any;
}
```

#### Type Guards

```typescript
if (error instanceof Error) {
  console.error(error.message);
}
```

#### Optional Chaining

```typescript
const title = data?.title || 'Default Title';
const count = items?.length ?? 0; // Nullish coalescing
```

### React Syntax

#### Conditional Rendering

```typescript
// If kontrolü
{condition && <Component />}

// Ternary
{condition ? <ComponentA /> : <ComponentB />}

// Null check
{data && <div>{data.title}</div>}
```

#### Map Rendering

```typescript
{items.map((item, index) => (
  <div key={item.id || index}>{item.title}</div>
))}
```

#### Event Handlers

```typescript
// Inline
<button onClick={() => handleClick()}>Click</button>

// With parameters
<button onClick={(e) => handleClick(e, id)}>Click</button>
```

### Async/Await

```typescript
// Server Component
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// Try-catch
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}
```

### Error Handling

```typescript
// Service fonksiyonlarında
try {
  return await fetchAPI<Response>(endpoint);
} catch (error) {
  if (error instanceof Error && error.message?.includes('404')) {
    return { success: false } as Response;
  }
  throw error;
}

// Sayfa component'lerinde
const data = await getData();
if (!data.success) {
  notFound(); // 404 sayfasına yönlendir
}
```

---

## 📂 Public Klasörü Kullanımı

### Klasör Yapısı

```
public/
├── images/          # Statik resimler
│   ├── logo.png
│   ├── hero-bg.jpg
│   └── icons/
├── videos/          # Statik videolar
│   └── intro.mp4
├── fonts/           # Custom fontlar
│   ├── custom-font.woff2
│   └── custom-font.woff
├── files/           # İndirilebilir dosyalar
│   ├── catalog.pdf
│   └── brochure.pdf
└── favicon.ico      # Site ikonu
```

### Kullanım

#### Resimler

```typescript
import Image from 'next/image';

<Image 
  src="/images/logo.png" 
  alt="Logo" 
  width={200} 
  height={50} 
/>
```

#### Videolar

```html
<video src="/videos/intro.mp4" controls />
```

#### Fontlar

`src/app/[locale]/layout.tsx` dosyasında:

```typescript
import localFont from 'next/font/local';

const customFont = localFont({
  src: '../public/fonts/custom-font.woff2',
  variable: '--font-custom',
});

// Kullanım
<body className={customFont.variable}>
```

#### Dosyalar

```typescript
<Link href="/files/catalog.pdf" download>
  Katalog İndir
</Link>
```

### Best Practices

1. **Optimizasyon:** Resimleri optimize edin (WebP formatı kullanın)
2. **Naming:** Dosya isimlerini kebab-case kullanın: `hero-background.jpg`
3. **Organization:** Dosyaları kategorilere göre organize edin
4. **Size:** Büyük dosyaları CDN'de tutun, public klasöründe tutmayın

---

## 🗺️ Yol Haritası

### Yeni Proje Başlatma Adımları

1. **Kurulum**
   - [ ] Projeyi klonlayın
   - [ ] `npm install` çalıştırın
   - [ ] `.env.local` dosyası oluşturun

2. **API Yapılandırması**
   - [ ] WordPress API URL'ini ayarlayın
   - [ ] `src/types/api.ts` dosyasını API'nize göre güncelleyin
   - [ ] `src/services/*.ts` dosyalarındaki endpoint'leri kontrol edin

3. **Block Component'leri**
   - [ ] Mevcut block'ları inceleyin
   - [ ] Gereksiz block'ları silin
   - [ ] Yeni block'ları ekleyin
   - [ ] `BlockRenderer.tsx` dosyasını güncelleyin

4. **Çeviriler**
   - [ ] `src/i18n/messages/tr.json` dosyasını güncelleyin
   - [ ] `src/i18n/messages/en.json` dosyasını güncelleyin
   - [ ] Yeni dil ekleyin (gerekirse)

5. **Sayfalar**
   - [ ] Ana sayfayı özelleştirin (`src/app/[locale]/page.tsx`)
   - [ ] Blog sayfalarını özelleştirin
   - [ ] Ürün sayfalarını özelleştirin
   - [ ] Yeni sayfa türleri ekleyin (gerekirse)

6. **Stil ve Tema**
   - [ ] `src/app/globals.css` dosyasını özelleştirin
   - [ ] Tailwind theme ayarlarını güncelleyin
   - [ ] UI component'lerini özelleştirin

7. **SEO**
   - [ ] `src/utils/seo-helper.ts` dosyasını SEO API'nize göre güncelleyin
   - [ ] `src/utils/url-helper.ts` dosyasındaki URL'leri güncelleyin
   - [ ] Her sayfada `generateMetadata` fonksiyonlarını kontrol edin

8. **Test ve Build**
   - [ ] `npm run dev` ile test edin
   - [ ] `npm run build` ile build alın
   - [ ] Hataları düzeltin
   - [ ] Production'da test edin

### Checklist: Projeyi Özelleştirme

#### Değiştirilmesi Gerekenler ✅

- [ ] `.env.local` - API URL'leri ve site URL'i
- [ ] `src/types/api.ts` - API response type'ları
- [ ] `src/services/*.ts` - API endpoint'leri (eğer farklıysa)
- [ ] `src/components/blocks/*.tsx` - Block component'leri
- [ ] `src/i18n/messages/*.json` - Çeviri dosyaları
- [ ] `src/app/[locale]/page.tsx` - Ana sayfa
- [ ] `src/app/[locale]/layout.tsx` - Header, footer, navigation
- [ ] `next.config.ts` - Image domains
- [ ] `src/utils/url-helper.ts` - Production URL
- [ ] `src/utils/seo-helper.ts` - SEO API formatı (eğer farklıysa)

#### Değiştirilmemesi Gerekenler ❌

- [ ] `middleware.ts` - Locale routing mantığı
- [ ] `src/utils/locale-helper.ts` - Locale helper fonksiyonları
- [ ] `src/i18n/config.ts` - Sadece yeni dil eklerken
- [ ] `src/i18n/getTranslations.ts` - Çeviri yükleme mantığı
- [ ] `src/services/core.ts` - Fetch wrapper mantığı
- [ ] `src/components/LanguageSwitcher.tsx` - Dil değiştirme mantığı
- [ ] `src/components/seo/JsonLd.tsx` - JSON-LD formatı

---

## 🔧 Troubleshooting

### Yaygın Hatalar ve Çözümleri

#### 1. "Cannot find module '@/types'"
**Çözüm:** `tsconfig.json` dosyasında path alias'ları kontrol edin.

#### 2. "API Error: 404 Not Found"
**Çözüm:** 
- API endpoint'lerini kontrol edin
- `.env.local` dosyasındaki `NEXT_PUBLIC_API_URL` değerini kontrol edin
- Service fonksiyonlarında 404 hatası yakalanıyor mu kontrol edin

#### 3. "Module not found: Can't resolve '@/lib/utils'"
**Çözüm:** `src/lib/utils.ts` dosyasının var olduğundan emin olun.

#### 4. Locale routing çalışmıyor
**Çözüm:** 
- `middleware.ts` dosyasının root'ta olduğundan emin olun
- `src/i18n/config.ts` dosyasındaki locale'leri kontrol edin

#### 5. Block component render edilmiyor
**Çözüm:**
- `BlockRenderer.tsx` dosyasında block'un import edildiğinden emin olun
- `acf_fc_layout` değerinin `blockMap` key'i ile eşleştiğinden emin olun
- Console'da uyarı mesajlarını kontrol edin

---

## 📚 Ek Kaynaklar

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)

---

## 📞 Destek

Sorularınız için:
- GitHub Issues açın
- Dokümantasyonu inceleyin
- Next.js ve TypeScript dokümantasyonlarına bakın

---

## 📄 Lisans

Bu proje bir starter template'dir. Projenize göre özelleştirin ve kullanın.

---

**Son Güncelleme:** 2024
