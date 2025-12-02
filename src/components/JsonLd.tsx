
import { PageMeta } from '@/types';
import Script from 'next/script';
import React from 'react';

export default function JsonLd({ json }: { json?: PageMeta['seo']['jsonLd'] }) {
    if (!json || json.length === 0) {
        return null;
    }

    return (
        <React.Fragment>
            {json.map((item, index) => (
                // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
                <Script
                    strategy="beforeInteractive"
                    id={`json-ld-${index}`}
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </React.Fragment>
    );
}
