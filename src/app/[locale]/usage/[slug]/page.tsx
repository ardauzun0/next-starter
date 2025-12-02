import { getUsageAreaDetail } from '@/services/usage';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { constructMetadata } from '@/utils/seo-helper';
import { getSEOBaseUrl } from '@/utils/url-helper';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from '@/i18n/routing';
import type { Locale } from '@/i18n/request';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface UsageAreaPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: UsageAreaPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const usageData = await getUsageAreaDetail(slug);

    if (!usageData.success) {
      return {
        title: 'Kullanım Alanı Bulunamadı',
      };
    }

    const baseUrl = getSEOBaseUrl(locale);
    // SEO için her zaman /usage/ kullan (WordPress backend path)
    const fullUrl = `${baseUrl}/usage/${slug}/`;
    const seoData = await getSEOData(fullUrl);

    if (!seoData) {
      return {
        title: usageData.data.title,
        description: '',
      };
    }

    return constructMetadata(seoData, baseUrl);
  } catch {
    return {
      title: 'Kullanım Alanı Bulunamadı',
    };
  }
}

export default async function UsageAreaPage({ params }: UsageAreaPageProps) {
  const { locale, slug } = await params;
  
  const usageData = await getUsageAreaDetail(slug);

  if (!usageData.success) {
    notFound();
  }

  const baseUrl = getSEOBaseUrl(locale);
  // SEO için her zaman /usage/ kullan (WordPress backend path)
  const fullUrl = `${baseUrl}/usage/${slug}/`;
  const seoData = await getSEOData(fullUrl);
  const t = getTranslations(locale);

  return (
    <>
      {seoData && <JsonLd data={seoData.head.jsonLd} />}

      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {usageData.data.bc_exp && (
            <div className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-12">
              {usageData.data.bc_select === 'video' && usageData.data.bc_video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={usageData.data.bc_video} type="video/mp4" />
                </video>
              ) : usageData.data.bc_select === 'image' && usageData.data.bc_image ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={usageData.data.bc_image}
                    alt={usageData.data.bc_exp}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
              ) : null}
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground drop-shadow-lg">
                  {usageData.data.bc_exp}
                </h1>
              </div>
            </div>
          )}

          {usageData.data.title && !usageData.data.bc_exp && (
            <h1 className="text-5xl font-bold mb-8 text-foreground">
              {usageData.data.title}
            </h1>
          )}

          {usageData.data.content && (
            <div
              className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80 mb-12"
              dangerouslySetInnerHTML={{ __html: usageData.data.content }}
            />
          )}

          {usageData.data.products && usageData.data.products.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{t.usage.products}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {usageData.data.products.map((product, index) => (
                  <Card
                    key={`product-${index}-${product.slug}`}
                    className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <Link href={`/${locale}${locale === 'tr' ? '/urunler/detay' : '/products/detail'}/${product.slug}`}>
                      {product.image && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        {product.category && (
                          <CardDescription>{product.category}</CardDescription>
                        )}
                      </CardHeader>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
