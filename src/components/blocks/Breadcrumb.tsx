import { BaseBlock } from '@/types/api';
import Image from 'next/image';

export interface BreadcrumbBlockProps extends BaseBlock {
  acf_fc_layout: 'breadcrumb';
  bc_type?: string;
  bc_select: 'image' | 'video' | string;
  bc_image?: string;
  bc_video?: string;
  bc_exp?: string; // This is the Title
}

export default function Breadcrumb({
  bc_select,
  bc_image,
  bc_video,
  bc_exp,
}: BreadcrumbBlockProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      {bc_select === 'video' && bc_video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bc_video} type="video/mp4" />
        </video>
      ) : bc_select === 'image' && bc_image ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bc_image}
            alt={bc_exp || 'Breadcrumb background'}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : null}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Title */}
      {bc_exp && (
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground drop-shadow-lg">
            {bc_exp}
          </h1>
        </div>
      )}
    </section>
  );
}

