import NoResults from '@/components/NoResults';
import { currentUser } from '@/config/auth'
import React from 'react'
import { LoadMore } from '@/components/load-more';
import { LyricsCard } from '@/components/lyrics-card';
import { getFavLyrics } from '@/lib/actions/lyrics';
import { redirect } from 'next/navigation';

export default async function Favorite() {
    const user = await currentUser();
    if (!user || !user.id) return redirect('/auth');

    const { data, count } = await getFavLyrics({ page: 1, userId: user.id });

    if (data[0]) {
        return (
            <>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 w-full'>
                    {data.map((item, index) => (
                        <LyricsCard key={index} data={item} />
                    ))}
                </div>
                <LoadMore Func={getFavLyrics} count={count} additionalProps={{ userId: user.id }} />
            </>
        )
    } else {
        return <NoResults />
    }
}
