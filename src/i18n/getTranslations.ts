import { locales, defaultLocale, type Locale } from './config';
import trMessages from './messages/tr.json';
import enMessages from './messages/en.json';

type Messages = typeof trMessages;

const messages: Record<Locale, Messages> = {
  tr: trMessages,
  en: enMessages,
};

export function getTranslations(locale: string | Locale): Messages {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  return messages[validLocale] || messages[defaultLocale];
}

export function getNestedTranslation(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  path: string
): string {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return path;
  }
  return typeof result === 'string' ? result : path;
}
