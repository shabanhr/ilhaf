import React from 'react'
import Filters from './Filters';
import LyricsList from './LyricsList';
import { getRecitersData } from './actions';
import { capitalize } from '@/lib/utils';
import { siteName } from '@/config';
import { SearchParams } from 'next/dist/server/request/search-params';

interface Props {
    searchParams: Promise<SearchParams>
}

export async function generateMetadata(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams?.type as string | undefined;

    let meta = {
        title: `Nohay And Manqabat Lyrics List - Ihaf`,
        description: `Check Out The Lyrics List Of All Nohay And Manqabats`,
        link: "/lyrics"
    };
    if (type) {
        const Type = capitalize(type);
        meta = {
            title: `${Type} Lyrics - Ilhaf`,
            description: `Check Out The ${Type} Lyrics List`,
            link: "/lyrics"
        };
    }



    return {
        title: meta.title,
        description: meta.description,
        keywords: [`Lyrics List`, type && `${capitalize(type)} Lyrics`],
        alternates: {
            canonical: meta.link,
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: meta.link,
            locale: 'en-US',
            siteName,
            type: 'website',
        },
    };
}



export default async function LyricsPage(props: Props) {
    const searchParams = await props.searchParams;
    const reciters = await getRecitersData()
    return (
        <>
            <Filters reciters={reciters} Params={searchParams} />
            <LyricsList Params={searchParams} />
        </>
    )
}
