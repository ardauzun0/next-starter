import { PaginatedData } from '@/types';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export function Pagination({ data, className = '' }: { data: PaginatedData<unknown>; className?: string }) {
    const firstLink = Array.isArray(data.meta.links) ? data.meta.links[0] : { url: '', label: null };
    const lastLink = Array.isArray(data.meta.links) ? data.meta.links[data.meta.links.length - 1] : { url: '', label: null };

    const centeredLinks = data.meta.links.filter((link, index) => {
        return index > 0 && index < data.meta.links.length - 1;
    });

    return (
        <>
            {centeredLinks.length > 1 && (
                <nav className={twMerge('flex items-center justify-between border-t border-gray-200 px-4 sm:px-0', className)}>
                    {firstLink.url ? (
                        <div className="-mt-px flex w-0 flex-1">
                            <Link
                                href={firstLink.url}
                                className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                {firstLink.label}
                            </Link>
                        </div>
                    ) : (
                        <span className="flex w-0 flex-1"></span>
                    )}
                    <div className="flex md:-mt-px">
                        {centeredLinks.map((link) => {
                            return link.active ? (
                                <span
                                    key={`page-${link.label}`}
                                    className="border-primary-500 text-primary-600 inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
                                    aria-current="page"
                                >
                                    {link.label}
                                </span>
                            ) : (
                                <Link
                                    key={`page-${link.label}`}
                                    href={link.url}
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                    {lastLink.url ? (
                        <div className="-mt-px flex w-0 flex-1 justify-end">
                            <Link
                                href={lastLink.url}
                                className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                {lastLink.label}
                                <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Link>
                        </div>
                    ) : (
                        <span className="flex w-0 flex-1 justify-end"></span>
                    )}
                </nav>
            )}
        </>
    );
}
