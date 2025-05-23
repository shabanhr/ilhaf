"use client";

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import MagicBox from '@/components/ui/magicBox';
import React, { useEffect, useState } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { LyricsTypes } from '@/config/data';
import Spinner from '@/components/Spinner';
import { SearchParams } from 'next/dist/server/request/search-params';

export type FilterKey = 'type';

interface OptionType {
    id: string;
    name: string;
}

interface Props {
    Params: SearchParams;
    reciters: OptionType[];
}

const Filters = ({ Params, reciters }: Props) => {
    let type = { id: "", name: "" };
    let initReciter = { id: "", name: "" };

    if (Params) {
        initReciter = reciters.find(item => item.id === Params.reciter) || initReciter;
        type = LyricsTypes.find(item => item.id === Params.type) || type;
    }

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const [filters, setFilters] = useState<Record<FilterKey, { id: string, name: string }>>({ type });
    const [loading, setLoading] = useState<boolean>(false);
    const [openStates, setOpenStates] = useState<Record<FilterKey, boolean>>({
        type: false,
    });

    useEffect(() => {
        setLoading(false)
        setOpenStates({
            type: false,
        });
        const getedType = LyricsTypes.find(item => item.id === Params.type) || type;
        setFilters({ type: getedType })
    }, [Params])


    const [reciter, setReciter] = useState<{ id: string, name: string }>(initReciter);
    const [reciterState, setReciterState] = useState<boolean>(false);

    const filterOptions = [
        { filterKey: 'type', placeholder: 'Type', options: LyricsTypes },
    ];

    const handleOpenChange = (key: FilterKey, isOpen: boolean) => {
        setOpenStates((prev) => ({ ...prev, [key]: isOpen } as Record<FilterKey, boolean>));
    };

    const handleSelect = (key: FilterKey, value: { id: string, name: string }) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleClear = (key: FilterKey) => {
        setFilters((prev) => ({ ...prev, [key]: { id: "", name: "" } }));
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(key);
        router.push(`${pathname}?${newSearchParams.toString()}`);
        return setOpenStates((prev) => ({ ...prev, [key]: false } as Record<FilterKey, boolean>));

    };

    const handleApply = async (key: FilterKey) => {
        setLoading(true)
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, filters.type.id);
        return router.push(`${pathname}?${newSearchParams.toString()}`);

    };
    const handleClearReciter = () => {
        return router.push(`/lyrics?${searchParams}`);
    };

    const handleApplyReciter = async () => {
        setLoading(true)
        router.push(`/lyrics/${reciter.id}?${searchParams}`);
    };

    return (
        <div className='pb-12'>
            <div className='text-sm md:text-lg my-2'>Filters</div>
            <Carousel className="min-w-full">
                <CarouselContent className='pl-2 pr-1'>
                    <CarouselItem className='flex basis-[46%] md:basis-[30%] lg:basis-[22%] pl-2'>
                        <MagicBox
                            open={reciterState}
                            onOpenChange={setReciterState}
                            trigger={
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    size="sm"
                                    className={cn(
                                        "w-full justify-between capitalize rounded-full py-1",
                                        reciter.id && "bg-primary hover:bg-primary/80 text-background hover:text-background"
                                    )}
                                >
                                    {reciter.name || "Reciter"}
                                    <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-70" />
                                </Button>
                            }
                        >
                            <Command className='pb-4'>
                                <CommandInput placeholder="Filter ..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup className='min-h-[150px]'>
                                        {reciters.map((item) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.id}
                                                onSelect={() => setReciter({ id: item.id, name: item.name })}
                                            >
                                                {item.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        item.id === reciter.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            <div className="sticky bottom-0 flex items-center justify-center gap-2 p-2 border-t -mb-4 ">
                                <Button
                                    className='w-full'
                                    variant="outline"
                                    onClick={handleClearReciter}
                                >
                                    Clear
                                </Button>
                                <Button
                                    disabled={loading || reciter.id === Params.reciter}
                                    icon={<Spinner active={loading} />}
                                    className='w-full'
                                    onClick={handleApplyReciter}
                                >
                                    Apply
                                </Button>
                            </div>
                        </MagicBox>
                    </CarouselItem>
                    {filterOptions.map((filterOption, index) => (
                        <CarouselItem key={index} className='flex basis-[46%] md:basis-[30%] lg:basis-[22%] pl-2'>
                            <MagicBox
                                open={openStates[filterOption.filterKey as FilterKey]}
                                onOpenChange={(isOpen) => handleOpenChange(filterOption.filterKey as FilterKey, isOpen)}
                                trigger={
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        size="sm"
                                        className={cn(
                                            "w-full justify-between capitalize rounded-full py-1",
                                            filters[filterOption.filterKey as FilterKey].id && "bg-primary hover:bg-primary/80 text-background hover:text-background"
                                        )}
                                    >
                                        {filters[filterOption.filterKey as FilterKey].name || filterOption.placeholder}
                                        <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-70" />
                                    </Button>
                                }
                            >
                                <Command className='pb-4'>
                                    <CommandInput placeholder="Filter ..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup className='min-h-[150px]'>
                                            {filterOption.options.map((item) => (
                                                <CommandItem
                                                    key={item.id}
                                                    value={item.id}
                                                    onSelect={() => handleSelect(filterOption.filterKey as FilterKey, { id: item.id, name: item.name })}
                                                >
                                                    {item.name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            item.id === filters[filterOption.filterKey as FilterKey].id ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                                <div className="sticky bottom-0 flex items-center justify-center gap-2 p-2 border-t -mb-4 ">
                                    <Button
                                        className='w-full'
                                        variant="outline"
                                        onClick={() => handleClear(filterOption.filterKey as FilterKey)}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        disabled={loading}
                                        icon={<Spinner active={loading} />}
                                        className='w-full'
                                        onClick={() => handleApply(filterOption.filterKey as FilterKey)}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </MagicBox>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Filters;
