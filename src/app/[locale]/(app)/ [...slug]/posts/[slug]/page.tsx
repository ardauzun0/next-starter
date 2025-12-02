import { getPosts } from '@/data/getPosts';
import { getPathname } from '@/i18n/navigation';
import { Post, Resource } from '@/types';
import { Breadcrumbs } from '@components/Breadcrumbs';
import Container from '@components/Container';
import JsonLd from '@components/JsonLd';
import Media from '@components/Media';
import { OtherPosts, PostContent } from '@components/PostStuff';
import { Metadata } from 'next';
import { Fragment } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;

    const post = (await getPosts({ locale, slug })) as Resource<Post>;

    return post.meta.seo;
}

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{ page: string | number }>;
}) {
    const { locale, slug } = await params;

    const post = (await getPosts({ locale, slug })) as Resource<Post>;

    return (
        <Fragment>
            <JsonLd json={post.meta.seo.jsonLd} />
            <Container widest>
                <Media media={post.data.cover} imageProps={{ loading: 'eager', width: 2500, quality: 100 }} className="h-full w-full md:rounded-xl" />
            </Container>
            <Container>
                <div className="flex flex-col items-center justify-center">
                    <Breadcrumbs
                        items={[
                            {
                                label: 'News',
                                href: getPathname({
                                    locale,
                                    href: {
                                        pathname: '/posts',
                                    },
                                }),
                            },
                            {
                                label: post.data.title,
                            },
                        ]}
                    />
                    <PostContent post={post} />
                    <OtherPosts slug={slug} locale={locale} />
                </div>
            </Container>
        </Fragment>
    );
}
