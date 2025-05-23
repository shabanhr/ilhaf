import { Badge } from "@/components/ui/badge";
import { CardType } from "@/types";
import Link from "next/link";
import { CustomImage } from "../CustomImage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getLyricsURL } from "@/lib/utils";
import { differenceInDays, parseISO } from "date-fns";
import { Skeleton } from "../ui/skeleton";

interface Props {
    data: CardType;
    index?: number;
}

export const LyricsCard = ({ data }: Props) => {
    const { title, slug, reciter: { slug: reciter }, dop } = data;

    const isNew = differenceInDays(new Date(), parseISO(dop.toISOString())) <= 3;

    return (
        <Link href={getLyricsURL(reciter, slug)} className="relative border rounded-xl flex flex-col gap-2 mb-2 p-2 hover:shadow-lg dark:hover:shadow-[#555] duration-200">
            {isNew &&
                <Badge className="z-10 rounded-md absolute left-2 top-2"
                    variant="default">
                    New
                </Badge>
            }
            <CustomImage
                alt={title}
                slug={slug}
            />
            <div className="p-2">
                <div className="w-full max-w-[320px] text-sm md:text-lg truncate font-bold">
                    {title}
                </div>
            </div>
        </Link>
    )
}

export const LyricsCardSkeleton = () => {

    return (
        <div className="border rounded-xl flex flex-col gap-2 mb-2 p-2">
            <AspectRatio ratio={16 / 9} className="relative">
                <Skeleton className="w-full h-full aspect-video" />
            </AspectRatio>
            <div className="p-2">
                <Skeleton className="w-48 md:w-32 h-5 md:h-7" />
            </div>
        </div>
    )
}