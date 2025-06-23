"use server";

import { db } from "@/db";
import { getCurrentUser } from "@/lib/auth";

export const getUserByEmail = async (email: string) => {
    const user = await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });
    return user;
}

export const getUserById = async (id: string) => {
    const user = await db.query.user.findFirst({
        where: (users, { eq }) => eq(users.id, id),
    });
    return user;
}


export const getClientUser = async () => {
    return await getCurrentUser();
}
