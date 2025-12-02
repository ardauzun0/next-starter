import { getPostCategories, getPosts } from '@/data/getPosts';
import { MediaItem, PaginatedData, Post, PostCategory } from '@/types';
import Heading from '@components/Blocks/Heading';
import Container from '@components/Container';
import Content from '@components/Content';
import JsonLd from '@components/JsonLd';
import { Pagination } from '@components/Pagination';
import PostSearchInput from '@components/PostSearchInput';
import { PostCard } from '@components/PostStuff';
import PostTabs from '@components/PostTabs';
import RevealElement from '@components/RevealElement';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
    const { locale } = await params;

    const news = (await getPosts({ locale })) as PaginatedData<Post>;

    return news.meta.seo;
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page: string | number; category?: string; search?: string }>;
}) {
    const __ = await getTranslations();
    const __rich = __.rich;
    const { locale } = await params;
    const { page, category, search } = await searchParams;

    const posts = (await getPosts({ locale, page, category, search })) as PaginatedData<Post>;
    const categories = (await getPostCategories({ locale })) as PaginatedData<PostCategory>;

    const background = {
        url: '/assets/posts-bg.png',
    } as MediaItem;

    return (
        <Fragment>
            <JsonLd json={posts.meta.seo.jsonLd} />
            <Content>
                <div className="flex w-full flex-col">
                    <Heading
                        heading={posts.meta.seo.rawTitle}
                        title={posts.meta.seo.description}
                        background={background}
                        titleClassName="md:max-w-4xl"
                    >
                        <RevealElement amount={5} className="mx-auto w-full max-w-md">
                            <PostSearchInput />
                        </RevealElement>
                    </Heading>
                    <PostTabs categories={categories.data} locale={locale} />
                </div>
            </Content>

            <Content className="-mt-4">
                <Container>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post: Post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        {search && posts.data.length === 0 && (
                            <div className="col-span-full text-center">
                                {__rich('no_posts_found_for', {
                                    search: () => <strong>{search}</strong>,
                                    in_category: () => {
                                        if (!category) return <></>;

                                        return (
                                            <span>
                                                {__rich('in_category', {
                                                    category: () => (
                                                        <strong>{categories.data.find((c) => c.slug === category)?.title || category}</strong>
                                                    ),
                                                })}
                                            </span>
                                        );
                                    },
                                })}
                            </div>
                        )}
                    </div>

                    <Pagination data={posts} className="col-span-full mt-8 px-4" />
                </Container>
            </Content>
        </Fragment>
    );
}