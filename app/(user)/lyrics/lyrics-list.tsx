import React from 'react';
import { LoadMore } from '@/components/load-more';
import NoResults from '@/components/no-results';
import { notFound } from 'next/navigation';
import { getLyricsData } from '@/lib/actions/lyrics';
import { LyricsCard } from '@/components/lyrics-card';
import { SearchParams } from 'next/dist/server/request/search-params';

interface Props {
	Params: SearchParams;
}

const LyricsList = async ({ Params }: Props) => {
	const res = await getLyricsData({ page: 1, ...Params });
	if (!res) {
		return notFound();
	}
	const { data, count } = res;

	if (data[0]) {
		return (
			<div className="bp grid gap-y-3">
				<div className="grid w-full gap-x-3 md:grid-cols-2 lg:grid-cols-3">
					{data.map((item, i) => (
						<LyricsCard key={i} data={item} />
					))}
				</div>
				<LoadMore Func={getLyricsData} count={count} additionalProps={Params} />
			</div>
		);
	} else {
		return <NoResults />;
	}
};

export default LyricsList;
