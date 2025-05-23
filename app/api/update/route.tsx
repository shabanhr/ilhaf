import { prisma } from "@/prisma";

export async function POST(req: Request) {
    try {
        const newTopicId = "clxzz7duh009m4vesiwcngavi";
        const oldTopicIds = [
            "clx635c9j001mt4kilu2xo52j",
        ];

        // Fetch all lyrics with topics containing specific IDs
        const lyrics = await prisma.lyrics.findMany({
            where: {
                topics: {
                    some: {
                        id: { in: oldTopicIds } // Match topics with IDs in the oldTopicIds array
                    }
                }
            },
            select: {
                id: true,
                title: true,
                topics: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // Ensure there are lyrics to process
        if (!lyrics || lyrics.length === 0) {
            return new Response(
                JSON.stringify({ message: "No lyrics found with the specified topics." }),
                { status: 404 }
            );
        }

        // Update lyrics by disconnecting old topics and connecting the new topic
        const updatedLyrics = [];
        for (const lyric of lyrics) {
            const disconnectIds = lyric.topics
                .filter(topic => oldTopicIds.includes(topic.id))
                .map(topic => ({ id: topic.id }));

            const updatedLyric = await prisma.lyrics.update({
                where: { id: lyric.id },
                data: {
                    topics: {
                        disconnect: disconnectIds, // Disconnect old topics
                        connect: { id: newTopicId } // Connect new topic
                    }
                },
                select: {
                    id: true,
                    title: true,
                    topics: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            updatedLyrics.push(updatedLyric);
        }

        return new Response(
            JSON.stringify({
                message: "Success! Topics updated for lyrics.",
                updatedLyrics
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error during topic update:", error);
        return new Response(
            JSON.stringify({
                message: "Something went wrong during the update process.",
                error: error.message
            }),
            { status: 400 }
        );
    }
}
