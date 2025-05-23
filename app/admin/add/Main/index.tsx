"use client"
import { useEffect, useState, ChangeEvent, DragEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/Spinner"
import Link from "next/link"
import { dataType, AddLyricsSchema, NewLyricsType } from "../types"
import { Report } from "@prisma/client"
import { AddNewLyrics } from "../actions"
import { LyricsWithData } from "@/types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { LyricsType } from "@prisma/client"
import { UploadAudio, getVideoData } from "../actions"
import { Label } from "@/components/ui/label"
import DeleteComp from "./DeleteComp"
import LyricsAndReport from "./LyricsAndReport"
import LyricsInputs from "./LyricsInputs"
import { Upload } from "lucide-react"
import { capitalizeText, getAudioURL, getImageURL, slugify } from "@/lib/utils"
import { deleteFileFromR2 } from "@/lib/r2"
import Uploader from "./uploader"
import { getErrorMessage } from "@/lib/handle-error"

interface Props {
    lyric: LyricsWithData | null;
    data: {
        topics: dataType[];
        types: dataType[];
        reciters: dataType[];
        writers: dataType[];
    };
    imageQ: Boolean;
    audioQ: Boolean;
    report: Report | null
}


type TypeProps = {
    v: "image" | "audio"
}

export default function Main({ lyric, data, imageQ, audioQ, report }: Props) {
    const InitSlug = lyric?.slug;
    const [loading, setLoading] = useState<string[]>([]);
    const [available, setAvailable] = useState<boolean | null>(lyric ? true : null);
    const [mp3Url, setMp3Url] = useState<string>(lyric && lyric.video ? `https://youtu.be/${lyric.video}` : "");
    const [photo, setPhoto] = useState<string | null>(InitSlug && imageQ ? getImageURL(InitSlug) : null);
    const [audio, setAudio] = useState<string | null>(InitSlug && audioQ ? getAudioURL(InitSlug) : null);

    const router = useRouter();

    const { reciters, types } = data;


    const form = useForm<NewLyricsType>({
        resolver: zodResolver(AddLyricsSchema), defaultValues: {
            title: lyric?.title || "",
            slug: lyric?.slug || "",
            reciterId: lyric?.reciterId,
            type: lyric?.type,
            english: lyric?.english ? lyric?.english : undefined,
            urdu: lyric?.urdu ? lyric?.urdu : undefined,
            video: lyric?.video ? lyric?.video : undefined,
            dop: lyric?.dop,
            topics: lyric?.topics.map(topic => topic.id),
            writers: lyric?.writers.map(item => item.id),
            otherReciters: lyric?.otherReciters.map(item => item.reciter.id),
            p: lyric?.p || false,
        }
    })

    const { watch, getValues, setValue, formState: { isSubmitting } } = form;

    const slug = watch("slug");

    const StartLoading = (value: string) => {
        setLoading((prevLoading) => [...prevLoading, value]);
    };
    const endLoading = (value: string) => {
        setLoading((prevLoading) => prevLoading.filter((item) => item !== value));
    };

    const handleDelete = async ({ v }: TypeProps) => {
        StartLoading(v)
        if (v === "image") {
            const res = await deleteFileFromR2(`lyrics/${slug}/image.webp`);
            await deleteFileFromR2(`lyrics/${slug}/blur-placeholder.webp`);
            toast(res.message)
            setPhoto(null)
        } else {
            const res = await deleteFileFromR2(`lyrics/${slug}/audio.mp3`);
            toast(res.message)
            setAudio(null)
        }
        endLoading(v)
    }

    const validateAndUpload = async (files: File[]) => {
        const file = files[0];
        const extensions = ["jpeg", "jpg", "png", "webp", "PNG"];
        const imgExt = file.name.substring(file.name.lastIndexOf('.') + 1);
        const validExt = extensions.includes(imgExt);

        if (!validExt) {
            return toast.error("Selected file is not an image");
        } else if (file.size / (1024 * 1024) >= 10) {
            return toast.error("Selected Image is too big");
        } else {
            UploadImage({ file })
        }
    };

    const UploadImage = async ({ url, file }: { url?: string, file?: File }) => {
        StartLoading('image')
        let formData = new FormData();
        formData.set('slug', slug);
        if (file) {
            formData.set('file', file);
        } else if (url) {
            formData.set('url', url);
        }
        const response = await fetch('/api/upload', {
            method: 'POST',
            cache: 'no-store',
            body: formData,
        });
        if (response.ok) {
            setPhoto(getImageURL(slug))
            endLoading('image')
        } else {
            endLoading('image')
            toast.error(`Some think is wrong! ${JSON.stringify(await response.json())}`)
        }
    }

    const Audio = async ({ videoId, mp3Url }: { videoId?: string; mp3Url?: string }) => {
        StartLoading('audio')
        try {
            const res = await UploadAudio({ videoId, mp3Url, slug });
            const { success, message } = res;

            if (success) {
                setAudio(getAudioURL(slug))
            } else {
                toast.error(`Something went wrong ${message}`)
            }
        } catch (error: any) {
            toast(`Something went wrong ${error.message}`)
        } finally {
            endLoading('audio')
        }

    }

    const fetchData = async (fetchType?: "image" | "audio" | "data") => {
        const videoField = "video";

        StartLoading(fetchType || "fetching");

        let videoURL = getValues(videoField);
        if (videoURL.length === 11) {
            videoURL = `https://youtu.be/${videoURL}`;
        }
        try {
            const response = await getVideoData(videoURL);


            if (!response.success) {
                toast.error(response.message);
                return;
            }
            const { thumbnails, uploadDate, recit, title, videoId } = response;

            if (fetchType === "audio") {
                return Audio({ videoId });
            }

            if (fetchType === "image") {
                let thumbUrl = thumbnails[thumbnails.length - 1].url;
                if (thumbUrl.includes("?")) {
                    thumbUrl = thumbUrl.split("?")[0]
                }
                return UploadImage({ url: thumbUrl });
            }

            if (fetchType === "data" || !fetchType) {
                if (videoId) {
                    setValue(videoField, videoId);
                }
                setValue("dop", new Date(uploadDate));

                if (!lyric) {
                    const reciterId = reciters.find(item => recit.toLowerCase().includes(item.name.toLowerCase()))?.id;
                    if (reciterId) {
                        setValue("reciterId", reciterId);
                    }

                    const matchingType = types.find(type => title.toLowerCase().includes(type.name.toLowerCase()));
                    if (matchingType) {
                        form.setValue("type", matchingType.id as LyricsType);
                    }
                }

                if (!fetchType) {
                    Audio({ videoId });
                    UploadImage({ url: thumbnails[thumbnails.length - 1].url });
                }
                endLoading(fetchType || 'data');
            }

        } catch (error: any) {
            toast.error(`Something went wrong: ${error.message}`);
        } finally {
            endLoading('fetching');
        }
    };


    useEffect(() => {
        const title = getValues("title");
        if (title && title.length) {
            setValue("slug", slugify(title))
        }
        if (available === false) {
            setAvailable(null)
        }
    }, [watch("title")])

    const onSubmit = async (data: NewLyricsType) => {
        try {
            const { success, message } = await AddNewLyrics(data, lyric?.id)
            if (success) {
                toast(<div>
                    {message}
                    <Link href={`/lyrics/${reciters.find(item => item.id === data.reciterId)?.slug}/${data.slug}`} className="underline a ml-2">View here</Link>
                </div>)
                router.push("/admin/lyrics")
            } else {
                toast.error("Something Went Wrong!")
            }
        } catch (error: any) {
            toast(`Something went wrong ${error.message}`)
        }
    }

    const checkSlug = async () => {
        StartLoading('checking')
        try {
            const title = getValues("title");
            setValue("slug", slugify(title))
            setValue("title", capitalizeText(title));
            const values = form.getValues();
            const { success, id } = await AddNewLyrics(values);

            if (success && id) {
                if (lyric === null) {
                    router.push(`/admin/add?id=${id}`);
                    setAvailable(true)
                }
            } else {
                setAvailable(false)
            }
        } catch (error: any) {
            toast(`Something went wrong ${getErrorMessage(error)}`)
        } finally {
            endLoading('checking');
        }
    }

    const IsDisabled = isSubmitting || loading.includes("fetching") || !available;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 space-y-4">

                <div className="flex items-center justify-center gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={lyric ? true : false || available || loading.includes("checking")}
                                        placeholder="Enter Title"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setValue("title", value)
                                            setValue("slug", value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>Slug: {slug}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        onClick={checkSlug}
                        disabled={slug.length < 3 || loading.includes("checking") || available === true}
                        icon={<Spinner active={loading.includes("checking")} />}
                    >

                        {available === null ? "Check" : (
                            available ? "Available" : "Not Available"
                        )}

                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="bg-accent rounded-lg aspect-video h-full w-full max-w-[384px]">
                        {photo ?
                            (
                                <div className="relative">
                                    <div className="absolute top-2 right-2">
                                        <DeleteComp handleDelete={handleDelete} v="image" />
                                    </div>
                                    <Image src={photo} width={384} height={188} alt="a" className="rounded-md" />
                                </div>
                            )
                            :
                            (
                                <Uploader
                                    id="main-image"
                                    IsDisabled={isSubmitting}
                                    onUpload={validateAndUpload}
                                />

                            )
                        }
                    </div>
                    <div className="w-full h-full space-y-4">

                        <div className="flex flex-col items-center justify-center gap-2">
                            <FormField
                                control={form.control}
                                name="video"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Youtube URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={IsDisabled || !available}
                                                placeholder="Enter Video URL" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-center w-full gap-2">
                                <Button
                                    type="button"
                                    onClick={() => fetchData("image")}
                                    disabled={IsDisabled || loading.includes("image")}
                                    icon={<Spinner active={loading.includes("image")} />}
                                    className="w-full"
                                >
                                    Image
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => fetchData("audio")}
                                    disabled={IsDisabled || loading.includes("audio")}
                                    icon={<Spinner active={loading.includes("audio")} />}
                                    className="w-full"
                                >
                                    Audio
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => fetchData("data")}
                                    disabled={IsDisabled || loading.includes("data")}
                                    icon={<Spinner active={loading.includes("data")} />}
                                    className="w-full"
                                >
                                    Data
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => fetchData()}
                                    disabled={IsDisabled || loading.length > 0}
                                    icon={<Spinner active={loading.includes("fetching")} />}
                                    className="w-full"
                                >
                                    All
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            {loading.includes("audio") &&
                                <div className="absolute h-full z-10 transition-all duration-100 w-full flex items-center justify-center bg-accent/50">
                                    <Spinner invert active />
                                </div>}
                            {audio && <div className="flex items-center justify-center gap-x-2">
                                <audio
                                    src={audio}
                                    controls
                                    className='w-full'
                                />
                                <DeleteComp handleDelete={handleDelete} v="audio" />
                            </div>
                            }
                            <div className="w-full flex items-center justify-center gap-2">
                                <div className="w-full flex flex-col gap-y-2">
                                    <Label htmlFor="mp3Url">MP3 Url</Label>
                                    <Input
                                        placeholder="MP3 Url (optional)"
                                        id="mp3Url"
                                        className="w-full"
                                        value={mp3Url}
                                        disabled={IsDisabled || loading.includes("audio")}
                                        onChange={e => setMp3Url(e.target.value)}
                                    />
                                </div>
                                <Button
                                    className="mt-auto"
                                    disabled={IsDisabled || loading.includes("audio")}
                                    onClick={() => Audio({ mp3Url })}
                                >
                                    Genrate
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <LyricsInputs
                    form={form}
                    IsDisabled={IsDisabled}
                    data={data}
                />

                <LyricsAndReport
                    form={form}
                    IsDisabled={IsDisabled}
                    report={report}
                    loading={loading.includes("report")}
                    StartLoading={StartLoading}
                    endLoading={endLoading}
                />

                <div className="flex justify-between gap-2 w-full mt-10">
                    <FormField
                        control={form.control}
                        name="p"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        disabled={IsDisabled}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Published
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="full" className="max-w-sm"
                        disabled={IsDisabled}
                        icon={<Spinner active={isSubmitting} />
                        }
                    >
                        {lyric ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>

        </Form>
    )
}
