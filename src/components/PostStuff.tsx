
'use client';

import { useTranslatableParams } from '@/contexts/translatableParams';
import { getOtherNews } from '@/data/getPosts';
import { Post, Resource } from '@/types';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Container from './Container';
import Media from './Media';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Skeleton } from './ui/skeleton';

export function PostContent({ post }: { post: Resource<Post> }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const { setTranslatableParams } = useTranslatableParams();

    useEffect(() => {
        setTranslatableParams({
            slug: post.data.slugs,
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="post" className="w-full" ref={contentRef}>
            <h1 className="mx-auto max-w-3xl text-center text-3xl font-semibold lg:text-5xl">{post.data.title}</h1>

            <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
                <SocialActions post={post} contentRef={contentRef} />

                <div className="space-y-8 py-12 md:px-30">
                    <div className="flex items-center gap-x-4 text-xs">
                        <svg width="14" height="14" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1573 0.105469H0V12.2628H12.1573V0.105469Z" fill="#63C572" />
                        </svg>
                        <time dateTime={post.data.datetime} className="text-sm">
                            {post.data.date}
                        </time>
                    </div>
                    <div className="prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.data.body }} />

                    <Button asChild size="lg" wide="sm" className="mx-auto text-base max-sm:mt-8 gap-0 block leading-10">
                        <Link href="/products/omnivex-scada">
                            Omnivex<sup>®</sup> Scada
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function OtherPosts({ slug, locale }: { slug: string; locale?: string }) {
    const __ = useTranslations();
    const [posts, setPosts] = useState<Post[]>([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        getOtherNews({ slug, locale }).then((response) => {
            setPosts(response.data as unknown as Post[]);

            setFetched(true);
        });
    }, [slug, locale]);

    if (!fetched) {
        return (
            <Container className="mt-24 flex flex-col py-8 md:mt-8">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-2/12 rounded-lg" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className="flex h-full flex-col items-start gap-8 border border-gray-200 bg-white p-6 shadow-sm" key={index}>
                            <Skeleton className="h-72 w-full rounded-xl" />
                            <div className="mt-4 flex w-full flex-col gap-y-6">
                                <Skeleton className="h-6 w-2/6 rounded-lg" />
                                <Skeleton className="h-4 w-full rounded-lg" />
                                <Skeleton className="h-4 w-5/6 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        );
    }

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <Container>
            <Carousel
                className="relative mt-24 flex w-full flex-col py-8 md:mt-8"
                opts={{ slidesToScroll: 'auto', containScroll: false, loop: true }}
            >
                <div className="flex h-16 items-center justify-between px-4">
                    <span className="w-10/12 text-2xl font-semibold text-black lg:text-4xl">{__('Other News')}</span>

                    <div className="absolute top-4 right-15 z-10 flex h-24 w-8 transform items-center justify-center gap-4">
                        <CarouselPrevious
                            className={cn(
                                'size-12 border-black/10 lg:size-14 [&_.arrow-left]:!size-4 [&_.arrow-left]:text-black/50 [&>svg]:first:size-9 [&>svg]:first:lg:size-14',
                            )}
                        />
                        <CarouselNext
                            className={cn(
                                'size-12 border-black/10 lg:size-14 [&_.arrow-right]:!size-4 [&_.arrow-right]:text-black/50 [&>svg]:first:size-9 [&>svg]:first:lg:size-14',
                            )}
                        />
                    </div>
                </div>
                <CarouselContent className="w-full md:mt-12" containerClassName="py-4">
                    {posts.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="group min-w-0 basis-full [transform:translate3d(0,0,0)] pl-8 md:basis-1/2 md:pl-10 xl:basis-1/3 xl:pl-8"
                        >
                            <PostCard post={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </Container>
    );
}

export function PostCard({ post }: { post: Post }) {
    return (
        <article className="flex h-full transform flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm duration-200 hover:-translate-y-1">
            <div className="relative w-full">
                <Link href={post.url} className="block h-full w-full">
                    <Media
                        media={post.featured}
                        className="aspect-[16/9] w-full rounded-xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                </Link>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
            </div>
            <div className="mt-8 mb-auto flex h-full max-w-xl flex-col gap-y-4 px-2 py-4">
                <div className="flex items-center gap-x-4 text-xs">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1573 0.105469H0V12.2628H12.1573V0.105469Z" fill="#63C572" />
                    </svg>
                    <time dateTime={post.datetime} className="text-secondary-500">
                        {post.date}
                    </time>
                </div>
                <Link className="group relative flex h-full flex-col gap-4" href={post.url} aria-label={post.title}>
                    <h3 className="group-hover:text-muted-foreground line-clamp-3 text-2xl leading-8 font-semibold md:line-clamp-2">{post.title}</h3>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.summary}</p>
                </Link>
            </div>
        </article>
    );
}

function SocialActions({ post, contentRef }: { post: Resource<Post>; contentRef: React.RefObject<HTMLDivElement | null> }) {
    const [showCopiedText, setShowCopiedText] = useState(false);

    const postData = post.data;

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postData.url}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${postData.title}&url=${postData.url}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${postData.url}&title=${postData.title}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${postData.title} ${postData.url}`;

    const copyUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            navigator.clipboard.writeText(postData.url);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: any) {
            const textArea = document.createElement('textarea');
            textArea.value = postData.url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        setShowCopiedText(true);
        setTimeout(() => setShowCopiedText(false), 1000);
    };

    const printFn = useReactToPrint({
        contentRef,
        documentTitle: postData.title,
    });

    // Runs only server-side
    const print = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (typeof window === 'undefined' || !contentRef.current) return null;

        if (typeof printFn === 'function') {
            printFn();
        }
    };

    return (
        <div className="order-last mt-4 md:mt-20 lg:order-first lg:mt-12 print:hidden">
            <div className="top-28 md:sticky">
                <ul className="flex items-center justify-center gap-6 lg:flex-col">
                    <li>
                        <a
                            href={facebookShareUrl}
                            target="_blank"
                            className="hover:text-primary-500 flex h-6 w-6 items-center justify-center rounded-full text-black/50"
                            rel="noreferrer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7064 0.00314225C5.07297 0.169374 -0.160879 5.73814 0.00378105 12.4349C0.133157 17.4219 3.27347 21.8389 7.91925 23.5368C8.51908 23.7505 9.16596 23.43 9.37767 22.8244C9.42471 22.7057 9.44824 22.5751 9.44824 22.4444V16.4482H7.21356C6.7431 16.4363 6.36673 16.0564 6.35497 15.5814V13.4798C6.35497 13.0048 6.7431 12.613 7.21356 12.613H9.44824V9.60897C9.44824 6.35557 11.3654 4.57452 14.1528 4.57452C14.9291 4.57452 15.6583 4.61014 16.1993 4.64576C16.6462 4.68138 16.9991 5.06134 16.9991 5.51254V7.28172C16.9991 7.75667 16.611 8.13663 16.1405 8.1485H15.0585C13.5295 8.1485 13.2472 8.90842 13.2472 10.0008V12.6249H15.7171C16.1876 12.6249 16.5639 13.0167 16.5639 13.4917C16.5639 13.5273 16.5639 13.5629 16.5522 13.5985L16.2816 15.6883C16.2228 16.1158 15.87 16.4363 15.4348 16.4482H13.2237V22.8363C13.2237 23.4775 13.7529 23.9999 14.3881 23.9999C14.4704 23.9999 14.5409 23.988 14.6233 23.9761C21.1038 22.5038 25.1616 15.997 23.7031 9.46648C22.4564 3.82648 17.4343 -0.127468 11.7064 0.00314225Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={copyUrl}
                            className="hover:text-primary-500 relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-black/50"
                        >
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.50294 12.8542C2.65673 11.8366 2.14258 10.5298 2.14258 9.1052C2.14258 5.87032 4.78832 3.21387 8.03391 3.21387H13.3897C16.6245 3.21387 19.281 5.87032 19.281 9.1052C19.281 12.3401 16.6353 14.9965 13.3897 14.9965H10.7118"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22.2048 12.8542C23.051 13.8718 23.5652 15.1786 23.5652 16.6032C23.5652 19.8381 20.9194 22.4946 17.6738 22.4946H12.3181C9.08321 22.4946 6.42676 19.8381 6.42676 16.6032C6.42676 13.3684 9.0725 10.7119 12.3181 10.7119H14.996"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {showCopiedText && (
                                <span className="absolute top-0 -right-12 mt-1 -mr-2.5 rounded bg-black/50 px-1 py-0.5 text-xs font-semibold text-white">
                                    {'Copied!'}
                                </span>
                            )}
                        </button>
                    </li>
                    <li>
                        <a
                            href={whatsappShareUrl}
                            target="_blank"
                            className="hover:text-primary-500 flex h-6 w-6 items-center justify-center rounded-full text-black/50"
                            rel="noreferrer"
                        >
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2625 0C5.05248 0 7.26784e-05 5.05241 7.26784e-05 11.2624C7.26784e-05 13.2015 0.501004 15.1083 1.45096 16.7908L0.0181904 21.9029C-0.0288178 22.0709 0.0167215 22.2511 0.138159 22.3759C0.231686 22.4724 0.359 22.5248 0.489742 22.5248C0.528915 22.5248 0.568579 22.5199 0.607263 22.5106L5.9427 21.189C7.57183 22.0635 9.40662 22.5248 11.2625 22.5248C17.4725 22.5248 22.5249 17.4724 22.5249 11.2624C22.5249 5.05241 17.4725 0 11.2625 0ZM16.9279 15.2365C16.687 15.9035 15.5314 16.5121 14.9761 16.5939C14.4776 16.6669 13.8469 16.6982 13.1545 16.4808C12.7349 16.3486 12.1963 16.1733 11.5063 15.879C8.60601 14.6421 6.71197 11.7584 6.56703 11.5679C6.42257 11.3775 5.38643 10.0201 5.38643 8.61524C5.38643 7.21038 6.13318 6.51946 6.39858 6.23349C6.66398 5.94752 6.97688 5.87603 7.16981 5.87603C7.36274 5.87603 7.55518 5.87848 7.72412 5.88631C7.90187 5.89513 8.14034 5.81923 8.37489 6.37647C8.6158 6.94841 9.1941 8.35327 9.2656 8.49674C9.33807 8.63972 9.38605 8.8067 9.29008 8.99718C9.1941 9.18766 9.14612 9.30665 9.00117 9.47363C8.85623 9.64061 8.69758 9.84578 8.56733 9.97407C8.42238 10.1166 8.27206 10.2708 8.4405 10.5568C8.60895 10.8427 9.18921 11.7775 10.0491 12.5346C11.1533 13.507 12.0851 13.8087 12.374 13.9517C12.6629 14.0946 12.8319 14.0706 13.0003 13.8802C13.1687 13.6892 13.7231 13.0463 13.9155 12.7608C14.1079 12.4753 14.3009 12.5223 14.5663 12.6178C14.8317 12.7128 16.2532 13.4032 16.5421 13.5462C16.831 13.6892 17.0239 13.7607 17.0964 13.8797C17.1689 13.9982 17.1689 14.5701 16.9279 15.2365Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href={twitterShareUrl}
                            target="_blank"
                            className="hover:text-primary-500 flex h-6 w-6 items-center justify-center rounded-full text-black/50"
                            rel="noreferrer"
                        >
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2624 0C5.05192 0 0 5.05192 0 11.2624C0 17.4729 5.05192 22.5248 11.2624 22.5248C17.4729 22.5248 22.5248 17.4729 22.5248 11.2624C22.5248 5.05192 17.4729 0 11.2624 0ZM16.7648 9.07063C16.7697 9.1862 16.7726 9.30371 16.7726 9.42173C16.7726 13.0051 14.0437 17.1384 9.05447 17.1384C7.52279 17.1384 6.09638 16.6894 4.89669 15.9196C5.10872 15.9451 5.32368 15.9573 5.54355 15.9573C6.81473 15.9573 7.98455 15.5245 8.91198 14.7968C7.72502 14.7753 6.72414 13.9894 6.37794 12.9131C6.54394 12.9449 6.71385 12.962 6.88916 12.962C7.13644 12.962 7.37638 12.9292 7.60309 12.8665C6.36325 12.6163 5.42847 11.5214 5.42847 10.2067C5.42847 10.1949 5.42847 10.1837 5.42847 10.1724C5.79426 10.3756 6.21194 10.498 6.65705 10.5122C5.92843 10.025 5.45051 9.1955 5.45051 8.25435C5.45051 7.75734 5.5837 7.29166 5.81727 6.89014C7.15554 8.53102 9.15437 9.61074 11.4083 9.72434C11.3618 9.52554 11.3373 9.3189 11.3373 9.10638C11.3373 7.60848 12.5517 6.3941 14.0501 6.3941C14.8301 6.3941 15.5348 6.72316 16.0293 7.25053C16.6468 7.12909 17.228 6.90336 17.752 6.59291C17.5497 7.22556 17.1193 7.75734 16.5587 8.09325C17.1081 8.02666 17.6301 7.88172 18.1173 7.66577C17.7539 8.20979 17.2941 8.6882 16.7648 9.07063Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href={linkedinShareUrl}
                            target="_blank"
                            className="hover:text-primary-500 flex h-6 w-6 items-center justify-center rounded-full text-black/50"
                            rel="noreferrer"
                        >
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2417 0C5.48264 0 0 5.48264 0 12.2417C0 19.0008 5.48264 24.4835 12.2417 24.4835C19.0008 24.4835 24.4835 19.0008 24.4835 12.2417C24.4835 5.48264 19.0008 0 12.2417 0ZM8.67984 18.5024H5.70146V9.5308H8.67984V18.5024ZM7.19673 8.30298H7.17241C6.23635 8.30298 5.47049 7.53711 5.48264 6.5889C5.48264 5.65284 6.24851 4.88697 7.19673 4.89912C8.13279 4.89912 8.89866 5.66499 8.8865 6.61321C8.87434 7.54927 8.12063 8.30298 7.19673 8.30298ZM19.4385 18.5024H16.4601V13.7005C16.4601 12.497 16.0224 11.6704 14.9527 11.6704C14.2597 11.6704 13.6519 12.108 13.4209 12.7645C13.348 12.9954 13.3115 13.2507 13.3237 13.4939V18.5024H10.3453C10.3453 18.5024 10.3818 10.3696 10.3453 9.5308H13.3237V10.7951C13.8707 9.83472 14.904 9.27551 16.0103 9.31198C17.9675 9.31198 19.4385 10.5884 19.4385 13.348V18.5024Z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={print}
                            className="hover:text-primary-500 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full text-black/50 lg:flex"
                        >
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.08594 7.81036H18.6859V5.57879C18.6859 3.34723 17.849 2.23145 15.3385 2.23145H11.4333C8.92277 2.23145 8.08594 3.34723 8.08594 5.57879V7.81036Z"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M17.8559 16.7363V21.1995C17.8559 23.431 16.7402 24.5468 14.5086 24.5468H12.277C10.0455 24.5468 8.92969 23.431 8.92969 21.1995V16.7363H17.8559Z"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M23.4278 11.1579V16.7368C23.4278 18.9684 22.3121 20.0842 20.0805 20.0842H17.8489V16.7368H8.92266V20.0842H6.6911C4.45953 20.0842 3.34375 18.9684 3.34375 16.7368V11.1579C3.34375 8.92633 4.45953 7.81055 6.6911 7.81055H20.0805C22.3121 7.81055 23.4278 8.92633 23.4278 11.1579Z"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.9703 16.7363H17.6202H7.8125"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.8125 12.2734H11.1598"
                                    stroke="black"
                                    strokeOpacity="0.65"
                                    strokeWidth="1.4"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
