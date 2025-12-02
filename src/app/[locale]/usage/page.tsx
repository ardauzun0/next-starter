'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import type { UsageArea, Category } from '@/types/index.d';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import CategoryFilter from '@/components/search/CategoryFilter';
import UsageAreaCard from '@/components/search/UsageAreaCard';
import LoadMoreButton from '@/components/search/LoadMoreButton';
import { use } from 'react';
import { getTranslations } from '@/i18n/getTranslations';

const ITEMS_PER_PAGE = 6;

function UsageContent({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [usageAreas, setUsageAreas] = useState<UsageArea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<UsageArea[]>([]);
  const [displayedAreas, setDisplayedAreas] = useState<UsageArea[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setCurrentPage(1);
      try {
        const categoryParam = searchParams.get('category');
        
        let areasResponse;
        
        if (categoryParam && categoryParam !== 'all') {
          areasResponse = await fetch(`/api/usage/category/${categoryParam}`);
        } else {
          areasResponse = await fetch('/api/usage/areas');
        }

        const categoriesResponse = await fetch('/api/usage/categories');

        const areasData = await areasResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (areasData.success && areasData.data) {
          setUsageAreas(areasData.data);
          setFilteredAreas(areasData.data);
          setDisplayedAreas(areasData.data.slice(0, ITEMS_PER_PAGE));
        }

        if (categoriesData.success && categoriesData.data) {
          setCategories(categoriesData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // Sadece search aktifken filtreleme yap
  useEffect(() => {
    if (usageAreas.length > 0 && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = usageAreas.filter((area) =>
        area.title.toLowerCase().includes(searchLower)
      );
      setFilteredAreas(filtered);
      setDisplayedAreas(filtered.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [searchTerm, usageAreas]);

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const nextItems = filteredAreas.slice(startIndex, endIndex);
      
      if (nextItems.length > 0) {
        setDisplayedAreas((prev) => [...prev, ...nextItems]);
        setCurrentPage(nextPage);
      }
      
      setLoadingMore(false);
    }, 300);
  }, [currentPage, filteredAreas]);

  const handleCategoryChange = async (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setLoading(true);
    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    router.push(`${window.location.pathname}?${params.toString()}`);

    try {
      let areasResponse;
      if (categorySlug === 'all') {
        areasResponse = await fetch('/api/usage/areas');
      } else {
        areasResponse = await fetch(`/api/usage/category/${categorySlug}`);
      }

      const areasData = await areasResponse.json();
      
      if (areasData.success && areasData.data) {
        setUsageAreas(areasData.data);
        setFilteredAreas(areasData.data);
        setDisplayedAreas(areasData.data.slice(0, ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((keyword: string) => {
    setSearchTerm(keyword);
    setSelectedCategory('all'); // Reset category when searching
    const params = new URLSearchParams();
    if (keyword.trim()) {
      params.set('q', keyword);
    } else {
      params.delete('q');
    }
    params.delete('category'); // Remove category when searching
    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    
    if (query !== searchTerm) {
      setSearchTerm(query);
    }
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [searchParams, searchTerm, selectedCategory]);

  const hasMore = displayedAreas.length < filteredAreas.length;
  const remainingCount = Math.min(ITEMS_PER_PAGE, filteredAreas.length - displayedAreas.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-8">{t.usage.title}</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchForm
              initialValue={searchTerm}
              onSearch={handleSearch}
              loading={loading}
              placeholder={t.common.searchPlaceholder}
              debounceMs={0}
            />
          </div>

          {!searchTerm && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              loading={loading}
            />
          )}
        </div>

        <SearchResults
          loading={loading}
          searched={true}
          count={filteredAreas.length}
          emptyMessage={t.common.noUsageAreasFound}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAreas.map((area) => (
              <UsageAreaCard key={area.id} area={area} locale={locale} />
            ))}
          </div>

          <LoadMoreButton
            hasMore={hasMore}
            loading={loadingMore}
            onClick={handleLoadMore}
            loadCount={remainingCount}
          />
        </SearchResults>
      </div>
    </div>
  );
}

export default function UsagePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><p>Yükleniyor...</p></div>}>
      <UsageContent locale={locale} />
    </Suspense>
  );
}
