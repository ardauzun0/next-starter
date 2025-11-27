'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
  debounceMs?: number;
  loading?: boolean;
}

export default function SearchForm({
  initialValue = '',
  placeholder = 'Arama yapın...',
  onSearch,
  debounceMs = 800,
  loading = false,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    onSearch(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

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
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Aranıyor...' : 'Ara'}
      </Button>
    </form>
  );
}

