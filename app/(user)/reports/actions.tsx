"use server";
import { prisma } from '@/prisma'
import React from 'react'
import ReportCard from './ReportCard';

export const getData = async ({ page = 1, userId }: { page: number, userId: string }) => {
    const skip = (page - 1) * 8;
    const data = await prisma.report.findMany({
        where: { userId },
        include: {
            lyrics: {
                include: {
                    reciter: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip, take: 8
    })
    const count = await prisma.report.count({
        where: { userId },
    })

    return {
        data: data.map((item, i) => (
            <ReportCard key={i} item={item} />
        )),
        count
    }
}