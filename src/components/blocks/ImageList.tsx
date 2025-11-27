import { BaseBlock } from '@/types/api';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface ImageItem {
  image: string;
  title: string;
  exp: string;
}

export interface ImageListBlockProps extends BaseBlock {
  acf_fc_layout: 'imagelist';
  images: ImageItem[];
}

export default function ImageList({ images }: ImageListBlockProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <Card key={`imagelist-${index}-${item.title}`} className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              {item.image && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              {item.exp && (
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {item.exp}
                  </CardDescription>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
