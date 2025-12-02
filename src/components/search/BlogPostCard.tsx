import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/request';

interface BlogPost {
  id: number;
  title: string;
  description?: string;
  date: string;
  slug: string;
  thumbnail?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  locale: Locale;
}

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  return (
    <Card className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      <Link href={getLocalizedPath(`/blog/${post.slug}`, locale)}>
        {post.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          {post.description && (
            <CardDescription className="line-clamp-3">
              {post.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString(
              locale === 'tr' ? 'tr-TR' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

