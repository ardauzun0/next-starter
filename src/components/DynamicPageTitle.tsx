'use client';

import { useSpecs } from '@/contexts/specs';
import { usePathname } from '@/i18n/navigation';
import { useEffect, useRef } from 'react';

export default function DynamicPageTitle() {
    const { app } = useSpecs();

    const pathname = usePathname();

    const interval = useRef<NodeJS.Timeout | null>(null);
    const originalTitle = useRef<string | null>(null);

    const startTitleChanges = () => {
        if (interval.current) {
            clearInterval(interval.current);
        }

        const slogan = app?.slogan ?? '';

        const change = () => {
            document.title = document.title === originalTitle.current ? slogan : (originalTitle.current ?? '');
        };

        interval.current = setInterval(change, 3000);

        change(); // Initial change to ensure the title is set immediately
    };

    useEffect(() => {
        setTimeout(() => {
            if (interval.current) {
                clearInterval(interval.current);
            }

            originalTitle.current = document.title;
        }, 1000);
    }, [pathname]);

    useEffect(() => {
        originalTitle.current = document.title;

        const listener = function () {
            if (document.visibilityState === 'hidden') {
                startTitleChanges();
            } else {
                if (interval.current) {
                    clearInterval(interval.current);
                }

                document.title = originalTitle.current ?? '';
            }
        };

        document.addEventListener('visibilitychange', listener);

        return () => {
            document.removeEventListener('visibilitychange', listener);

            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    });

    return <></>;
}