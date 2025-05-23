"use server";

import { LYRICS_PER_PAGE } from "@/config";
import { prisma } from "@/prisma";
import { LyricsType } from "@prisma/client";

interface Props {
    reciter: string;
    slug: string;
    userId?: string;
}

export const GetLyricsData = async ({ reciter, slug, userId }: Props) => {
    const data = await prisma.lyrics.findUnique({
        where: { slug, reciter: { slug: reciter } },
        include: {
            otherReciters: {
                include: {
                    reciter: true
                }
            },
            reciter: true,
            writers: true,
            topics: true,
        }
    });
    if (!data) return null;

    let favorited: boolean = false;

    if (userId) {
        const existingFavorite = await prisma.userFavorite.findUnique({
            where: {
                userId_lyricsId: {
                    userId,
                    lyricsId: data.id,
                },
            },
        });
        if (existingFavorite) {
            favorited = true;
        }
    }

    return { data, favorited }
};

interface SimilarLyricsProps {
    type: LyricsType;
    slug: string;
    topics: string[];
    page?: number;
    take?: number;
}


export const GetSimilarLyrics = async ({ slug, type, topics, page = 1, take = LYRICS_PER_PAGE }: SimilarLyricsProps) => {
    const skip = (page - 1) * take;

    const where = {
        NOT: { slug },
        topics: topics.length > 0 ? {
            some: {
                id: {
                    in: topics
                }
            }
        } : undefined,
        type,
        p: true
    }

    const data = await prisma.lyrics.findMany({
        where,
        include: {
            reciter: {
                select: {
                    slug: true
                }
            }
        },
        take, skip,
        orderBy: {
            dop: "desc"
        }
    });

    const count = await prisma.lyrics.count({ where });

    return { data, count };
};