'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import BlogPostCard from '@/components/search/BlogPostCard';

function BlogSearchContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Array<{ id: number; title: string; description?: string; date: string; slug: string; thumbnail?: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const isInitialMount = useRef(true);

  const performSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/blog/search?keyword=${encodeURIComponent(keyword)}`
      );
      const data = await response.json();
      if (data.success && data.data?.posts) {
        setResults(data.data.posts);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (query) {
        setSearchTerm(query);
        performSearch(query);
      }
      return;
    }

    if (query && query !== searchTerm) {
      setSearchTerm(query);
      performSearch(query);
    } else if (!query && searchTerm) {
      setSearchTerm('');
      setResults([]);
      setSearched(false);
    }
  }, [searchParams, performSearch, searchTerm]);

  const handleSearch = useCallback((keyword: string) => {
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(keyword)}`;
    router.push(newUrl);
  }, [router]);

  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link href={getLocalizedPath('/blog', locale)}>← Blog&apos;a Dön</Link>
            </Button>
            <h1 className="text-5xl font-bold text-foreground mb-8">
              {query ? `"${query}" Arama Sonuçları` : 'Blog Arama'}
            </h1>

            <SearchForm
              initialValue={searchTerm}
              onSearch={handleSearch}
              loading={loading}
              placeholder="Arama yapın..."
            />
          </div>

          <SearchResults
            loading={loading}
            searched={searched}
            count={results.length}
            emptyMessage="Aradığınız kriterlere uygun sonuç bulunamadı."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <BlogPostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </SearchResults>
        </div>
      </div>
  );
}

export default function BlogSearchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><p>Yükleniyor...</p></div>}>
      <BlogSearchContent locale={locale} />
    </Suspense>
  );
}
