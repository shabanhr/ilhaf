"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { CardType } from "@/types";
import { LYRICS_PER_PAGE } from "@/config";
import { LyricsCard, LyricsCardSkeleton } from "../lyrics-card";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Props {
    count: number;
    Func: (params: any) => Promise<any>;
    perPage?: number;
    className?: string;
    additionalProps?: any;
}

export const LoadMore = ({ count, Func, perPage = LYRICS_PER_PAGE, className, additionalProps }: Props) => {
    const [data, setData] = useState<CardType[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref);
    const loadedItems = data.length + perPage;
    const remainingItems = count - loadedItems;

    useEffect(() => {
        if (isInView && remainingItems > 0) {
            const page = Math.ceil(loadedItems / perPage) + 1;

            Func({ page: page, ...additionalProps }).then((res) => {
                setData((prevData) => [...prevData, ...res.data]);
            });

        }
    }, [isInView, additionalProps]);

    useEffect(() => {
        setData([]);
    }, [additionalProps]);

    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const isTab = useMediaQuery("(min-width: 768px)")

    const devicesCount = isDesktop ? 3 : (isTab ? 2 : 1);
    const skeletonCount = Math.min(devicesCount, remainingItems);

    return (
        <section className="w-full relative overflow-y-auto">
            <div className={cn("w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-3", className)}>
                {data.map((item, i) => (
                    <LyricsCard key={i} data={item} index={i} />
                ))}
            </div>
            {loadedItems < count && (
                <div ref={ref} className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-3">
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <LyricsCardSkeleton key={i} />
                    ))}
                </div>
            )}
        </section>
    );
};
