"use server";

import { AddLyricsSchema, NewLyricsType } from "./types";
import { prisma } from "@/prisma";
import YouTubeVideoId from 'get-youtube-id';
import { ModelName, CreateInputType } from './types';
import { revalidatePath } from "next/cache";
import axios from "axios";
import { uploadFileToR2 } from "@/lib/r2";


const connectDisconnectRelations = (currentIds: string[], newIds: string[]) => {
    const disconnect = currentIds.filter(id => !newIds.includes(id)).map(id => ({ id }));
    const connect = newIds.filter(id => !currentIds.includes(id)).map(id => ({ id }));
    return { disconnect, connect };
};

const updateLyrics = async (id: string, values: NewLyricsType) => {
    const validatedFields = AddLyricsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Invalid fields!" };
    }
    const { writers, otherReciters, topics } = values;

    const existingLyrics = await prisma.lyrics.findUnique({
        where: { id },
        select: {
            writers: true,
            otherReciters: true,
            topics: true,
        },
    });

    if (!existingLyrics) {
        return { success: false, message: "Lyrics not found!" };
    }

    const currentWriterIds = existingLyrics.writers.map(writer => writer.id);
    const currentReciterIds = existingLyrics.otherReciters.map(reciter => reciter.id);
    const currentTopicIds = existingLyrics.topics.map(topic => topic.id);

    const writersChanges = connectDisconnectRelations(currentWriterIds, writers);
    const recitersChanges = connectDisconnectRelations(currentReciterIds, otherReciters);
    const topicsChanges = connectDisconnectRelations(currentTopicIds, topics);

    await prisma.lyrics.update({
        where: { id },
        data: {
            ...values,
            title: values.title.trim(),
            writers: writersChanges,
            otherReciters: {
                deleteMany: {},
                create: otherReciters.map(reciterId => ({ reciter: { connect: { id: reciterId } } })),
            },
            topics: topicsChanges,
        },
    });

    return { success: true, message: "Lyrics Updated" };
};


export const AddNewLyrics = async (values: NewLyricsType, id?: string):
    Promise<{ success: boolean, message: string, id?: string }> => {

    try {
        if (id) {
            return updateLyrics(id, values)
        } else {
            const lyricsExists = await prisma.lyrics.findUnique({
                where: { slug: values.slug }
            });
            if (lyricsExists) {
                return { success: false, message: "Lyrics already exists!" };
            }
            const newLyrics = await prisma.lyrics.create({
                data: {
                    slug: values.slug,
                    title: values.title.trim(),
                    type: "NOHA",
                    reciterId: "clwvp94gf00032w236mr4v4s8",
                    p: values.p,
                }
            });

            return { success: true, message: "Lyrics Added!", id: newLyrics.id };
        }


    } catch (error: any) {
        console.error(error);
        return { success: false, message: `Something went wrong: ${error.message}` };
    }
};

export const getVideoData = async (videoUrl: string) => {
    try {
        const videoId = YouTubeVideoId(videoUrl) as string;

        const url = `https://yt-api.p.rapidapi.com/video/info?id=${videoId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b0e5892221msh00c1065eee6f480p178acfjsna850f9150860',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };

        const videoresponse = await fetch(url, options);
        if (!videoresponse.ok) {
            return { success: false, message: `Ivalid URL or Yt Res is not Ok` };
        }

        const result: any = await videoresponse.json();


        return {
            success: true,
            message: `Data Fetched`,
            thumbnails: result.thumbnail,
            uploadDate: result.publishDate,
            recit: result.channelTitle.toLowerCase(),
            title: result.title,
            videoId,
        };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: `Something went wrong ${error.message}` };
    }

}


interface UploadAudioProps {
    slug: string;
    videoId?: string,
    mp3Url?: string
}

export const UploadAudio = async ({ mp3Url, videoId, slug }: UploadAudioProps): Promise<{ success: boolean, message: string }> => {
    try {
        let newMp3Url = mp3Url;

        if (videoId) {
            const apiKeys = [
                'b0e5892221msh00c1065eee6f480p178acfjsna850f9150860',
                '0338ddede6msh16cc2fd87cea086p12d3f5jsn37cfb9c317b6',
                '6891b0d662mshcbec42b2f8bdb18p1bec7ejsnd792ca2175a7'
            ];

            let rapidResponse;

            for (const apiKey of apiKeys) {
                rapidResponse = await axios.request({
                    method: 'GET',
                    url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
                    params: { url: `https://www.youtube.com/watch?v=${videoId}` },
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'youtube-mp3-downloader2.p.rapidapi.com'
                    }
                });

                if (rapidResponse.status === 200) break; // Exit loop on successful response
            }

            if (!rapidResponse || rapidResponse.status !== 200) {
                return { success: false, message: 'Failed to retrieve MP3 URL from API.' };
            }

            const rapidResult = rapidResponse.data;
            newMp3Url = rapidResult.dlink;
        }

        if (!newMp3Url) {
            return { success: false, message: "Failed to retrieve or set MP3 URL." };
        }

        const audioRes = await axios.get(newMp3Url, { responseType: 'arraybuffer' });
        await uploadFileToR2({
            Key: `lyrics/${slug}/audio.mp3`,
            Body: audioRes.data,
            ContentType: "audio/mp3"
        });

        return { success: true, message: 'Audio uploaded successfully.' };
    } catch (error: any) {
        return { success: false, message: `Error uploading audio: ${error.message}` };
    }
};




interface AddUpdateItemProps {
    id?: string;
    model: ModelName;
    values: CreateInputType[ModelName]
}

export const AddUpdateItem = async ({ id, model, values }: AddUpdateItemProps) => {
    let res = { success: true, message: "Added" };

    if (model === "reciter") {
        let NewValues: any = values;
        const slug: string = NewValues.name.split(" ").join("-").toLowerCase() || "";
        NewValues = { ...values, slug }
        if (id) {
            await (prisma[model] as any).update({
                where: { id },
                data: NewValues,
            });
            res.message = "Updated"
        } else {
            await (prisma[model] as any).create({
                data: NewValues,
            });
        }

    } else {
        if (id) {
            await (prisma[model] as any).update({
                where: { id },
                data: values,
            });
            res.message = "Updated"
        } else {
            await (prisma[model] as any).create({
                data: values,
            });
        }
    }

    revalidatePath("/admin/add")
    return res;
};

export const deleteItemById = async (model: ModelName, id: string) => {
    await (prisma[model] as any).delete({
        where: { id },
    });

    revalidatePath("/admin/add")
    return { success: true, message: "Deleted" };
};