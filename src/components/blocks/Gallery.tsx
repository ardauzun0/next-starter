'use client';

import { BaseBlock } from '@/types/index.d';
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface GalleryBlockProps extends BaseBlock {
  acf_fc_layout: 'gallery';
  title?: string;
  exp?: string;
  gallery: string[];
}

export default function Gallery({ title, exp, gallery }: GalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {(title || exp) && (
          <Card className="mb-8">
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}
              {exp && <CardDescription>{exp}</CardDescription>}
            </CardHeader>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((imageUrl, index) => (
            <div
              key={`gallery-${index}-${imageUrl}`}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:brightness-110 transition-all duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <Image
                src={selectedImage}
                alt="Expanded gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
