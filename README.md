# 🚀 Next.js 15 Headless WordPress Starter

**Modern, ölçeklenebilir, çok dilli ve API odaklı bir Headless WordPress – Next.js altyapısı**

> **Hazırlayan:** Arda Uzun
> **Sürüm:** 2.0.0
> **Teknolojiler:** Next.js 15 App Router, TypeScript, ACF (Flexible Content), REST API, shadcn/ui, TailwindCSS

Bu proje, Headless WordPress üzerinden dinamik içerik, SEO verileri, blog, ürün, kullanım alanı gibi modülleri **tamamen API bazlı** şekilde yönetmenizi sağlayan, gelişmiş ve kurumsal düzeyde bir starter mimaridir.

✔ Çok dilli yönlendirme
✔ ACF Flexible Content → React Block Renderer
✔ Client & Server Component ayrımı
✔ Proxy API katmanı
✔ SEO + Schema + JsonLD destekli
✔ shadcn/ui + modern UI component seti
✔ Gelişmiş arama, filtreleme, load more sistemleri
✔ Form → WordPress Admin-Ajax

---

# 📘 İçindekiler

1. [⚡ Adım Adım Proje Başlangıç Rehberi](#-adım-adım-proje-başlangıç-rehberi)
2. [⚙️ Yapılandırılması Gereken Dosyalar](#️-yapılandırılması-gereken-dosyalar)
3. [📂 Proje Klasör Yapısı](#-proje-klasör-yapısı)
4. [🔄 Genel Mimarinin Akış Diyagramı](#-genel-mimarinin-akış-diyagramı)
5. [🔌 API Servis Katmanı](#-api-servis-katmanı)
6. [📡 API Endpoint Referansı (TAM LİSTE)](#-api-endpoint-referansı)
7. [🧱 Block Component Mimarisi](#-block-component-mimarisi)
8. [🖼️ Image Kullanımı](#️-image-kullanımı)
9. [🌍 i18n Çok Dilli Yapı](#-i18n-çok-dilli-yapı)
10. [📄 Sayfa Oluşturma](#-sayfa-oluşturma)
11. [🔍 Arama + Filtreleme](#-arama--filtreleme)
12. [📮 Form Gönderimi](#-form-gönderimi)
13. [🗑️ Kullanılmayan Modüllerin Silinmesi](#️-kullanılmayan-modüllerin-silinmesi)
14. [🆘 Sorun Giderme](#-sorun-giderme)
15. [📚 Next.js Kavram Özetleri](#-nextjs-kavram-özetleri)

---

# ⚡ Adım Adım Proje Başlangıç Rehberi

## **1️⃣ Projeyi klonla ve bağımlılıkları yükle**

```bash
git clone <repo-url>
cd next-starter
npm install
```

---

## **2️⃣ Çevresel değişkenleri oluştur**

`.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-wordpress.com/wp-json
NEXT_PUBLIC_SITE_URL=https://yourfrontend.com
NEXT_PUBLIC_SITE_NAME=Proje Adı
```

---

## **3️⃣ WordPress Media domain izni ekle**

`next.config.ts`:

```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-wordpress.com",
    },
  ],
},
```

Aksi durumda → ❌ Resimler yüklenmez.

---

## **4️⃣ API Base URL fallback kontrolü**

`src/services/core.ts`:

```ts
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-wordpress.com/wp-json";
```

---

## **5️⃣ SEO Production URL tanımla**

`src/utils/url-helper.ts`:

```ts
const PRODUCTION_URL = "https://yourfrontend.com";
```

---

## **6️⃣ İletişim formunun action URL'sini değiştir**

`src/components/ContactForm.tsx`:

```ts
const FORM_ACTION_URL =
  "https://your-wordpress.com/wp-admin/admin-ajax.php";
```

WordPress tarafında AJAX handler gerekiyor.

---

## **7️⃣ Projeyi başlat**

```bash
npm run dev
```

Tarayıcı:
➡ [http://localhost:3000](http://localhost:3000)

---

# 📂 Proje Klasör Yapısı

Projeyi incelerken ihtiyaç duyacağın ana dosya ağacı:

```
src/
├── app/
│   ├── layout.tsx
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── category/[slug]/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   └── search/page.tsx
│   │   ├── products/
│   │   │   ├── detail/[slug]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── category/[slug]/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   └── search/page.tsx
│   │   └── usage/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── [slug]/
│   │       │   ├── page.tsx
│   │       │   └── loading.tsx
│   │       └── category/[slug]/page.tsx
│   └── api/
│       ├── blog/search/route.ts
│       ├── products/all/route.ts
│       ├── products/search/route.ts
│       ├── usage/areas/route.ts
│       ├── usage/categories/route.ts
│       └── usage/category/[slug]/route.ts
├── components/
│   ├── blocks/
│   │   ├── BlockRenderer.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── FeatureHighlight.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageContent.tsx
│   │   ├── ImageList.tsx
│   │   ├── Map.tsx
│   │   └── Tab.tsx
│   ├── search/
│   │   ├── BlogPostCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── LoadMoreButton.tsx
│   │   ├── SearchForm.tsx
│   │   ├── SearchResults.tsx
│   │   └── UsageAreaCard.tsx
│   ├── seo/JsonLd.tsx
│   ├── ui/* (Button, Card, Checkbox, Input, Label, Select, Textarea)
│   ├── BlogSearch.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── config.ts
│   ├── getTranslations.ts
│   └── messages/*
├── services/
│   ├── blog.ts
│   ├── core.ts
│   ├── global.ts
│   ├── page.ts
│   ├── product.ts
│   └── usage.ts
├── types/
│   └── api.ts
└── utils/
    ├── locale-helper.ts
    ├── seo-helper.ts
    └── url-helper.ts
```

Her dinamik slug sayfası (`[slug]`, `blog/[slug]`, `products/detail/[slug]`, `usage/[slug]`) altındaki `loading.tsx` dosyası skeleton ekranını yönetir.

---

# 🔄 Genel Mimarinin Akış Diyagramı

Aşağıdaki diyagram Next.js ile WordPress arasındaki tam akışı gösterir.

```
                    ┌───────────────────────────┐
                    │     Kullanıcı (Browser)    │
                    └──────────────┬────────────┘
                                   │
                            Server Component
                                   │
                                   ▼
                        ┌───────────────────────┐
                        │    Services Layer      │
                        │   (src/services/*)     │
                        └───────────┬───────────┘
                                    │ fetchAPI()
                                    ▼
                           WordPress REST API
                    (posts, products, usage, seo, options)
                    
                    
Client Component (useState/useEffect)
│
├── fetch('/api/...')  → Proxy API Layer (Next.js)
│
└── Next.js API Routes → Services → WordPress API
```

---

# 🔌 API Servis Katmanı

Her modülün kendi service dosyası vardır:

| Servis       | Açıklama                                |
| ------------ | --------------------------------------- |
| `blog.ts`    | Blog listesi, kategori, arama           |
| `product.ts` | Ürün listesi, kategori, detay           |
| `usage.ts`   | Kullanım alanı listesi, kategori, detay |
| `page.ts`    | Sayfa içerikleri                        |
| `global.ts`  | Menü, footer, sosyal medya, SEO         |
| `core.ts`    | fetchAPI – global wrapper               |

### fetchAPI — Tüm isteklerin kalbi

```ts
export async function fetchAPI<T>(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, { cache: "no-store" });
  return res.json() as T;
}
```

---

# 📡 API Endpoint Referansı

Aşağıda hem **WordPress endpointleri** hem **senin Next.js API route’ların** tam listesi bulunur.

---

## 📄 Pages

| Açıklama     | WP Endpoint       |
| ------------ | ----------------- |
| Sayfa detayı | `/page/v1/{slug}` |

---

## 📰 Blog

| Açıklama              | WP Endpoint                          |
| --------------------- | ------------------------------------ |
| Liste                 | `/posts/v1?page={n}`                 |
| Detay                 | `/posts/v1/detail/{slug}`            |
| Kategori listesi      | `/posts/v1/categories`               |
| Kategoriye göre liste | `/posts/v1/category/{slug}?page={n}` |
| Arama                 | `/posts/v1/search/{keyword}`         |

### Next.js Proxy API

| Route              | Açıklama |
| ------------------ | -------- |
| `/api/blog/search` | Arama    |

---

## 🛒 Ürünler

| Açıklama    | WP Endpoint                             |
| ----------- | --------------------------------------- |
| Tüm ürünler | `/product/v1/all?per_page={n}&page={n}` |
| Detay       | `/product/v1/detail/{slug}`             |
| Kategori    | `/product-category/v1/{slug}`           |
| Arama       | `/product/v1/search/{keyword}`          |

### Next.js Proxy API

| Route                  | Açıklama |
| ---------------------- | -------- |
| `/api/products/all`    | Liste    |
| `/api/products/search` | Arama    |

---

## 🏭 Kullanım Alanları (Usage)

| Açıklama              | WP Endpoint                 |
| --------------------- | --------------------------- |
| Tüm alanlar           | `/usage/v1`                 |
| Detay                 | `/usage/v1/detail/{slug}`   |
| Kategoriler           | `/usage/v1/categories`      |
| Kategoriye göre liste | `/usage/v1/category/{slug}` |

### Next.js Proxy API

| Route                        | Açıklama             |
| ---------------------------- | -------------------- |
| `/api/usage/areas`           | Liste                |
| `/api/usage/categories`      | Kategori listesi     |
| `/api/usage/category/[slug]` | Kategori bazlı liste |

---

## 🌐 Global

| Açıklama       | WP Endpoint                   |
| -------------- | ----------------------------- |
| Global options | `/options/v1`                 |
| SEO verileri   | `/custom-seo/v1/getHead?url=` |

---

# 🧱 Block Component Mimarisi

ACF Flexible Content → React Block sistemi:

### Block Akışı

```
WordPress ACF → JSON → getPageBySlug() → BlockRenderer → ilgili block component
```

Her block:

```tsx
export interface HeroBlock extends BaseBlock {
  acf_fc_layout: "hero";
  title: string;
  image: string;
}
```

Yeni block eklemek için:

1. `/components/blocks/` içine component oluştur
2. `BlockRenderer.tsx` içine ekle
3. WP’de ACF’de aynı `acf_fc_layout` adını kullan

---

# 🖼️ Image Kullanımı

Yalnızca `next/image` kullanılır.

**Örnek:**

```tsx
<Image
  src={post.thumbnail}
  alt={post.title}
  fill
  className="object-cover"
  sizes="100vw"
/>
```

⚠️ Domain izinleri unutma: `next.config.ts`

---

# 🌍 i18n Çok Dilli Yapı

Dil sisteminin akışı:

```
URL → middleware.ts → locale param → layout.tsx → getTranslations() → sayfa render
```

Kullanım:

```ts
const t = getTranslations(locale);
t.blog.title
```

---

# 📄 Sayfa Oluşturma

### Dinamik sayfa:

```tsx
const { slug } = await params;
const page = await getPageBySlug(slug);
return <BlockRenderer blocks={page.data.content} />;
```

- `page.data.content` WordPress tarafından dizi veya `{ content: [] }` şeklinde dönebileceği için SSR component'i önce blokları normalize ediyor, ardından `BlockRenderer`'a aktarıyor.
- `page.data.translations` `{ locale: { slug: '...' } }` yapısını izliyor; slug paramı bu tabloya göre canonical URL'e yönlendiriliyor.

### Locale bazlı slug'lar ve loading durumu

`src/app/[locale]/[slug]/page.tsx`, WordPress `translations` alanını okuyup slug'ı locale'a göre otomatik yönlendiriyor; aynı klasördeki `loading.tsx` ise veri beklerken kısa bir skeleton gösteriyor. Blog yazısı (`src/app/[locale]/blog/[slug]/loading.tsx`), ürün detayı (`src/app/[locale]/products/detail/[slug]/loading.tsx`) ve kullanım alanı detayı (`src/app/[locale]/usage/[slug]/loading.tsx`) da aynı yaklaşımı uyguluyor. Bu iskeletler, SEO verisi ve dinamik bloklar API'den gelirken sayfanın kararmasını engelliyor, dil değişimlerinde kullanıcıya anında geri bildirim sağlıyor.

---

# 🔍 Arama + Filtreleme

Tüm arama modülleri:

* `SearchForm`
* `SearchResults`
* `CategoryFilter`
* `BlogPostCard`
* `UsageAreaCard`

### Blog arama

```tsx
fetch(`/api/blog/search?keyword=${term}`)
```

### Ürün arama

```tsx
fetch(`/api/products/search?keyword=${term}`)
```

### Usage arama

Debounce yok:

```tsx
<SearchForm debounceMs={0} />
```

---

# 📮 Form Gönderimi

ContactForm → WordPress admin-ajax:

```tsx
<form action={FORM_ACTION_URL} method="POST">
```

WordPress tarafı:

```php
add_action("wp_ajax_contact_form_submit", "contact_form_submit");
add_action("wp_ajax_nopriv_contact_form_submit", "contact_form_submit");
```

---

# 🗑️ Kullanılmayan Modüllerin Silinmesi

### Products modülünü kaldırmak:

```
rm -rf src/services/product.ts
rm -rf src/app/[locale]/products
rm -rf src/app/api/products
```

---

# 🆘 Sorun Giderme

| Hata                   | Sebep                  | Çözüm                          |
| ---------------------- | ---------------------- | ------------------------------ |
| Resimler görünmüyor    | Domain izni yok        | next.config.ts → hostname ekle |
| 404 API                | API URL yanlış         | .env.local kontrol et          |
| Block render edilmiyor | acf_fc_layout mismatch | BlockRenderer + WP kontrol et  |
| SEO çalışmıyor         | Production URL yanlış  | url-helper.ts güncelle         |

---

# 📚 Next.js Kavram Özetleri

### Server Component

✔ API çağrısı
✔ SEO
✔ SSR
✔ Daha hızlı

### Client Component

✔ useState
✔ useEffect
✔ Form
✔ Search

**Kural:**
→ Server component → `services/*`
→ Client component → `/api/*`
