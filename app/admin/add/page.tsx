import { prisma } from "@/prisma";
import AddNewLyrics from "./Main";
import { dataType } from "./types";
import { LyricsTypes } from "@/config/data";
import { LyricsWithData } from "@/types";
import { Report } from "@prisma/client";
import { checkObjectExistsInR2 } from "@/lib/r2";


interface Props {
    searchParams: Promise<{
        id?: string
        reportId?: string
    }>
}

export default async function Add(props: Props) {
    const searchParams = await props.searchParams;
    let lyric: LyricsWithData | null = null;
    let report: Report | null = null;
    const { id, reportId } = searchParams;
    let imageQ = false;
    let audioQ = false;

    if (id) {
        lyric = await prisma.lyrics.findUnique({
            where: { id },
            include: { reciter: true, writers: true, topics: true, otherReciters: { include: { reciter: true } } }
        })
        imageQ = await checkObjectExistsInR2(`lyrics/${lyric?.slug}/image.webp`);

        // audioQ = await checkObjectExistsInR2(`lyrics/${slug}/audio.mp3`);

    }


    if (reportId) {
        report = await prisma.report.findUnique({ where: { id: reportId } })
    }


    const reciter: dataType[] = await prisma.reciter.findMany({
        orderBy: { lyrics: { _count: "desc" } }
    }).then(data => data.map(item => ({ id: item.id, name: item.name, slug: item.slug })));

    const writer: dataType[] = await prisma.writer.findMany({
        orderBy: { lyrics: { _count: "desc" } }
    }).then(data => data.map(item => ({ id: item.id, name: item.name })));

    const topics: dataType[] = await prisma.topic.findMany({
        orderBy: { lyrics: { _count: "desc" } }
    }).then(data => data.map(item => ({ id: item.id, name: item.name })));


    const data = { types: LyricsTypes, reciters: reciter, writers: writer, topics }

    return <AddNewLyrics
        lyric={lyric}
        imageQ={imageQ}
        audioQ={audioQ}
        data={data}
        report={report}
    />
}