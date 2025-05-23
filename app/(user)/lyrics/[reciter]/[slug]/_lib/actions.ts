"use server";

import { z } from "zod";
import { ReportSchema } from "@/types/zod";
import { prisma } from "@/prisma";

export const createReport = async (lyricsId: string, userId: string, values: z.infer<typeof ReportSchema>) => {
    try {
        const validatedFields = ReportSchema.safeParse(values);
        if (!validatedFields.success) {
            return { success: false, message: "Invalid fields!", };
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get the count of reports created by the user today
        const reportCount = await prisma.report.count({
            where: {
                userId,
                createdAt: {
                    gte: startOfDay,
                },
            },
        });

        if (reportCount >= 5) {
            return { success: false, message: "You have reached the limit of 5 reports per day." };
        }


        await prisma.report.create({
            data: {
                ...values,
                lyricsId, userId
            }
        })

        return { success: true, message: "Report Created!" };
    } catch (error: any) {
        console.log(error.message)
        return { success: false, message: error.message };
    }
}


interface FavoriteProps {
    favorited: boolean;
    userId: string;
    lyricsId: string;

}

export const AddToFavorite = async ({ favorited, userId, lyricsId }: FavoriteProps) => {
    
    const favorite = !favorited;

    if (!userId || !lyricsId) {
        return favorite
    }


    try {
        if (favorited) {
            await prisma.userFavorite.delete({
                where: {
                    userId_lyricsId: { userId, lyricsId },
                },
            });
        } else {
            await prisma.userFavorite.create({
                data: { userId, lyricsId },
            });
        }

        return favorite;
    } catch (error) {
        console.error("Error in AddToFavorite:", error);
        throw error; // Ensure the error is propagated.
    }
};
