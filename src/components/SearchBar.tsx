import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useAxios from '@hooks/axios';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from './ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';

type SearchResult = {
    group: string;
    key: 'post' | 'document';
    items: {
        title: string;
        description: string;
        url: string;
    }[];
};

export default function SearchBar({
    isInvertColor,
    scrolling,
}: {
    isInvertColor?: boolean;
    scrolling: {
        scrollDown: boolean;
        scrollUp: boolean;
    };
}) {
    const __ = useTranslations();
    const [open, setOpen] = React.useState(false);
    const [searched, setSearched] = React.useState(false);
    const [searching, setSearching] = React.useState(false);
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const axios = useAxios();

    const handleSearchChange = useDebouncedCallback(async (term: string) => {
        setSearched(term.length > 0);

        if (term.length > 0) {
            await axios
                .get('/api/search', {
                    params: { term },
                })
                .then((response) => {
                    setResults(response.data as SearchResult[]);
                })
                .catch((error) => {
                    if (error.response?.status === 429) {
                        toast.error(__('You are making too many requests. Please try again later.'), {
                            description: __('You have exceeded the rate limit for search requests. Please wait a moment before trying again.'),
                        });
                    }
                });
        }

        setSearching(false);
    }, 500);

    const reset = () => {
        setOpen(false);
        setSearched(false);
        setSearching(false);
        setResults([]);
    };

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => {
            document.removeEventListener('keydown', down);
            reset();
        };
    }, []);

    return (
        <>
            <Button
                className={`${isInvertColor && !scrolling.scrollUp ? 'text-white group-[&.opened]/header:text-black' : 'hover:text-primary-500 text-black'}`}
                variant="ghost"
                size="icon"
                onClick={() => setOpen((open) => !open)}
                aria-label="Search"
                data-state={open ? 'opened' : 'closed'}
            >
                <MagnifyingGlassIcon className="size-5" />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
                <CommandInput
                    placeholder={__('Type a search term')}
                    searching={searching}
                    onValueChange={(term) => {
                        setSearching(true);
                        handleSearchChange(term);
                    }}
                />
                {searched && (
                    <CommandList>
                        {searched && !results.length && <CommandEmpty>{__('No results found_')}</CommandEmpty>}
                        {results.map((result) => (
                            <CommandGroup key={result.group} heading={result.group}>
                                {result.items.map((item) => (
                                    <CommandItem
                                        key={item.url}
                                        className="hover:!bg-primary-50 flex cursor-pointer items-start"
                                        asChild
                                        value={item.url}
                                    >
                                        <Link href={item.url} onClick={() => reset()}>
                                            <div className="inline-flex flex-col items-start gap-y-2">
                                                <span className="font-semibold">{item.title}</span>
                                                <span className="text-muted-foreground text-sm">{item.description}</span>
                                            </div>
                                        </Link>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                )}
            </CommandDialog>
        </>
    );
}