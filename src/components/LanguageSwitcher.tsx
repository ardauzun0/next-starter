'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locales, localeNames, defaultLocale, type Locale } from '@/i18n/config';
import { getLocaleFromPath, removeLocaleFromPath, getLocalizedPath } from '@/utils/locale-helper';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = getLocaleFromPath(pathname);
  const pathWithoutLocale = removeLocaleFromPath(pathname) || '/';

  const handleLanguageChange = (newLocale: string) => {
    const newPath = getLocalizedPath(pathWithoutLocale, newLocale as Locale);
    router.push(newPath);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Dil" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
