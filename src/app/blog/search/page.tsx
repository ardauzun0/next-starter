'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `/api/blog/search?keyword=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.success && data.data?.posts) {
        setResults(data.data.posts);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog">← Blog&apos;a Dön</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">Blog Arama</h1>

          <form onSubmit={handleSearch} className="flex gap-4 mb-8">
            <Input
              type="text"
              placeholder="Arama yapın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Aranıyor...' : 'Ara'}
            </Button>
          </form>
        </div>

        {searched && (
          <div>
            {loading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aranıyor...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  {results.length} sonuç bulundu
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((post) => (
                    <Card
                      key={post.id}
                      className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        {post.thumbnail && (
                          <div className="relative w-full h-48 overflow-hidden">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="line-clamp-2">
                            {post.title}
                          </CardTitle>
                          {post.description && (
                            <CardDescription className="line-clamp-3">
                              {post.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Aradığınız kriterlere uygun sonuç bulunamadı.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

