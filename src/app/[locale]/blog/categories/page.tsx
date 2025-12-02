import { getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/routing';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/request';

export const dynamic = 'force-dynamic';

interface BlogCategoriesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: BlogCategoriesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.blog.categories,
    description: t.blog.categories,
  };
}

export default async function BlogCategoriesPage({
  params,
}: BlogCategoriesPageProps) {
  const { locale } = await params;
  const categoriesData = await getBlogCategories();
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={getLocalizedPath('/blog', locale)}>← {t.blog.backToBlog}</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            {t.blog.categories}
          </h1>
        </div>

        {categoriesData.success && categoriesData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.data.map((category) => (
              <Card
                key={category.term_id}
                className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={getLocalizedPath(`/blog/category/${category.slug}`, locale)}>
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
              {t.blog.noCategories}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

