'use client';

import * as React from 'react';

import { PaginatedData } from '@/types';
import { cn } from '@lib/utils';

import { usePathname, useRouter } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from './button';
import { Skeleton } from './skeleton';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
    return (
        <div data-slot="table-container" className="relative w-full overflow-x-auto">
            <table data-slot="table" className={cn('w-full caption-bottom text-base', className)} {...props} />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
    return <thead data-slot="table-header" className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
    return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
    return <tfoot data-slot="table-footer" className={cn('bg-muted/50 font-medium', className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
    return <tr data-slot="table-row" className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors', className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'text-foreground h-10 bg-[#EEF0ED] px-2 py-3 text-left align-middle font-semibold whitespace-nowrap first:pl-8 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className,
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                'border-b border-black/10 px-2 py-4 align-middle whitespace-nowrap first:pl-8 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                className,
            )}
            {...props}
        />
    );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
    return <caption data-slot="table-caption" className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />;
}

function DataTable<T>({
    dataKey,
    data,
    columns,
    emptyState,
}: {
    dataKey?: string;
    data?: PaginatedData<T>;
    columns: ColumnDef<T>[];
    emptyState?: React.ReactNode;
}) {
    const __ = useTranslations();
    const paginated = data || {
        data: [],
        links: { first: '#', last: '#', prev: '#', next: '#' },
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            per_page: 10,
            to: 0,
            total: 0,
            path: '',
            links: [],
        },
    };

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: paginated.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full space-y-4">
            <div className="flex w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="border-x border-gray-300 md:border-none" key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyState || <span className="text-muted-foreground">{__('No records found_')}</span>}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination paginated={paginated} dataKey={dataKey} />
        </div>
    );
}

function DataTableSkeleton({ headers = 5, rows = 5 }: { headers?: number; rows?: number }) {
    return (
        <div className="w-full space-y-4">
            <div className="flex w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: headers }).map((_, index) => (
                                <TableHead className="border-x border-gray-300 md:border-none" key={index}>
                                    <Skeleton className="h-6 w-24 bg-gray-200" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rows }).map((_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: headers }).map((_, cellIndex) => (
                                    <TableCell key={cellIndex}>
                                        <Skeleton className="h-6 w-full bg-gray-200" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

const parseQueryParams = (url: string, pathname: string, pageKey: string, perPageKey: string) => {
    const urlObj = new URL(url, window.location.origin);
    const params = urlObj.searchParams;

    const page = params.get(pageKey) || '1';
    const perPage = params.get(perPageKey) || '10';

    const query = {
        [pageKey]: page,
        [perPageKey]: perPage,
    };

    if (perPage === '10') {
        delete query[perPageKey];
    }

    return {
        pathname,
        query,
    };
};

function DataTablePagination<T>({ paginated, dataKey }: { paginated?: PaginatedData<T>; dataKey?: string }) {
    const __ = useTranslations();
    const router = useRouter();
    const pathname = usePathname();

    if (!paginated) return <></>;

    const pageKey = dataKey ? `${dataKey}_page` : 'page';
    const perPageKey = dataKey ? `${dataKey}_per_page` : 'per_page';

    const hasMorePages = paginated.meta.current_page < paginated.meta.last_page;
    const hasPages = paginated.meta.total > 0 && (paginated.meta.current_page !== 1 || hasMorePages);

    if (!hasPages) return null;

    const next = () => {
        if (!hasMorePages) return '#';

        return parseQueryParams(paginated.links.next || '#', pathname, pageKey, perPageKey);
    };

    const prev = () => {
        if (paginated.meta.current_page <= 1) return '#';

        return parseQueryParams(paginated.links.prev || '#', pathname, pageKey, perPageKey);
    };

    const changePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        router.replace({
            pathname,
            query: {
                [pageKey]: 1, // Reset to first page when changing per page
                [perPageKey]: e.target.value,
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-end gap-y-2 py-4 md:flex-row md:space-x-2 md:ps-8 md:pe-4">
            <div className="text-muted-foreground flex-1 text-sm">
                {__('pagination_info', {
                    from: paginated.meta.from,
                    to: paginated.meta.to,
                    total: paginated.meta.total,
                })}
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
                <div className="flex items-center gap-x-2">
                    <label htmlFor="rowsPerPage" className="text-muted-foreground">
                        {__('Rows per page')}:
                    </label>
                    <select
                        className="border-none text-black focus:ring-0 focus:outline-none"
                        name="rowsPerPage"
                        id="rowsPerPage"
                        onChange={changePerPage}
                        value={paginated.meta.per_page}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                <div className="flex items-center gap-x-2">
                    <Button asChild data-disabled={paginated.meta.current_page <= 1} variant="gray" size="icon" round="full">
                        <Link href={prev() as string} replace>
                            <ChevronLeftIcon className="size-2.5 stroke-4" />
                        </Link>
                    </Button>
                    <span className="text-xs -tracking-widest">
                        <span className="text-black">{paginated.meta.current_page}</span>{' '}
                        <span className="text-black/35">/ {paginated.meta.last_page}</span>
                    </span>
                    <Button asChild data-disabled={!hasMorePages} variant="gray" size="icon" round="full">
                        <Link href={next() as string} replace>
                            <ChevronRightIcon className="size-2 stroke-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { DataTable, DataTableSkeleton, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
