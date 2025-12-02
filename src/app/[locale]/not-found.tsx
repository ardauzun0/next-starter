import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata() {
    const __ = await getTranslations();

    return {
        title: __('Page Not Found'),
        description: __('Sorry, we couldn’t find the page you’re looking for_'),
    };
}

export default async function NotFound() {
    const __ = await getTranslations();

    return (
        <>
            <title>{__('Page Not Found')}</title>
            <meta name="description" content={__('Sorry, we couldn’t find the page you’re looking for_')} />
            <div className="items-top relative flex min-h-screen items-center justify-center bg-gray-100 sm:items-center sm:pt-0 dark:bg-gray-900">
                <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-accent-foreground text-base font-semibold">404</p>
                        <h1 className="text-accent-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                            {__('Page Not Found')}
                        </h1>
                        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                            {__('Sorry, we couldn’t find the page you’re looking for_')}
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/"
                                className="bg-primary-500 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                            >
                                {__('Go back home')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}