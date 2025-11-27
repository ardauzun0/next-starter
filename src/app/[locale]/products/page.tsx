'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocalizedPath } from '@/utils/locale-helper';
import { use } from 'react';
import type { Locale } from '@/i18n/config';
import type { Product } from '@/types/api';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';

export default function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale } = use(params);
  const resolvedSearchParams = use(searchParams);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(resolvedSearchParams.q || '');
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(parseInt(resolvedSearchParams.page || '1', 10));
  const [loadingProducts, setLoadingProducts] = useState(true);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(`/api/products/all?per_page=100&page=1`);
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

    if (!searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setProducts(allProducts.slice(startIndex, endIndex));
    }
  }, [allProducts, currentPage, searchTerm]);

  const performSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setProducts([]);
      setSearchTerm('');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/products/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      if (data.success && data.data?.products) {
        setProducts(data.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = resolvedSearchParams.q || '';
    setSearchTerm(query);
    if (query) {
      performSearch(query);
    } else {
      setProducts([]);
    }
  }, [resolvedSearchParams.q, performSearch]);

  const handleSearch = useCallback((keyword: string) => {
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const isSearching = !!searchTerm;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-foreground">Ürünler</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/products/categories', locale)}>Kategoriler</Link>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <SearchForm
            initialValue={searchTerm}
            onSearch={handleSearch}
            loading={loading || loadingProducts}
            placeholder="Ürün ara..."
            debounceMs={800}
          />
        </div>

        {isSearching ? (
          <SearchResults
            loading={loading}
            searched={true}
            count={products.length}
            emptyMessage="Aradığınız kriterlere uygun ürün bulunamadı."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <Link href={getLocalizedPath(`/products/detail/${product.slug}`, locale)}>
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
          </SearchResults>
        ) : (
          <>
            {loadingProducts ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Yükleniyor...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Link href={getLocalizedPath(`/products/detail/${product.slug}`, locale)}>
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

                {totalPages > 1 && (
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
                      Sayfa {currentPage} / {totalPages}
                    </span>
                    {currentPage < totalPages && (
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
          </>
        )}
      </div>
    </div>
  );
}
