import { cn } from '@lib/utils';
import { createElement, forwardRef, PropsWithChildren } from 'react';

const Container = (props: PropsWithChildren & { className?: string; as?: string; widest?: boolean }, ref: any) => {
    const { as = 'div', className, children, widest = false, ...rest } = props;

    return createElement(
        as,
        {
            ref,
            className: cn(
                'mx-auto px-4 md:px-8',
                {
                    'w-full px-0': widest,
                    container: !widest,
                },
                className,
            ),
            ...rest,
        },
        children,
    );
};

export default forwardRef(Container);