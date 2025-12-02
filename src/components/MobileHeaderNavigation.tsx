import { useNavigation } from '@/contexts/navigation';
import { useSpecs } from '@/contexts/specs';
import { Link as NavigationLink } from '@/i18n/navigation';
import { MenuItem } from '@/types';
import { Bars3Icon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@hooks/auth';
import { cn } from '@lib/utils';
import { Button } from '@ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@ui/drawer';
import { useTranslations } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import { Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import Brand from './Brand';
import DemoRequestButton from './DemoRequestButton';
import LocaleSwitcher from './LocaleSwitcher';
import SearchBar from './SearchBar';

export default function MobileHeaderNavigation() {
    const __ = useTranslations();
    const [open, setOpen] = useState(false);

    const { menu } = useSpecs();

    const { user } = useAuth({
        middleware: 'guest',
    });

    const { isInvertColor, scrolling } = useNavigation();

    const clonedMenu = useMemo(() => cloneMenu(menu.header), [menu.header]);

    const onOpenChange = useCallback((open: boolean) => {
        setOpen(open);
    }, []);

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <div className="flex w-full items-center justify-between px-6 md:hidden">
                <Brand width={120} white={isInvertColor} sloganColor={isInvertColor && !scrolling.scrollUp ? 'primary' : 'black'} />
                <div className="flex items-center gap-2">
                    <SearchBar isInvertColor={isInvertColor} scrolling={scrolling} />
                    <LocaleSwitcher isInvertColor={isInvertColor} scrolling={scrolling} />
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn('focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0', {
                                'text-white': isInvertColor && !scrolling.scrollUp,
                            })}
                        >
                            <span className="sr-only">Toggle Menu</span>
                            <Bars3Icon className="size-8" />
                        </Button>
                    </DrawerTrigger>
                </div>
            </div>
            <DrawerContent className="max-h-[80svh] p-0" title="Menu">
                <div className="overflow-auto p-6">
                    <div className="flex flex-col space-y-4">
                        {clonedMenu
                            ?.sort(
                                // move to last item if it has no children
                                (a, b) => (a.children.length === 0 ? 1 : -1) - (b.children.length === 0 ? 1 : -1),
                            )
                            .map((item, index) => (
                                <Fragment key={`mobile-link-${index}`}>
                                    {item.children.length > 0 ? (
                                        <div key={`mobile-child-link-${index}`} className="flex flex-col gap-4 py-6 first:py-0 last:pb-0">
                                            <h4 className="text-xl font-medium">{item.title}</h4>
                                            {item?.children?.length &&
                                                item.children.map((item, index) => (
                                                    <Fragment key={`mobile-child-item-link-${index}`}>
                                                        <MobileLink href={item.url} onOpenChange={setOpen} className="opacity-80">
                                                            {item.title}
                                                        </MobileLink>
                                                    </Fragment>
                                                ))}
                                        </div>
                                    ) : (
                                        <MobileLink key={`mobile-link-${index}`} href={item.url} onOpenChange={setOpen}>
                                            {item.title}
                                        </MobileLink>
                                    )}
                                    <div className="h-px w-full bg-gray-200" />
                                </Fragment>
                            ))}

                        <div className="flex items-center gap-4">
                            {!user ? (
                                <Button
                                    variant="black"
                                    size="lg"
                                    wide="full"
                                    round="sm"
                                    className="flex shrink items-center justify-center font-semibold"
                                    asChild
                                >
                                    <NavigationLink href="/login">
                                        <UserIcon className="size-5" />
                                        <span className="mt-1">{__('Login / Register')}</span>
                                    </NavigationLink>
                                </Button>
                            ) : (
                                <Button
                                    variant="black"
                                    size="lg"
                                    wide="full"
                                    round="sm"
                                    className="flex shrink items-center justify-center font-semibold"
                                    asChild
                                >
                                    <NavigationLink href="/dashboard">
                                        <HomeIcon className="size-5" />
                                        {__('Dashboard')}
                                    </NavigationLink>
                                </Button>
                            )}
                            <DemoRequestButton size="lg" wide="full" round="sm" className="shrink font-semibold" />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function cloneMenu(menu: MenuItem[]): MenuItem[] {
    return menu.map((item: MenuItem) => ({
        ...item,
        children: item.children ? cloneMenu(item.children) : [],
    }));
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
    className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
    return (
        <Link
            href={href}
            onClick={() => {
                onOpenChange?.(false);
            }}
            className={cn('text-[1.15rem]', className)}
            prefetch
            {...props}
        >
            {children}
        </Link>
    );
}