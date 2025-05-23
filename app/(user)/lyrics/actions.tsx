"use server";

import { prisma } from '@/prisma'


export const getRecitersData = async () => {
    const reciters = await prisma.reciter.findMany({
        include: {
            _count: {
                select: {
                    lyrics: {
                        where: {
                            p: true
                        }
                    },
                },
            }
        },
        orderBy: {
            lyrics: {
                _count: 'desc'
            }
        }
    });

    const filteredReciters = reciters
        .filter(item => item._count.lyrics >= 2) // filter reciters with at least 2 published lyrics
        .map(item => ({ id: item.slug, name: item.name }));

    return filteredReciters;
}
