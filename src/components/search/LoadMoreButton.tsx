'use client';

import { Button } from '@/components/ui/button';

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
        {loading ? 'Yükleniyor...' : `Daha Fazla Yükle (${loadCount})`}
      </Button>
    </div>
  );
}

