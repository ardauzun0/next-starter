## 📑 Hızlı Navigasyon

- [🎯 Projeye Başlarken](#-projeye-başlarken)
- [📁 Klasör Yapısı](#-klasör-yapısı-nerede-ne-var)
- [🔌 API Yapısı](#-api-yapısı-wordpress-bağlantısı)
- [🎨 Yeni Block Ekleme](#-yeni-block-ekleme-5-dakikada)
- [🌍 Yeni Dil Ekleme](#-yeni-dil-ekleme)
- [💡 Sık Sorulan Sorular](#-sık-sorulan-sorular)
- [🆘 Hata Çözümleri](#-hata-çözümleri)

---

## 🎯 Projeye Başlarken

### 1️⃣ İlk Kurulum (5 dakika)

```bash
# Projeyi klonla
git clone <repository-url>
cd next-starter

# Bağımlılıkları yükle
npm install

# Environment dosyasını oluştur
cp .env.example .env.local
```

### 2️⃣ Ayarları Yap

`.env.local` dosyasını aç ve şu değerleri ayarla:

```env
# WordPress API'nizin adresi (ÖNEMLİ!)
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

Tarayıcıda `http://localhost:3001` adresini aç. 🎉

---

## 📁 Klasör Yapısı: Nerede Ne Var?

### 🗂️ Ana Klasörler

```
next-starter/
├── public/              👉 Resimler, videolar, PDF'ler
├── src/
│   ├── app/            👉 Sayfalar (routes)
│   ├── components/     👉 React bileşenleri
│   ├── services/       👉 API çağrıları
│   ├── types/          👉 TypeScript tipleri
│   ├── utils/          👉 Yardımcı fonksiyonlar
│   └── i18n/           👉 Çeviriler (TR/EN)
└── middleware.ts        👉 Dil yönlendirme
```

---

## 🎨 Önemli Dosyalar ve Ne İşe Yaradıkları

### 🔧 Yapılandırma Dosyaları

| Dosya | Ne İşe Yarar? | Değiştirilmeli mi? |
|-------|---------------|-------------------|
| `.env.local` | API ve site ayarları | ✅ Evet, mutlaka |
| `next.config.ts` | Next.js ayarları, resim domain'leri | ✅ Evet, domain ekle |
| `middleware.ts` | Dil yönlendirme (TR/EN) | ❌ Hayır |
| `tsconfig.json` | TypeScript ayarları | ❌ Hayır |

### 📄 Sayfa Dosyaları (`src/app/`)

```
src/app/
├── [locale]/
│   ├── page.tsx              👉 Ana sayfa (/)
│   ├── [slug]/page.tsx       👉 Dinamik sayfalar (/hakkimizda)
│   ├── blog/
│   │   ├── page.tsx          👉 Blog listesi
│   │   ├── [slug]/page.tsx   👉 Blog detay
│   │   └── search/page.tsx   👉 Blog arama
│   └── products/
│       ├── page.tsx          👉 Ürünler ana sayfa
│       └── detail/[slug]/    👉 Ürün detay
```

#### 📌 Örnek: Ana Sayfa Düzenleme

```typescript
// src/app/[locale]/page.tsx
export default async function HomePage() {
  return (
    <div>
      <h1>Hoş Geldiniz! 👋</h1>
      <p>Bu ana sayfadır, buraya istediğinizi ekleyebilirsiniz.</p>
    </div>
  );
}
```

---

## 🔌 API Yapısı: WordPress Bağlantısı

### 📡 API Nasıl Çalışır?

1. **WordPress'ten veri gelir** → REST API endpoint'lerinden
2. **Next.js çeker** → `src/services/` klasöründeki fonksiyonlarla
3. **Sayfada gösterir** → React component'lerinde

### 🛠️ API Servisleri (`src/services/`)

```
src/services/
├── core.ts        👉 Temel fetch fonksiyonu (DOKUNMA!)
├── blog.ts        👉 Blog API'leri
├── product.ts     👉 Ürün API'leri
├── page.ts        👉 Sayfa API'leri
└── global.ts      👉 Menü, footer vb.
```

#### 📌 Örnek: Blog Yazısı Çekme

```typescript
// src/services/blog.ts
import { fetchAPI } from './core';

export async function getPostBySlug(slug: string) {
  // WordPress'ten /posts/v1/detail/blog-yazisi-slug endpoint'ini çağırır
  return await fetchAPI(`/posts/v1/detail/${slug}`);
}
```

#### 📌 Örnek: Sayfada Kullanım

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { getPostBySlug } from '@/services/blog';

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  return (
    <article>
      <h1>{post.data.title}</h1>
      <div>{post.data.content}</div>
    </article>
  );
}
```

### 🎯 Mevcut API Endpoint'leri

| Endpoint | Ne Döner? | Kullanım |
|----------|-----------|----------|
| `/posts/v1` | Tüm blog yazıları | Blog listesi |
| `/posts/v1/detail/{slug}` | Tek blog yazısı | Blog detay |
| `/product/v1/detail/{slug}` | Tek ürün | Ürün detay |
| `/page/v1/{slug}` | Sayfa içeriği | Dinamik sayfalar |
| `/global/v1/options` | Menü, footer | Header/Footer |

---

## 🎨 Yeni Block Ekleme (5 Dakikada!)

WordPress'te ACF Flexible Content kullanarak oluşturduğunuz block'ları Next.js'te göstermek için:

### 1️⃣ Block Component'i Oluştur

```typescript
// src/components/blocks/MyNewBlock.tsx
export interface MyNewBlockProps {
  acf_fc_layout: 'mynewblock'; // WordPress'teki block adı
  title: string;
  description?: string;
}

export default function MyNewBlock({ title, description }: MyNewBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="mt-4">{description}</p>}
      </div>
    </section>
  );
}
```

### 2️⃣ BlockRenderer'a Ekle

```typescript
// src/components/blocks/BlockRenderer.tsx
import MyNewBlock from './MyNewBlock';

const blockMap = {
  hero: Hero,
  mynewblock: MyNewBlock, // 👈 Buraya ekle
};
```

### ✅ Tamam! Block artık otomatik render edilecek.

#### ⚠️ Dikkat Edilmesi Gerekenler

- `acf_fc_layout` değeri, `blockMap` anahtarıyla **TAM OLARAK** aynı olmalı
- WordPress'te block adı **"mynewblock"** ise, burada da **"mynewblock"** yazılmalı
- Büyük-küçük harf duyarlı (case-sensitive)

---

## 🌍 Yeni Dil Ekleme

Şu an Türkçe (TR) ve İngilizce (EN) var. Almanca (DE) ekleyelim:

### 1️⃣ Config'e Ekle

```typescript
// src/i18n/config.ts
export const locales = ['tr', 'en', 'de'] as const; // 👈 'de' ekle

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch', // 👈 İsim ekle
};
```

### 2️⃣ Çeviri Dosyası Oluştur

```json
// src/i18n/messages/de.json
{
  "common": {
    "back": "Zurück",
    "search": "Suchen"
  },
  "blog": {
    "title": "Blog",
    "backToBlog": "Zurück zum Blog"
  }
}
```

### 3️⃣ Çeviri Loader'a Ekle

```typescript
// src/i18n/getTranslations.ts
import deMessages from './messages/de.json';

const messages = {
  tr: trMessages,
  en: enMessages,
  de: deMessages, // 👈 Buraya ekle
};
```

### ✅ Tamam! `/de/hakkimizda` gibi URL'ler çalışacak.

---

## 💡 Sık Sorulan Sorular

### ❓ Yeni bir sayfa nasıl eklenir?

**Cevap:** `src/app/[locale]/` klasörüne yeni klasör oluştur.

```typescript
// src/app/[locale]/about/page.tsx
export default function AboutPage() {
  return <div>Hakkımızda sayfası</div>;
}
```

URL: `http://localhost:3001/tr/about`

---

### ❓ Resim nasıl eklenir?

**Cevap 1: Statik resim** (public klasörü)

```typescript
import Image from 'next/image';

<Image 
  src="/images/logo.png" 
  alt="Logo" 
  width={200} 
  height={100} 
/>
```

**Cevap 2: WordPress'ten gelen resim**

```typescript
<Image 
  src={post.featured_image} 
  alt={post.title} 
  width={800} 
  height={600} 
/>
```

⚠️ **Önemli:** WordPress domain'ini `next.config.ts` dosyasına ekle:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "your-wordpress-site.com", // 👈 Buraya ekle
      },
    ],
  },
};
```

---

### ❓ API endpoint'i nasıl değiştirilir?

**Cevap:** İlgili service dosyasını düzenle.

```typescript
// src/services/blog.ts

