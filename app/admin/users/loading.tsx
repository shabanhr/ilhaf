import Spinner from '@/components/Spinner'
import React from 'react'

const loading = () => {
    return (
        <div className="h-[30rem] flex items-center justify-center ">
            <Spinner active invert size="lg" />
        </div>
    )
}

export default loading;
