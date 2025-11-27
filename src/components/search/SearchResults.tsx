'use client';

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
  emptyMessage = 'Aradığınız kriterlere uygun sonuç bulunamadı.',
  children,
}: SearchResultsProps) {
  if (!searched) {
    return null;
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Aranıyor...</p>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">{count} sonuç bulundu</p>
      {children}
    </>
  );
}

