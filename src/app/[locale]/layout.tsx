import {getGlobalOptions} from '@/data/getGlobal';
import Layout from '@components/Layouts/RootLayout';
import { GlobalOptions } from '@/types';
import { cache, PropsWithChildren } from 'react';

import font from 'next/font/local';

const gilroy = font({
    src: [
        {
            path: '../../public/fonts/Gilroy-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-Thin.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Gilroy-BlackItalic.woff2',
            weight: '900',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-ExtraBoldItalic.woff2',
            weight: '800',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-SemiBoldItalic.woff2',
            weight: '600',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-MediumItalic.woff2',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-RegularItalic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-LightItalic.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../../public/fonts/Gilroy-ThinItalic.woff2',
            weight: '200',
            style: 'italic',
        },
    ],
});

export default async function RootLayout({ children, params }: PropsWithChildren<{ params: Promise<any> }>) {
    const { locale } = await params;

    const specs = await cache(getGlobalOptions)({ locale });

    return (
        <Layout params={params} specs={specs.option as GlobalOptions['option']} className={gilroy.className}>
            {children}
        </Layout>
    );
}
