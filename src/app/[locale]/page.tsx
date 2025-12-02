import getPage from '@/data/getPage';
import JsonLd from '@components/JsonLd';
import AppLayout from '@components/Layouts/AppLayout';
import PageBlocks from '@components/PageBlocks';
import { Metadata } from 'next';
import { cache, Fragment } from 'react';

export async function generateMetadata({ params, searchParams }: { params: Promise<any>; searchParams: Promise<any> }): Promise<Metadata> {
    const [{ locale }, { preview, token }] = await Promise.all([params, searchParams]);

    const page = await cache(getPage)({
        page: '/',
        locale,
        preview,
        token,
    });

    return page.meta.seo;
}

export default async function Page({ params, searchParams }: { params: Promise<any>; searchParams: Promise<any> }) {
    const [{ locale }, { preview, token }] = await Promise.all([params, searchParams]);

    const page = await cache(getPage)({
        page: '/',
        locale,
        preview,
        token,
    });

    return (
        <Fragment>
            <JsonLd json={page.meta.seo.jsonLd} />
            <AppLayout>
                <PageBlocks page={page} />
            </AppLayout>
        </Fragment>
    );
}