import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath } from '@/utils/locale-helper';
import ContactForm from '@/components/ContactForm';
import type { Locale } from '@/i18n/config';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Hoş Geldiniz
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Next.js 15 ile Headless WordPress entegrasyonu
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href={getLocalizedPath('/blog', locale)}>{t.blog.title}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/products', locale)}>{t.products.title}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={getLocalizedPath('/usage', locale)}>Kullanım Alanları</Link>
            </Button>
          </div>
        </div>

        <div className="py-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
