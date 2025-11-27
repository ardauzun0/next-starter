'use client';

import { Button } from '@/components/ui/button';
import type { Category } from '@/types/api';

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
          Tümü
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

