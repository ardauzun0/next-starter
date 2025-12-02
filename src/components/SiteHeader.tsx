
'use client';

import { useNavigation } from '@/contexts/navigation';
import { cn } from '@lib/utils';
import { useEffect, useRef } from 'react';
import HeaderNavigation from './HeaderNavigation';
import MobileHeaderNavigation from './MobileHeaderNavigation';

export default function SiteHeader({ active = false, className = '' }: { active?: boolean; className?: string }) {
    const headerRef = useRef<HTMLDivElement>(null);

    const { isInvertColor, groupHovered, setScrolling } = useNavigation();

    useEffect(() => {
        if (!headerRef.current) {
            return;
        }

        const header = headerRef.current;

        const smartMenuHeaderHeight = header.offsetHeight;
        const smartMenuCurrentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (smartMenuCurrentScrollTop >= smartMenuHeaderHeight / 5) {
            header.classList.add('scroll-up');
            header.classList.add('scroll-down');
        } else {
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
        }

        let smartMenuLastScrollTop = 0;

        const handleScroll = function () {
            const smartMenuScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (smartMenuScrollTop > smartMenuLastScrollTop && smartMenuScrollTop > smartMenuHeaderHeight / 5) {
                setScrolling({ scrollDown: true, scrollUp: false });

                document.body.classList.add('scroll-down');
                document.body.classList.remove('scroll-up');
                header.classList.add('scroll-up');
                header.classList.add('scroll-down');
            } else {
                if (smartMenuScrollTop > smartMenuHeaderHeight / 5) {
                    setScrolling({ scrollDown: false, scrollUp: true });

                    document.body.classList.add('scroll-up');
                    document.body.classList.remove('scroll-down');
                    header.classList.remove('scroll-up');
                    header.classList.add('scroll-down');
                } else {
                    setScrolling({ scrollDown: false, scrollUp: false });

                    document.body.classList.remove('scroll-up');
                    document.body.classList.remove('scroll-down');
                    header.classList.remove('scroll-up');
                    header.classList.remove('scroll-down');
                }
            }
            smartMenuLastScrollTop = smartMenuScrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            setScrolling({ scrollDown: false, scrollUp: false });
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('scroll-up');
            document.body.classList.remove('scroll-down');
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <header
            ref={headerRef}
            className={cn(
                className,
                'group/header fixed top-0 left-0 z-80 flex h-24 w-full items-center justify-center duration-450 will-change-transform group-[&.scroll-down]/body:bg-white group-[&.scroll-up]/body:bg-white md:h-32 md:bg-transparent [&.scroll-down]:!top-0 [&.scroll-down]:!translate-y-0 [&.scroll-up.scroll-down]:!-translate-y-full',
                {
                    'opened md:bg-white': isInvertColor && groupHovered,
                    'active bg-white shadow-md': active,
                },
            )}
        >
            <HeaderNavigation />
            <MobileHeaderNavigation />
        </header>
    );
}
