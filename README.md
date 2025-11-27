# 🚀 Next.js 15 Headless WordPress Starter

> **Altyapıyı Hazırlayan:** Arda Uzun  
> **Versiyon:** 1.0.0  
> **Next.js:** 15 (App Router)  
> **TypeScript:** 5+

Bu proje, Next.js 15 App Router kullanarak Headless WordPress entegrasyonu için hazırlanmış profesyonel bir starter template'dir. Çok dilli (i18n) desteği, SEO optimizasyonu, dinamik block rendering ve modern UI component'leri içerir.

---

## 📑 İçindekiler

- [🎯 Hızlı Başlangıç](#-hızlı-başlangıç-5-dakika)
- [⚙️ Yapılandırma: Değiştirilmesi Gerekenler](#️-yapılandırma-değiştirilmesi-gerekenler)
- [📁 Proje Yapısı](#-proje-yapısı)
- [🔌 API Yapısı ve Servisler](#-api-yapısı-ve-servisler)
  - [İki Katman Neden Gerekli?](#-iki-katman-neden-gerekli)
  - [Ne Zaman Hangisi?](#-ne-zaman-hangisi)
  - [API Route Nasıl Çalışır?](#-api-route-nasıl-çalışır)
- [🎨 Block Component'leri](#-block-componentleri)
- [🧩 UI Component'leri ve Variant Kullanımı](#-ui-componentleri-ve-variant-kullanımı)
- [🖼️ Next.js Image Kullanımı](#️-nextjs-image-kullanımı)
- [🌍 Çok Dilli Yapı (i18n)](#-çok-dilli-yapı-i18n)
- [📄 Sayfa Oluşturma](#-sayfa-oluşturma)
- [🔍 Arama Fonksiyonları](#-arama-fonksiyonları)
- [📝 Form Oluşturma](#-form-oluşturma)
- [🗑️ Kullanılmayan Modülleri Kaldırma](#️-kullanılmayan-modülleri-kaldırma)
- [🆘 Hata Çözümleri](#-hata-çözümleri)
- [📚 Next.js Temel Kavramlar](#-nextjs-temel-kavramlar)

---

## 🎯 Hızlı Başlangıç (5 Dakika)

### 1️⃣ Projeyi Hazırla

```bash
# Projeyi klonla
git clone <repository-url>
cd next-starter

# Bağımlılıkları yükle
npm install
```

### 2️⃣ Environment Dosyasını Oluştur

`.env.local` dosyası oluştur ve doldur:

```env
# WordPress API'nizin adresi (ÖNEMLİ: Kendi URL'inizi yazın!)
NEXT_PUBLIC_API_URL=https://your-wordpress-site.com/wp-json

# Sitenizin canlı URL'i
NEXT_PUBLIC_SITE_URL=https://your-frontend-site.com

# Site adı
NEXT_PUBLIC_SITE_NAME=Proje Adı
```

### 3️⃣ Çalıştır

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç. 🎉

---

## ⚙️ Yapılandırma: Değiştirilmesi Gerekenler

### 🔴 ÖNEMLİ: Bu Dosyalardaki URL'leri Değiştirin!

Projeyi kullanmaya başlamadan önce aşağıdaki dosyalardaki **örnek URL'leri kendi URL'lerinizle değiştirmelisiniz:**

#### 1. `next.config.ts` - Resim Domain İzni

```typescript
// next.config.ts (Satır 8)
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-example-panel.pentademo.com.tr", // ⚠️ BURAYI DEĞİŞTİR!
        // Kendi WordPress domain'inizi yazın: "your-wordpress-site.com"
      },
    ],
  },
};
```

**Ne İşe Yarar?**  
Next.js Image component'i güvenlik nedeniyle sadece izin verilen domain'lerden resim yükler. WordPress'ten gelen resimlerin gösterilmesi için WordPress domain'inizi buraya eklemelisiniz.

**Örnek:**

```typescript
hostname: "example.com", // ✅ Doğru
hostname: "cdn.example.com", // ✅ CDN için de ekleyebilirsiniz
```

---

#### 2. `src/services/core.ts` - API Base URL

```typescript
// src/services/core.ts (Satır 2-3)
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://frontend-example-panel.pentademo.com.tr/wp-json"; // ⚠️ BURAYI DEĞİŞTİR!
```

**Ne İşe Yarar?**  
Tüm API çağrıları bu base URL'i kullanır. Eğer `.env.local` dosyasında `NEXT_PUBLIC_API_URL` tanımlıysa onu kullanır, yoksa bu fallback değeri kullanılır.

**Örnek:**

```typescript
// .env.local dosyasında tanımlıysa:
NEXT_PUBLIC_API_URL=https://my-site.com/wp-json
// Bu değer kullanılır ✅

// Tanımlı değilse:
// Fallback değer kullanılır (core.ts'deki)
```

**⚠️ Öneri:** `.env.local` dosyasını kullanın, `core.ts`'deki fallback değeri sadece development için bırakın.

---

#### 3. `src/utils/url-helper.ts` - Production URL

```typescript
// src/utils/url-helper.ts (Satır 1)
const PRODUCTION_URL = "https://frontend-example-panel.pentademo.com.tr"; // ⚠️ BURAYI DEĞİŞTİR!
```

**Ne İşe Yarar?**  
SEO API çağrıları için production URL'i kullanır. WordPress SEO API'si, tam URL'ler bekler (örn: `https://site.com/hakkimizda/`).

**Örnek:**

```typescript
const PRODUCTION_URL = "https://my-production-site.com"; // ✅ Kendi URL'iniz
```

**Neden Production URL?**  
SEO API'si, WordPress'teki SEO ayarlarını kontrol eder. Bu ayarlar production URL'ine göre yapılandırılmıştır, bu yüzden localhost yerine production URL kullanılır.

---

#### 4. `src/components/ContactForm.tsx` - Form Action URL

```typescript
// src/components/ContactForm.tsx (Satır 35)
const FORM_ACTION_URL =
  "https://frontend-example-panel.pentademo.com.tr/wp-admin/admin-ajax.php"; // ⚠️ BURAYI DEĞİŞTİR!
```

**Ne İşe Yarar?**  
İletişim formu gönderildiğinde, form verileri bu WordPress admin-ajax.php endpoint'ine POST edilir.

**Örnek:**

```typescript
const FORM_ACTION_URL = "https://my-site.com/wp-admin/admin-ajax.php"; // ✅ Kendi URL'iniz
```

**WordPress Tarafında:**  
WordPress'te `action: 'contact_form_submit'` ile bir AJAX handler oluşturmanız gerekir.

---

### ✅ Yapılandırma Checklist

- [ ] `next.config.ts` - WordPress domain'ini ekle
- [ ] `.env.local` - `NEXT_PUBLIC_API_URL` değerini ayarla
- [ ] `src/services/core.ts` - Fallback URL'i güncelle (opsiyonel)
- [ ] `src/utils/url-helper.ts` - Production URL'i güncelle
- [ ] `src/components/ContactForm.tsx` - Form action URL'i güncelle

---

## 📁 Proje Yapısı

```
next-starter/
├── public/                    # Statik dosyalar
│   ├── images/               # Resimler
│   ├── videos/               # Videolar
│   └── files/                # PDF, dokümanlar
│
├── src/
│   ├── app/                  # Next.js sayfaları (App Router)
│   │   ├── [locale]/         # Dil bazlı route'lar
│   │   │   ├── layout.tsx   # Ana layout (Header + Footer)
│   │   │   ├── page.tsx     # Ana sayfa
│   │   │   ├── [slug]/      # Dinamik sayfalar
│   │   │   ├── blog/        # Blog sayfaları
│   │   │   ├── products/    # Ürün sayfaları
│   │   │   └── usage/       # Kullanım alanı sayfaları
│   │   └── api/             # API route'ları
│   │       ├── blog/        # Blog API route'ları
│   │       └── products/    # Ürün API route'ları
│   │
│   ├── components/           # React component'leri
│   │   ├── blocks/          # Block component'leri (ACF Flexible Content)
│   │   │   ├── Hero.tsx     # Hero block
│   │   │   ├── ImageContent.tsx
│   │   │   └── BlockRenderer.tsx  # Block renderer
│   │   ├── ui/              # shadcn/ui component'leri
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── input.tsx
│   │   ├── Header.tsx       # Site header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── ContactForm.tsx  # İletişim formu
│   │   └── LanguageSwitcher.tsx
│   │
│   ├── services/            # API servisleri
│   │   ├── core.ts         # Temel fetch fonksiyonu
│   │   ├── blog.ts         # Blog API'leri
│   │   ├── product.ts      # Ürün API'leri
│   │   ├── page.ts         # Sayfa API'leri
│   │   ├── usage.ts        # Kullanım alanı API'leri
│   │   └── global.ts       # Global options (menu, footer)
│   │
│   ├── types/               # TypeScript type tanımları
│   │   └── api.ts          # API response type'ları
│   │
│   ├── utils/               # Yardımcı fonksiyonlar
│   │   ├── url-helper.ts   # URL oluşturma
│   │   ├── seo-helper.ts    # SEO metadata
│   │   └── locale-helper.ts # Locale yardımcıları
│   │
│   └── i18n/                # Çok dilli yapı
│       ├── config.ts        # Dil ayarları
│       ├── getTranslations.ts
│       └── messages/        # Çeviri dosyaları
│           ├── tr.json
│           └── en.json
│
├── middleware.ts            # Next.js middleware (dil yönlendirme)
├── next.config.ts          # Next.js yapılandırması
├── tsconfig.json           # TypeScript yapılandırması
└── package.json            # Bağımlılıklar
```

---

## 🔌 API Yapısı ve Servisler

### 📡 API Nasıl Çalışır?

Projede **iki katmanlı bir API yapısı** kullanılıyor:

1. **WordPress REST API** → Veri sağlar
2. **Service Fonksiyonları** (`src/services/`) → WordPress API'ye direkt çağrı yapar
3. **Next.js API Routes** (`src/app/api/`) → Client component'ler için proxy görevi görür
4. **Sayfa Component'leri** → Service'leri veya API route'ları kullanır

### 🔄 İki Katman Neden Gerekli?

#### `src/services/` - Server Component'ler İçin

**Ne İşe Yarar?**  
Server Component'lerde (varsayılan) WordPress API'ye **direkt erişim** için kullanılır.

**Özellikler:**
- ✅ Server-side'da çalışır (güvenli)
- ✅ WordPress API'ye direkt erişim
- ✅ SEO dostu (SSR)
- ✅ Daha hızlı (server-side rendering)

**Kullanım:**
```typescript
// ✅ Server Component (varsayılan)
// src/app/[locale]/blog/page.tsx
import { getPosts } from '@/services/blog';

export default async function BlogPage() {
  // Server-side'da çalışır, direkt WordPress API'ye erişir
  const postsData = await getPosts(1);
  
  return (
    <div>
      {postsData.data.posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

**Akış:**
```
Server Component → src/services/blog.ts → WordPress API
```

---

#### `src/app/api/` - Client Component'ler İçin

**Ne İşe Yarar?**  
Client Component'lerde (`'use client'`) WordPress API'ye **proxy üzerinden erişim** için kullanılır.

**Neden Gerekli?**
- ❌ Client component'ler server-side kod çalıştıramaz
- ❌ CORS sorunları (WordPress API farklı domain'de)
- ❌ API key'leri expose olur (güvenlik riski)
- ❌ Rate limiting sorunları

**Çözüm:** Next.js API Routes bir **proxy** görevi görür.

**Kullanım:**
```typescript
// ✅ Client Component
// src/app/[locale]/usage/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function UsagePage() {
  const [areas, setAreas] = useState([]);
  
  useEffect(() => {
    // Client-side'da çalışır, Next.js API route'unu çağırır
    fetch('/api/usage/areas')
      .then(res => res.json())
      .then(data => setAreas(data.data));
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

**Akış:**
```
Client Component → /api/usage/areas → src/services/usage.ts → WordPress API
```

---

### 📁 Dosya Yapısı

```
src/
├── services/              👉 Server Component'ler için
│   ├── core.ts           → fetchAPI wrapper
│   ├── blog.ts           → Blog API fonksiyonları
│   ├── product.ts        → Ürün API fonksiyonları
│   ├── usage.ts          → Usage API fonksiyonları
│   └── ...
│
└── app/
    └── api/              👉 Client Component'ler için
        ├── blog/
        │   └── search/
        │       └── route.ts  → searchPosts() çağırır
        ├── products/
        │   └── search/
        │       └── route.ts  → searchProducts() çağırır
        └── usage/
            ├── areas/
            │   └── route.ts  → getUsageAreas() çağırır
            ├── categories/
            │   └── route.ts  → getUsageCategories() çağırır
            └── category/
                └── [slug]/
                    └── route.ts  → getUsageAreasByCategory() çağırır
```

---

### 🎯 Ne Zaman Hangisi?

| Durum | Kullanılacak Yer | Örnek |
|-------|------------------|-------|
| **Server Component** (varsayılan) | `src/services/` | Blog listesi, ürün detayı, sayfa içeriği |
| **Client Component** (`'use client'`) | `src/app/api/` | Arama, filtreleme, load more, form submit |

**Örnekler:**

#### ✅ Server Component → `src/services/`
```typescript
// src/app/[locale]/blog/page.tsx
import { getPosts } from '@/services/blog';

export default async function BlogPage() {
  const postsData = await getPosts(1);
  return <div>{/* ... */}</div>;
}
```

#### ✅ Client Component → `src/app/api/`
```typescript
// src/app/[locale]/usage/page.tsx
'use client';

export default function UsagePage() {
  useEffect(() => {
    fetch('/api/usage/areas').then(/* ... */);
  }, []);
  return <div>{/* ... */}</div>;
}
```

---

### 🔧 API Route Nasıl Çalışır?

**Örnek: `/api/usage/areas/route.ts`**

```typescript
// src/app/api/usage/areas/route.ts
import { getUsageAreas } from '@/services/usage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Service fonksiyonunu çağır (WordPress API'ye erişir)
    const data = await getUsageAreas();
    
    // Client'a JSON döndür
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch' },
      { status: 500 }
    );
  }
}
```

**Akış:**
1. Client component: `fetch('/api/usage/areas')`
2. Next.js API route: `GET /api/usage/areas`
3. Service fonksiyonu: `getUsageAreas()` çağrılır
4. WordPress API: `/usage/v1` endpoint'ine istek atılır
5. Response: Client'a JSON olarak döner

---

### 🆕 Yeni API Route Ekleme

**Senaryo:** Client component'te kullanılacak yeni bir endpoint ekleyelim.

#### 1. Service Fonksiyonu (Zaten Var)
```typescript
// src/services/blog.ts
export async function searchPosts(keyword: string) {
  return fetchAPI(`/posts/v1/search/${keyword}`);
}
```

#### 2. API Route Oluştur
```typescript
// src/app/api/blog/search/route.ts
import { searchPosts } from '@/services/blog';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json(
      { success: false, error: 'Keyword required' },
      { status: 400 }
    );
  }

  try {
    const data = await searchPosts(keyword);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
```

#### 3. Client Component'te Kullan
```typescript
// src/app/[locale]/blog/search/page.tsx
'use client';

export default function BlogSearchPage() {
  const handleSearch = async (keyword: string) => {
    const response = await fetch(`/api/blog/search?keyword=${keyword}`);
    const data = await response.json();
    // ...
  };
  
  return <div>{/* ... */}</div>;
}
```

---

### ⚠️ Önemli Notlar

1. **Server Component'lerde `src/app/api/` kullanmayın!**
   ```typescript
   // ❌ YANLIŞ
   export default async function Page() {
     const res = await fetch('/api/usage/areas'); // Gereksiz!
     // ...
   }
   
   // ✅ DOĞRU
   import { getUsageAreas } from '@/services/usage';
   export default async function Page() {
     const data = await getUsageAreas(); // Direkt service kullan
     // ...
   }
   ```

2. **Client Component'lerde `src/services/` kullanmayın!**
   ```typescript
   // ❌ YANLIŞ
   'use client';
   import { getUsageAreas } from '@/services/usage';
   // Bu çalışmaz! Client component'ler server-side kod çalıştıramaz.
   
   // ✅ DOĞRU
   'use client';
   useEffect(() => {
     fetch('/api/usage/areas').then(/* ... */);
   }, []);
   ```

3. **API Route'lar sadece proxy görevi görür**
   - Ekstra iş mantığı eklemeyin
   - Service fonksiyonlarını direkt çağırın
   - Hata yönetimi yapın

---

### 📊 Özet Tablo

| Özellik | `src/services/` | `src/app/api/` |
|---------|----------------|----------------|
| **Kullanım** | Server Component | Client Component |
| **Çalışma Yeri** | Server-side | Server-side (proxy) |
| **Erişim** | WordPress API'ye direkt | Service fonksiyonları üzerinden |
| **SEO** | ✅ Evet (SSR) | ❌ Hayır (client-side) |
| **Güvenlik** | ✅ Güvenli (server-side) | ✅ Güvenli (proxy) |
| **Hız** | ⚡ Çok hızlı | 🐢 Biraz yavaş (ekstra katman) |

### 🛠️ Service Dosyaları ve Ne İşe Yaradıkları

#### `src/services/core.ts` - Temel Fetch Fonksiyonu

**Ne İşe Yarar?**  
Tüm API çağrıları için ortak bir wrapper. Hata yönetimi, cache ayarları ve base URL yönetimi burada yapılır.

```typescript
// ❌ DOĞRUDAN KULLANMAYIN!
// fetchAPI fonksiyonunu diğer service dosyalarında kullanın

// ✅ Diğer service dosyalarında böyle kullanın:
import { fetchAPI } from "./core";

export async function getPostBySlug(slug: string) {
  return await fetchAPI(`/posts/v1/detail/${slug}`);
}
```

**Özellikler:**

- Otomatik base URL ekleme
- Hata yönetimi
- Cache kontrolü (revalidate)
- Type-safe (TypeScript)

---

#### `src/services/blog.ts` - Blog API'leri

**Ne İşe Yarar?**  
Blog yazıları, kategoriler ve arama işlemleri için API çağrıları.

**Fonksiyonlar:**

| Fonksiyon                                | Ne İşe Yarar?                            | Endpoint                                       |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| `getPosts(page)`                         | Tüm blog yazılarını getirir (pagination) | `GET /posts/v1?page=1`                         |
| `getPostBySlug(slug)`                    | Tek blog yazısını getirir                | `GET /posts/v1/detail/{slug}`                  |
| `searchPosts(keyword)`                   | Blog yazılarında arama yapar             | `GET /posts/v1/search/{keyword}`               |
| `getPostsByCategory(categorySlug, page)` | Kategoriye göre blog yazıları            | `GET /posts/v1/category/{categorySlug}?page=1` |
| `getBlogCategories()`                    | Tüm blog kategorilerini getirir          | `GET /posts/v1/categories`                     |

**Örnek Kullanım:**

```typescript
// src/app/[locale]/blog/page.tsx
import { getPosts } from "@/services/blog";

export default async function BlogPage() {
  const postsData = await getPosts(1); // İlk sayfa

  return (
    <div>
      {postsData.data.posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </article>
      ))}
    </div>
  );
}
```

---

#### `src/services/product.ts` - Ürün API'leri

**Ne İşe Yarar?**  
Ürün detayları ve ürün kategorileri için API çağrıları.

**Fonksiyonlar:**

| Fonksiyon                  | Ne İşe Yarar?             | Endpoint                          |
| -------------------------- | ------------------------- | --------------------------------- |
| `getAllProducts(perPage, page)` | Tüm ürünleri getirir (pagination) | `GET /product/v1/all?per_page={perPage}&page={page}` |
| `getProductBySlug(slug)`   | Tek ürün detayını getirir | `GET /product/v1/detail/{slug}`   |
| `getProductCategory(slug)` | Ürün kategorisini getirir | `GET /product-category/v1/{slug}` |
| `searchProducts(keyword)`  | Ürün araması yapar        | `GET /product/v1/search/{keyword}`  |

**Örnek Kullanım:**

```typescript
// src/app/[locale]/products/detail/[slug]/page.tsx
import { getProductBySlug } from "@/services/product";
import BlockRenderer from "@/components/blocks/BlockRenderer";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData.success) {
    notFound(); // 404 sayfası göster
  }

  return (
    <div>
      <BlockRenderer blocks={productData.data.content} />
    </div>
  );
}
```

---

#### `src/services/usage.ts` - Kullanım Alanı API'leri

**Ne İşe Yarar?**  
Kullanım alanları (usage areas) için API çağrıları.

**Fonksiyonlar:**

| Fonksiyon                               | Ne İşe Yarar?                         | Endpoint                                |
| --------------------------------------- | ------------------------------------- | --------------------------------------- |
| `getUsageAreas()`                       | Tüm kullanım alanlarını getirir       | `GET /usage/v1`                         |
| `getUsageAreaDetail(slug)`              | Kullanım alanı detayını getirir       | `GET /usage/v1/detail/{slug}`           |
| `getUsageCategories()`                  | Kullanım alanı kategorilerini getirir | `GET /usage/v1/categories`              |
| `getUsageAreasByCategory(categorySlug)` | Kategoriye göre kullanım alanları     | `GET /usage/v1/category/{categorySlug}` |

**Örnek Kullanım:**

```typescript
// src/app/[locale]/usage/[slug]/page.tsx
import { getUsageAreaDetail } from "@/services/usage";

export default async function UsageAreaPage({ params }) {
  const { slug } = await params;
  const usageData = await getUsageAreaDetail(slug);

  return (
    <div>
      <h1>{usageData.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: usageData.data.content }} />

      {usageData.data.products?.map((product) => (
        <div key={product.slug}>
          <h3>{product.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

---

#### `src/services/page.ts` - Sayfa API'leri

**Ne İşe Yarar?**  
Dinamik sayfalar (örn: Hakkımızda, İletişim) için API çağrıları.

**Fonksiyonlar:**

| Fonksiyon             | Ne İşe Yarar?           | Endpoint              |
| --------------------- | ----------------------- | --------------------- |
| `getPageBySlug(slug)` | Sayfa içeriğini getirir | `GET /page/v1/{slug}` |

**Örnek Kullanım:**

```typescript
// src/app/[locale]/[slug]/page.tsx
import { getPageBySlug } from "@/services/page";
import BlockRenderer from "@/components/blocks/BlockRenderer";

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  return (
    <div>
      <BlockRenderer blocks={pageData.data.content} />
    </div>
  );
}
```

---

#### `src/services/global.ts` - Global Options

**Ne İşe Yarar?**  
Header menü, footer menü, adresler, sosyal medya linkleri ve SEO verileri için API çağrıları.

**Fonksiyonlar:**

| Fonksiyon            | Ne İşe Yarar?                              | Endpoint                               |
| -------------------- | ------------------------------------------ | -------------------------------------- |
| `getGlobalOptions()` | Menü, footer, adresler, sosyal medya       | `GET /options/v1`                      |
| `getSEOData(url)`    | SEO metadata (title, description, OG tags) | `GET /custom-seo/v1/getHead?url={url}` |

**Örnek Kullanım:**

```typescript
// src/app/[locale]/layout.tsx
import { getGlobalOptions } from "@/services/global";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Layout({ params }) {
  const { locale } = await params;
  const globalOptions = await getGlobalOptions();

  return (
    <html>
      <body>
        <Header globalOptions={globalOptions} locale={locale} />
        {children}
        <Footer globalOptions={globalOptions} locale={locale} />
      </body>
    </html>
  );
}
```

---

### 🆕 Yeni API Servisi Ekleme

Örnek: "News" (Haberler) modülü ekleyelim.

#### 1. Service Dosyası Oluştur

```typescript
// src/services/news.ts
import { fetchAPI } from "./core";
import type { NewsItem, NewsResponse } from "../types/api";

/**
 * Tüm haberleri getirir
 */
export async function getNews(page: number = 1): Promise<NewsResponse> {
  return fetchAPI<NewsResponse>(`/news/v1?page=${page}`);
}

/**
 * Haber detayını getirir
 */
export async function getNewsBySlug(slug: string): Promise<NewsItem> {
  try {
    return await fetchAPI<NewsItem>(`/news/v1/detail/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message?.includes("404")) {
      return { success: false } as NewsItem;
    }
    throw error;
  }
}
```

#### 2. Type Tanımları Ekle

```typescript
// src/types/api.ts
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  slug: string;
  thumbnail?: string;
}

export interface NewsResponse {
  success: boolean;
  data: {
    news: NewsItem[];
    total_pages: number;
    current_page: number;
  };
}
```

#### 3. Sayfa Oluştur

```typescript
// src/app/[locale]/news/page.tsx
import { getNews } from "@/services/news";

export default async function NewsPage() {
  const newsData = await getNews(1);

  return (
    <div>
      <h1>Haberler</h1>
      {newsData.data.news.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

---

## 🎨 Block Component'leri

### 📦 Block Nedir?

WordPress'te ACF Flexible Content ile oluşturduğunuz içerik blokları, Next.js'te component olarak render edilir.

**Örnek:** WordPress'te "Hero" block'u oluşturdunuz → Next.js'te `Hero.tsx` component'i render eder.

### 🏗️ Block Yapısı

Her block component'i şu yapıda olmalıdır:

```typescript
// src/components/blocks/MyNewBlock.tsx
import { BaseBlock } from "@/types/api";

// ⚠️ ÖNEMLİ: Interface'i component içinde tanımlayın (co-located types)
export interface MyNewBlockProps extends BaseBlock {
  acf_fc_layout: "mynewblock"; // WordPress'teki block adı (küçük harf)
  title: string;
  description?: string;
  image?: string;
}

export default function MyNewBlock({
  title,
  description,
  image,
}: MyNewBlockProps) {
  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-4">{description}</p>
        )}
        {image && <img src={image} alt={title} className="mt-6" />}
      </div>
    </section>
  );
}
```

### 📝 Block Ekleme Adımları

#### 1. Block Component'i Oluştur

```typescript
// src/components/blocks/Testimonial.tsx
import { BaseBlock } from "@/types/api";

export interface TestimonialBlockProps extends BaseBlock {
  acf_fc_layout: "testimonial";
  author: string;
  quote: string;
  avatar?: string;
}

export default function Testimonial({
  author,
  quote,
  avatar,
}: TestimonialBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <blockquote className="text-2xl italic text-foreground">
          "{quote}"
        </blockquote>
        <div className="mt-6 flex items-center gap-4">
          {avatar && (
            <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
          )}
          <p className="font-semibold">{author}</p>
        </div>
      </div>
    </section>
  );
}
```

#### 2. BlockRenderer'a Ekle

```typescript
// src/components/blocks/BlockRenderer.tsx
import Testimonial from "./Testimonial"; // 👈 Import ekle

const blockMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  imagecontent: ImageContent,
  testimonial: Testimonial, // 👈 Buraya ekle
  // ... diğer block'lar
};
```

#### 3. WordPress'te Block Adını Kontrol Et

WordPress ACF Flexible Content'te block adı **"testimonial"** (küçük harf) ise, Next.js'te de **"testimonial"** olmalı.

**⚠️ Dikkat:**

- Block adları **case-sensitive** (büyük-küçük harf duyarlı)
- WordPress'te "Testimonial" ise Next.js'te "Testimonial" yazmalısınız
- WordPress'te "testimonial" ise Next.js'te "testimonial" yazmalısınız

### 🎯 Block İsimlendirme Kuralları

**✅ Doğru:**

- Component dosyası: `Testimonial.tsx` (PascalCase)
- Block adı (WordPress): `testimonial` (küçük harf)
- Block adı (Next.js): `testimonial` (küçük harf, blockMap'te)

**❌ Yanlış:**

- Component dosyası: `testimonial.tsx` (küçük harf)
- Block adı (Next.js): `Testimonial` (PascalCase, blockMap'te)

**Kural:**

- **Dosya adı:** PascalCase (`Testimonial.tsx`)
- **Block adı (blockMap):** küçük harf (`testimonial`)
- **WordPress block adı:** küçük harf (`testimonial`)

### 📋 Mevcut Block'lar

| Block Adı          | Component              | Ne İşe Yarar?                           |
| ------------------ | ---------------------- | --------------------------------------- |
| `hero`             | `Hero.tsx`             | Hero section (büyük başlık + resim)     |
| `imagecontent`     | `ImageContent.tsx`     | Resim + metin (50/50 layout)            |
| `breadcrumb`       | `Breadcrumb.tsx`       | Sayfa başlığı + arka plan (video/resim) |
| `tab`              | `Tab.tsx`              | Tabbed içerik (client component)        |
| `imagelist`        | `ImageList.tsx`        | Resim listesi (grid)                    |
| `map`              | `Map.tsx`              | Ülke/lokasyon listesi                   |
| `gallery`          | `Gallery.tsx`          | Galeri (masonry grid)                   |
| `featurehighlight` | `FeatureHighlight.tsx` | Özellik vurgulama bölümü                |

---

## 🧩 UI Component'leri ve Variant Kullanımı

### 🎨 shadcn/ui Component'leri

Proje, [shadcn/ui](https://ui.shadcn.com/) component kütüphanesini kullanır. Tüm component'ler `src/components/ui/` klasöründedir.

### 🔘 Button Component - Variant Kullanımı

Button component'i farklı görünümler için variant'lar destekler.

```typescript
import { Button } from '@/components/ui/button';

// Farklı variant'lar
<Button variant="default">Varsayılan</Button>
<Button variant="outline">Çerçeveli</Button>
<Button variant="ghost">Hayalet</Button>
<Button variant="destructive">Tehlikeli İşlem</Button>
<Button variant="secondary">İkincil</Button>
<Button variant="link">Link Gibi</Button>

// Farklı boyutlar
<Button size="default">Varsayılan</Button>
<Button size="sm">Küçük</Button>
<Button size="lg">Büyük</Button>
<Button size="icon">Sadece İkon</Button>

// Link olarak kullanım
<Button asChild variant="outline">
  <Link href="/blog">Blog'a Git</Link>
</Button>
```

**Örnek: Blog Sayfası**

```typescript
// src/app/[locale]/blog/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/blog/search">Ara</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog/categories">Kategoriler</Link>
        </Button>
      </div>
    </div>
  );
}
```

### 🃏 Card Component - Variant Kullanımı

```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Başlık</CardTitle>
    <CardDescription>Açıklama</CardDescription>
  </CardHeader>
  <CardContent>İçerik buraya</CardContent>
</Card>;
```

**Örnek: Blog Post Card**

```typescript
// src/app/[locale]/blog/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group hover:scale-[1.02] transition-all cursor-pointer"
        >
          <Link href={`/blog/${post.slug}`}>
            {post.thumbnail && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {post.description}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  );
}
```

### 📝 Form Component'leri

```typescript
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';

// Input
<Input type="text" placeholder="İsim" />

// Textarea
<Textarea placeholder="Mesaj" className="min-h-[120px]" />

// Label
<Label htmlFor="email">E-posta</Label>

// Checkbox
<Checkbox id="terms" />

// Select
<Select>
  <option value="tr">Türkçe</option>
  <option value="en">English</option>
</Select>
```

---

## 🖼️ Next.js Image Kullanımı

### 📸 Image Component Nedir?

Next.js'in `Image` component'i, resim optimizasyonu, lazy loading ve responsive resimler sağlar.

### ✅ Doğru Kullanım

```typescript
import Image from 'next/image';

// Statik resim (public klasöründen)
<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>

// WordPress'ten gelen resim
<Image
  src={post.thumbnail}
  alt={post.title}
  width={800}
  height={600}
/>

// Responsive resim (fill kullanımı)
<div className="relative w-full h-64">
  <Image
    src={post.thumbnail}
    alt={post.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### 📋 Image Özellikleri

| Özellik            | Ne İşe Yarar?                                         | Örnek                                    |
| ------------------ | ----------------------------------------------------- | ---------------------------------------- |
| `src`              | Resim URL'i                                           | `src="/logo.png"`                        |
| `alt`              | Alternatif metin (SEO için önemli!)                   | `alt="Logo"`                             |
| `width` / `height` | Resim boyutları (fill kullanmıyorsanız zorunlu)       | `width={200} height={100}`               |
| `fill`             | Container'ı doldur (responsive)                       | `fill`                                   |
| `sizes`            | Responsive boyutlar (fill ile kullanılır)             | `sizes="(max-width: 768px) 100vw, 50vw"` |
| `className`        | CSS class'ları                                        | `className="object-cover"`               |
| `priority`         | Lazy loading'i devre dışı bırak (above-the-fold için) | `priority`                               |

### 🎯 Örnekler

#### 1. Hero Resmi (Above-the-Fold)

```typescript
import Image from "next/image";

export default function HeroSection({ image, title }) {
  return (
    <div className="relative w-full h-[60vh]">
      <Image
        src={image}
        alt={title}
        fill
        priority // 👈 İlk görünen resim, lazy loading yok
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl text-white">{title}</h1>
      </div>
    </div>
  );
}
```

#### 2. Blog Post Thumbnail (Grid'de)

```typescript
import Image from "next/image";

export default function BlogCard({ post }) {
  return (
    <article className="group">
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h2>{post.title}</h2>
    </article>
  );
}
```

#### 3. Avatar (Küçük Resim)

```typescript
import Image from "next/image";

export default function UserAvatar({ avatar, name }) {
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden">
      <Image
        src={avatar}
        alt={name}
        width={48}
        height={48}
        className="object-cover"
      />
    </div>
  );
}
```

### ⚠️ Önemli Notlar

1. **Domain İzni:** WordPress domain'ini `next.config.ts` dosyasına eklemelisiniz
2. **Width/Height:** `fill` kullanmıyorsanız `width` ve `height` zorunludur
3. **Alt Text:** SEO için her zaman `alt` ekleyin
4. **Sizes:** `fill` kullanırken `sizes` prop'unu ekleyin (performans için)

---

## 🌍 Çok Dilli Yapı (i18n)

### 🌐 Nasıl Çalışır?

Proje, Next.js middleware kullanarak URL bazlı dil yönlendirmesi yapar.

**URL Yapısı:**

- Türkçe: `/tr/hakkimizda`
- İngilizce: `/en/about`
- Varsayılan: `/tr/...` (middleware otomatik ekler)

### 📝 Yeni Dil Ekleme

Örnek: Almanca (DE) ekleyelim.

#### 1. Config'e Ekle

```typescript
// src/i18n/config.ts
export const locales = ["tr", "en", "de"] as const; // 👈 'de' ekle

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch", // 👈 İsim ekle
};
```

#### 2. Çeviri Dosyası Oluştur

```json
// src/i18n/messages/de.json
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
    "title": "Produkte"
  }
}
```

#### 3. Kullanım

```typescript
// src/app/[locale]/page.tsx
import { getTranslations } from "@/i18n/getTranslations";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div>
      <h1>{t.blog.title}</h1> {/* "Blog" veya "Blog" (dile göre) */}
    </div>
  );
}
```

### 🔗 Localized Link'ler ve URL Mapping

Proje, statik URL'lerin dile göre çevrilmesini destekler. Örneğin:
- Türkçe: `/tr/urunler`, `/tr/kullanim-alanlari`, `/tr/iletisim`
- İngilizce: `/en/products`, `/en/usage`, `/en/contact`

#### URL Mapping Nasıl Çalışır?

URL mapping sistemi `src/i18n/url-mapping.ts` dosyasında tanımlanır:

```typescript
// src/i18n/url-mapping.ts
export const urlMapping: Record<string, Record<Locale, string>> = {
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
  // ... diğer path'ler
};
```

#### Yeni URL Mapping Ekleme

1. **`src/i18n/url-mapping.ts` dosyasına ekleyin:**

```typescript
export const urlMapping: Record<string, Record<Locale, string>> = {
  // ... mevcut mapping'ler
  '/about': {
    tr: '/hakkimizda',
    en: '/about',
  },
};
```

2. **Middleware otomatik olarak çevirir:**

Middleware, gelen URL'leri otomatik olarak orijinal path'e çevirir. Örneğin:
- Kullanıcı `/tr/urunler` adresine gider
- Middleware bunu `/tr/products` olarak Next.js routing sistemine iletir
- Next.js `src/app/[locale]/products/page.tsx` dosyasını render eder

3. **Link'lerde kullanım:**

```typescript
import { getLocalizedPath } from "@/utils/locale-helper";
import Link from "next/link";

export default function Navigation({ locale }) {
  return (
    <nav>
      <Link href={getLocalizedPath("/blog", locale)}>Blog</Link>
      <Link href={getLocalizedPath("/products", locale)}>Ürünler</Link>
    </nav>
  );
}
```

---

## 📄 Sayfa Oluşturma

### 🆕 Yeni Sayfa Ekleme

#### 1. Basit Sayfa

```typescript
// src/app/[locale]/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-8">Hakkımızda</h1>
      <p>İçerik buraya...</p>
    </div>
  );
}
```

**URL:** `/tr/about` veya `/en/about`

#### 2. Dinamik Sayfa (Slug)

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { getPostBySlug } from "@/services/blog";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData.success) {
    notFound(); // 404 sayfası göster
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-5xl font-bold mb-8">{postData.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.data.content }} />
    </article>
  );
}
```

**URL:** `/tr/blog/my-post-slug`

#### 3. SEO Metadata Ekleme

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { getSEOData } from "@/services/global";
import { constructMetadata } from "@/utils/seo-helper";
import { getSEOBlogPostUrl, getSEOBaseUrl } from "@/utils/url-helper";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData.success) {
    return { title: "Post Bulunamadı" };
  }

  const baseUrl = getSEOBaseUrl(locale);
  const fullUrl = getSEOBlogPostUrl(slug);
  const seoData = await getSEOData(fullUrl);

  return constructMetadata(seoData, baseUrl);
}
```

---

## 🔍 Arama Fonksiyonları

### 📋 Arama Nasıl Çalışır?

Projede arama işlemleri **modüler component'ler** kullanılarak yapılmıştır. Bu sayede:
- ✅ Kod tekrarı önlenir
- ✅ Bakım kolaylaşır
- ✅ Tutarlı kullanıcı deneyimi sağlanır
- ✅ Test edilebilirlik artar

### 🧩 Arama Component'leri

Arama ile ilgili tüm component'ler `src/components/search/` klasöründedir:

#### `SearchForm.tsx` - Arama Formu

**Ne İşe Yarar?**  
Arama input'u ve submit butonu içeren yeniden kullanılabilir form component'i.

**Özellikler:**
- Debounce desteği (varsayılan 800ms, `debounceMs={0}` ile devre dışı bırakılabilir)
- Loading state yönetimi
- URL senkronizasyonu
- Otomatik form submit
- **Not:** Usage sayfasında `debounceMs={0}` kullanılır, sadece "Ara" butonuna tıklayınca arama yapılır

**Props:**
```typescript
interface SearchFormProps {
  initialValue?: string;        // Başlangıç değeri
  placeholder?: string;        // Placeholder metni
  onSearch: (keyword: string) => void;  // Arama callback'i
  debounceMs?: number;         // Debounce süresi (ms)
  loading?: boolean;           // Loading durumu
}
```

**Kullanım:**
```typescript
import SearchForm from '@/components/search/SearchForm';

<SearchForm
  initialValue={searchTerm}
  onSearch={handleSearch}
  loading={loading}
  placeholder="Arama yapın..."
  debounceMs={800}
/>
```

**Neden Modüler?**  
- Blog, Products ve Usage sayfalarında aynı form kullanılır
- Debounce mantığı tek yerde yönetilir
- Stil değişiklikleri tek yerden yapılır

---

#### `SearchResults.tsx` - Arama Sonuçları Container

**Ne İşe Yarar?**  
Arama sonuçlarını gösteren wrapper component. Loading, empty state ve sonuç sayısını yönetir.

**Özellikler:**
- Loading state gösterimi
- Empty state mesajı
- Sonuç sayısı gösterimi
- Children prop ile esnek içerik

**Props:**
```typescript
interface SearchResultsProps {
  loading: boolean;           // Yükleniyor mu?
  searched: boolean;          // Arama yapıldı mı?
  count: number;              // Sonuç sayısı
  emptyMessage?: string;      // Boş durum mesajı
  children: React.ReactNode; // Sonuç içeriği
}
```

**Kullanım:**
```typescript
import SearchResults from '@/components/search/SearchResults';

<SearchResults
  loading={loading}
  searched={searched}
  count={results.length}
  emptyMessage="Sonuç bulunamadı."
>
  <div className="grid">
    {results.map((item) => <ItemCard key={item.id} item={item} />)}
  </div>
</SearchResults>
```

**Neden Modüler?**  
- Tüm arama sayfalarında aynı loading/empty state mantığı
- Tutarlı kullanıcı deneyimi
- Kod tekrarı önlenir

---

#### `CategoryFilter.tsx` - Kategori Filtresi

**Ne İşe Yarar?**  
Kategorilere göre filtreleme yapan buton grubu component'i.

**Özellikler:**
- "Tümü" butonu
- Kategori butonları (isim + sayı)
- Seçili kategori vurgulama
- Loading state desteği

**Props:**
```typescript
interface CategoryFilterProps {
  categories: Category[];      // Kategori listesi
  selectedCategory: string;    // Seçili kategori slug'ı
  onCategoryChange: (slug: string) => void;  // Kategori değişim callback'i
  loading?: boolean;           // Loading durumu
}
```

**Kullanım:**
```typescript
import CategoryFilter from '@/components/search/CategoryFilter';

<CategoryFilter
  categories={categories}
  selectedCategory={selectedCategory}
  onCategoryChange={handleCategoryChange}
  loading={loading}
/>
```

**Neden Modüler?**  
- Products ve Usage sayfalarında aynı filtre mantığı
- Kategori butonları tek yerden yönetilir
- Stil değişiklikleri kolaylaşır

---

#### `BlogPostCard.tsx` - Blog Yazısı Kartı

**Ne İşe Yarar?**  
Blog yazılarını gösteren kart component'i.

**Özellikler:**
- Thumbnail gösterimi
- Başlık ve açıklama
- Tarih formatlama
- Hover efektleri
- Responsive tasarım

**Props:**
```typescript
interface BlogPostCardProps {
  post: BlogPost;  // Blog yazısı verisi
  locale: Locale;  // Dil bilgisi
}
```

**Kullanım:**
```typescript
import BlogPostCard from '@/components/search/BlogPostCard';

{results.map((post) => (
  <BlogPostCard key={post.id} post={post} locale={locale} />
))}
```

**Neden Modüler?**  
- Blog listesi ve arama sayfalarında aynı kart kullanılır
- Blog kartı tasarımı tek yerden yönetilir
- Tekrar kullanılabilirlik

---

#### `UsageAreaCard.tsx` - Kullanım Alanı Kartı

**Ne İşe Yarar?**  
Kullanım alanlarını gösteren kart component'i.

**Özellikler:**
- Thumbnail gösterimi
- Başlık ve ürün sayısı
- Hover efektleri
- Responsive tasarım

**Props:**
```typescript
interface UsageAreaCardProps {
  area: UsageArea;  // Kullanım alanı verisi
  locale: Locale;  // Dil bilgisi
}
```

**Kullanım:**
```typescript
import UsageAreaCard from '@/components/search/UsageAreaCard';

{areas.map((area) => (
  <UsageAreaCard key={area.id} area={area} locale={locale} />
))}
```

**Neden Modüler?**  
- Products, Usage ve arama sayfalarında aynı kart kullanılır
- Kart tasarımı tek yerden yönetilir
- Tutarlı görünüm

---

#### `LoadMoreButton.tsx` - Daha Fazla Yükle Butonu

**Ne İşe Yarar?**  
Sayfalama yerine "Load More" (daha fazla yükle) butonu gösteren component.

**Özellikler:**
- Dinamik buton metni (kaç tane yükleneceği)
- Loading state
- Otomatik gizleme (daha fazla yoksa)

**Props:**
```typescript
interface LoadMoreButtonProps {
  hasMore: boolean;      // Daha fazla var mı?
  loading: boolean;      // Yükleniyor mu?
  onClick: () => void;  // Tıklama callback'i
  loadCount?: number;   // Kaç tane yüklenecek (varsayılan: 6)
}
```

**Kullanım:**
```typescript
import LoadMoreButton from '@/components/search/LoadMoreButton';

<LoadMoreButton
  hasMore={displayedAreas.length < filteredAreas.length}
  loading={loadingMore}
  onClick={handleLoadMore}
  loadCount={6}
/>
```

**Neden Modüler?**  
- Load More mantığı tek yerde yönetilir
- Farklı sayfalarda aynı buton kullanılabilir
- Stil ve davranış tutarlılığı

---

### 🔎 Blog Arama

Blog arama, URL'de query parameter kullanır: `/blog/search?q=keyword`

**Örnek:**

```typescript
// src/app/[locale]/blog/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BlogSearchPage({ params }) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const handleSearch = async (keyword) => {
    // URL'i güncelle
    router.push(`/blog/search?q=${encodeURIComponent(keyword)}`);

    // API çağrısı
    const response = await fetch(`/api/blog/search?keyword=${keyword}`);
    const data = await response.json();
    // ...
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchTerm);
      }}
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Ara</button>
    </form>
  );
}
```

### 🔎 Ürün Arama

**ÖNEMLİ:** Products ve Usage tamamen ayrılmıştır. Product search sadece ürünleri listeler, usage alanlarını değil.

Ürün arama: `/products/search?q=keyword`

**Özellikler:**
- Sadece ürünleri listeler (usage alanları değil)
- Product type'ları: `filters` array, `thumbnail` (string | false), `excerpt`, `content`
- Debounce desteği (varsayılan 800ms)
- URL'de query parameter: `?q=keyword`

**Örnek:**
```typescript
// src/app/[locale]/products/search/page.tsx
'use client';

export default function ProductSearchPage() {
  const handleSearch = async (keyword: string) => {
    const response = await fetch(`/api/products/search?keyword=${keyword}`);
    const data = await response.json();
    // data.data.products → Product[] array
  };
  
  return <SearchForm onSearch={handleSearch} />;
}
```

**Product Type Yapısı:**
```typescript
interface Product {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail: string | false;  // false ise resim yok
  filters: ProductFilter[];  // Filtre array'i
  date: string;
}

interface ProductFilter {
  id: number;
  name: string;
  slug: string;
}
```

### 🔎 Usage Arama

**ÖNEMLİ:** Usage arama özellikleri:
- **Canlı search YOK:** Sadece "Ara" butonuna tıklayınca arama yapılır (`debounceMs={0}`)
- **Search yapıldığında kategori butonları gizlenir**
- Sadece usage alanlarını listeler (ürünler değil)

Usage arama: `/usage?q=keyword`

**Özellikler:**
- Canlı search devre dışı (sadece submit'te çalışır)
- Search aktifken kategori filtreleri gizlenir
- URL'de query parameter: `?q=keyword`
- Kategori filtreleme ile birlikte kullanılabilir (ama search yapıldığında kategori butonları gizlenir)

**Örnek:**
```typescript
// src/app/[locale]/usage/page.tsx
'use client';

export default function UsagePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <>
      <SearchForm
        debounceMs={0}  // 👈 Canlı search YOK
        onSearch={handleSearch}
      />
      
      {/* Search yapıldığında kategori butonları gizlenir */}
      {!searchTerm && (
        <CategoryFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
      )}
    </>
  );
}
```

### 📄 Blog Kategori Sayfası - Pagination

Blog kategori sayfasında **6'lı liste** ve **pagination** kullanılır.

**Özellikler:**
- Her sayfada maksimum 6 blog yazısı gösterilir
- Pagination butonları (Önceki/Sonraki)
- URL'de page parameter: `/blog/category/{slug}?page=2`

**Örnek:**
```typescript
// src/app/[locale]/blog/category/[slug]/page.tsx
export default async function BlogCategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsData = await getPostsByCategory(slug, currentPage);
  
  // Client-side pagination (6'lı liste)
  const ITEMS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = postsData.data.posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  return (
    <>
      {paginatedPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
      
      {/* Pagination */}
      {Math.ceil(postsData.data.posts.length / ITEMS_PER_PAGE) > 1 && (
        <Pagination currentPage={currentPage} totalPages={...} />
      )}
    </>
  );
}
```

### 🔄 Products ve Usage Ayrımı

**ÖNEMLİ:** Products ve Usage modülleri tamamen ayrılmıştır:

| Özellik | Products | Usage |
|---------|----------|-------|
| **Arama Endpoint** | `/api/products/search` | `/api/usage/areas` (filtreleme) |
| **Service Fonksiyonu** | `searchProducts()` | `getUsageAreas()` |
| **Type** | `Product[]` | `UsageArea[]` |
| **Kategori Endpoint** | `/product-category/v1/{slug}` | `/usage/v1/category/{slug}` |
| **Liste Endpoint** | `/product/v1/all` | `/usage/v1` |
| **Search Davranışı** | Debounce (800ms) | Sadece submit (debounce yok) |
| **Kategori Filtreleri** | Yok (filters array kullanılır) | Var (CategoryFilter component) |

**Neden Ayrıldı?**
- Products ve Usage farklı veri yapılarına sahip
- Farklı arama/filtreleme mantıkları
- Kod karışıklığını önlemek
- Bakım kolaylığı

---

## 📝 Form Oluşturma

### 📧 Mevcut ContactForm

Projede hazır bir `ContactForm` component'i var: `src/components/ContactForm.tsx`

**Özellikler:**

- React Hook Form + Zod validation
- Form alanları: Name, Phone, Email, Subject, Message, GDPR
- Otomatik CreatedAt ekleme
- WordPress admin-ajax.php'ye POST

**Kullanım:**

```typescript
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <h1>İletişim</h1>
      <ContactForm />
    </div>
  );
}
```

### 🆕 Yeni Form Oluşturma

```typescript
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    // ...
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gönder</Button>
      </form>
    </Form>
  );
}
```

---

## 🗑️ Kullanılmayan Modülleri Kaldırma

### ❌ Products Modülünü Kaldırma

Eğer projede "products" modülü kullanılmıyorsa:

#### 1. Service Dosyasını Sil

```bash
rm src/services/product.ts
```

#### 2. Sayfa Klasörlerini Sil

```bash
rm -rf src/app/[locale]/products
```

#### 3. API Route'unu Sil

```bash
rm -rf src/app/api/products
```

#### 4. Type Tanımlarını Kaldır

```typescript
// src/types/api.ts
// ProductDetail, ProductCategory interface'lerini sil
```

#### 5. BlockRenderer'dan İlgili Block'ları Kaldır (Eğer varsa)

```typescript
// src/components/blocks/BlockRenderer.tsx
// Product ile ilgili block'ları kaldır
```

#### 6. Layout'tan Link'leri Kaldır

```typescript
// src/components/Header.tsx
// Products menü linkini kaldır
```

---

### ❌ Usage Modülünü Kaldırma

Aynı şekilde:

```bash
# Service
rm src/services/usage.ts

# Sayfalar
rm -rf src/app/[locale]/usage

# Type'lar
# src/types/api.ts'den UsageArea, UsageAreaDetail interface'lerini sil
```

---

## 🆘 Hata Çözümleri

### 🚨 "Cannot find module '@/types'"

**Neden:** Path alias çalışmıyor.

**Çözüm:**

1. VS Code'u yeniden başlat
2. `tsconfig.json` dosyasını kontrol et:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### 🚨 "API Error: 404 Not Found"

**Neden:** API endpoint yanlış veya WordPress'te bu endpoint yok.

**Çözüm:**

1. `.env.local` dosyasındaki `NEXT_PUBLIC_API_URL` değerini kontrol et
2. WordPress REST API'nin çalıştığından emin ol
3. Browser'da endpoint'i test et: `https://your-site.com/wp-json/posts/v1`

---

### 🚨 Block render edilmiyor

**Neden:** Block adı eşleşmiyor.

**Çözüm:**

1. WordPress'te block adını kontrol et (ACF Flexible Content)
2. `BlockRenderer.tsx` dosyasında bu adın olduğundan emin ol
3. Console'da uyarı var mı kontrol et

---

### 🚨 Resimler gösterilmiyor

**Neden:** Image domain izni yok.

**Çözüm:** `next.config.ts` dosyasına domain ekle:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-wordpress-site.com", // 👈 Buraya ekle
      },
    ],
  },
};
```

---

## 📚 Next.js Temel Kavramlar

### Server Component vs Client Component

**Server Component** (Varsayılan)

- Sunucuda çalışır
- API'ye direkt erişim
- Daha hızlı

```typescript
// Server Component (varsayılan)
export default async function Page() {
  const data = await fetchData(); // ✅ API çağrısı
  return <div>{data.title}</div>;
}
```

**Client Component**

- Tarayıcıda çalışır
- `useState`, `useEffect` kullanılabilir

```typescript
"use client"; // 👈 Bu satır önemli!

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Ne Zaman Hangisi?

| Kullanım                | Component Tipi   |
| ----------------------- | ---------------- |
| API'den veri çekme      | Server Component |
| `useState`, `useEffect` | Client Component |
| Form etkileşimi         | Client Component |
| Statik içerik           | Server Component |

---

## 📞 Yardım ve Destek

### 🐛 Hata mı buldunuz?

1. Console'u kontrol edin (F12)
2. Bu README'deki [Hata Çözümleri](#-hata-çözümleri) bölümüne bakın
3. Hala çözemediyseniz Arda Uzun'a ulaşın

### 💬 Soru sormak için:

- GitHub Issues açabilirsiniz
- Ekip Slack/Discord kanalını kullanabilirsiniz

---

## 🎉 Son Notlar

- Bu template esnek ve genişletilebilir şekilde tasarlandı
- Her şeyi anlamak için kod okumaktan çekinmeyin
- Kafanıza takılan yerler için `console.log` kullanın
- En iyi öğrenme yöntemi: kodu değiştirip sonuçları görmek!

**Başarılar! 🚀**

---

**Altyapıyı Hazırlayan:** Arda Uzun  
**Son Güncelleme:** 2024
