import Providers from '@/contexts/providers';
import { Specs } from '@/types';
import Scripts from '@components/Scripts';
import { Toaster } from '@components/ui/sonner';
import { cn } from '@lib/utils';
import '@styles/globals.css';
import NextTopLoader from 'nextjs-toploader';
import { PropsWithChildren } from 'react';
import { getLangDir } from 'rtl-detect';

export default async function RootLayout({
    children,
    className,
    params,
    specs,
}: PropsWithChildren<{ specs?: Specs | undefined } & { params: Promise<any> }> & { className?: string }) {
    const { locale } = await params;
    const direction = getLangDir(locale);

    return (
        <Providers specs={specs}>
            <html lang={locale} dir={direction} className={cn('scroll-smooth', className)}>
                {/* eslint-disable-next-line @next/next/no-head-element */}
                <head>
                    <Scripts name="site_head" />
                </head>
                <body className={`group/body antialiased`}>
                    <NextTopLoader color="#3eac4f" />
                    {children}
                    <Toaster />
                </body>
            </html>
        </Providers>
    );
}