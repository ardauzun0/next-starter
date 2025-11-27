'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';

export default function ProductSearchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Array<{ id: number; title: string; slug: string; thumbnail?: string; count: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (term?: string) => {
    const keyword = term || searchTerm;
    if (!keyword.trim()) return;

    setLoading(true);
    setSearched(true);

    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(keyword)}`;
    router.push(newUrl);

    try {
      const response = await fetch(
        `/api/products/search?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();
      if (data.success && data.data) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={getLocalizedPath('/products', locale)}>← Ürünler&apos;e Dön</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">Ürün Arama</h1>

          <form onSubmit={onSubmit} className="flex gap-4 mb-8">
            <Input
              type="text"
              placeholder="Arama yapın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Aranıyor...' : 'Ara'}
            </Button>
          </form>
        </div>

        {searched && (
          <div>
            {loading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aranıyor...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  {results.length} sonuç bulundu
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((item) => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Link href={getLocalizedPath(`/usage/${item.slug}`, locale)}>
                        {item.thumbnail && (
                          <div className="relative w-full h-48 overflow-hidden">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2">
                            {item.title}
                          </CardTitle>
                          <CardDescription>
                            {item.count} ürün
                          </CardDescription>
                        </CardHeader>
                      </Link>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Aradığınız kriterlere uygun sonuç bulunamadı.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

