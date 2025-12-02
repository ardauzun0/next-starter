import { getPostsByCategory } from '@/services/blog';
import { getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/routing';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/request';
import type { Post } from '@/types/index.d';

export const dynamic = 'force-dynamic';

interface BlogCategoryPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  return {
    title: `${t.blog.title} - ${slug}`,
    description: `${slug} ${t.blog.noPostsInCategory}`,
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: BlogCategoryPageProps) {
  const { locale, slug } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = parseInt(searchParamsResolved.page || '1', 10);
  const t = getTranslations(locale);
  
  let postsData;
  try {
    postsData = await getPostsByCategory(slug, currentPage);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    postsData = { success: false, data: [] };
  }

  const categoriesData = await getBlogCategories();
  const currentCategory = categoriesData.data.find((cat) => cat.slug === slug);
  
  // Handle both array and object response formats
  let posts: Post[] = [];
  
  if (postsData.success) {
    if (Array.isArray(postsData.data)) {
      posts = postsData.data;
    } else if (postsData.data && 'posts' in postsData.data) {
      posts = postsData.data.posts;
    }
  }
  
  const ITEMS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const hasPosts = paginatedPosts.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={getLocalizedPath('/blog', locale)}>← {t.blog.backToBlog}</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground">
            {currentCategory?.name || slug} {t.blog.category}
          </h1>
          {currentCategory?.description && (
            <p className="text-muted-foreground mt-4">
              {currentCategory.description}
            </p>
          )}
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
                        variant={category.slug === slug ? 'default' : 'ghost'}
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
            {hasPosts ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {paginatedPosts.map((post) => (
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
                
                {Math.ceil(posts.length / ITEMS_PER_PAGE) > 1 && (
                  <div className="flex justify-center gap-2">
                    {currentPage > 1 && (
                      <Button asChild variant="outline">
                        <Link
                          href={getLocalizedPath(
                            `/blog/category/${slug}?page=${currentPage - 1}`,
                            locale
                          )}
                        >
                          {t.blog.previous}
                        </Link>
                      </Button>
                    )}
                    <span className="flex items-center px-4 text-muted-foreground">
                      {t.common.page} {currentPage} {t.common.of} {Math.ceil(posts.length / ITEMS_PER_PAGE)}
                    </span>
                    {currentPage < Math.ceil(posts.length / ITEMS_PER_PAGE) && (
                      <Button asChild variant="outline">
                        <Link
                          href={getLocalizedPath(
                            `/blog/category/${slug}?page=${currentPage + 1}`,
                            locale
                          )}
                        >
                          {t.blog.next}
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {t.blog.noPostsInCategory}
                </p>
                {!postsData.success && (
                  <p className="text-muted-foreground text-sm mt-2">
                    API hatası: Kategori verileri alınamadı.
                  </p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

