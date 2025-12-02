import {getPage} from '@/data/getPage';
import JsonLd from '@components/JsonLd';
import AppLayout from '@components/Layouts/AppLayout';
import PageBlocks from '@components/PageBlocks';
import { Metadata } from 'next';
import { cache, Fragment } from 'react';

export async function generateMetadata({ params }: { params: Promise<any> }): Promise<Metadata> {
    const [{ locale }] = await Promise.all([params]);

    const page = await cache(getPage)({
        slug: '/',
        locale,
    });

    return page.meta.head;
}

export default async function Page({ params }: { params: Promise<any> }) {
    const [{ locale }] = await Promise.all([params]);

    const page = await cache(getPage)({
        slug: '/',
        locale,
    });

    return (
        <Fragment>
            <JsonLd json={page.meta.head.jsonLd} />
            <AppLayout>
                <PageBlocks page={page} />
            </AppLayout>
        </Fragment>
    );
}