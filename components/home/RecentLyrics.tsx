import React from 'react'
import { getLyricsData } from '@/lib/actions/lyrics'
import { LyricsCard } from '../lyrics-card'
import SectionTitle from './SectionTitle'

const RecentLyrics = async () => {
    const { data } = await getLyricsData({ page: 1, take: 6 });

    return (
        <div className='w-full'>
            <SectionTitle
                text='Recent Lyrics'
                link='/lyrics'
            />
            <div className="grid gap-3 md:grid-cols-2  lg:grid-cols-3 w-full">
                {data.map((item, i) => (
                    <LyricsCard key={i} data={item} />
                ))}
            </div>
        </div>
    )
}

export default RecentLyrics
