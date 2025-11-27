// Blog List Page
import { getPosts, getBlogCategories } from '@/services/blog';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog yazılarımızı keşfedin',
};

export default async function BlogPage() {
  const postsData = await getPosts();
  const categoriesData = await getBlogCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {/* Categories */}
      {categoriesData.success && categoriesData.data.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Kategoriler</h2>
          <div className="flex flex-wrap gap-2">
            {categoriesData.data.map((category) => (
              <Link
                key={category.term_id}
                href={`/blog/category/${category.slug}`}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts List */}
      {postsData.success && postsData.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsData.data.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  width={1000}
                  height={1000}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                <p className="text-gray-400 text-xs">
                  {new Date(post.date).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Henüz blog yazısı bulunmamaktadır.</p>
      )}

      {/* Pagination */}
      {postsData.pagination && postsData.pagination.total_pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: postsData.pagination.total_pages }, (_, i) => i + 1).map(
            (page) => (
              <Link
                key={page}
                href={`/blog?page=${page}`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                {page}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

