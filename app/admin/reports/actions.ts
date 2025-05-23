"use server";
import { prisma } from "@/prisma";
import { ReportsInTable } from "./ReportTable";
import { z } from "zod";
import { UpdateReportSchema } from "@/types/zod";
import { ReportStatus } from "@prisma/client";


export const getAllReports = async (status: ReportStatus): Promise<ReportsInTable[]> => {

    const reports = await prisma.report.findMany({
        where: {
            status
        },
        include: {
            lyrics: {
                include: {
                    reciter: true
                }
            },
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    const refinedUsers: ReportsInTable[] = reports.map(report => {
        return {
            id: report.id,
            user: {
                ...report.user,
            },
            slug: report.lyrics.slug,
            reciter: report.lyrics.reciter.slug,
            mistaken: report.mistaken,
            correct: report.correct,
            status: report.status,
            updatedAt: report.updatedAt,
            createdAt: report.createdAt,
        }
    });

    return refinedUsers;
}

export const UpdateReport = async (id: string, values: z.infer<typeof UpdateReportSchema>) => {

    try {
        const validatedFields = UpdateReportSchema.safeParse(values);
        if (!validatedFields.success) {
            return { success: false, message: "Invalid fields!", };
        }
        await prisma.report.update({
            where: { id },
            data: {
                ...values,
            }
        })

        return { success: true, message: "Report Updated!" };
    } catch (error: any) {
        console.log(error.message)
        return { success: false, message: error.message };
    }
}

export const deleteReportById = async (id: string) => {

    try {
        await prisma.report.delete({
            where: { id }
        })

        return { success: true, message: "Report Deleted!" };
    } catch (error: any) {
        console.log(error.message)
        return { success: false, message: error.message };
    }
}

