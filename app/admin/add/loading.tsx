import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ListsLoading = () => {
    return (
        <div className='grid md:grid-cols-2 gap-4'>
            <Skeleton className='w-full h-[60vh]' />
            <Skeleton className='w-full h-[60vh]' />
            <Skeleton className='w-full h-[60vh]' />
            <Skeleton className='w-full h-[60vh]' />
        </div>

    )
}

export default ListsLoading
