import { getUsageAreas } from '@/services/usage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';

interface ProductsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.products.title,
    description: t.products.title,
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const usageAreas = await getUsageAreas();
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-foreground">{t.products.title}</h1>
          <Button asChild variant="outline">
            <Link href={getLocalizedPath('/products/categories', locale)}>{t.common.categories}</Link>
          </Button>
        </div>

        {usageAreas.success && usageAreas.data.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              {t.products.usageAreas}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usageAreas.data.map((area) => (
                <Card
                  key={area.id}
                  className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <Link href={getLocalizedPath(`/usage/${area.slug}`, locale)}>
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
                      <p className="text-sm text-muted-foreground mt-2">
                        {area.count} {t.products.products}
                      </p>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            {t.products.visitCategoryPage}
          </p>
        </div>
      </div>
    </div>
  );
}

