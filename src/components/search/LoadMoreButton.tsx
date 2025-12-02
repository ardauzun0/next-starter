'use client';

import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/routing';
import { getLocaleFromPath } from '@/utils/locale-helper';
import { usePathname } from 'next/navigation';

interface LoadMoreButtonProps {
  hasMore: boolean;
  loading: boolean;
  onClick: () => void;
  loadCount?: number;
}

export default function LoadMoreButton({
  hasMore,
  loading,
  onClick,
  loadCount = 6,
}: LoadMoreButtonProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = getTranslations(locale);
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <Button
        onClick={onClick}
        disabled={loading}
        variant="outline"
        size="lg"
      >
        {loading ? t.common.loading : `${t.common.loadMore} (${loadCount})`}
      </Button>
    </div>
  );
}