// Eski:
return await fetchAPI(`/posts/v1/detail/${slug}`);

// Yeni:
return await fetchAPI(`/api/blog/${slug}`); // 👈 Endpoint'i değiştir
```

---

### ❓ Çeviri nasıl kullanılır?

**Cevap:** `getTranslations` fonksiyonunu kullan.

```typescript
import { getTranslations } from '@/i18n/getTranslations';

export default async function Page({ params }) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return <h1>{t.blog.title}</h1>; // "Blog" veya "Blog" (dile göre)
}
```

---

### ❓ Form nasıl oluşturulur?

**Cevap:** Mevcut `ContactForm` component'ini örnek al.

```typescript
// src/components/ContactForm.tsx dosyasına bak
// React Hook Form + Zod validation kullanıyor
```

**Kendi formunu oluşturmak için:**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MyForm() {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form gönderme işlemi
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="İsim"
      />
      <Button type="submit">Gönder</Button>
    </form>
  );
}
```

---

## 🆘 Hata Çözümleri

### 🚨 "Cannot find module '@/types'"

**Neden:** Path alias'ları çalışmıyor.

**Çözüm:** VS Code'u yeniden başlat veya `tsconfig.json` dosyasını kontrol et.

---

### 🚨 "API Error: 404 Not Found"

