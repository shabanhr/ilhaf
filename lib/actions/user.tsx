"use server";

import { currentUser } from "@/config/auth";
import { prisma } from "@/prisma";

export const getUserByEmail = async (email: string) => {
    const user = prisma.user.findUnique({
        where: { email }
    })
    return user;
}


export const getClientUser = async () => {
    return await currentUser();
}
