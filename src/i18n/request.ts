import getTranslations from '@/data/getTranslations';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { cache } from 'react';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    let messages = await cache(getTranslations)({ locale });

    // replace "." with "_" in keys
    messages = Object.fromEntries(Object.entries(messages).map(([key, value]) => [key.replace(/\./g, '_'), value]));

    return {
        locale,
        messages,
    };
});