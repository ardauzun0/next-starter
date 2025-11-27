import { getUsageAreasByCategory } from '@/services/usage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';

interface ProductCategoryListPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductCategoryListPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  return {
    title: `${t.products.title} - ${slug}`,
    description: `${slug} ${t.products.noProductsInCategory}`,
  };
}

export default async function ProductCategoryListPage({
  params,
}: ProductCategoryListPageProps) {
  const { locale, slug } = await params;
  const usageAreasData = await getUsageAreasByCategory(slug);
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={getLocalizedPath('/products', locale)}>← {t.products.backToProducts}</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            {slug.charAt(0).toUpperCase() + slug.slice(1)} Kategorisi
          </h1>
        </div>

        {usageAreasData.success && usageAreasData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usageAreasData.data.map((area) => (
              <Card
                key={area.id}
                className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={`/${locale}${locale === 'tr' ? '/kullanim-alanlari' : '/usage'}/${area.slug}`}>
                  {area.thumbnail && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={area.thumbnail}
                        alt={area.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{area.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {area.count} {t.products.products}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t.products.noProductsInCategory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

