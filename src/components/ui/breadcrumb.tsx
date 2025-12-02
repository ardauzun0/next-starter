import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { cn } from '@lib/utils';

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'> & { className?: string }) {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} className={cn('mx-auto', className)} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn('flex flex-wrap items-center gap-1.5 text-base font-medium break-words text-black/60 sm:gap-2.5', className)}
            {...props}
        />
    );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
    return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...props} />;
}

type BreadcrumbLinkProps = Omit<React.ComponentProps<'a'>, never> & {
    asChild?: boolean;
};

function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
    const Comp = asChild ? Slot : 'a';

    return <Comp data-slot="breadcrumb-link" className={cn('hover:text-foreground transition-colors', className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className={cn('text-black', className)} {...props} />
    );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
    return (
        <span data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
            {children ?? <ChevronRightIcon />}
        </span>
    );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn('flex size-9 items-center justify-center text-black/25', className)}
            {...props}
        >
            <EllipsisHorizontalIcon className="size-4" />
            <span className="sr-only">More</span>
        </span>
    );
}

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
