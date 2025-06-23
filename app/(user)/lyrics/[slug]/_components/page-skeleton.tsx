import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BorderSeparator } from '@/components/sheard';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function LyricsPageSkeleton() {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-[.60fr_.40fr] lg:grid-cols-[.62fr_.38fr]">
				<div className="flex w-full items-center border-b p-4 md:border-r md:border-b-0">
					<Skeleton className="h-[1.5rem] w-1/2 md:h-[1.875em] lg:h-[2.25rem]" />
				</div>
				<div className="grid w-full grid-cols-2 place-items-center gap-2 p-4">
					<div className="w-full space-y-1">
						<Skeleton className="h-[0.8rem] w-1/2" />
						<Skeleton className="h-[0.9rem] w-2/3" />
					</div>
					<div className="w-full space-y-1">
						<Skeleton className="h-[0.8rem] w-1/2" />
						<Skeleton className="h-[0.9rem] w-2/3" />
					</div>
				</div>
			</div>

			<BorderSeparator className="z-30" />
			<div className="grid grid-cols-1 md:grid-cols-[.60fr_.40fr] lg:grid-cols-[.62fr_.38fr]">
				<div className="relative w-full md:grid md:grid-cols-12">
					<div
						style={{ width: '50px' }}
						className="bg-card z-30 mx-1 mt-11 hidden h-max w-full space-y-1 rounded-sm border p-2 md:col-span-1 md:block"
					>
						<Skeleton className="size-6 rounded-sm" />
					</div>
					<div className="pb-5 md:col-span-11 md:border-x">
						<div className="bg-background/90 supports-[backdrop-filter]:bg-background/75 drop-shadow-background sticky top-14 z-20 flex w-full flex-col items-center justify-center border-b py-1 drop-shadow-xl backdrop-blur-lg">
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
					<div className="md:sticky md:top-16">
						<AspectRatio ratio={16 / 9} className="relative size-full border-b px-2 md:px-0">
							<Skeleton className="aspect-video h-full w-full rounded-none" />
						</AspectRatio>
					</div>
				</div>
			</div>
		</>
	);
}
