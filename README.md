# 🚀 Next.js 15 Headless WordPress Starter Template

**Hazırlayan: Arda Uzun**

Bu doküman, ekibimizin Next.js 15 + Headless WordPress altyapısını **hızlı, hatasız ve sürdürülebilir şekilde** geliştirebilmesi için hazırlanmıştır.

Ekibimizde Next.js bilgisi az olsa bile, bu README sayesinde:

* Yapıyı 15 dakikada öğrenebilir,
* API ve component mimarisini takip edebilir,
* Block yapısını genişletebilir,
* Yeni sayfa, içerik türü ve dil ekleyebilirler.

Bu dosya hem **proje başlangıç rehberi**, hem de **teknik referans** niteliğindedir.

---

# 📚 İçindekiler

1. [Kurulum](#kurulum)
2. [Mimariyi Kısaca Anlamak](#mimariyi-kısaca-anlamak)
3. [Proje Yapısı](#proje-yapısı)
4. [WordPress API Yapısı](#wordpress-api-yapısı)
5. [Block Component Sistemi (ACF Flexible)](#block-component-sistemi-acf-flexible)
6. [Yeni Dil Ekleme](#yeni-dil-ekleme)
7. [Component / Modül Ekleme](#componentmodül-ekleme)
8. [Deployment & Build](#deployment--build)
9. [Next.js Temelleri (Kısa Özet)](#nextjs-temelleri-kısa-özet)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

# 🔧 Kurulum

### Gereksinimler

* Node.js **18+**
* npm veya yarn
* WordPress Headless REST API (ACF kullanıyor olmalı)

### Adımlar

```bash
git clone <repo-url>
cd next-starter

npm install # veya yarn

cp .env.example .env.local
```

`.env.local` içerisine:

```
NEXT_PUBLIC_API_URL=https://example.com/wp-json
NEXT_PUBLIC_SITE_URL=https://frontend.com
NEXT_PUBLIC_SITE_NAME=Project Name
```

Geliştirme:

```bash
npm run dev
```

Tarayıcı → [http://localhost:3001](http://localhost:3001)

---

# 🧠 Mimariyi Kısaca Anlamak

Ekibin hızlı kavrayabilmesi için altyapıyı **3 büyük parçaya** ayırıyoruz:

---

## 1) **Next.js (Frontend)**

* App Router kullanır
* Varsayılan olarak **Server Component**
* Tüm data server-side fetch edilir
* Her dil kendi route yapısına sahiptir `/tr/...`, `/en/...`

---

## 2) **WordPress (Backend)**

* Custom REST API endpointleri
* ACF Flexible Content kullanılır
* API formatı standarttır:

```json
{
  "success": true,
  "data": {}
}
```

---

## 3) **Block Renderer Sistemi**

WordPress’te ACF Flexible Content ile oluşturulan bloklar, Next.js tarafında **otomatik olarak ilgili React component’ine dönüşür**.

Örnek:

```json
{
  "acf_fc_layout": "hero",
  "title": "Hoş geldiniz"
}
```

→ `components/blocks/Hero.tsx` tarafından render edilir.

---

Bu üçlü yapı sayesinde:

✔ WordPress → içerik yönetir
✔ Next.js → render eder
✔ Block Renderer → her şeyi otomatik bağlar

---

# 📁 Proje Yapısı

Aşağıda ekip için **yüksek seviyede anlaması kolay** bir özet yapısı bulunuyor.

```
src/
├── app/                # Route & sayfalar
│   ├── [locale]/       # Dil bazlı routing
│   ├── api/            # Next.js API routes
│   ├── layout.tsx      # Global Layout
│   └── globals.css     # Global Tailwind
│
├── components/         
│   ├── blocks/         # ACF Block Components
│   ├── ui/             # shadcn UI
│   ├── seo/            # JSON-LD vb.
│   └── Header/Footer   # Global layout parçaları
│
├── services/           # Tüm WordPress API çağrıları
│   ├── core.ts         # fetchAPI wrapper
│   ├── blog.ts
│   ├── product.ts
│   └── page.ts
│
├── i18n/               # Çok dillilik sistemi
│   ├── config.ts
│   ├── getTranslations.ts
│   └── messages/*.json
│
├── types/              # TypeScript API type'ları
└── utils/              # Helper fonksiyonlar
```

---

# 🌐 WordPress API Yapısı

Ekibin en çok kullandığı dosya **/services** klasörü olacak.

Her şey şu basit fonksiyona dayanır:

```ts
export async function fetchAPI<T>(endpoint: string): Promise<T>
```

Tüm servisler bunu kullanır → **standart, güvenli, yönetilebilir**.

Örnek yeni API oluşturma:

```ts
// services/news.ts
export async function getNews() {
  return fetchAPI('/news/v1');
}
```

---

# 🧩 Block Component Sistemi (ACF Flexible)

Bu sistem WordPress’ten gelen blokları **otomatik olarak React component’e çevirir**.
Projeyi büyütürken en çok kullanacağınız sistem burasıdır.

---

## 1) Yeni Block Oluşturma

`src/components/blocks/NewBlock.tsx`

```tsx
import { BaseBlock } from "@/types/api";

export interface NewBlockProps extends BaseBlock {
  acf_fc_layout: "newblock";
  title: string;
  description?: string;
}

export default function NewBlock({ title, description }: NewBlockProps) {
  return (
    <section className="py-10">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p>{description}</p>}
    </section>
  );
}
```

---

## 2) BlockRenderer’a Kaydet

`src/components/blocks/BlockRenderer.tsx`:

```ts
import NewBlock from "./NewBlock";

const blockMap = {
  hero: Hero,
  imagecontent: ImageContent,
  newblock: NewBlock,
};
```

Bitti.
WordPress ACF’de bir blok oluşturduğunuzda otomatik çalışır.

---

# 🌍 Yeni Dil Ekleme

Çok basit 3 adımdır:

---

## 1) Config’e ekle → `i18n/config.ts`

```ts
export const locales = ["tr", "en", "de"] as const;
```

---

## 2) Çeviri dosyasını oluştur → `i18n/messages/de.json`

```json
{
  "common": {
    "back": "Zurück"
  }
}
```

---

## 3) getTranslations’a ekle

```ts
import deMessages from './messages/de.json';

const messages = { tr, en, de };
```

Bitti. `/de/...` artık çalışır.

---

# 🎨 Component/Modül Ekleme

## UI Component eklemek (shadcn/ui)

```bash
npx shadcn@latest add button
```

Yeni UI bileşeni → `components/ui/btn.tsx` içine gelir.

---

## Feature Component örneği

```tsx
export default function Newsletter() {
  return (
    <section>
      <h2>Email Bülteni</h2>
      <input placeholder="E-posta" />
    </section>
  );
}
```

---

## Service Modülü Örneği (Yeni API)

```ts
// services/news.ts
export async function getNews() {
  return fetchAPI('/news/v1');
}
```

---

# 🏗 Deployment & Build

## Production Build

```bash
npm run build
npm start
```

## Önemli Notlar

1. `.env.local` → production’da kullanılmaz
2. WordPress image domain'i mutlaka `next.config.ts` içine eklenmeli
3. API değişirse mutlaka:

   * `/types/api.ts`
   * `/services/*.ts`
     güncellenir

---

# ⚡ Next.js Temelleri (Ekibin Bilmesi Gerekenler)

## Server Component (varsayılan)

```tsx
export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

## Client Component

```tsx
'use client';
import { useState } from 'react';
```

## Parametre Alma

```tsx
export default async function Page({ params }) {
  const { slug } = await params;
}
```

---

# ⭐ Best Practices

### 🟦 Naming

* Dosyalar: `kebab-case`
* Component: `PascalCase`
* Block adları: WP’de neyse aynısı

### 🟦 Co-located Types

Her block kendi interface’ini **kendi dosyasında** tanımlar.

### 🟦 Interactivity gerekiyorsa `'use client'`

Aksi takdirde kullanmayın.

### 🟦 API Her Zaman `fetchAPI()` Üzerinden Gider

Tek giriş noktası → hatayı kolay yönetilebilir.

### 🟦 SEO → `generateMetadata`

Her dinamik sayfada olmalı.

---

# 🐞 Troubleshooting

### ❗1) Block render olmuyor

* BlockRenderer’da kayıtlı mı?
* WordPress’te `acf_fc_layout` doğru yazıldı mı?

### ❗2) Dil yönlendirmesi bozuk

* `middleware.ts` root’ta mı?
* `i18n/config.ts` içinde dil listesi doğru mu?

### ❗3) API 404

* `.env.local` yanlış olabilir
* WordPress REST endpoint değişmiş olabilir

### ❗4) TypeScript error

* API response değişmiş, `types/api.ts` güncellenmeli

---

# 💬 Destek

Ekibiniz yeni bir sayfa, block veya modül eklerken bu dokümana bakması yeterlidir.
Altyapı tamamen **genişletilebilir**, **modüler** ve **sürdürülebilir** yapıdadır.

Her geliştirmede standart süreç:
**API → types → service → component → renderer (opsiyonel)**

---

# 📌 Son Güncelleme

2025 – Arda Uzun