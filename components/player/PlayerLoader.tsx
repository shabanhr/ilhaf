import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

const PlayerLoader = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full px-4 py-2 bg-background">
                <div className='flex gap-x-3 items-center justify-center'>
                    <Skeleton className="h-8 w-16" />
                    <div className='space-y-1'>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-0 md:w-24" />
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
        </div>
    )
}

export default PlayerLoader
