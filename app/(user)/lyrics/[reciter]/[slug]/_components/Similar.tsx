import SectionTitle from '@/components/home/SectionTitle'
import { LoadMore} from '@/components/load-more'
import { LyricsCard } from '@/components/lyrics-card'
import { LyricsType } from '@prisma/client';
import React from 'react'
import { GetSimilarLyrics } from '../_lib/queries';

interface SimilarLyricsProps {
    type: LyricsType;
    slug: string;
    topics: string[];
}


const Similar = async (props: SimilarLyricsProps) => {

    const { type, slug, topics } = props;
    const { data, count } = await GetSimilarLyrics({ type, slug, topics });

    return (
        <div>
            {
                data[0] && <div className='grid gap-y-3'>
                    <SectionTitle text='You Might Also Like!' />
                    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-3'>
                        {data.map((item, i) => (
                            <LyricsCard key={i} data={item} />
                        ))}
                    </div>
                    <LoadMore
                        Func={GetSimilarLyrics}
                        count={count}
                        additionalProps={props}
                    />
                </div>
            }
        </div>
    )
}

export default Similar
