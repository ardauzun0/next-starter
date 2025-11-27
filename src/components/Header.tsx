import Link from 'next/link';
import { getLocalizedPath } from '@/utils/locale-helper';
import type { GlobalOptions } from '@/types/api';
import type { Locale } from '@/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  globalOptions: GlobalOptions;
  locale: Locale;
}

export default function Header({ globalOptions, locale }: HeaderProps) {
  const menu = globalOptions.option?.menu || [];
  const menu2 = globalOptions.option?.menu_2 || [];

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
              
              {menu2.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.sub_menu_select === 'yes' && item.sub_menu && item.sub_menu.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-2">
                        {item.sub_menu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.url}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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