**Neden:** API endpoint yanlış veya WordPress'te bu endpoint yok.

**Çözüm:**
1. `.env.local` dosyasındaki `NEXT_PUBLIC_API_URL` değerini kontrol et
2. WordPress REST API'nin çalıştığından emin ol
3. Console'da tam endpoint'i kontrol et

```typescript
// Hata ayıklama için:
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Full endpoint:', `${API_URL}/posts/v1/detail/${slug}`);
```

---

### 🚨 Block render edilmiyor

**Neden:** Block adı eşleşmiyor veya BlockRenderer'a eklenmemiş.

**Çözüm:**
1. WordPress'te block adını kontrol et (ACF Flexible Content)
2. `BlockRenderer.tsx` dosyasında bu adın olduğundan emin ol
3. Console'da uyarı var mı kontrol et

```typescript
// Console'da görmek için:
console.log('Block type:', block.acf_fc_layout);
```

---

### 🚨 "Locale routing çalışmıyor"

**Neden:** Middleware düzgün çalışmıyor.

**Çözüm:**
1. `middleware.ts` dosyasının **root dizinde** olduğundan emin ol (src içinde değil!)
2. `src/i18n/config.ts` dosyasındaki locale'leri kontrol et
3. Sunucuyu yeniden başlat: `npm run dev`

---

### 🚨 Resimler gösterilmiyor

**Neden:** Image domain izni yok.

**Çözüm:** `next.config.ts` dosyasına domain ekle.

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-wordpress-site.com',
      },
    ],
  },
};
```

---

## 🎓 Next.js Temel Kavramlar

### Server Component vs Client Component

**Server Component** (Varsayılan)
- Sunucuda çalışır
- Veritabanı/API'ye direkt erişim
- Daha hızlı, daha az JavaScript

```typescript
// Server Component (varsayılan)
export default async function Page() {
  const data = await fetchData(); // ✅ Burada API çağrısı yapabilirsin
  return <div>{data.title}</div>;
}
```

**Client Component**
- Tarayıcıda çalışır
- `useState`, `useEffect` kullanılabilir
- Etkileşimli component'ler için

```typescript
'use client'; // 👈 Bu satır önemli!

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0); // ✅ useState kullanabilirsin
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 📌 Ne Zaman Hangisi?

| Kullanım | Component Tipi |
|----------|----------------|
| API'den veri çekme | Server Component |
| `useState`, `useEffect` | Client Component |
| Form etkileşimi | Client Component |
| Statik içerik | Server Component |

