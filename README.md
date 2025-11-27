# ✨ Next.js 15 Headless WordPress Proje Kılavuzu

Merhaba ekip\! Ben, bu altyapıyı hazırlayan **Arda Uzun**.

Bu proje, **Next.js 15 App Router** kullanarak, **Headless WordPress** sitenizin frontend'ini oluşturmak için hazırlanmış güçlü bir başlangıç şablonudur. Hızlı performans, harika SEO ve kolay yönetilebilirlik için gerekli tüm yapı taşlarını içerir.

Bu kılavuzu okuduktan sonra projenin neresinde ne olduğunu tam olarak bilecek, yeni bir özellik geliştirirken hangi adımları izleyeceğinizi öğrenmiş olacaksınız. Bu dosya, sadece başlangıçta değil, ileride bir detayı kontrol etmek istediğinizde de başvuracağınız **ana rehberiniz**dir.

-----

## 📋 İçindekiler

  * **1. 🚀 Hızlı Başlangıç**
      * 1.1. Gereksinimler
      * 1.2. Kurulum Adımları
  * **2. 🧭 Proje Mimarisi ve Yapısı**
      * 2.1. Kök Dizin
      * 2.2. `src/` Klasör Yapısı
  * **3. ⚙️ Temel Next.js Kavramları (Yeni Başlayanlar İçin)**
      * 3.1. Server Component (Varsayılan) vs. Client Component
      * 3.2. Veri Çekme (Data Fetching)
  * **4. 💻 Proje Klasörlerinin Detaylı İncelemesi**
      * 4.1. **`src/app/`** (Sayfalar ve Rotalar)
      * 4.2. **`src/services/`** (API İletişimi)
      * 4.3. **`src/types/`** (TypeScript Sözleşmesi)
      * 4.4. **`src/i18n/`** (Çoklu Dil Yönetimi)
      * 4.5. **`src/components/`** (Arayüz Yapı Taşları)
  * **5. 🛠️ Sık Kullanılan İşlemler (Nasıl Yapılır?)**
      * 5.1. Yeni Block Component'i Ekleme
      * 5.2. Yeni Dil Ekleme
      * 5.3. Yeni API Modülü (Service) Ekleme
  * **6. 💡 Best Practices ve Kontrol Listesi**
      * 6.1. Projeyi Özelleştirme Kontrol Listesi
      * 6.2. Dosya Açıklamaları (Değiştir/Değiştirme)
      * 6.3. Hata Ayıklama (Troubleshooting)
  * **7. 🏗️ Build ve Deployment**

-----

## 1\. 🚀 Hızlı Başlangıç

### 1.1. Gereksinimler

Projenin sorunsuz çalışması için gerekli minimum yazılımlar:

  * **Node.js** **18+** (LTS sürümü önerilir)
  * **npm** veya **yarn** (Paket yöneticisi)
  * **WordPress Headless API** (Veri kaynağımız)

### 1.2. Kurulum Adımları

1.  **Projeyi Klonlayın**

    ```bash
    git clone <repository-url>
    cd next-starter
    ```

2.  **Bağımlılıkları Yükleyin**

    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Environment Değişkenlerini Ayarlayın**
    API bağlantısı için projenin kök dizininde **`.env.local`** adında bir dosya oluşturun ve içerisine aşağıdaki değişkenleri ekleyin.

    > 💡 **NEXT\_PUBLIC\_\* kuralı:** Next.js'te `NEXT_PUBLIC_` ile başlayan değişkenler tarayıcıda (Client Component'lerde) kullanılabilir. API URL'imiz tarayıcıda da kullanılacağı için bu kurala uyulmuştur.

    ```env
    NEXT_PUBLIC_API_URL=https://your-wordpress-site.com/wp-json  # WP API'nin kök adresi (ZORUNLU)
    NEXT_PUBLIC_SITE_URL=https://your-frontend-site.com          # Bu Next.js uygulamasının canlı URL'i
    NEXT_PUBLIC_SITE_NAME=Site Adı                              # Varsayılan site adı
    ```

4.  **Geliştirme Sunucusunu Başlatın**

    ```bash
    npm run dev
    # veya
    yarn dev
    ```

    Tarayıcıda `http://localhost:3001` adresini açarak projenin çalıştığını kontrol edin.

