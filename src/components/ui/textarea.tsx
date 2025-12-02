import * as React from 'react';

import { cn } from '@lib/utils';
import { Label } from './label';

function Textarea({ label, className, ...props }: React.ComponentProps<'textarea'> & { label?: string }) {
    const isRequired = props.required || false;

    return (
        <div className="relative">
            <textarea
                data-slot="textarea"
                className={cn(
                    'border-input focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full resize-none rounded-full border bg-transparent py-6 pr-8 pl-12 text-base font-medium transition-[color] outline-none placeholder:text-sm placeholder:font-medium placeholder:text-black/60 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                {...props}
            />
            {label && (
                <Label
                    className="absolute start-10 -top-2 origin-[0] transform cursor-text bg-white px-2 text-sm text-black/50 duration-300 rtl:left-auto rtl:translate-x-1/4"
                    htmlFor={props.id}
                >
                    {label}
                    {isRequired && <span className="text-red-500 -ml-1.5">*</span>}
                </Label>
            )}
        </div>
    );
}

export { Textarea };
