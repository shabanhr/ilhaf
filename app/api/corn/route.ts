import { prisma } from "@/prisma";


export async function PUT() {
    try {
        const res = await prisma.lyrics.findFirst({
            where: {
                p: false,
                english: { not: null }
            }
        })

        if (res) {
            await prisma.lyrics.update({
                where: { id: res.id },
                data: {
                    p: true
                }
            })
        }

        return new Response(`Updated: ${res?.title}`, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return new Response(error, { status: 500 });
    }
}
