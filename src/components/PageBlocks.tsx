'use client';

import { useTranslatableParams } from '@/contexts/translatableParams';
import { Block, DownloadItem, Page, Product, Resource } from '@/types';
import RenderBlock from '@components/Blocks/Block';
import { Fragment, PropsWithChildren, useEffect } from 'react';

export default function PageBlocks({ page }: { page: Resource<Page | DownloadItem | Product> }) {
    const { setTranslatableParams } = useTranslatableParams();

    useEffect(() => {
        if ('slugs' in page.data && page.data.slugs) {
            setTranslatableParams({
                slug: page.data.slugs,
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hasBlocks = page.data.blocks && page.data.blocks.length > 0;

    if (!hasBlocks) {
        return null;
    }

    return (
        <Fragment>
            {page.data.blocks?.map((block, index) => (
                <Content key={`${block.type}-${index}`} block={block}>
                    <RenderBlock index={index} page={page.data} {...block} />
                </Content>
            ))}
        </Fragment>
    );
}

function Content({ block, children }: PropsWithChildren<{ block: Block }>) {
    return (
        <div data-block-type={block.type} className="group/block my-8 flex first-of-type:my-0 md:my-18">
            {children}
        </div>
    );
}