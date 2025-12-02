import { PageMeta, PaginatedData, Product, Resource } from '@/types';

import axios from '@lib/axios';

import { notFound } from 'next/navigation';

export async function getProducts({ locale }: { locale?: string }): Promise<PaginatedData<Product> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/products`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch products');
        }

        return response.data as PaginatedData<Product> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
}

export async function getProduct({ slug, locale }: { slug: string; locale?: string }): Promise<Resource<Product> & { meta: PageMeta }> {
    try {
        const response = await axios.get(`/api/products/${slug}`, {
            headers: {
                'X-Locale': locale,
            },
        });

        if (response.status !== 200 || !response.data) {
            throw new Error('Failed to fetch product');
        }

        return response.data as Resource<Product> & { meta: PageMeta };
    } catch (error: any) {
        if (error.response?.status === 404 || error.status === 404) {
            return notFound();
        }

        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
    }
}
