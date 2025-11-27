import { getPosts, getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.blog.title,
    description: t.blog.title,
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = parseInt(searchParamsResolved.page || '1', 10);
  const postsData = await getPosts(currentPage);
  const categoriesData = await getBlogCategories();
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-bold text-foreground">{t.blog.title}</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/blog/search', locale)} target="_blank">{t.common.search}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/blog/categories', locale)}>{t.common.categories}</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {categoriesData.success && categoriesData.data.length > 0 && (
            <aside className="lg:w-64 shrink-0">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>{t.common.categories}</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {categoriesData.data.map((category) => (
                      <Button
                        key={category.term_id}
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <Link href={getLocalizedPath(`/blog/category/${category.slug}`, locale)}>
                          {category.name}
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({category.count})
                          </span>
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>
          )}

          <main className="flex-1">
            {postsData.success && postsData.data.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {postsData.data.posts.map((post) => (
                    <Card
                      key={post.id}
                      className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <Link href={getLocalizedPath(`/blog/${post.slug}`, locale)}>
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
                            {new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
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

                {postsData.data.total_pages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from(
                      { length: postsData.data.total_pages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <Button
                        key={page}
                        asChild
                        variant={page === currentPage ? 'default' : 'outline'}
                      >
                        <Link href={`${getLocalizedPath('/blog', locale)}?page=${page}`}>{page}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {t.blog.noPosts}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