-----

## 2\. 🧭 Proje Mimarisi ve Yapısı

Bu proje, Next.js'in modern **App Router** yapısını kullanır. Tüm kaynak kodları **`src/`** klasörünün altındadır.

### 2.1. Kök Dizin

| Dosya/Klasör | Açıklama |
| :--- | :--- |
| `public/` | **Statik dosyalar.** Logolar, resimler, fontlar gibi değişmeyecek dosyalar buraya konur. (Örn: `/public/images/logo.png`'ye `<img src="/images/logo.png" />` ile erişilir). |
| `src/` | **Tüm kaynak kodları.** Sayfalar, Component'ler, API iletişimleri, type tanımları, her şey buradadır. |
| `middleware.ts` | **Her istekten önce çalışır.** Projemizde **çoklu dil (i18n) yönlendirmesi** için kullanılır. |
| `next.config.ts` | Next.js'in genel ayarları (Örn: Harici resim domain izinleri, `redirect`'ler). |
| `tsconfig.json` | **TypeScript ayarları.** `tsconfig` içinde tanımlanan **Path Alias'ları** (`@/components`, `@/services` vb.) kod içinde kolay import etmeyi sağlar. |
| `package.json` | Projenin bağımlılıkları ve çalıştırma komutları (`npm run dev`, `npm run build`). |

### 2.2. `src/` Klasör Yapısı

Next.js'in yapısını ve Clean Architecture prensiplerini birleştirerek projenizi **domainlere** (API, Types, Components vb.) ayırdık.

> 

| Klasör | Ne İçin Kullanılır? | Örnek Dosyalar |
| :--- | :--- | :--- |
| **`app/`** | **Tüm Sayfalar ve Rotalar.** Next.js'in sayfa tabanlı routing (yönlendirme) yapısıdır. | `[locale]/page.tsx`, `api/route.ts` |
| **`components/`** | **Yeniden Kullanılabilir Arayüz Parçaları.** UI elementleri, Block'lar ve Feature Component'ler. | `ui/Button.tsx`, `blocks/Hero.tsx` |
| **`services/`** | **WordPress API ile İletişim.** Tüm veri çekme (data fetching) fonksiyonları. | `core.ts`, `blog.ts`, `page.ts` |
| **`types/`** | **TypeScript Veri Sözleşmeleri.** API'den gelen verilerin ve genel objelerin tip tanımları. | `api.ts` |
| **`i18n/`** | **Çoklu Dil (i18n) Yönetimi.** Dil konfigürasyonu ve çeviri dosyaları. | `config.ts`, `messages/tr.json` |
| **`utils/`** | **Genel Yardımcı Fonksiyonlar.** Proje genelinde kullanılan küçük, mantıksal işlevler. | `url-helper.ts`, `date-helper.ts` |
| **`lib/`** | **Harici Kütüphane Helper'ları.** Tailwind CSS sınıf birleştirme fonksiyonu gibi genel utility'ler. | `utils.ts` |

-----

## 3\. ⚙️ Temel Next.js Kavramları (Yeni Başlayanlar İçin)

Ekibimizin Next.js'i yeni öğreniyor olması nedeniyle, App Router'ın en kritik iki kavramını anlamanız çok önemlidir.

### 3.1. Server Component (Varsayılan) vs. Client Component

Next.js 15'te tüm component'ler varsayılan olarak **Server Component**'lerdir (Sunucuda çalışır).

| Kavram | Nasıl Tanımlanır? | Ne Zaman Kullanılır? | Avantajı |
| :--- | :--- | :--- | :--- |
| **Server Component** | **Varsayılan** (Ek kod gerekmez) | Veri çekme (`async/await` ile), SEO (Metadata), statik içerik render etme. | Daha hızlı yükleme, paket boyutunun küçülmesi, güvenli veri çekme. |
| **Client Component** | Dosyanın en üstüne **`'use client';`** eklenir. | Tarayıcı etkileşimleri (Butona tıklama, form gönderimi, `useState`, `useEffect`). | Kullanıcı etkileşimi, tarayıcı API'larına erişim. |

