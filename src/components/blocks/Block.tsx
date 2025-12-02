import { Block as BlockProps } from '@/types';
import Hero from './Hero';

const blocks = {
    Hero,
};

const RenderBlock = ({ type, data, index, page, rawTitle, ...props }: BlockProps) => {
    const pascal = (str: string) => {
        return str.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).replaceAll('-', '');
    };

    const componentName = pascal(type) as keyof typeof blocks;

    if (!blocks[componentName]) {
        return <></>;
    }

    const Block = blocks[componentName];

    data['index'] = index;
    data['rawTitle'] = rawTitle;

    data = { ...data, ...props };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Block page={page} {...data} />;
};

export default RenderBlock;
