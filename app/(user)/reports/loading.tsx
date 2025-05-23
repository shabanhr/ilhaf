import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='grid md:grid-cols-2 gap-3'>
            {Array.from({ length: 6 }).map((item, i) => (
                <Skeleton className='min-h-[220px]' key={i} />
            ))}
        </div>
    )
}

export default loading
