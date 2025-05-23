import React from 'react'
import { chapters } from '../data'

export const ChapterList = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {chapters.map((chapter) => (
                <div key={chapter.id} className='border p-2 rounded-md bg-card flex items-center gap-x-4'>
                    <div className='text-4xl font-bold'>{chapter.id}</div>
                    <div className='flex flex-col'>
                        <span> {chapter.name_simple}</span>
                        <span> {chapter.verses_count}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}