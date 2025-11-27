'use client';

import { getTranslations } from '@/i18n/getTranslations';
import { getLocaleFromPath } from '@/utils/locale-helper';
import { usePathname } from 'next/navigation';

interface SearchResultsProps {
  loading: boolean;
  searched: boolean;
  count: number;
  emptyMessage?: string;
  children: React.ReactNode;
}

export default function SearchResults({
  loading,
  searched,
  count,
  emptyMessage,
  children,
}: SearchResultsProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = getTranslations(locale);
  const finalEmptyMessage = emptyMessage || t.common.noResults;
  if (!searched) {
    return null;
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{t.common.searching}</p>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">{finalEmptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">{t.common.resultsFound.replace('{count}', count.toString())}</p>
      {children}
    </>
  );
}

