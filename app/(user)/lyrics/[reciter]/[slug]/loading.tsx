
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Loading = () => {
    return (
        <div className='w-ful'>
            <Skeleton className='w-1/2 h-10 rounded-lg my-2' />
            <Skeleton className="w-full h-3 my-4" />
            <Skeleton className="w-1/2 h-3 my-4" />

            <div className='flex flex-col md:flex-row items-center justify-center gap-4 mx-auto my-10'>
                <Skeleton className='w-full mx-auto md:w-[35%] h-full rounded-md aspect-video' />
                <div className='w-full md:w-[65%] px-2 '>
                    <Skeleton className="w-16 h-3 my-2" />
                    <Skeleton className="w-40 h-2 my-2" />
                    <div className='grid grid-cols-2'>
                        <div>
                            <Skeleton className="w-16 h-3 my-2" />
                            <Skeleton className="w-40 h-2 my-2" />
                        </div>
                        <div>
                            <Skeleton className="w-16 h-3 my-2" />
                            <Skeleton className="w-40 h-2 my-2" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loading;

