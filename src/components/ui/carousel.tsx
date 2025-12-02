'use client';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import * as React from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@lib/utils';
import { Button } from '@ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    selectedIndex: number;
    scrollSnaps: number[];
    onDotButtonClick: (index: number) => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }

    return context;
}

function Carousel({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }: React.ComponentProps<'div'> & CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === 'horizontal' ? 'x' : 'y',
        },
        plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onDotButtonClick = React.useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api],
    );

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return;

        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
        setSelectedIndex(api.selectedScrollSnap());
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
        if (!api) return;
        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
            api?.off('select', onSelect);
        };
    }, [api, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
                selectedIndex,
                scrollSnaps,
                onDotButtonClick,
            }}
        >
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn('relative', className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
}

function CarouselContent({ className, containerClassName, ...props }: React.ComponentProps<'div'> & { containerClassName?: string }) {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className={cn('overflow-hidden', containerClassName)} data-slot="carousel-content">
            <div className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props} />
        </div>
    );
}

function CarouselDotButtons({ className, ...props }: React.ComponentProps<'button'>) {
    const { scrollSnaps, selectedIndex, onDotButtonClick } = useCarousel();

    return (
        <>
            {scrollSnaps.map((_, index) => (
                <button
                    key={index}
                    className={cn(
                        'group/bullet data-[active=true]:bg-primary-500 relative mx-1.5 block size-3 rounded-full border border-white/50 bg-transparent data-[active=true]:border-none',
                        className,
                    )}
                    data-active={selectedIndex === index ? 'true' : 'false'}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={selectedIndex === index ? 'true' : 'false'}
                    type="button"
                    role="button"
                    onClick={() => onDotButtonClick(index)}
                    data-slot="carousel-dot-button"
                    {...props}
                >
                    <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-300 group-data-[active=true]/bullet:opacity-100"
                        width="28"
                        height="28"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle opacity="1" cx="20" cy="20" r="18" transform="rotate(90 20 20)"></circle>
                        <circle
                            className="group-data-[active=true]/bullet:animate-fill-circle stroke-primary-500"
                            style={{
                                strokeDashoffset: 125,
                                strokeDasharray: 125,
                            }}
                            opacity="1"
                            cx="20"
                            cy="20"
                            r="18"
                            transform="rotate(90 20 20)"
                            strokeWidth={4}
                        />
                    </svg>
                </button>
            ))}
        </>
    );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
    const { orientation } = useCarousel();

    return (
        <div
            role="group"
            aria-roledescription="slide"
            data-slot="carousel-item"
            className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
            {...props}
        />
    );
}

function CarouselPrevious({ className, variant = 'outline', size = 'icon', ...props }: React.ComponentProps<typeof Button>) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            data-slot="carousel-previous"
            variant={variant}
            size={size}
            className={cn(
                'group/prev relative flex size-12 cursor-pointer items-center justify-center rounded-full border border-solid border-white/25 bg-transparent duration-350 hover:bg-transparent md:size-16',
                'absolute rounded-full',
                orientation === 'horizontal' ? 'top-1/2 -left-12 -translate-y-1/2' : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
                className,
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <svg className="absolute size-12 cursor-pointer md:size-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.5 71.5">
                <circle
                    className="main-circle fill-none stroke-none [stroke-width:2px] [stroke-dasharray:750] [stroke-dashoffset:750]"
                    cx="35.75"
                    cy="35.75"
                    r="35"
                ></circle>
                <circle
                    className="ease-manidar stroke-primary-500 fill-none [stroke-width:2px] duration-1000 [stroke-dasharray:750] [stroke-dashoffset:750] group-hover/prev:[stroke-dashoffset:530]"
                    cx="35.75"
                    cy="35.75"
                    r="35"
                ></circle>
            </svg>
            <ArrowLeftIcon className="arrow-left flex size-4 items-center justify-center text-white duration-350 group-hover/prev:text-white/75 lg:size-5 lg:group-hover/prev:translate-x-[-3px]" />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
}

function CarouselNext({ className, variant = 'outline', size = 'icon', ...props }: React.ComponentProps<typeof Button>) {
    const { orientation, selectedIndex, scrollNext, canScrollNext } = useCarousel();

    const [changed, setChanged] = React.useState(false);

    React.useEffect(() => {
        setChanged(true);
        const timer = setTimeout(() => setChanged(false), 10);
        return () => clearTimeout(timer);
    }, [selectedIndex]);

    return (
        <Button
            data-slot="carousel-next"
            variant={variant}
            size={size}
            className={cn(
                'group/next relative flex size-12 cursor-pointer items-center justify-center rounded-full border border-solid border-white/25 bg-transparent duration-350 hover:bg-transparent md:size-16',
                'absolute rounded-full',
                orientation === 'horizontal' ? 'top-1/2 -right-12 -translate-y-1/2' : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
                className,
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            data-changed={changed}
            {...props}
        >
            <svg className="absolute size-12 cursor-pointer md:size-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.5 71.5">
                <circle
                    className="main-circle fill-none stroke-none [stroke-width:2px] [stroke-dasharray:750] [stroke-dashoffset:750]"
                    cx="35.75"
                    cy="35.75"
                    r="35"
                ></circle>
                <circle
                    style={{
                        animationDuration: '17s',
                    }}
                    className="ease-manidar group-[&.autoplay]/carousel:group-data-[changed=false]/next:animate-fill-circle stroke-primary-500 fill-none [stroke-width:2px] duration-1000 [stroke-dasharray:750] [stroke-dashoffset:750] group-hover/next:[stroke-dashoffset:530]"
                    cx="35.75"
                    cy="35.75"
                    r="35"
                ></circle>
            </svg>
            <ArrowRightIcon className="arrow-right flex size-4 items-center justify-center text-white duration-350 group-hover/next:text-white/75 lg:size-5 lg:group-hover/next:translate-x-[3px]" />
            <span className="sr-only">Next slide</span>
        </Button>
    );
}

export { Carousel, CarouselContent, CarouselDotButtons, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi };
