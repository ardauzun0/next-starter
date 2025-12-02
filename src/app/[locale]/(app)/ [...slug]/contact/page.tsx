import { MediaItem } from '@/types';
import Heading from '@components/Blocks/Heading';
import { Breadcrumbs } from '@components/Breadcrumbs';
import ContactForm from '@components/Forms/ContactForm';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';

export async function generateMetadata() {
    const __ = await getTranslations();

    return {
        title: __('Get in Touch - Green Software'),
    };
}

export default async function Page() {
    const __ = await getTranslations();
    const __raw = __.raw;

    const background = {
        url: '/assets/contact.jpg',
    } as MediaItem;

    return (
        <Fragment>
            <Heading
                background={background}
                title={__('Get in Touch')}
                description={__raw(
                    '<p>Fill out the form below to contact us_ Your inquiry will be forwarded to our relevant department as soon as possible and we will get back to you_</p>',
                )}
                titleClassName="p-2"
                descriptionClassName="max-w-4xl"
                descriptionProseClassName="text-white"
                containerClassName="justify-start mt-20 md:mt-32"
                breadcrumbs={
                    <Breadcrumbs items={[{ href: '/', label: __('Support') }, { label: __('Get in Touch') }]} className="my-2 md:my-0" revertColor />
                }
                use_overlay
            />

            <ContactForm type="support" />
        </Fragment>
    );
}