> 💡 **Kural:** Her zaman **Server Component** olarak başlayın. Sadece **etkileşim (interactivity)** eklemeniz gerektiğinde **`'use client';`** ekleyin.

**Örnek:**

```typescript
// src/app/[locale]/page.tsx (Varsayılan Server Component)
export default async function Page() {
  const data = await getPageData(); // ✅ API çağrısı direkt burada yapılabilir
  return (
    <div>
      <h1>{data.title}</h1>
      <InteractiveForm /> // 👈 Client Component'i burada kullanabilirsiniz
    </div>
  );
}

// src/components/InteractiveForm.tsx (Client Component)
'use client'; 
import { useState } from 'react';

export default function InteractiveForm() {
  const [value, setValue] = useState(''); // ✅ State kullanmak için gerekli
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### 3.2. Veri Çekme (Data Fetching)

API'den veri çekme (data fetching) her zaman **Server Component'lerde** yapılır. Bu, daha hızlı yükleme ve daha iyi SEO sağlar.

**Service Fonksiyonu Kullanımı:**

Tüm API çağrıları `src/services/` klasöründeki fonksiyonlar üzerinden yapılmalıdır.

```typescript
// Sayfa Component'inde (src/app/[locale]/[slug]/page.tsx)
import { getPageBySlug } from '@/services/page';
import { notFound } from 'next/navigation'; // Next.js'in 404 yönlendirme helper'ı

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const pageData = await getPageBySlug(params.slug);

  // 🚨 Hata Yönetimi: API'den success: false veya 404 gelirse
  if (!pageData.success) {
    notFound(); // Next.js'in 404 sayfasını tetikler
  }

  // Veri başarıyla çekildi, kullanıma hazır.
  return (
    <main>
      <h1>{pageData.data.title}</h1>
      {/* ... diğer componentler ... */}
    </main>
  );
}
```

-----

## 4\. 💻 Proje Klasörlerinin Detaylı İncelemesi

### 4.1. **`src/app/`** (Sayfalar ve Rotalar)

Bu klasör, Next.js uygulamasının adres yapısını (Routing) belirler.

  * **`[locale]/`:** Tüm sayfalarımız, dil kodu (`tr`, `en`, vb.) altında gruplandırılmıştır. Bu, **`middleware.ts`** ile yönetilir.
  * **`layout.tsx`:** O klasör ve altındaki tüm sayfalara uygulanan arayüz çatısıdır (Header, Footer, Global state, vb.).
      * **Root `layout.tsx`:** En üst düzey HTML, Body, Global CSS gibi ayarları içerir.
      * **`[locale]/layout.tsx`:** Header/Footer'ı global API'den veri çekerek render eder.
  * **`page.tsx`:** O klasörün ana sayfasını temsil eder (Örn: `/tr/`).
  * **`[slug]/page.tsx`:** Köşeli parantezler, **dinamik rotaları** (URL parametreleri) temsil eder (Örn: `/tr/hakkimizda`).
  * **`api/`:** Serverless fonksiyonlar gibi çalışan **Route Handlers** (eski adıyla API Routes) buradadır.
      * **Örnek:** `api/blog/search/route.ts`'ye `GET /api/blog/search?q=keyword` isteği gönderilir.

### 4.2. **`src/services/`** (API İletişimi)

WordPress API ile konuşan tek yer burasıdır.

  * **`core.ts`:**
      * Tüm API çağrılarını yapan temel **`fetchAPI`** fonksiyonunu içerir.
      * API'ye yapılan her istek buradaki mantıktan geçer.
      * **❌ DEĞİŞTİRMEYİN:** Hata yönetimi ve temel `fetch` mantığı sabittir.
  * **`global.ts`:** Global menü, footer, site ayarları gibi her sayfada kullanılan verilerin çekildiği yer.
  * **`blog.ts`, `product.ts`, `page.ts`, vb.:**
      * Her biri kendi domainine ait endpoint'leri içerir.
      * **✅ GÜNCELLEYİN:** Yeni bir API endpoint'i (örn: Haberler) eklendiğinde buraya yeni bir dosya (`news.ts`) ekleyin.

### 4.3. **`src/types/`** (TypeScript Sözleşmesi)

**`src/types/api.ts`** dosyası, WordPress API'nizin döndürdüğü **tüm veri yapılarını** tanımlar.

  * **Önemli:** API'nizin veri formatı değiştiğinde, öncelikle **bu dosyayı güncelleyin**. Bu, projenin geri kalanında nelerin etkilendiğini anında görmenizi sağlar.
  * **Best Practice:** Block Component'lerinin Interface'leri (tipleri) component'in kendi dosyasında (`co-located types`) tanımlanmalıdır.

### 4.4. **`src/i18n/`** (Çoklu Dil Yönetimi)

  * **`config.ts`:** Desteklenen diller (`locales`) ve varsayılan dili tanımlar. Yeni dil eklemenin ilk adımı burasıdır.
  * **`messages/*.json`:** Statik metinlerin (Düğme yazıları, Form başlıkları, Footer metinleri) çevirileri buraya yazılır.
  * **Kullanım:** Sayfa component'lerinde `getTranslations(locale)` fonksiyonu çağrılarak çeviri objesi alınır.
    ```typescript
    // Örnek: t.common.back
    const t = getTranslations(locale);
    <Button>{t.common.back}</Button>
    ```

### 4.5. **`src/components/`** (Arayüz Yapı Taşları)

  * **`blocks/`:** WordPress ACF Flexible Content'ten gelen block'ları render eden component'ler. Her block, kendi dosyasıdır (Örn: `Hero.tsx`).
  * **`ui/`:** **shadcn/ui** ile oluşturulmuş basit, yeniden kullanılabilir UI component'leri (Button, Input, Card). Bu component'ler projenin görsel dilini taşır.
  * **`seo/`:** JSON-LD gibi SEO'ya yönelik yardımcı component'ler.
  * **Önemli Component'ler:**
      * **`BlockRenderer.tsx`:** ACF block'larını otomatik olarak doğru component'e yönlendirir. Yeni block eklediğinizde sadece bu dosyayı güncellemeniz gerekir.
      * **`Header.tsx` / `Footer.tsx`:** Global verileri çekip menü/footer yapısını render eder.

-----

## 5\. 🛠️ Sık Kullanılan İşlemler (Nasıl Yapılır?)

Bu bölüm, en sık yapacağınız geliştirme adımlarını basit adımlarla anlatır.

### 5.1. Yeni Block Component'i Ekleme (ACF Flexible Content İçin)

Yeni bir block (örn: Sık Sorulan Sorular - `faq`) eklemek istediğinizde:

1.  **Block Component'ini Oluşturun**
    Yeni bir dosya açın: `src/components/blocks/FaqBlock.tsx`.

    ```typescript
    // src/components/blocks/FaqBlock.tsx
    import { BaseBlock } from '@/types/api';

    // 1. Kendi tipini component içinde tanımla (co-located)
    export interface FaqBlockProps extends BaseBlock {
      acf_fc_layout: 'faq_block'; // 🚨 Bu, WP'deki block adı ile aynı OLMALIDIR
      title: string;
      items: Array<{ question: string; answer: string }>;
    }

    export default function FaqBlock({ title, items }: FaqBlockProps) {
      return (
        <section className="py-20">
          <h2 className="text-4xl">{title}</h2>
          {items.map((item, index) => (
            <details key={index} className="border-b py-4">
              <summary className="font-bold">{item.question}</summary>
              <p className="mt-2 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </section>
      );
    }
    ```

2.  **`BlockRenderer`'a Kayıt Edin**
    `src/components/blocks/BlockRenderer.tsx` dosyasını açın ve component'i import edip `blockMap` objesine ekleyin.

    ```typescript
    // src/components/blocks/BlockRenderer.tsx
    import FaqBlock from './FaqBlock'; // 👈 Import et

    const blockMap: Record<string, React.ComponentType<any>> = {
      hero: Hero,
      imagecontent: ImageContent,
      faq_block: FaqBlock, // 👈 Ekleyerek sistemi bilgilendir
      // ... diğer block'lar
    };
    ```

    > ✅ **Kural:** `blockMap`'teki key (`faq_block`), WordPress'ten gelen **`acf_fc_layout`** değeri ile **tam eşleşmelidir**.

### 5.2. Yeni Dil Ekleme (Örn: Almanca - `de`)

Next.js'in `middleware` ve i18n yapısı sayesinde yeni dil eklemek çok basittir.

1.  **`config.ts`'yi Güncelleyin**
    `src/i18n/config.ts` dosyasına yeni dil kodunu ekleyin.

    ```typescript
    export const locales = ['tr', 'en', 'de'] as const; // 👈 'de' eklendi
    export const defaultLocale = 'tr' as const;

    export const localeNames: Record<Locale, string> = {
      tr: 'Türkçe',
      en: 'English',
      de: 'Deutsch', // 👈 İsim eklendi
    };
    ```

2.  **Çeviri Dosyası Oluşturun**
    Mevcut `tr.json` dosyasını kopyalayıp, Almanca karşılıklarını yazarak `src/i18n/messages/de.json` dosyasını oluşturun.

    ```json
    // src/i18n/messages/de.json
    {
      "common": {
        "back": "Zurück",
        "search": "Suchen"
      },
      "blog": {
        "title": "Blog"
      }
      // ... tüm key'leri çevirin
    }
    ```

3.  **`getTranslations`'ı Güncelleyin**
    `src/i18n/getTranslations.ts` dosyasına yeni çeviri dosyasını import edip `messages` objesine ekleyin.

    ```typescript
    import trMessages from './messages/tr.json';
    import enMessages from './messages/en.json';
    import deMessages from './messages/de.json'; // 👈 Yeni import

    const messages: Record<Locale, Messages> = {
      tr: trMessages,
      en: enMessages,
      de: deMessages, // 👈 Objeye eklendi
    };
    ```

    > 🎉 Artık `/de/` rotası sorunsuz çalışacak ve `LanguageSwitcher` otomatik olarak Almanca'yı görecektir.

### 5.3. Yeni API Modülü (Service) Ekleme (Örn: Haberler - `news`)

1.  **Type Tanımını Oluşturun**
    `src/types/api.ts` dosyasına haber verisinin tipini ekleyin.

    ```typescript
    export interface NewsItem {
      id: number;
      title: string;
      slug: string;
      date: string;
    }

    export interface NewsListResponse {
      success: boolean;
      data: NewsItem[];
    }
    // ... detay için NewsDetailResponse
    ```

2.  **Service Fonksiyonunu Oluşturun**
    `src/services/news.ts` dosyasını oluşturun ve `core.ts`'ten `fetchAPI`'yi kullanarak veriyi çekin.

    ```typescript
    // src/services/news.ts
    import { fetchAPI } from './core';
    import type { NewsListResponse, NewsDetailResponse } from '../types/api';

    export async function getNewsList(): Promise<NewsListResponse> {
      return fetchAPI<NewsListResponse>('/news/v1'); // 👈 API endpoint
    }

    export async function getNewsDetail(slug: string): Promise<NewsDetailResponse> {
      try {
        return await fetchAPI<NewsDetailResponse>(`/news/v1/detail/${slug}`);
      } catch (error) {
        // ... Hata yönetimi
        throw error;
      }
    }
    ```

3.  **Sayfayı Oluşturun**
    `src/app/[locale]/news/page.tsx` sayfasını oluşturun ve yeni service fonksiyonunu kullanın.

    ```typescript
    // src/app/[locale]/news/page.tsx
    import { getNewsList } from '@/services/news';

    export default async function NewsListPage() {
      const newsList = await getNewsList();
      
      if (!newsList.success) return <p>Haberler yüklenemedi.</p>;
      
      return (
        <ul>
          {newsList.data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      );
    }
    ```

-----

## 6\. 💡 Best Practices ve Kontrol Listesi

### 6.1. Projeyi Özelleştirme Kontrol Listesi

Bu altyapıyı kendi projenize adapte ederken **mutlaka** bu adımları takip edin:

| Durum | Dosya/Ayar | Açıklama |
| :--- | :--- | :--- |
| **Zorunlu ✅** | `.env.local` | API ve site URL'lerini güncelleyin. |
| **Zorunlu ✅** | `src/types/api.ts` | **API'nizin döndürdüğü veri yapısına göre tüm tipleri güncelleyin.** Bu, projenin en önemli adımıdır. |
| **Zorunlu ✅** | `next.config.ts` | `images.remotePatterns` altına WordPress sitenizin resim domainini ekleyin. |
| **Zorunlu ✅** | `src/i18n/messages/*.json` | Tüm statik çevirileri kontrol edin ve güncelleyin. |
| **Zorunlu ✅** | `src/components/blocks/*.tsx` | Projenizde kullanılmayacak block component'lerini silin, kullanılacakları özelleştirin. |
| **Önerilen ✏️** | `src/app/globals.css` | Tailwind renk paleti, fontlar ve global stilleri projenize göre güncelleyin. |
| **Önerilen ✏️** | `src/services/*.ts` | Endpoint'lerinizi API dokümantasyonunuza göre kontrol edin. |

### 6.2. Dosya Açıklamaları (Değiştir/Değiştirme)

| Dosya Adı | Ne Yapar? | Değiştirmeli Misiniz? |
| :--- | :--- | :--- |
| `middleware.ts` | Locale Routing mantığı | ❌ **HAYIR** (Sadece i18n/config.ts'yi değiştirin) |
| `src/services/core.ts` | Temel Fetch Wrapper | ❌ **HAYIR** (API URL'i .env'den okunur) |
| `src/utils/locale-helper.ts` | Locale URL oluşturucular | ❌ **HAYIR** (Core routing mantığıdır) |
| `src/types/api.ts` | API Response Type'ları | ✅ **EVET** (API'nizin sözleşmesidir) |
| `src/components/blocks/BlockRenderer.tsx` | Block haritası | ✅ **EVET** (Yeni block eklenirken) |
| `src/app/[locale]/layout.tsx` | Ana Header/Footer entegrasyonu | ✅ **EVET** (Stil ve component yapısı için) |

### 6.3. Hata Ayıklama (Troubleshooting)

| Hata Mesajı | Olası Sebep | Çözüm |
| :--- | :--- | :--- |
| **`404 Not Found` (API'den)** | API URL'i yanlış veya endpoint yanlış. | `.env.local`'daki `NEXT_PUBLIC_API_URL`'i ve `src/services/` içindeki endpoint'leri kontrol edin. |
| **`Type Error: Property 'title' does not exist on type '...'`** | API'den gelen verinin yapısı değişti. | **`src/types/api.ts`** dosyasını yeni API yapısına göre güncelleyin. |
| **Resimler yüklenmiyor** | Next.js'e harici domain izni verilmemiş. | `next.config.ts`'deki `images.remotePatterns` alanına resimlerin geldiği domaini ekleyin. |
| **`Hydration Error`** | Server ve Client Component'lerin render çıktıları eşleşmiyor. | Etkileşimli elementleri bir Client Component (`'use client'`) içine taşıyın. |
| **Locale değişmiyor** | `middleware.ts` rotayı yakalayamıyor. | Projenin kök dizininde olduğundan ve `src/i18n/config.ts`'deki dillerin doğru olduğundan emin olun. |

-----

## 7\. 🏗️ Build ve Deployment

### Production Build

Canlıya çıkmadan önce bu komutları kullanın.

```bash
# Projeyi derler (Build)
npm run build 

# Derlenen projeyi başlatır (Production'da bu çalışır)
npm start
```

### Build Alırken Dikkat Edilmesi Gerekenler

1.  **Environment Variables:** Production ortamında `.env.local` dosyası kullanılmaz. Hosting platformunuzda (Vercel, Netlify vb.) environment değişkenlerini (`NEXT_PUBLIC_API_URL` gibi) **ayarladığınızdan emin olun**.
2.  **Statik Sayfalar (ISR):** Sayfa component'lerinde `export const revalidate = 3600;` gibi değerler kullanarak **Incremental Static Regeneration (ISR)** ayarlayabilirsiniz. Bu, sayfaların sunucuda statik olarak üretilmesini, ancak belirli aralıklarla (bu örnekte 1 saat) güncellenmesini sağlar. Bu, en iyi performans yöntemidir.