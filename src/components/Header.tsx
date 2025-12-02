import Link from 'next/link';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { GlobalOptions } from '@/types/index.d';
import type { Locale } from '@/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  globalOptions: GlobalOptions;
  locale: Locale;
}

export default function Header({ globalOptions, locale }: HeaderProps) {
  const menu = globalOptions.option?.menu || [];

  return (
    <header className="border-b border-border bg-[#0a0a0a] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={getLocalizedPath('/', locale)} className="text-xl font-bold text-foreground">
              Logo
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {menu.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {globalOptions.languages?.list && (
              <LanguageSwitcher />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

