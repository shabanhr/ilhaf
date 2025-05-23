import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OverviewCard, OverviewCardSkeleton } from './overview-card';

interface Props {
    data: { [Key: string]: any }
}


export const DetailCardsSekaloton = ({ cards = 4 }: { cards?: number }) => {
    return (
        <div className='grid gap-4 mb-5 grid-cols-2 lg:grid-cols-4 w-full'>
            {Array.from({ length: cards }).map((_, i) => (
                <OverviewCardSkeleton key={i} d={false} />
            ))}
        </div>
    )
}


const DetailCards = ({ data }: Props) => {
    return (
        <div className='grid gap-4 mb-5 grid-cols-2 lg:grid-cols-4 w-full'>
            {Object.entries(data).map(([title, value], i) => (
                <OverviewCard
                    key={i}
                    title={title.split("x").join(" ")}
                    value={value}
                />
            ))}
        </div>
    )
}

export default DetailCards;
