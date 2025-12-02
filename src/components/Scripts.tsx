'use client';

import { useSpecs } from '@/contexts/specs';
import parse from 'html-react-parser';

export default function Scripts({ name }: { name: 'site_head' | 'site_body' | 'site_footer' }) {
    const { scripts } = useSpecs();

    // The script value will return a <script> tag as a string.
    // We use dangerouslySetInnerHTML to inject the script into the DOM.
    // This is safe here because we control the content of the scripts.
    const script = scripts[name] || null;

    if (!script) {
        return null;
    }

    return parse(script, {
        replace: (domNode) => {
            // delete whitespace and newlines with a single space
            if (domNode.type === 'text' && domNode.data.trim() === '') {
                return <></>;
            }
        },
    });
}