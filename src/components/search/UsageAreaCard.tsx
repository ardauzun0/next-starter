import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { Locale } from '@/i18n/config';
import type { UsageArea } from '@/types/api';

interface UsageAreaCardProps {
  area: UsageArea;
  locale: Locale;
}

export default function UsageAreaCard({ area, locale }: UsageAreaCardProps) {
  return (
    <Card className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      <Link href={getLocalizedPath(`/usage/${area.slug}`, locale)}>
        {area.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={area.thumbnail}
              alt={area.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{area.title}</CardTitle>
          <CardDescription>{area.count} ürün</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}

