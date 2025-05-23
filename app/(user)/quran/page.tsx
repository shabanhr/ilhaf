import { siteName } from '@/config';
import { capitalize } from '@/lib/utils';
import React from 'react'
import { chapters } from './data';
import { QuranHero } from './comps/hero';
import { ChapterList } from './comps/chapterList';

interface Props {
    searchParams: Promise<any>
}

export async function generateMetadata(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams?.type;

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



export default async function QuranPage({ searchParams }: Props) {
    return (
        <>
            <QuranHero />
            <ChapterList />
        </>
    )
}
