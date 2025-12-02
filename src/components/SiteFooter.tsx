'use client';

import { useSpecs } from '@/contexts/specs';
import useAxios from '@hooks/axios';
import { Button } from '@ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage, FormWrapper } from '@ui/form';
import { Input } from '@ui/input';
import { Separator } from '@ui/separator';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Brand from './Brand';
import Container from './Container';
import ExplicitConsentCheckbox from './ExplicitConsentCheckbox';

export default function SiteFooter() {
    const __ = useTranslations();
    const { footer_slogan } = useSpecs();

    const [currentYear, setCurrentYear] = useState<string | number | null>(null);

    useEffect(() => {
        const date = new Date();
        setCurrentYear(date.getFullYear());
    }, []);

    return (
        <footer className="bg-footer relative mt-auto h-full min-h-[80dvh] w-full">
            <Container className="py-8">
                {footer_slogan.enabled && footer_slogan.slogan ? (
                    <>
                        <div className="mx-auto mt-12 flex h-full flex-col items-center justify-between gap-8 text-center -tracking-wider md:min-h-60 md:max-w-3xl">
                            <span
                                className="text-3xl/10 font-semibold text-white sm:text-4xl/12 md:text-5xl/16"
                                dangerouslySetInnerHTML={{
                                    __html: footer_slogan.slogan,
                                }}
                            />

                            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                                <Button round="full" size="xl" wide="sm" aria-label="More" arrow asChild>
                                    <Link href={footer_slogan.button_url || '#'}>{footer_slogan.button_label}</Link>
                                </Button>

                                {footer_slogan.document_button_label && footer_slogan.document_button_url && (
                                    <Button round="full" size="xl" wide="sm" variant="outline" aria-label="More" asChild>
                                        <Link href={footer_slogan.document_button_url || '#'} download target="_blank">{footer_slogan.document_button_label}</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Separator className="my-20" />
                    </>
                ) : (
                    <div className="my-20" />
                )}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-7">
                    <div className="flex flex-col items-start gap-8 lg:col-span-1">
                        <Brand white withSlogan vertical fixedColor />
                        <SocialNavigation />
                        <Separator />
                    </div>
                    <FooterNavigation />
                    <Newsletter />
                </div>
                <Separator className="mt-20 mb-8 md:mb-20" />
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white/75">
                            {__('© {currentYear} GreenSoftware_ All rights reserved_', { currentYear: currentYear ?? '' })}
                        </span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function Newsletter() {
    const __ = useTranslations();
    const axios = useAxios();
    const form = useForm({
        defaultValues: {
            explicit_consent: false,
            email: '',
        },
    });

    const subscribe = async (data: any) => {
        try {
            const response = await axios.post('/api/email-subscribe', data);

            form.reset();

            toast.success(response.data.message || __('E-mail subscription successful!'));
        } catch (error: any) {
            if (error.response?.status !== 422) throw error;

            const errors = error.response.data.errors;

            Object.keys(errors).forEach((key) => {
                form.setError(key as any, { type: 'manual', message: errors[key][0] });
            });
        }
    };

    return (
        <div className="lg:col-span-2 lg:place-self-center">
            <div className="ml-auto flex flex-col items-center justify-center gap-8">
                <span className="text-lg font-semibold text-white xl:text-2xl 2xl:text-3xl">
                    {__('Subscribe for the latest news and campaigns_')}
                </span>
                <Form {...form}>
                    <form className="w-full" onSubmit={form.handleSubmit((data) => subscribe(data))}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={__('Enter your email address_')}
                                            className="focus:ring-primary-500 h-14 w-full rounded-full bg-white/10 pr-36 pl-4 font-semibold text-white not-aria-invalid:border-none placeholder:text-white/50 focus:ring-0 focus:outline-none md:pl-6"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="pl-2 text-sm font-normal text-white/65">
                                        {__('Enter your email address to subscribe to our newsletter_')}
                                    </FormDescription>

                                    <Button
                                        round="full"
                                        aria-label={__('Subscribe')}
                                        className="absolute top-7 right-2 -translate-y-1/2 transform rounded-full px-8 py-5 font-bold text-white"
                                        loading={form.formState.isSubmitting}
                                    >
                                        {__('Subscribe')}
                                    </Button>
                                </FormItem>
                            )}
                        />

                        <FormWrapper name="explicit_consent" control={form.control} className="px-2">
                            {(field) => <ExplicitConsentCheckbox field={field} newsletter />}
                        </FormWrapper>
                    </form>
                </Form>
            </div>
        </div>
    );
}

function FooterNavigation() {
    const { menu } = useSpecs();

    return (
        <div className="gird-cols-1 grid w-full gap-12 md:px-20 lg:col-span-4 lg:grid-cols-2">
            {menu.footer?.map((item) => (
                <div key={item.title} className="flex flex-col items-start gap-4">
                    <span className="text-3xl font-semibold text-white">{item.title}</span>
                    <ul className="flex [list-style-type:square] flex-col gap-2 ps-4 text-white/35">
                        {item.children.map((subItem) => (
                            <li key={subItem.title}>
                                <Link href={subItem.url} className="hover:text-primary-500 text-white/75" onClick={() => window.scrollTo(0, 0)}>
                                    {subItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function SocialNavigation() {
    const { menu } = useSpecs();

    return (
        <div className="flex flex-col items-start gap-4">
            <ul className="flex flex-row gap-4">
                {menu.social
                    ?.filter((item) => item.url !== '#' && item.url !== null && item.url !== '')
                    ?.map((item) => (
                        <li key={item.title}>
                            <a href={item.url} className="hover:text-primary-500 text-white/35">
                                {item.data.platform === 'facebook' && <Facebook />}
                                {item.data.platform === 'youtube' && <Youtube />}
                                {item.data.platform === 'instagram' && <Instagram />}
                                {item.data.platform === 'linkedin' && <Linkedin />}
                                {item.data.platform === 'x' && <X />}
                            </a>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function Facebook() {
    return (
        <svg width="23" height="22" viewBox="0 0 23 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8828 0.177082C4.71382 0.323382 -0.15352 5.22445 -0.000389977 11.1183C0.119926 15.5073 3.04033 19.3947 7.36078 20.8891C7.91861 21.0772 8.52019 20.795 8.71707 20.2621C8.76082 20.1576 8.7827 20.0426 8.7827 19.9277V14.6504H6.70451C6.26699 14.6399 5.91698 14.3055 5.90605 13.8875V12.0379C5.90605 11.6199 6.26699 11.275 6.70451 11.275H8.7827V8.63116C8.7827 5.76785 10.5656 4.20035 13.1578 4.20035C13.8797 4.20035 14.5579 4.2317 15.061 4.26305C15.4767 4.2944 15.8048 4.6288 15.8048 5.0259V6.58296C15.8048 7.00096 15.4438 7.33536 15.0063 7.34581H14C12.5781 7.34581 12.3156 8.01461 12.3156 8.97602V11.2855H14.6126C15.0501 11.2855 15.4001 11.6303 15.4001 12.0483C15.4001 12.0797 15.4001 12.111 15.3892 12.1424L15.1376 13.9816C15.0829 14.3578 14.7548 14.6399 14.3501 14.6504H12.2937V20.2725C12.2937 20.8368 12.7859 21.2966 13.3766 21.2966C13.4532 21.2966 13.5188 21.2862 13.5953 21.2757C19.6221 19.9799 23.3957 14.2533 22.0394 8.50576C20.88 3.54199 16.2095 0.0621315 10.8828 0.177082Z" />
        </svg>
    );
}

function Youtube() {
    return (
        <div className="relative inline-block">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.669 0.174316C4.77607 0.174316 -0.0106193 4.91022 1.7694e-05 10.7406C1.7694e-05 16.571 4.78672 21.3071 10.6796 21.2966C16.5725 21.2966 21.3485 16.5712 21.3485 10.7303C21.3485 4.89994 16.5619 0.174316 10.669 0.174316ZM16.3172 13.5505C16.179 14.0556 15.7854 14.445 15.2748 14.5818C13.7431 14.7607 12.2114 14.8344 10.669 14.8238C9.12662 14.8449 7.59487 14.761 6.06313 14.5715C5.55256 14.4347 5.15901 14.0453 5.02073 13.5402C4.85053 12.6141 4.7761 11.6772 4.7761 10.7406C4.76546 9.80394 4.85053 8.86765 5.02073 7.94152C5.15901 7.43636 5.55256 7.04648 6.06313 6.90966C7.59487 6.73075 9.12662 6.6571 10.669 6.66763C12.2114 6.64658 13.7431 6.73102 15.2748 6.92045C15.7854 7.05727 16.179 7.44664 16.3172 7.9518C16.4874 8.87792 16.5725 9.82501 16.5619 10.7617C16.5619 11.6878 16.4768 12.6243 16.3172 13.5505Z" />
            </svg>

            <svg
                width="4"
                height="5"
                viewBox="0 0 4 5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
                <path d="M0.5 4.47735L3.56347 2.73069L0.5 0.983521V4.47735Z" />
            </svg>
        </div>
    );
}

function Instagram() {
    return (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3986 0.0105851H7.9675C3.92022 -0.0523072 0.582807 3.13424 0.498047 7.1279V13.2599C0.572212 17.264 3.90963 20.4401 7.9569 20.3772H14.388C18.4353 20.4506 21.7727 17.264 21.8469 13.2599V7.11742C21.8257 3.16568 18.5731 -0.0208613 14.5894 0.000102851C14.5258 0.0105849 14.4622 0.0105851 14.3986 0.0105851ZM15.7654 10.2306C15.8607 12.7568 13.8689 14.8846 11.3049 14.979C8.75153 15.0733 6.60075 13.1027 6.50539 10.566C6.41004 8.02935 8.40189 5.91198 10.9659 5.81764C11.0188 5.81764 11.0824 5.81764 11.1354 5.81764C13.6358 5.76523 15.7124 7.72537 15.7654 10.1991V10.2306ZM17.1427 5.81764C16.507 5.80716 16.0091 5.28306 16.0197 4.65413C16.0303 4.02521 16.56 3.53255 17.1957 3.54304C17.8314 3.55352 18.3294 4.07762 18.3188 4.70654C18.3082 5.3145 17.8102 5.80716 17.1957 5.81764H17.1427Z" />
        </svg>
    );
}

function Linkedin() {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1393 0.174316C5.24555 0.174316 0.464844 4.90428 0.464844 10.7355C0.464844 16.5666 5.24555 21.2966 11.1393 21.2966C17.033 21.2966 21.8137 16.5666 21.8137 10.7355C21.8137 4.90428 17.033 0.174316 11.1393 0.174316ZM8.03341 16.1366H5.43635V8.3967H8.03341V16.1366ZM6.74018 7.33744H6.71898C5.90276 7.33744 5.23495 6.67671 5.24555 5.85867C5.24555 5.05111 5.91336 4.39039 6.74018 4.40087C7.5564 4.40087 8.22421 5.0616 8.21361 5.87964C8.20301 6.6872 7.5458 7.33744 6.74018 7.33744ZM17.4146 16.1366H14.8176V11.994C14.8176 10.9557 14.4359 10.2425 13.5031 10.2425C12.8989 10.2425 12.3689 10.6201 12.1675 11.1864C12.1039 11.3857 12.0721 11.6059 12.0827 11.8157V16.1366H9.48564C9.48564 16.1366 9.51744 9.12035 9.48564 8.3967H12.0827V9.48742C12.5597 8.65889 13.4607 8.17646 14.4253 8.20792C16.132 8.20792 17.4146 9.30913 17.4146 11.6898V16.1366Z" />
        </svg>
    );
}

function X() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="22" height="22" fill="currentColor">
            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
        </svg>
    );
}