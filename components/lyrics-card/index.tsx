import { Badge } from '@/components/ui/badge';
import { CardType } from '@/types';
import Link from 'next/link';
import { CustomImage } from '../CustomImage';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getLyricsURL } from '@/lib/utils';
import { differenceInDays, parseISO } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

interface Props {
	data: CardType;
	index?: number;
}

export const LyricsCard = ({ data }: Props) => {
	const {
		title,
		slug,
		reciter: { slug: reciter },
		dop,
	} = data;

	const isNew = differenceInDays(new Date(), parseISO(dop.toISOString())) <= 3;

	return (
		<Link
			href={getLyricsURL(reciter, slug)}
			className="relative mb-2 flex flex-col gap-2 rounded-xl border p-2 duration-200 hover:shadow-lg dark:hover:shadow-[#555]"
		>
			{isNew && (
				<Badge className="absolute top-2 left-2 z-10 rounded-md" variant="default">
					New
				</Badge>
			)}
			<CustomImage alt={title} slug={slug} />
			<div className="p-2">
				<div className="w-full max-w-[320px] truncate text-sm font-bold md:text-lg">{title}</div>
			</div>
		</Link>
	);
};

export const LyricsCardSkeleton = () => {
	return (
		<div className="mb-2 flex flex-col gap-2 rounded-xl border p-2">
			<AspectRatio ratio={16 / 9} className="relative">
				<Skeleton className="aspect-video h-full w-full" />
			</AspectRatio>
			<div className="p-2">
				<Skeleton className="h-5 w-48 md:h-7 md:w-32" />
			</div>
		</div>
	);
};
