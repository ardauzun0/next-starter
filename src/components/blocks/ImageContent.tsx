import { BaseBlock } from '@/types/index.d';
import Image from 'next/image';

export interface ImageContentBlockProps extends BaseBlock {
  acf_fc_layout: 'image_content' | '';
  select?: 'image' | 'video';
  image?: string;
  thumbnail?: string;
  video?: string;
  content?: string;
}

export default function ImageContent({
  select = 'image',
  image,
  thumbnail,
  video,
  content,
}: ImageContentBlockProps) {
  const mediaUrl = select === 'video' ? video : image || thumbnail;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {select === 'video' && video ? (
              <video
                src={video}
                controls
                className="w-full h-full object-cover"
                poster={thumbnail}
              />
            ) : mediaUrl ? (
              <Image
                src={mediaUrl}
                alt="Content media"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : null}
          </div>

          {content && (
            <div
              className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:hover:text-primary/80 prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
