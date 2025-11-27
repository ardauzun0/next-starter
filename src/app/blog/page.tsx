// Blog List Page
import { getPosts, getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog yazılarımızı keşfedin',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const postsData = await getPosts(currentPage, 12);
  const categoriesData = await getBlogCategories();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 text-[#e5e5e5]">Blog</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          {categoriesData.success && categoriesData.data.length > 0 && (
            <aside className="lg:w-64 shrink-0">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Kategoriler</CardTitle>
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
                        <Link href={`/blog/category/${category.slug}`}>
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

          {/* Main Content - Posts Grid */}
          <main className="flex-1">
            {postsData.success && postsData.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {postsData.data.map((post) => (
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

                {/* Pagination */}
                {postsData.pagination &&
                  postsData.pagination.total_pages > 1 && (
                    <div className="flex justify-center gap-2">
                      {Array.from(
                        { length: postsData.pagination.total_pages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <Button
                          key={page}
                          asChild
                          variant={page === currentPage ? 'default' : 'outline'}
                        >
                          <Link href={`/blog?page=${page}`}>{page}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-[#888] text-lg">
                  Henüz blog yazısı bulunmamaktadır.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
