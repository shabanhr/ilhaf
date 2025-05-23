import { LyricsTable } from "./_components/lyrics-table"
import { getLyrics, getLyricsCardDetails } from "./_lib/queries";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import DetailCards from "../_components/DetailCards";
import { SearchParams } from "next/dist/server/request/search-params";

interface Props {
    searchParams: Promise<SearchParams>
}

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;

    const data = await getLyricsCardDetails();

    return (
        <div className="flex flex-col items-center justify-center gap-y-2 w-full">
            <DetailCards data={data} />
            <NuqsAdapter>
                <LyricsTable promise={getLyrics(searchParams)} />
            </NuqsAdapter>
        </div>
    )
}