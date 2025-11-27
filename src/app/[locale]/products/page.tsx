import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import { getAllProducts } from '@/services/product';
import { getUsageCategories } from '@/services/usage';
import type { Locale } from '@/i18n/config';
import { notFound } from 'next/navigation';

interface ProductsPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string }>;
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

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { locale } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = parseInt(searchParamsResolved.page || '1', 10);
  const productsData = await getAllProducts(10, currentPage);
  const categoriesData = await getUsageCategories();
  const t = getTranslations(locale);

  if (!productsData.success) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-foreground">{t.products.title}</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/products/search', locale)}>{t.common.search}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/products/categories', locale)}>{t.common.categories}</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {categoriesData.success && categoriesData.data.length > 0 && (
            <aside className="lg:w-64 shrink-0">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{t.common.categories}</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {categoriesData.data.map((category) => (
                      <Button
                        key={category.term_id}
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Link href={getLocalizedPath(`/products/category/${category.slug}`, locale)}>
                          {category.name}
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({category.count})
                          </span>
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>
          )}

          <main className="flex-1">
            {productsData.data.products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {productsData.data.products.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Link href={getLocalizedPath(`/products/detail/${product.slug}`, locale)}>
                        {product.thumbnail && (
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
                          {product.description && (
                            <CardDescription className="line-clamp-3">
                              {product.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        {product.category && (
                          <CardContent>
                            <span className="text-sm text-muted-foreground">
                              {product.category}
                            </span>
                          </CardContent>
                        )}
                      </Link>
                    </Card>
                  ))}
                </div>

                {productsData.data.total_pages && productsData.data.total_pages > 1 && (
                  <div className="flex justify-center gap-2">
                    {currentPage > 1 && (
                      <Button asChild variant="outline">
                        <Link
                          href={getLocalizedPath(
                            `/products?page=${currentPage - 1}`,
                            locale
                          )}
                        >
                          Önceki
                        </Link>
                      </Button>
                    )}
                    <span className="flex items-center px-4 text-muted-foreground">
                      Sayfa {currentPage} / {productsData.data.total_pages}
                    </span>
                    {currentPage < (productsData.data.total_pages || 1) && (
                      <Button asChild variant="outline">
                        <Link
                          href={getLocalizedPath(
                            `/products?page=${currentPage + 1}`,
                            locale
                          )}
                        >
                          Sonraki
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Henüz ürün bulunmamaktadır.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
