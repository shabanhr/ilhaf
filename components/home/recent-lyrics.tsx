import React from 'react';
import { getLyricsData } from '@/lib/actions/lyrics';
import { LyricsCard } from '../lyrics-card';
import SectionTitle from '../sheard/section-title';

export async function RecentLyrics() {
	const { data: lyricsList } = await getLyricsData({ page: 1, take: 6 });

	return (
		<div className="w-full">
			<SectionTitle text="Recent Lyrics" link="/lyrics" />
			<div className="grid w-full gap-3 py-5 md:grid-cols-2 lg:grid-cols-3">
				{lyricsList.map((lyric, index) => (
					<LyricsCard key={index} data={lyric} />
				))}
			</div>
		</div>
	);
}
