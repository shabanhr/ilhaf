import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BorderSeparator } from '@/components/sheard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function LyricsPageSkeleton() {
	return (
		<>
			<div className="my-2 h-[120px] w-full md:h-[90px]" />

			<BorderSeparator />

			<div className="grid grid-cols-1 md:grid-cols-[.62fr_.38fr]">
				<div className="flex w-full items-center border-b p-3 md:border-r md:border-b-0">
					<Skeleton className="h-[2.25rem] w-full md:w-2/3" />
				</div>
				<div className="grid w-full grid-cols-2 place-items-center py-2 px-1">
					<div className="w-full space-y-1 border-r p-2">
						<Skeleton className="h-[0.8rem] w-1/2" />
						<Skeleton className="h-[0.9rem] w-2/3" />
					</div>
					<div className="w-full space-y-1 p-2">
						<Skeleton className="h-[0.8rem] w-1/2" />
						<Skeleton className="h-[0.9rem] w-2/3" />
					</div>
				</div>
			</div>

			<BorderSeparator className="z-30" />
			<div className="grid grid-cols-1 md:grid-cols-[.62fr_.38fr]">
				<div className="relative w-full md:flex">
					<div className="hidden h-full w-max p-3 md:block">
						<div className="sticky top-16 flex flex-col gap-3">
							{Array.from({ length: 3 }).map((_, i) => (
								<Skeleton key={i} className="size-9" />
							))}
						</div>
					</div>
					<div className="w-full pb-5 md:border-x">
						<div className="bg-background/90 supports-[backdrop-filter]:bg-background/75 sticky top-14 z-20 flex w-full flex-col items-center justify-center border-b py-1 backdrop-blur-lg">
							<div className="flex w-full items-center justify-center gap-2 py-2">
								<Skeleton className="h-5 w-20 rounded-sm" />
								<Skeleton className="h-5 w-20 rounded-sm" />
							</div>
						</div>
						<div className="space-y-4 p-2">
							{Array.from({ length: 2 }).map((_, i) => (
								<div key={i} className="space-y-1.5">
									{Array.from({ length: 10 }).map((_, j) => (
										<Skeleton key={j} className={`h-5 ${j % 2 === 0 ? 'w-2/3' : 'w-1/2'}`} />
									))}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="w-full">
					<div className="md:sticky md:top-14">
						<AspectRatio ratio={16 / 9} className="relative size-full border-b px-2 md:px-0">
							<Skeleton className="aspect-video h-full w-full rounded-none" />
						</AspectRatio>
					</div>
				</div>
			</div>
		</>
	);
}
