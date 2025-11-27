import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/getTranslations';
import { getLocalizedPath, getLocaleFromPath } from '@/utils/locale-helper';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || '/tr';
  const locale = getLocaleFromPath(pathname);
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-4xl font-bold text-foreground mb-6">
          {t.notFound.title}
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          {t.notFound.description}
        </p>
        <Button asChild size="lg">
          <Link href={getLocalizedPath('/', locale)}>
            {t.notFound.backToHome}
          </Link>
        </Button>
      </div>
    </div>
  );
}
