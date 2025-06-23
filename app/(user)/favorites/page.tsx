import React from 'react';
import NoResults from '@/components/no-results';
import { LoadMore } from '@/components/load-more';
import { LyricsCard } from '@/components/lyrics-card';
import { getFavLyrics } from '@/lib/actions/lyrics';
import { confirmUser } from '@/lib/auth';

export default async function FavoritePage() {
	const user = await confirmUser();
	const { data, count } = await getFavLyrics({ page: 1, userId: user.id });

	if (data[0]) {
		return (
			<>
				<div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
					{data.map((item, index) => (
						<LyricsCard key={index} data={item} />
					))}
				</div>
				<LoadMore Func={getFavLyrics} count={count} additionalProps={{ userId: user.id }} />
			</>
		);
	} else {
		return <NoResults />;
	}
}
