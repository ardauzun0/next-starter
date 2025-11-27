import { getUsageAreasByCategory } from '@/services/usage';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Ürünler - ${slug}`,
    description: `${slug} kategorisindeki ürünler`,
  };
}

export default async function ProductCategoryListPage({
  params,
}: ProductCategoryPageProps) {
  const { slug } = await params;
  const usageAreasData = await getUsageAreasByCategory(slug);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/products">← Ürünler&apos;e Dön</Link>
          </Button>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            {slug.charAt(0).toUpperCase() + slug.slice(1)} Kategorisi
          </h1>
        </div>

        {usageAreasData.success && usageAreasData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usageAreasData.data.map((area) => (
              <Card
                key={area.id}
                className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Link href={`/usage/${area.slug}`}>
                  {area.thumbnail && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={area.thumbnail}
                        alt={area.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{area.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {area.count} ürün
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Bu kategoride henüz ürün bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

