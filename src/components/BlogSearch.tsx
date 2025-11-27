'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Post } from '@/types/api';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import BlogPostCard from '@/components/search/BlogPostCard';
import type { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/getTranslations';

interface BlogSearchProps {
  locale: Locale;
}

export default function BlogSearch({ locale }: BlogSearchProps) {
  const t = getTranslations(locale);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setPosts([]);
      setSearchTerm('');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/blog/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      if (data.success && data.data?.posts) {
        setPosts(data.data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
      setPosts([]);
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
      setPosts([]);
    }
  }, [searchParams, performSearch]);

  const handleSearch = useCallback((keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router, searchParams]);

  if (!searchTerm) {
    return null;
  }

  return (
    <div className="mb-8">
      <SearchForm
        initialValue={searchTerm}
        onSearch={handleSearch}
        loading={loading}
        placeholder={t.common.blogSearch}
        debounceMs={800}
      />
      <div className="mt-8">
        <SearchResults
          loading={loading}
          searched={true}
          count={posts.length}
          emptyMessage={t.common.noBlogPostsFound}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </SearchResults>
      </div>
    </div>
  );
}

