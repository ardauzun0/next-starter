'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { use } from 'react';
import type { Locale } from '@/i18n/request';
import type { Product } from '@/types/index.d';
import SearchForm from '@/components/search/SearchForm';
import { getTranslations } from '@/i18n/routing';

export default function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = use(params);
  const t = getTranslations(locale);
  const resolvedSearchParams = use(searchParams);
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(resolvedSearchParams.q || '');
  const [currentPage] = useState(parseInt(resolvedSearchParams.page || '1', 10));
  const [loadingProducts, setLoadingProducts] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(`/api/products/all?per_page=1000&page=1`);
        const data = await response.json();
        if (data.success && data.data?.products) {
          setAllProducts(data.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const query = resolvedSearchParams.q || '';
    setSearchTerm(query);
  }, [resolvedSearchParams.q]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allProducts;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(searchLower) ||
      product.excerpt?.toLowerCase().includes(searchLower) ||
      product.filters?.some(filter => filter.name.toLowerCase().includes(searchLower))
    );
  }, [allProducts, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleSearch = useCallback((keyword: string) => {
    const params = new URLSearchParams(window.location.search);
    if (keyword.trim()) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const isSearching = !!searchTerm;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-foreground">{t.products.title}</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/${locale}${locale === 'tr' ? '/urunler/kategoriler' : '/products/categories'}`}>{t.common.categories}</Link>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <SearchForm
            initialValue={searchTerm}
            onSearch={handleSearch}
            loading={loadingProducts}
            placeholder={t.common.productSearch}
            debounceMs={300}
          />
        </div>

        {loadingProducts ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Yükleniyor...</p>
          </div>
        ) : (
          <>
            {isSearching && (
              <div className="mb-4">
                <p className="text-muted-foreground">
                  {filteredProducts.length} ürün bulundu
                </p>
              </div>
            )}

            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {paginatedProducts.map((product) => (
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

                {totalPages > 1 && !isSearching && (
                  <div className="flex justify-center gap-2">
                    {currentPage > 1 && (
                      <Button asChild variant="outline">
                        <Link
                          href={`/${locale}${locale === 'tr' ? '/urunler' : '/products'}?page=${currentPage - 1}`}
                        >
                          {t.common.previous}
                        </Link>
                      </Button>
                    )}
                    <span className="flex items-center px-4 text-muted-foreground">
                      {t.common.page} {currentPage} {t.common.of} {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <Button asChild variant="outline">
                        <Link
                          href={`/${locale}${locale === 'tr' ? '/urunler' : '/products'}?page=${currentPage + 1}`}
                        >
                          {t.common.next}
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  {isSearching ? t.common.noProductsFound : t.common.noProducts}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
