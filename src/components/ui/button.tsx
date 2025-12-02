import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const buttonVariants = cva(
    "group/button gap-2 flex py-0.5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
    {
        variants: {
            variant: {
                default: 'bg-primary-500 text-white hover:bg-primary-500/90',
                danger: 'bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60',
                outline: 'border bg-background hover:bg-accent hover:text-accent-foreground border-primary-500',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                white: 'bg-white text-black hover:bg-white/90 dark:bg-white/10 dark:text-white',
                ghost: 'hover:bg-transparent hover:text-white dark:hover:bg-accent/50 !p-0',
                link: 'text-primary underline-offset-4 hover:underline',
                gray: 'bg-[#EEF0ED] hover:bg-black hover:text-white px-2',
                black: 'bg-black text-white hover:bg-black/70',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-4 md:px-6 has-[>svg]:px-4',
                xl: 'h-12 rounded-md px-6 md:px-8 has-[>svg]:px-6',
                '2xl': 'h-14 rounded-md px-6 md:px-8 has-[>svg]:px-6',
                icon: 'size-9',
            },
            round: {
                default: 'rounded-md',
                full: 'rounded-full',
                none: 'rounded-none',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                sm: 'rounded-sm',
            },
            wide: {
                default: 'w-fit',
                xs: 'w-fit md:w-1/6',
                sm: 'w-fit md:w-1/5',
                md: 'w-fit md:w-1/2',
                lg: 'w-fit md:w-3/4',
                full: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            round: 'default',
        },
    },
);

const arrowVariants = cva(
    'relative flex cursor-pointer items-center justify-center rounded-full border border-solid border-white/25 duration-350 size-9',
    {
        variants: {
            variant: {
                default: 'bg-primary-600 text-white hover:bg-primary-500/90',
                ghost: 'bg-accent text-accent-foreground hover:bg-accent/50',
                outline:
                    'border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                white: 'bg-primary-600 text-white hover:bg-primary-500/90 dark:bg-white/10 dark:text-white',
                danger: 'bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/60',
                link: 'text-primary underline-offset-4 hover:underline',
                gray: 'bg-black/80 hover:bg-black rounded-full hover:text-white',
                black: 'bg-black text-white hover:bg-black/90',
            },
            dashColor: {
                default: 'stroke-white',
                black: 'stroke-black',
                primary: 'stroke-primary-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function TooltipWrapper({ tooltip, children }: { tooltip?: string; children: React.ReactNode }) {
    if (!tooltip) {
        return <>{children}</>;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
}

function Button({
    className,
    variant,
    size,
    round,
    wide,
    arrow = false,
    arrowDashColor = 'default',
    asChild = false,
    loading = false,
    tooltip,
    children,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> &
    VariantProps<typeof arrowVariants> & {
        arrow?: boolean;
        arrowDashColor?: VariantProps<typeof arrowVariants>['dashColor'];
        tooltip?: string;
        asChild?: boolean;
        loading?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    if (loading) {
        props.disabled = true;
    }

    return (
        <TooltipWrapper tooltip={tooltip}>
            <Comp
                data-slot="button"
                className={cn(
                    buttonVariants({ variant, size, round, wide, className }),
                    arrow ? 'items-center justify-between gap-12 font-semibold md:w-fit md:pr-4 md:pl-8' : '',
                )}
                {...props}
            >
                {loading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-spin"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                    </svg>
                )}
                <Slottable>{size === 'icon' && loading ? null : children}</Slottable>
                {arrow && (
                    <span className={cn(arrowVariants({ variant }), 'pointer-events-none')}>
                        <svg className="absolute size-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.5 71.5">
                            <circle
                                className="main-circle fill-none stroke-none [stroke-width:2px] [stroke-dasharray:750] [stroke-dashoffset:750]"
                                cx="35.75"
                                cy="35.75"
                                r="35"
                            ></circle>
                            <circle
                                className={cn(
                                    'ease-manidar fill-none [stroke-width:2px] duration-1000 [stroke-dasharray:750] [stroke-dashoffset:750] group-hover/button:[stroke-dashoffset:530]',
                                    arrowVariants({ dashColor: arrowDashColor }),
                                )}
                                cx="35.75"
                                cy="35.75"
                                r="35"
                            ></circle>
                        </svg>
                        <ArrowRightIcon className="flex size-4 items-center justify-center stroke-[2.5] text-white duration-350" />
                    </span>
                )}
            </Comp>
        </TooltipWrapper>
    );
}

export { arrowVariants, Button, buttonVariants };
