'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';
import type { Product } from '@/types/api';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';

export default function ProductSearchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setProducts([]);
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
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    if (query) {
      performSearch(query);
    } else {
      setProducts([]);
    }
  }, [searchParams, performSearch]);

  const handleSearch = useCallback((keyword: string) => {
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('q', keyword);
      router.push(`${window.location.pathname}?${params.toString()}`);
    } else {
      router.push(window.location.pathname);
    }
  }, [router]);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      document.title = `"${query}" Arama Sonuçları - Ürünler`;
    } else {
      document.title = 'Ürün Arama';
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link href={getLocalizedPath('/products', locale)}>← Ürünler&apos;e Dön</Link>
            </Button>
            <h1 className="text-5xl font-bold text-foreground mb-8">
              {query ? `"${query}" Arama Sonuçları` : 'Ürün Arama'}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <SearchForm
                initialValue={searchTerm}
                onSearch={handleSearch}
                loading={loading}
                placeholder="Ürün ara..."
                debounceMs={0}
              />
            </div>
          </div>

          <SearchResults
            loading={loading}
            searched={!!query}
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
        </div>
      </div>
    </>
  );
}
