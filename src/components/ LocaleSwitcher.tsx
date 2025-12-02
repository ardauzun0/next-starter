
import { useTranslatableParams } from '@/contexts/translatableParams';
import { useRouter as useI18nRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { GB, TR } from 'country-flag-icons/react/3x2';
import { Locale, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function LocaleSwitcher({ isInvertColor = false, scrolling = { scrollDown: false, scrollUp: false } }) {
    const router = useRouter();
    const i18nRouter = useI18nRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();

    const { hasTranslatableParams, translatableParams } = useTranslatableParams();

    const pathnamesToSwitchLocale: string[] = [
        '/posts/[slug]',
        '/academy/[slug]',
        '/academy/[slug]/[group]',
        '/downloads/[slug]',
        '/docs/[section]/[slug]',
        '/docs/[section]',
    ];

    const FlagComp = ({ locale }: { locale: string }) => {
        return (
            <span className="flex size-4 items-center justify-center overflow-hidden rounded-full pl-1">
                {locale === 'tr' ? <TR className="size-6" /> : <GB className="size-6" />}
            </span>
        );
    };

    const onLocaleChange = (locale: Locale) => {
        if (hasTranslatableParams(params, locale) && !pathnamesToSwitchLocale.includes(pathname)) {
            let href = `/${locale}`;

            Object.keys(translatableParams).forEach((key) => {
                if (translatableParams[key][locale]) {
                    href += `/${translatableParams[key][locale]}`;
                }
            });

            startTransition(() => {
                router.replace(href);
            });

            return;
        } else if (hasTranslatableParams(params, locale) && pathnamesToSwitchLocale.includes(pathname)) {
            Object.keys(translatableParams).forEach((key) => {
                if (translatableParams[key][locale]) {
                    params[key] = translatableParams[key][locale];
                }
            });
        }

        startTransition(() => {
            i18nRouter.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale },
            );
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={`${isInvertColor && !scrolling.scrollUp ? 'text-white group-[&.opened]/header:text-black' : 'hover:text-primary-500 text-black'}`}
                    variant="ghost"
                    size="icon"
                >
                    <GlobeAsiaAustraliaIcon className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex w-32 flex-col p-0">
                {routing.locales.map((cur, index) => (
                    <DropdownMenuItem asChild key={index}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="data-[current=true]:bg-primary-200 w-full cursor-pointer justify-start rounded-none !px-2 text-left hover:!bg-gray-200 hover:text-black hover:ring-0 focus-visible:border-none focus-visible:ring-0 data-[current=true]:text-muted-foreground"
                            onClick={() => onLocaleChange(cur as Locale)}
                            data-current={cur === locale ? 'true' : 'false'}
                            data-locale={cur}
                        >
                            <FlagComp locale={cur} />
                            {cur === 'en' ? 'English' : 'Türkçe'}
                        </Button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
