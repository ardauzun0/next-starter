import { useSpecs } from '@/contexts/specs';
import { MediaItem, MenuItem } from '@/types';
import { cn } from '@lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@ui/navigation-menu';

import { UnderlineProps, useNavigation } from '@/contexts/navigation';
import { Link as NavigationLink } from '@/i18n/navigation';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@hooks/auth';
import { Button } from '@ui/button';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Brand from './Brand';
import Container from './Container';
import DemoRequestButton from './DemoRequestButton';
import Image from './Image';
import SearchBar from './SearchBar';
import LocaleSwitcher from './LocaleSwitcher';

export default function HeaderNavigation() {
    const { menu } = useSpecs();
    const pathname = usePathname();

    const { user } = useAuth({
        middleware: 'guest',
    });

    const { containerRef, underline, setActiveKey, activateItem, isInvertColor, scrolling } = useNavigation();

    useEffect(() => {
        const match = menu.header?.find(
            (item) => item.url === pathname || (item.children.length > 0 && item.children.some((child) => child.url === pathname)),
        );

        if (match) {
            if (match.children.length > 0) {
                setActiveKey(`${match.url}-${match.title}`);
                activateItem(`${match.url}-${match.title}`);
            } else {
                setActiveKey(match.url);
                activateItem(match.url);
            }
        }
    }, [pathname, setActiveKey, activateItem, menu]);

    return (
        <NavigationMenu className="hidden py-8 group-[&.scroll-down]/body:py-4 group-[&.scroll-up]/body:py-4 md:flex">
            <div className="mx-auto flex items-center justify-between px-4 md:container md:px-8">
                <Brand
                    className="shrink-0"
                    white={isInvertColor}
                    sloganColor={isInvertColor && !scrolling.scrollUp ? 'primary' : 'black'}
                    withSlogan
                />

                <div className="relative" ref={containerRef}>
                    <NavigationMenuList>
                        {menu.header?.map((item) => (
                            <NavigationMenuItem key={item.title}>
                                {item.children.length > 0 ? <Flyout item={item} /> : <NavItem item={item} />}
                            </NavigationMenuItem>
                        ))}
                        <AnimatedBorderLine underline={underline} />
                    </NavigationMenuList>
                </div>

                <div className="flex items-center">
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className={`${isInvertColor && !scrolling.scrollUp ? 'text-white group-[&.opened]/header:text-black' : 'hover:text-primary-500 text-black'}`}
                    >
                        <NavigationLink href={user ? '/dashboard' : '/login'} aria-label="User" prefetch>
                            <div className="relative">
                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_8505_540)">
                                        <path d="M17.5 20.0003H15.8333V15.7978C15.8327 15.1445 15.5728 14.5181 15.1109 14.0561C14.6489 13.5942 14.0225 13.3343 13.3692 13.3337H6.63083C5.9775 13.3343 5.35111 13.5942 4.88914 14.0561C4.42716 14.5181 4.16733 15.1445 4.16667 15.7978V20.0003H2.5V15.7978C2.50132 14.7027 2.93696 13.6527 3.71135 12.8783C4.48575 12.104 5.53567 11.6683 6.63083 11.667H13.3692C14.4643 11.6683 15.5143 12.104 16.2886 12.8783C17.063 13.6527 17.4987 14.7027 17.5 15.7978V20.0003Z" />
                                        <path d="M10 10C9.0111 10 8.0444 9.70676 7.22215 9.15735C6.39991 8.60794 5.75904 7.82705 5.3806 6.91342C5.00217 5.99979 4.90315 4.99446 5.09608 4.02455C5.289 3.05465 5.76521 2.16373 6.46447 1.46447C7.16373 0.765206 8.05465 0.289002 9.02455 0.0960758C9.99446 -0.0968503 10.9998 0.00216643 11.9134 0.380605C12.8271 0.759043 13.6079 1.39991 14.1574 2.22215C14.7068 3.0444 15 4.0111 15 5C14.9987 6.32568 14.4715 7.59668 13.5341 8.53407C12.5967 9.47147 11.3257 9.99868 10 10ZM10 1.66667C9.34073 1.66667 8.69627 1.86217 8.1481 2.22844C7.59994 2.59471 7.1727 3.1153 6.9204 3.72439C6.66811 4.33348 6.6021 5.0037 6.73072 5.6503C6.85934 6.29691 7.1768 6.89085 7.64298 7.35703C8.10915 7.8232 8.7031 8.14067 9.3497 8.26929C9.9963 8.3979 10.6665 8.33189 11.2756 8.0796C11.8847 7.82731 12.4053 7.40007 12.7716 6.8519C13.1378 6.30374 13.3333 5.65927 13.3333 5C13.3333 4.11595 12.9821 3.2681 12.357 2.64298C11.7319 2.01786 10.8841 1.66667 10 1.66667Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8505_540">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                {user && (
                                    <span className="bg-primary-500 absolute -top-2.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full text-xs font-semibold text-white">
                                        <CheckIcon className="size-2 stroke-[4]" />
                                    </span>
                                )}
                            </div>
                        </NavigationLink>
                    </Button>
                    <SearchBar isInvertColor={isInvertColor} scrolling={scrolling} />
                    <LocaleSwitcher isInvertColor={isInvertColor} scrolling={scrolling} />
                    <DemoRequestButton />
                </div>
            </div>
        </NavigationMenu>
    );
}

