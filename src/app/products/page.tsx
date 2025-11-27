// Products Listing Page
import { getUsageAreas } from '@/services/usage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Ürünler',
  description: 'Ürünlerimizi keşfedin',
};

export default async function ProductsPage() {
  // Since we don't have a direct "all products" endpoint,
  // we can list usage areas or product categories
  // For now, we'll show a simple landing page
  const usageAreas = await getUsageAreas();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h1 className="text-5xl font-bold mb-12 text-[#e5e5e5]">Ürünler</h1>

        {usageAreas.success && usageAreas.data.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Kullanım Alanları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {usageAreas.data.map((area) => (
                <Card
                  key={area.id}
                  className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <Link href={`/usage/${area.slug}`}>
                    <CardHeader>
                      <CardTitle>{area.name}</CardTitle>
                      {area.description && (
                        <CardDescription className="line-clamp-3">
                          {area.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center py-16">
          <p className="text-[#888] text-lg mb-4">
            Ürün kategorilerini görmek için kategori sayfasını ziyaret edin.
          </p>
          <p className="text-[#d4d4d4] text-sm">
            Belirli bir ürün aramak için arama özelliğini kullanabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

