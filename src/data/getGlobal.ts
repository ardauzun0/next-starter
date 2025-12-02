import { GlobalOptions, PageMeta, PageData } from '@/types';

import axios from '@lib/axios';

export async function getGlobalOptions({ locale }: { locale?: string }): Promise<GlobalOptions & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/options`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch global options');
        }

        return response.data as GlobalOptions & { meta: PageMeta };
    } catch (error: any) {
        console.error('Error fetching global options:', error);
        throw new Error('Failed to fetch global options');
    }
}

export async function getPageData({ url, locale }: { url: string; locale?: string }): Promise<(PageData & { meta: PageMeta }) | null> {
    const encodedUrl = encodeURIComponent(url);

    try {
        const response = await axios.get(`/api/seo?url=${encodedUrl}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            return null;
        }

        return response.data as PageData & { meta: PageMeta };
    } catch (error: any) {
        console.warn(`SEO API failed for ${url}:`, error);
        return null;
    }
}
