import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import enMessages from './messages/en.json';
import trMessages from './messages/tr.json';

const messages: Record<string, Record<string, any>> = {
    en: enMessages,
    tr: trMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    let localeMessages = messages[locale as keyof typeof messages] || messages[routing.defaultLocale];

    // replace "." with "_" in keys
    localeMessages = Object.fromEntries(Object.entries(localeMessages).map(([key, value]) => [key.replace(/\./g, '_'), value]));

    return {
        locale,
        messages: localeMessages,
    };
});