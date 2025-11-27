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
import { reverseTranslatePath } from '@/i18n/url-mapping';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = getLocaleFromPath(pathname);
  const pathWithoutLocale = removeLocaleFromPath(pathname) || '/';
  
  // Çevrilmiş path'i orijinal path'e çevir
  const originalPath = reverseTranslatePath(pathWithoutLocale);

  const handleLanguageChange = (newLocale: string) => {
    // Orijinal path'i yeni locale'e çevir
    const newPath = getLocalizedPath(originalPath, newLocale as Locale);
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
