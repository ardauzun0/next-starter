'use client';

import { useMediaQuery } from '@hooks/mediaQuery';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Button } from './ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const ITEMS_TO_DISPLAY = 4;

export function Breadcrumbs({
    items,
    className,
    revertColor = false,
}: {
    items: { href?: string; label: string }[];
    className?: string;
    revertColor?: boolean;
}) {
    const __ = useTranslations();
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const DISPLAY_ITEMS_LENGTH = isDesktop ? ITEMS_TO_DISPLAY : ITEMS_TO_DISPLAY - 2;

    return (
        <Breadcrumb className={cn('my-4 md:mb-12', className)}>
            <BreadcrumbList className={cn({ 'text-white/80': revertColor })}>
                {items.length >= DISPLAY_ITEMS_LENGTH && (
                    <BreadcrumbItem>
                        <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                )}
                {items.length > DISPLAY_ITEMS_LENGTH ? (
                    <>
                        <BreadcrumbItem>
                            {isDesktop ? (
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {items.slice(1, -(DISPLAY_ITEMS_LENGTH - 1)).map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Link href={item.href ? item.href : '#'} dangerouslySetInnerHTML={{ __html: item.label }} />
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader className="text-left">
                                            <DrawerTitle>{__('Navigate to')}</DrawerTitle>
                                            <DrawerDescription>{__('Select a page to navigate to_')}</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-1 px-4">
                                            {items.slice(1, -(DISPLAY_ITEMS_LENGTH - 1)).map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href ? item.href : '#'}
                                                    className="py-1 text-sm"
                                                    dangerouslySetInnerHTML={{ __html: item.label }}
                                                />
                                            ))}
                                        </div>
                                        <DrawerFooter className="pt-4">
                                            <DrawerClose asChild>
                                                <Button variant="outline">{__('Close')}</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ) : null}
                {items.slice(-DISPLAY_ITEMS_LENGTH + 1).map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <>
                                <BreadcrumbLink
                                    asChild
                                    className={cn({
                                        'max-w-72 truncate md:max-w-none': true,
                                        'hover:text-white': revertColor,
                                    })}
                                >
                                    <Link href={item.href} dangerouslySetInnerHTML={{ __html: item.label }} />
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            <BreadcrumbPage
                                className={cn({
                                    'max-w-72 truncate md:max-w-none': true,
                                    'text-white': revertColor,
                                })}
                                dangerouslySetInnerHTML={{ __html: item.label }}
                            />
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}