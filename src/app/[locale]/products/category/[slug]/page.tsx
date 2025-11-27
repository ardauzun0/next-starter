import { getAllProducts, getProductCategories } from '@/services/product';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';

export const revalidate = 60;

interface ProductCategoryListPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductCategoryListPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  
  // Kategori bilgisini al
  const categoriesData = await getProductCategories();
  const category = categoriesData.success 
    ? categoriesData.data.categories.find(cat => cat.slug === slug)
    : null;
  
  const title = category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
  const description = category && category.description 
    ? category.description 
    : `${title} ${t.products.categories}`;
  
  return {
    title: `${title} - ${t.products.title}`,
    description,
  };
}

export default async function ProductCategoryListPage({
  params,
}: ProductCategoryListPageProps) {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  
  // Tüm ürünleri ve kategorileri çek
  const productsData = await getAllProducts(1000, 1);
  const categoriesData = await getProductCategories();
  
  // Kategori bilgisini bul
  const category = categoriesData.success 
    ? categoriesData.data.categories.find(cat => cat.slug === slug)
    : null;
  
  // Kategoriye ait ürünleri filtrele
  const categoryProducts = productsData.success
    ? productsData.data.products.filter(product => 
        product.categories.some(cat => cat.slug === slug)
      )
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={getLocalizedPath('/products', locale)}>← {t.products.backToProducts}</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            {category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          {category && category.description && (
            <p className="text-muted-foreground text-lg mb-8">
              {category.description}
            </p>
          )}
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={`/${locale}${locale === 'tr' ? '/urunler/detay' : '/products/detail'}/${product.slug}`}>
                  {product.thumbnail && typeof product.thumbnail === 'string' && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                    {product.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {product.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {product.filters && product.filters.length > 0 && (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {product.filters.map((filter) => (
                          <span
                            key={filter.id}
                            className="text-xs px-2 py-1 bg-muted rounded"
                          >
                            {filter.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  )}
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

