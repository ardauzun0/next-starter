import { getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog Kategorileri',
  description: 'Tüm blog kategorileri',
};

export default async function BlogCategoriesPage() {
  const categoriesData = await getBlogCategories();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog">← Blog&apos;a Dön</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            Blog Kategorileri
          </h1>
        </div>

        {categoriesData.success && categoriesData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.data.map((category) => (
              <Card
                key={category.term_id}
                className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={`/blog/category/${category.slug}`}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    {category.description && (
                      <CardDescription className="line-clamp-3 mt-2">
                        {category.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.count} yazı
                      </span>
                      <Button variant="ghost" size="sm">
                        Görüntüle →
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Henüz kategori bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

