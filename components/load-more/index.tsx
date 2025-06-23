'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'motion/react';
import { CardType } from '@/types';
import { LYRICS_PER_PAGE } from '@/config';
import { LyricsCard, LyricsCardSkeleton } from '../lyrics-card';
import { useMediaQuery } from '@/hooks/use-media-query';

interface Props {
	count: number;
	Func: (params: any) => Promise<any>;
	perPage?: number;
	className?: string;
	additionalProps?: any;
}

export const LoadMore = ({ count, Func, perPage = LYRICS_PER_PAGE, className, additionalProps }: Props) => {
	const [data, setData] = useState<CardType[]>([]);
	const ref = useRef(null);
	const isInView = useInView(ref);
	const loadedItems = data.length + perPage;
	const remainingItems = count - loadedItems;

	useEffect(() => {
		if (isInView && remainingItems > 0) {
			const page = Math.ceil(loadedItems / perPage) + 1;

			Func({ page: page, ...additionalProps }).then((res) => {
				setData((prevData) => [...prevData, ...res.data]);
			});
		}
	}, [isInView, additionalProps]);

	useEffect(() => {
		setData([]);
	}, [additionalProps]);

	const { isDesktop, isTablet } = useMediaQuery();

	const devicesCount = isDesktop ? 3 : isTablet ? 2 : 1;
	const skeletonCount = Math.min(devicesCount, remainingItems);

	return (
		<section className="relative w-full overflow-y-auto">
			<div className={cn('grid w-full gap-x-3 md:grid-cols-2 lg:grid-cols-3', className)}>
				{data.map((item, i) => (
					<LyricsCard key={i} data={item} index={i} />
				))}
			</div>
			{loadedItems < count && (
				<div ref={ref} className="grid w-full gap-x-3 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: skeletonCount }).map((_, i) => (
						<LyricsCardSkeleton key={i} />
					))}
				</div>
			)}
		</section>
	);
};
