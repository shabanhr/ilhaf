'use client';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { getRequestsData, RequestsDataItem } from '../_lib/queries';
import NoResults from '@/components/no-results';
import { Badge } from '@/components/ui/badge';
import { Button, ButtonWithLoading } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/lib/utils/date';
import { Skeleton } from '@/components/ui/skeleton';
import { getRequestBadgeVariant } from '@/lib/utils/requests';

const PAGE_SIZE = 4;

const getKey = (pageIndex: number, previousPageData: RequestsDataItem[] | null) => {
	if (previousPageData && previousPageData.length < PAGE_SIZE) return null; // reached the end
	return `requests-page-${pageIndex + 1}`;
};

const fetcher = (key: string) => {
	const page = parseInt(key.split('-').pop() || '1', 10);
	return getRequestsData(page, PAGE_SIZE);
};

export default function RequestList() {
	const { data, error, isLoading, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

	const items = data ? ([] as RequestsDataItem[]).concat(...data) : [];
	const isLoadingMore = isValidating && size > 0;
	const isReachingEnd = data && data[data.length - 1]?.length < PAGE_SIZE;

	if (isLoading && !data) {
		return (
			<div className="bp grid grid-cols-1 gap-2 md:grid-cols-2">
				<RequestItemSkeleton />
				<RequestItemSkeleton />
			</div>
		);
	}

	if (error) {
		return <div className="bp">Something went wrong!</div>;
	}

	return (
		<div className="bp">
			{items.length ? (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{items.map((item) => (
						<RequestItem key={item.id} item={item} />
					))}
					{!isReachingEnd && (
						<ButtonWithLoading
							isLoading={isLoadingMore}
							variant="outline"
							className="md:col-span-2"
							onClick={() => setSize(size + 1)}
						>
							{isLoadingMore ? 'Loading...' : 'Load More'}
						</ButtonWithLoading>
					)}
				</div>
			) : (
				<NoResults message="No Requests Found!" />
			)}
		</div>
	);
}

function RequestItem({ item }: { item: RequestsDataItem }) {
	return (
		<div className="rounded-lg border">
			<div className="p-3">
				<h2 className="truncate text-sm font-medium md:text-base">{item.title}</h2>
				<p className="text-muted-foreground text-xs">requested on {formatDate(item.createdAt)}</p>
			</div>
			<div className="bg-muted/25 flex items-center justify-between border-t p-1.5">
				<Button className="h-7 text-xs" variant="outline" asChild>
					<Link target="_blank" href={`https://www.youtube.com/watch?v=${item.video}`}>
						Video
						<ArrowUpRight />
					</Link>
				</Button>
				<div className="flex items-center gap-2">
					<Badge variant={getRequestBadgeVariant(item.status)}>{item.status}</Badge>
					{item.status === 'approved' && item.lyricsSlug && (
						<Button className="h-7 text-xs" variant="outline" asChild>
							<Link target="_blank" href={`/lyrics/${item.lyricsSlug}`}>
								View Live
								<ArrowUpRight />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

function RequestItemSkeleton() {
	return (
		<div className="rounded-lg border">
			<div className="space-y-1 p-3">
				<Skeleton className="h-[1.42rem] w-1/2 md:h-6" />
				<Skeleton className="h-3 w-1/4" />
			</div>
			<div className="bg-muted/30 flex items-center justify-between border-t p-2">
				<Skeleton className="h-7 w-22 border" />
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-20 border" />
				</div>
			</div>
		</div>
	);
}
