'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocaleFromPath } from '@/utils/locale-helper';
import { usePathname } from 'next/navigation';

interface SearchFormProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
  debounceMs?: number;
  loading?: boolean;
}

export default function SearchForm({
  initialValue = '',
  placeholder,
  onSearch,
  debounceMs = 800,
  loading = false,
}: SearchFormProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = getTranslations(locale);
  const finalPlaceholder = placeholder || t.common.searchPlaceholder;
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (keyword: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    onSearch(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceMs === 0) {
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(value);
      }, debounceMs);
    } else {
      handleSearch('');
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    handleSearch(searchTerm);
  };

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={onSubmit} className="flex gap-4 flex-1">
      <Input
        type="text"
        placeholder={finalPlaceholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? t.common.searching : t.common.searchButton}
      </Button>
    </form>
  );
}

