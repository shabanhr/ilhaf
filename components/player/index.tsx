"use client";
import React from 'react'
import dynamicRender from 'next/dynamic';

const MainPlayer = dynamicRender(() => import('./Main'),
    {
        ssr: false,
        loading: () => <></>
    }
)

export const PlayerV2 = () => {
    return (
        <div className='bg-background z-30 fixed left-0 right-0 bottom-0'>
            <MainPlayer />
        </div>
    )
}

