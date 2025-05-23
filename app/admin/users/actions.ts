"use server";
import { UserInTable } from "./UserTable";
import { prisma } from "@/prisma";
import { drive } from "@/config";
import { revalidatePath } from "next/cache";
import { deleteFileFromR2 } from "@/lib/r2";

export const getAllUsers = async (query?: string): Promise<UserInTable[]> => {

    const users = await prisma.user.findMany({
        where: query ? {
            name: {
                contains: query,
            },
        } : undefined,
        orderBy: {
            createdAt: "desc"
        }
    });
    const refinedUsers: UserInTable[] = users.map(user => {
        return {
            id: user.id,
            image: user.image,
            name: user.name,
            email: user.email,
            date: user.createdAt,
            role: user.role,
        }
    });

    return refinedUsers;
}

export const getCardDetails = async () => {
    const newDate = new Date();
    const twentyEightDaysAgo = newDate.setDate(newDate.getDate() - 28);
    const sevenDaysAgo = newDate.setDate(newDate.getDate() - 7);

    const Lastx28xDays = await prisma.user.count({
        where: {
            createdAt: {
                gte: new Date(twentyEightDaysAgo),
            },
        },
    });

    const Lastx7xDays = await prisma.user.count({
        where: {
            createdAt: {
                gte: new Date(sevenDaysAgo),
            },
        },
    });

    const TotalxUsers = await prisma.user.count();

    return { TotalxUsers, Lastx28xDays, Lastx7xDays };
}


export const deleteUserById = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: { id },
    })

    if (!user) {
        throw new Error('User Not Found For Delete');
    }
    if (user.image?.startsWith(`${drive}/avatar`)) {
        const image = user.image.replace(`${drive}/`, "");
        await deleteFileFromR2(image)
    }
    await prisma.user.delete({
        where: { id },
    })

    revalidatePath("/admin");
    return true;
}
