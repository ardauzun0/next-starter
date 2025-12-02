
import CookieConsent from '@components/CookieConsent';
import DynamicPageTitle from '@components/DynamicPageTitle';
import Scripts from '@components/Scripts';
import SiteFooter from '@components/SiteFooter';
import SiteHeader from '@components/SiteHeader';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Scripts name="site_body" />
            <DynamicPageTitle />
            <div vaul-drawer-wrapper="">
                <div className="isolate flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="mt-24 flex h-full flex-1 flex-col md:mt-32">{children}</main>
                    <SiteFooter />
                </div>
            </div>
            <CookieConsent />
            <Scripts name="site_footer" />
        </>
    );
}
