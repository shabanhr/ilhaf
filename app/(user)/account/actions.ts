"use server";
import { prisma } from "@/prisma";
import { UpdateSchema } from "@/types/zod";
import { z } from "zod";

export const updateUserById = async (id: string, values: z.infer<typeof UpdateSchema>) => {
    const validatedFields = UpdateSchema.safeParse(values);
    try {
        if (!validatedFields.success) {
            return { success: false, message: "Invalid fields!", };
        }
        await prisma.user.update({
            where: { id },
            data: { name: values.name }
        })

        return { success: true, message: "Profile Updated!" };
    } catch (error: any) {
        console.log(error.message)
        return { success: false, message: error.message };
    }
}

export const getSocialAccountsById = async (id: string) => {

    const account = await prisma.account.findMany({
        where: { userId: id },
        select: {
            provider: true

        }
    })
    
    const providerNames = account.map(item => item.provider);
    return providerNames as string[];
}