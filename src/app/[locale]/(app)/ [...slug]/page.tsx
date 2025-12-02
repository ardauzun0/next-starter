import getPage from '@/data/getPage';
import JsonLd from '@components/JsonLd';
import PageBlocks from '@components/PageBlocks';
import { Metadata } from 'next';
import { cache, Fragment } from 'react';

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; slug: string[] }>;
    searchParams: Promise<{ preview?: string; token?: string; previewLocale?: string }>;
}): Promise<Metadata> {
    const [{ locale, slug }, { preview, token }] = await Promise.all([params, searchParams]);

    const page = await cache(getPage)({
        page: slug.join('/'),
        locale,
        preview,
        token,
    });

    return page.meta.seo;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; slug: string[] }>;
    searchParams: Promise<{ preview?: string; token?: string; previewLocale?: string }>;
}) {
    const [{ locale, slug }, { preview, token }] = await Promise.all([params, searchParams]);

    const page = await cache(getPage)({
        page: slug.join('/'),
        locale,
        preview,
        token,
    });

    return (
        <Fragment>
            <JsonLd json={page.meta.seo.jsonLd} />
            <PageBlocks page={page} />
        </Fragment>
    );
}