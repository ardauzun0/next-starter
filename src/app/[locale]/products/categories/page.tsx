import { getUsageCategories } from '@/services/usage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import type { Locale } from '@/i18n/config';

interface ProductCategoriesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: ProductCategoriesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.products.categories,
    description: t.products.categories,
  };
}

export default async function ProductCategoriesPage({
  params,
}: ProductCategoriesPageProps) {
  const { locale } = await params;
  const categoriesData = await getUsageCategories();
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={`/${locale}${locale === 'tr' ? '/urunler' : '/products'}`}>← {t.products.backToProducts}</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            {t.products.categories}
          </h1>
        </div>

        {categoriesData.success && categoriesData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.data.map((category) => (
              <Card
                key={category.term_id}
                className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={`/${locale}${locale === 'tr' ? '/urunler/kategori' : '/products/category'}/${category.slug}`}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    {category.description && (
                      <CardDescription className="line-clamp-3 mt-2">
                        {category.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} {t.products.products}
                      </span>
                      <Button variant="ghost" size="sm">
                        Görüntüle →
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t.products.noCategories}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

