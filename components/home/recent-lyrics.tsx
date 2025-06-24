import React from 'react';
import { LyricsCard } from '../lyrics-card';
import SectionTitle from '../sheard/section-title';
import { CardType } from '@/types';

export function RecentLyrics({ lyricsList }: { lyricsList: CardType[] }) {
	return (
		<div className="w-full">
			<SectionTitle text="Recent Lyrics" link="/lyrics" />
			<div className="bp grid md:grid-cols-2 lg:grid-cols-3">
				{lyricsList.map((lyric, index) => (
					<LyricsCard key={index} data={lyric} />
				))}
			</div>
		</div>
	);
}
