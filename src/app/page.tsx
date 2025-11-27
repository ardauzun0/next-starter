import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          Hoş Geldiniz
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Next.js 15 ile Headless WordPress entegrasyonu
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Ürünler</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
