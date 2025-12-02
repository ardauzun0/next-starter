import * as React from 'react';

import { cn } from '@lib/utils';
import { Label } from './label';

function Input({
    label,
    className,
    type,
    prefixIcon,
    revealPassword,
    ...props
}: React.ComponentProps<'input'> & { label?: string; revealPassword?: boolean; prefixIcon?: React.ReactNode }) {
    const [inputType, setInputType] = React.useState<string>(type || 'text');

    const isRequired: boolean = props.required || false;

    return (
        <div className="relative">
            {prefixIcon && <div className="absolute start-4 top-7.5 flex size-4.5 -translate-y-1/2 text-black/50 md:start-12">{prefixIcon}</div>}

            <input
                type={inputType}
                data-slot="input"
                className={cn(
                    'file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-14 w-full min-w-0 rounded-4xl border bg-transparent pt-2.5 pb-1 text-base font-semibold text-black/70 transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:font-medium placeholder:text-black/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                    'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    revealPassword ? 'pr-8 md:pr-16' : 'pr-8',
                    prefixIcon ? 'pl-10 md:pl-20' : 'pl-8 md:pl-12',
                    className,
                )}
                {...props}
            />
            {revealPassword && (
                <button
                    type="button"
                    className="focus-visible:ring-ring absolute end-8 top-1/2 -translate-y-1/2 rounded-full p-2 text-black/50 opacity-40 transition-colors hover:text-black hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
                    onClick={() => {
                        setInputType((prevType: string) => (prevType === 'password' ? 'text' : 'password'));
                    }}
                    aria-label="Toggle password visibility"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4252_958)">
                            <path
                                d="M17.2786 6.66288C15.4573 3.8528 12.3478 2.14372 8.99922 2.1123C5.65068 2.14372 2.54118 3.8528 0.719861 6.66288C-0.239954 8.07147 -0.239954 9.92395 0.719861 11.3326C2.54015 14.1444 5.64983 15.8552 8.99926 15.8877C12.3478 15.8563 15.4573 14.1472 17.2787 11.3371C18.2405 9.92745 18.2405 8.07249 17.2786 6.66288ZM15.415 10.0554C14.0244 12.261 11.6065 13.6066 8.99922 13.626C6.39199 13.6067 3.97405 12.261 2.58348 10.0554C2.14997 9.41856 2.14997 8.58138 2.58348 7.94453C3.97401 5.73897 6.39196 4.39335 8.99922 4.37402C11.6064 4.39332 14.0244 5.73897 15.415 7.94453C15.8485 8.58138 15.8485 9.41856 15.415 10.0554Z"
                                fill="black"
                            />
                            <path
                                d="M8.99922 12.0156C10.6647 12.0156 12.0148 10.6655 12.0148 8.99998C12.0148 7.33451 10.6647 5.98438 8.99922 5.98438C7.33375 5.98438 5.98361 7.33451 5.98361 8.99998C5.98361 10.6655 7.33375 12.0156 8.99922 12.0156Z"
                                fill="black"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_4252_958">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            )}
            {label && (
                <Label
                    className="absolute start-6 -top-2 origin-[0] transform cursor-text bg-white px-2 text-sm text-black/50 duration-300 md:start-10 rtl:left-auto rtl:translate-x-1/4"
                    htmlFor={props.id}
                >
                    {label}
                    {isRequired && <span className="text-red-500 -ml-1.5">*</span>}
                </Label>
            )}
        </div>
    );
}

export { Input };
