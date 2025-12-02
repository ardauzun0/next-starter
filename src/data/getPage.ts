import { PageData, PageMeta, Resource } from '@/types';

import axios from '@lib/axios';

import { notFound } from 'next/navigation';

export async function getPage({ slug, locale }: { slug: string; locale?: string }): Promise<Resource<PageData['data']> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/pages/${slug}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch page');
        }

        return response.data as Resource<PageData['data']> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching page:', error);
        throw new Error('Failed to fetch page');
    }
}
