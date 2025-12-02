import { Block } from '@/types/index.d';
import Image from 'next/image';

export interface HeroBlockProps extends Block {
  acf_fc_layout: 'hero';
  title: string;
  image: string;
}

export default function Hero({ title, image }: HeroBlockProps) {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {image && (
          <Image
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg"
            width={1000}
            height={1000}
          />
        )}
      </div>
    </section>
  );
}
