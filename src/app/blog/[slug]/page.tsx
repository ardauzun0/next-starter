// Single Blog Post Detail Page
import { getPostBySlug } from '@/services/blog';
import { getSEOData } from '@/services/global';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  // Construct the correct URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const url = `${baseUrl}/blog/${slug}`;

  // Wrap SEO data fetch in try/catch to handle 404 errors
  let seoData;
  try {
    seoData = await getSEOData(url);
  } catch (error) {
    // If SEO API fails, use post data as fallback
    console.warn(`SEO API failed for ${url}:`, error);
    return {
      title: postData.data.title,
      description: postData.data.description || '',
    };
  }

  return {
    title: seoData.head.title || postData.data.title,
    description: seoData.head.description || postData.data.description || '',
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
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/blog">
          <span className="mr-2">←</span>
          Blog&apos;a Dön
        </Link>
      </Button>

        <Card>
          <CardContent className="pt-6">
            <article>
              {post.thumbnail && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
              )}

              <h1 className="text-5xl font-bold mb-6 text-foreground">
                {post.title}
              </h1>

              <div className="text-muted-foreground mb-8 pb-8 border-b border-border">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {post.description && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}

              {post.content && (
                <div
                  className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80 prose-strong:text-foreground prose-code:text-foreground prose-code:bg-card prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
