import axios from '@lib/axios';
import type { MetadataRoute } from 'next';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const response = await axios.get<MetadataRoute.Sitemap>('/api/sitemap');

        return response.data;
    } catch (error: any) {
        console.error('Error fetching sitemap:', error);

        return [];
    }
}