function NavItem({ item }: { item: MenuItem }) {
    const ref = useRef<HTMLDivElement>(null);

    const { registerItem, deactivate, activateItem, setActiveKey, isInvertColor, scrolling } = useNavigation();

    useEffect(() => {
        if (ref.current) {
            registerItem(item.url, ref.current);
        }
    }, [registerItem, item]);

    const handleClick = () => {
        setActiveKey(item.url);
        activateItem(item.url);
    };

    return (
        <div className="flex" onClick={handleClick} onMouseEnter={() => activateItem(item.url)} onMouseLeave={() => deactivate()} ref={ref}>
            <NavigationMenuLink
                asChild
                className={cn(
                    navigationMenuTriggerStyle(),
                    isInvertColor && !scrolling.scrollUp ? 'text-white group-[&.opened]/header:text-black' : '',
                )}
            >
                <Link href={item.url} target={item.target} prefetch>
                    {item.title}
                </Link>
            </NavigationMenuLink>
        </div>
    );
}

function Flyout({ item }: { item: MenuItem }) {
    const [image, setImage] = useState<MediaItem | null>(null);

    const ref = useRef<HTMLButtonElement>(null);

    const { registerItem, activateItem, deactivate, setActiveKey, isInvertColor, scrolling } = useNavigation();

    useEffect(() => {
        if (ref.current) {
            registerItem(`${item.url}-${item.title}`, ref.current);
        }
    }, [registerItem, item]);

    const handleClick = () => {
        setActiveKey(`${item.url}-${item.title}`);
        activateItem(`${item.url}-${item.title}`);
    };

    useEffect(() => {
        const firstItem = item.children[0];

        if (firstItem && firstItem.data.image) {
            setImage(firstItem.data.image);
        } else {
            setImage(null);
        }
    }, [item]);

    return (
        <>
            <NavigationMenuTrigger
                className={cn(isInvertColor && !scrolling.scrollUp ? 'text-white group-[&.opened]/header:text-black' : '')}
                ref={ref}
                onMouseEnter={() => activateItem(`${item.url}-${item.title}`, true)}
                onMouseLeave={() => deactivate()}
            >
                {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent
                className="h-full"
                onMouseEnter={() => activateItem(`${item.url}-${item.title}`, true)}
                onMouseLeave={() => deactivate()}
            >
                <Container className="grid h-full grid-cols-5 gap-10">
                    <ul className="col-span-3 flex h-full flex-col items-start justify-center gap-6">
                        {item.children.map((child) => (
                            <li
                                key={child.title}
                                className={cn('w-10/12 border-b border-black/10 pb-4 last:border-b-0', {
                                    'hover:pb-8': child.data.description,
                                })}
                            >
                                <NavigationMenuLink
                                    asChild
                                    className={cn(navigationMenuTriggerStyle(), 'w-full rounded-none p-0')}
                                    onClick={handleClick}
                                    onMouseEnter={() => {
                                        setImage(child.data.image as MediaItem);
                                    }}
                                >
                                    <Link href={child.url} target={child.target} aria-label={child.title} prefetch>
                                        <div className="relative flex w-full items-center justify-between">
                                            <span className="text-left text-3xl font-semibold">{child.title}</span>

                                            <span className="bg-primary-500 hidden items-center justify-center rounded-full p-3 duration-700 group-hover:flex">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="animate-in slide-in-from-left duration-500"
                                                >
                                                    <g clipPath="url(#clip0_8276_6461)">
                                                        <path
                                                            d="M10.7295 2.08301L9.51891 3.2936L14.3613 8.13595H0.353027V9.86536H14.3613L9.51891 14.7077L10.7295 15.9183L17.6471 9.00065L10.7295 2.08301Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_8276_6461">
                                                            <rect
                                                                width="17.2941"
                                                                height="17.2941"
                                                                fill="white"
                                                                transform="translate(0.353027 0.353027)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </div>

                                        {child.data.description && (
                                            <span className="animate-in fade-in zoom-in mr-auto hidden max-w-xl duration-150 group-hover:block">
                                                {child.data.description}
                                            </span>
                                        )}
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                    <div className="relative col-span-2 h-full w-full overflow-hidden">
                        <Image
                            media={image}
                            className="absolute inset-0 h-full w-full rounded-md object-cover object-center"
                            width={760}
                            height={488}
                        />
                    </div>
                </Container>
            </NavigationMenuContent>
        </>
    );
}

function AnimatedBorderLine({ underline }: { underline: UnderlineProps | null }) {
    return (
        <AnimatePresence initial={underline !== null}>
            <motion.div
                className="bg-primary-500 absolute inset-y-0 top-full h-0.5"
                transition={{ stiffness: 500, damping: 30 }}
                animate={{
                    left: underline?.left ?? 0,
                    width: underline?.width ?? 0,
                }}
            />
        </AnimatePresence>
    );
}