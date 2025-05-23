"use server";
import { prisma } from "@/prisma";
import { deleteFileFromR2 } from "@/lib/r2";
import { revalidatePath } from "next/cache";

export const deleteLyricsById = async (id: string) => {

    const lyrics = await prisma.lyrics.delete({
        where: { id },
    })

    if (!lyrics) {
        throw new Error('Lyrics Not Found For Delete');
    }

    await deleteFileFromR2(`lyrics/${lyrics.slug}/image.webp`)
    await deleteFileFromR2(`lyrics/${lyrics.slug}/blur-placeholder.webp`)
    await deleteFileFromR2(`lyrics/${lyrics.slug}/audio.mp3`)

    revalidatePath("/admin/lyrics")
    return true;
}