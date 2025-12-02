'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@lib/utils';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl } from './form';
import { Label } from './label';

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
    return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
    return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
    return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectInput({
    label,
    field,
    placeholder = 'Select',
    selectValue,
    required = false,
    children,
}: {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
    selectValue?: React.ReactNode;
    label?: string;
    placeholder?: string;
    required?: boolean;
    children?: React.ReactNode;
}) {
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
                <SelectTrigger required={required} label={label}>
                    {selectValue ? (
                        selectValue
                    ) : (
                        <span className="font-semibold">
                            <SelectValue placeholder={placeholder} />
                        </span>
                    )}
                </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-96">{children}</SelectContent>
        </Select>
    );
}

function SelectTrigger({
    className,
    size = 'default',
    label,
    required = false,
    children,
    ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: 'sm' | 'default';
    label?: string;
    required?: boolean;
}) {
    return (
        <div className="relative">
            <SelectPrimitive.Trigger
                data-slot="select-trigger"
                data-size={size}
                className={cn(
                    "group border-input focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-4xl border bg-transparent pt-2.5 pr-8 pb-1 pl-12 text-sm whitespace-nowrap transition-[color] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-sm data-[placeholder]:font-medium data-[placeholder]:text-black/60 data-[size=default]:h-14 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-black/60",
                    className,
                )}
                {...props}
            >
                <div className="flex w-full items-center justify-between gap-2">
                    {children}
                    <SelectPrimitive.Icon asChild>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="duration-300 group-data-[state=open]:rotate-180"
                        >
                            <g opacity="0.5">
                                <path
                                    d="M11.1189 4.58168C11.0377 4.50036 10.9412 4.43586 10.835 4.39185C10.7288 4.34785 10.615 4.3252 10.5 4.3252C10.3851 4.3252 10.2712 4.34785 10.165 4.39185C10.0588 4.43586 9.96235 4.50036 9.8811 4.58168L7.20593 7.25626C7.15123 7.31094 7.07706 7.34165 6.99972 7.34165C6.92238 7.34165 6.84821 7.31094 6.79351 7.25626L4.11893 4.58168C3.95486 4.41753 3.7323 4.32528 3.50022 4.32523C3.26813 4.32517 3.04553 4.41731 2.88139 4.58138C2.71724 4.74545 2.62499 4.96801 2.62494 5.20009C2.62488 5.43218 2.71703 5.65478 2.8811 5.81893L5.55626 8.49409C5.74585 8.6837 5.97093 8.83411 6.21865 8.93672C6.46637 9.03934 6.73188 9.09216 7.00001 9.09216C7.26815 9.09216 7.53365 9.03934 7.78137 8.93672C8.02909 8.83411 8.25417 8.6837 8.44376 8.49409L11.1189 5.81893C11.283 5.65484 11.3751 5.43232 11.3751 5.2003C11.3751 4.96828 11.283 4.74576 11.1189 4.58168Z"
                                    fill="black"
                                />
                            </g>
                        </svg>
                    </SelectPrimitive.Icon>
                </div>
            </SelectPrimitive.Trigger>

            {label && (
                <Label
                    className="absolute start-10 -top-2 origin-[0] transform cursor-text bg-white px-2 text-sm text-black/50 duration-300 rtl:left-auto rtl:translate-x-1/4"
                    htmlFor={props.id}
                >
                    {label}
                    {required && <span className="-ml-1.5 text-red-500">*</span>}
                </Label>
            )}
        </div>
    );
}

function SelectContent({ className, children, position = 'popper', ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                className={cn(
                    'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-input max-h-(--radix-select-content-available-height relative z-50 min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border data-[state=open]:rounded-t-none',
                    position === 'popper' &&
                        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                    className,
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        'p-1',
                        position === 'popper' &&
                            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
    return <SelectPrimitive.Label data-slot="select-label" className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
                className,
            )}
            {...props}
        >
            <span className="absolute right-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
            {...props}
        />
    );
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
    return (
        <SelectPrimitive.ScrollUpButton
            data-slot="select-scroll-up-button"
            className={cn('flex cursor-default items-center justify-center py-1', className)}
            {...props}
        >
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
    return (
        <SelectPrimitive.ScrollDownButton
            data-slot="select-scroll-down-button"
            className={cn('flex cursor-default items-center justify-center py-1', className)}
            {...props}
        >
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectInput,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