---

### Async/Await Kullanımı

```typescript
// ✅ Doğru kullanım
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// ❌ Yanlış: Client component'te async kullanma
'use client';
export default async function Page() { // Hata verir!
  // ...
}
```

---

### Dynamic Routes (Dinamik Sayfalar)

```typescript
// app/[locale]/blog/[slug]/page.tsx
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  // slug = "benim-blog-yazim"
  
  const post = await getPostBySlug(slug);
  return <article>{post.title}</article>;
}
```

**URL Örneği:** `/tr/blog/benim-blog-yazim`

---

## 🛠️ Build ve Deployment

### Development (Geliştirme)

```bash
npm run dev
```

### Production Build

```bash
# Build al
npm run build

# Çalıştır
npm start
```

### ⚠️ Build Alırken Dikkat Et

1. **Environment Variables:** Production'da `.env.local` kullanılmaz, hosting platformunda ayarlanır
2. **Image Domains:** `next.config.ts` dosyasında tüm domain'leri ekle
3. **Type Errors:** Build sırasında TypeScript hataları varsa düzelt

```bash
# TypeScript hatalarını kontrol et
npm run build
```

---

## 📚 Yararlı Kaynaklar

- [Next.js Dokümantasyonu](https://nextjs.org/docs) - Resmi Next.js dökümanları
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript öğren
- [Tailwind CSS](https://tailwindcss.com/docs) - CSS framework'ü
- [shadcn/ui](https://ui.shadcn.com/) - UI component'leri

---

## 📋 Yeni Projeye Başlama Checklist

Yeni bir proje başlatırken bu adımları takip et:

### 1️⃣ Kurulum
- [ ] Projeyi klonla/indir
- [ ] `npm install` çalıştır
- [ ] `.env.local` oluştur ve doldur

### 2️⃣ API Yapılandırması
- [ ] WordPress API URL'ini `.env.local` dosyasına ekle
- [ ] `next.config.ts` dosyasına WordPress domain'ini ekle
- [ ] API endpoint'lerini test et (Postman/browser)

### 3️⃣ Block'ları Kontrol Et
- [ ] Mevcut block'ları incele (`src/components/blocks/`)
- [ ] Kullanmayacağın block'ları sil
- [ ] Yeni block'lar ekle
- [ ] `BlockRenderer.tsx` dosyasını güncelle

### 4️⃣ Çevirileri Ayarla
- [ ] `src/i18n/messages/tr.json` güncelle
- [ ] `src/i18n/messages/en.json` güncelle
- [ ] Gerekiyorsa yeni dil ekle

### 5️⃣ Sayfaları Özelleştir
- [ ] Ana sayfayı düzenle (`src/app/[locale]/page.tsx`)
- [ ] Header/Footer'ı özelleştir
- [ ] Gereksiz sayfaları sil
- [ ] Yeni sayfalar ekle

### 6️⃣ Stil ve Tema
- [ ] `src/app/globals.css` dosyasını özelleştir
- [ ] Tailwind config'i güncelle (gerekirse)
- [ ] Fontları ayarla

### 7️⃣ Test ve Yayınla
- [ ] `npm run dev` ile test et
- [ ] `npm run build` ile build al
- [ ] Hataları düzelt
- [ ] Production'a deploy et

---

## 📞 Yardım ve Destek

### 🐛 Bir hata mı buldunuz?

1. Console'u kontrol edin (F12)
2. [Hata Çözümleri](#-hata-çözümleri) bölümüne bakın
3. Hala çözemediyseniz Arda'ya ulaşın

### 💬 Soru sormak için:

- GitHub Issues açabilirsiniz
- Ekip Slack/Discord kanalını kullanabilirsiniz
- Dokümantasyonu yeniden okuyabilirsiniz

---

## 🎉 Son Notlar

- Bu template esnek ve genişletilebilir şekilde tasarlandı
- Her şeyi anlamak için kod okumaktan çekinmeyin
- Kafanıza takılan yerler için console.log kullanın
- En iyi öğrenme yöntemi: kodu değiştirip sonuçları görmek!

**Başarılar! 🚀**