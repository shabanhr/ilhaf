import React from 'react'

const NoResults = ({ message }: { message?: string }) => {
    return (
        <div className='flex items-center justify-center min-w-full min-h-[200px]' >
            {message || 'No Results Found!'}
        </div>
    )
}

export default NoResults
