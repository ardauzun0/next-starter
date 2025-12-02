import { getProduct } from '@/data/getProducts';
import JsonLd from '@components/JsonLd';
import PageBlocks from '@components/PageBlocks';
import { Metadata } from 'next';
import { cache, Fragment } from 'react';

export async function generateMetadata({ params }: { params: Promise<any> }): Promise<Metadata> {
    const { slug, locale } = await params;

    const product = await cache(getProduct)({
        slug,
        locale,
    });

    return product.meta.seo;
}

export default async function Page({ params }: { params: Promise<any> }) {
    const { slug, locale } = await params;

    const product = await cache(getProduct)({
        slug,
        locale,
    });

    return (
        <Fragment>
            <JsonLd json={product.meta.seo.jsonLd} />
            <PageBlocks page={product} />
        </Fragment>
    );
}
