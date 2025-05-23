"use server";

import { prisma } from "@/prisma";
import { LyricsType } from "@prisma/client";
import { slugify } from "../utils";
import { LYRICS_PER_PAGE } from "@/config";


interface getLyricDataProps {
    page: number;
    reciter?: string;
    type?: LyricsType;
    query?: string;
    take?: number;
}

export const getLyricsData = async ({ page = 1, reciter, type, query, take = LYRICS_PER_PAGE }: getLyricDataProps) => {
    const skip = (page - 1) * take;

    const where = {
        p: true,
        slug: query ? {
            contains: slugify(query)
        } : undefined,
        OR: reciter ? [
            { reciter: { slug: reciter } },
            { otherReciters: { some: { reciter: { slug: reciter } } } }
        ] : undefined,
        type: type ? type : undefined
    }

    const data = await prisma.lyrics.findMany({
        where,
        select: {
            title: true,
            slug: true,
            reciter: true,
            dop: true
        },
        orderBy: {
            dop: "desc"
        },
        skip, take
    });

    const count = await prisma.lyrics.count({ where });

    return { data, count };
}

export const getFavLyrics = async ({ page = 1, userId }: { page: number, userId: string }) => {
    const skip = (page - 1) * LYRICS_PER_PAGE;

    const data = await prisma.userFavorite.findMany({
        where: { userId },
        select: {
            lyrics: {
                select: {
                    title: true,
                    slug: true,
                    reciter: true,
                    dop: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip, take: 12
    })

    const count = await prisma.userFavorite.count({
        where: { userId },
    })

    return { data: data.map(item => item.lyrics), count }
}