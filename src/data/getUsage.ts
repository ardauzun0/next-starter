import { PageMeta, Resource, UsageArea, UsageAreaDetail, UsageAreasResponse, UsageCategoriesResponse } from '@/types';

import axios from '@lib/axios';

import { notFound } from 'next/navigation';

export async function getUsageAreas({ locale }: { locale?: string }): Promise<UsageAreasResponse & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/usage/areas`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch usage areas');
        }

        return response.data as UsageAreasResponse & { meta: PageMeta };
    } catch (error: any) {
        console.error('Error fetching usage areas:', error);
        throw new Error('Failed to fetch usage areas');
    }
}

export async function getUsageArea({ slug, locale }: { slug: string; locale?: string }): Promise<Resource<UsageAreaDetail['data']> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/usage/${slug}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch usage area');
        }

        return response.data as Resource<UsageAreaDetail['data']> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching usage area:', error);
        throw new Error('Failed to fetch usage area');
    }
}

export async function getUsageCategories({ locale }: { locale?: string }): Promise<UsageCategoriesResponse & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/usage/categories`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch usage categories');
        }

        return response.data as UsageCategoriesResponse & { meta: PageMeta };
    } catch (error: any) {
        console.error('Error fetching usage categories:', error);
        throw new Error('Failed to fetch usage categories');
    }
}

export async function getUsageAreasByCategory({ categorySlug, locale }: { categorySlug: string; locale?: string }): Promise<UsageAreasResponse & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/usage/category/${categorySlug}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch usage areas by category');
        }

        return response.data as UsageAreasResponse & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching usage areas by category:', error);
        throw new Error('Failed to fetch usage areas by category');
    }
}
