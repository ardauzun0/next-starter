'use client';

import { Button } from '@/components/ui/button';
import type { Category } from '@/types/index.d';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocaleFromPath } from '@/utils/locale-helper';
import { usePathname } from 'next/navigation';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  loading?: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  loading = false,
}: CategoryFilterProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = getTranslations(locale);
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('all')}
          disabled={loading}
        >
          {t.common.all}
        </Button>
        {categories.map((category) => (
          <Button
            key={category.term_id}
            variant={selectedCategory === category.slug ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category.slug)}
            disabled={loading}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>
    </div>
  );
}

