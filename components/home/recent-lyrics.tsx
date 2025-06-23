import React from 'react';
import { getLyricsData } from '@/lib/actions/lyrics';
import { LyricsCard, LyricsCardSkeleton } from '../lyrics-card';
import SectionTitle from '../sheard/section-title';

export const dynamic = 'force-dynamic';


export function RecentLyrics() {
	return (
		<div className="w-full">
			<SectionTitle text="Recent Lyrics" link="/lyrics" />
			<React.Suspense
				fallback={
					<div className="grid bp md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							<LyricsCardSkeleton key={index} />
						))}
					</div>
				}
			>
				<RecentLyricsList />
			</React.Suspense>
		</div>
	);
}

export async function RecentLyricsList() {
	const { data: lyricsList } = await getLyricsData({ page: 1, take: 6 });

	return (
		<div className="grid bp md:grid-cols-2 lg:grid-cols-3">
			{lyricsList.map((lyric, index) => (
				<LyricsCard key={index} data={lyric} />
			))}
		</div>
	);
}
