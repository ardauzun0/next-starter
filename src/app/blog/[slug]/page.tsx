// Single Blog Post Detail Page
import { getPostBySlug } from '@/services/blog';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData.success) {
    return {
      title: 'Post Bulunamadı',
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com'}/blog/${slug}`;
  const seoData = await getSEOData(url);

  return {
    title: seoData.head.title || postData.data.title,
    description: seoData.head.description || postData.data.description,
    openGraph: seoData.head.openGraph,
    alternates: {
      canonical: seoData.head.alternates?.canonical,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData.success) {
    notFound();
  }

  const post = postData.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Blog&apos;a Dön
      </Link>

      <article className="max-w-4xl mx-auto">
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
            width={1000}
            height={1000}
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="text-gray-600 mb-6">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {post.description && (
          <p className="text-xl text-gray-700 mb-6">{post.description}</p>
        )}

        {post.content && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </article>
    </div>
  );
}

