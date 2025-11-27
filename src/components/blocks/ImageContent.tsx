import { BaseBlock } from '@/types/api';
import Image from 'next/image';

export interface ImageContentBlockProps extends BaseBlock {
  acf_fc_layout: 'image_content';
  select: 'image' | 'video';
  image: string;
  content: string;
  // Add other specific fields as needed based on API response
}

export default function ImageContent({
  select,
  image,
  content,
}: ImageContentBlockProps) {
  return (
    <section className="image-content-section">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {select === 'image' && image ? (
              <Image
                src={image}
                alt="Content image"
                className="w-full h-auto rounded-lg"
                width={1000}
                height={1000}
              />
            ) : select === 'video' && image ? (
              <video
                src={image}
                controls
                className="w-full h-auto rounded-lg"
                width={1000}
                height={1000}
              />
            ) : null}
          </div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
}

