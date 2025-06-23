import { LoadMore } from '@/components/load-more';
import { LyricsCard } from '@/components/lyrics-card';
import React from 'react';
import { getSimilarLyrics } from '../_lib/queries';
import SectionTitle from '@/components/sheard/section-title';

interface SimilarLyricsProps {
	type: string;
	slug: string;
	topics: string[];
}

export async function SimilarLyrics(props: SimilarLyricsProps) {
	const { type, slug, topics } = props;
	const { data, count } = await getSimilarLyrics({ type, slug, topics });

	if (!data.length && !data[0]) return null;

	return (
		<React.Fragment>
			<SectionTitle text="You Might Also Like!" />
			<div className="bp grid gap-y-3">
				<div className="grid w-full gap-x-3 md:grid-cols-2 lg:grid-cols-3">
					{data.map((item, i) => (
						<LyricsCard key={i} data={item} />
					))}
				</div>
				<LoadMore Func={getSimilarLyrics} count={count} additionalProps={props} />
			</div>
		</React.Fragment>
	);
}
