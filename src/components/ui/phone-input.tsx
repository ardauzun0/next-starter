import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command';
import { Input } from '@components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { ScrollArea } from '@components/ui/scroll-area';
import { CheckIcon } from '@heroicons/react/24/outline';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { Label } from './label';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        onChange?: (value: RPNInput.Value) => void;
        label?: string;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, label, ...props }, ref) => {
        const isRequired = props.required || false;

        return (
            <div className="focus-within:ring-ring/50 has-[input[aria-invalid=true]]:ring-destructive/20 has-[input[aria-invalid=true]]:border-destructive relative rounded-full focus-within:z-10 focus-within:ring-[3px] focus-within:outline-none has-[input[aria-invalid=true]]:border">
                <RPNInput.default
                    ref={ref}
                    className={cn('group/phone-input flex [&>.relative]:w-full', className)}
                    flagComponent={FlagComponent}
                    countrySelectComponent={CountrySelect}
                    inputComponent={InputComponent}
                    smartCaret={false}
                    value={value || undefined}
                    /**
                     * Handles the onChange event.
                     *
                     * react-phone-number-input might trigger the onChange event as undefined
                     * when a valid phone number is not entered. To prevent this,
                     * the value is coerced to an empty string.
                     *
                     * @param {E164Number | undefined} value - The entered value
                     */
                    onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
                    {...props}
                />

                {label && (
                    <Label
                        className="absolute start-8 -top-2 origin-[0] transform cursor-text bg-white px-2 text-sm text-black/50 duration-300 md:start-10 rtl:left-auto rtl:translate-x-1/4"
                        htmlFor={props.id}
                    >
                        {label}
                        {isRequired && <span className="-ml-1.5 text-red-500">*</span>}
                    </Label>
                )}
            </div>
        );
    },
);
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, ...props }, ref) => (
    <Input
        className={cn(
            'rounded-s-none rounded-e-full border-l-0 pl-0 focus-visible:ring-0 aria-invalid:border-none aria-invalid:ring-0 md:pl-2 dark:aria-invalid:ring-0',
            className,
        )}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const __ = useTranslations();

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    tabIndex={-1}
                    className="border-input flex h-14 gap-1 rounded-s-full rounded-e-none border-r-0 bg-transparent px-3 transition-none group-[&.PhoneInput--focus]/phone-input:ring-0 group-[:has(input[aria-invalid=true])]/phone-input:border-none focus:z-10 focus-visible:border-none focus-visible:ring-0"
                    disabled={disabled}
                >
                    <FlagComponent country={selectedCountry} countryName={selectedCountry} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value);
                            setTimeout(() => {
                                if (scrollAreaRef.current) {
                                    const viewportElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
                                    if (viewportElement) {
                                        viewportElement.scrollTop = 0;
                                    }
                                }
                            }, 0);
                        }}
                        placeholder={__('Search country')}
                    />
                    <CommandList>
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() => setIsOpen(false)}
                                        />
                                    ) : null,
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    onSelectComplete: () => void;
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange, onSelectComplete }: CountrySelectOptionProps) => {
    const handleSelect = () => {
        onChange(country);
        onSelectComplete();
    };

    return (
        <CommandItem className="gap-2" onSelect={handleSelect}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`} />
        </CommandItem>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex size-4 items-center justify-center overflow-hidden rounded-full pl-1 [&_svg:not([class*='size-'])]:size-6">
            {Flag && <Flag title={countryName} />}
            {!Flag && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                        <path
                            d="M10.875 0H7.125C4.85025 0 3 1.85025 3 4.125V13.875C3 16.1497 4.85025 18 7.125 18H10.875C13.1497 18 15 16.1497 15 13.875V4.125C15 1.85025 13.1497 0 10.875 0ZM12.75 13.875C12.75 14.9085 11.9085 15.75 10.875 15.75H7.125C6.0915 15.75 5.25 14.9085 5.25 13.875V4.125C5.25 3.31575 5.766 2.62425 6.486 2.3625L6.86925 3.12825C7.05975 3.50925 7.449 3.75 7.87575 3.75H10.1258C10.5518 3.75 10.941 3.50925 11.1322 3.12825L11.5155 2.3625C12.2355 2.62425 12.7515 3.31575 12.7515 4.125V13.875H12.75ZM9.75 14.25H8.25C7.836 14.25 7.5 13.914 7.5 13.5C7.5 13.086 7.836 12.75 8.25 12.75H9.75C10.164 12.75 10.5 13.086 10.5 13.5C10.5 13.914 10.164 14.25 9.75 14.25Z"
                            fill="black"
                        />
                    </g>
                </svg>
            )}
        </span>
    );
};

export { PhoneInput };
