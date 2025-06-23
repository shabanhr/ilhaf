import React from 'react';
import LyricsList from './lyrics-list';
import { capitalize } from '@/lib/utils';
import { SearchParams } from 'next/dist/server/request/search-params';
import { getMetadata } from '@/lib/utils/metadata';

interface Props {
	searchParams: Promise<SearchParams>;
}

export async function generateMetadata(props: Props) {
	const searchParams = await props.searchParams;
	const type = searchParams?.type as string | undefined;

	let meta = {
		title: `Nohay And Manqabat Lyrics List - Ihaf`,
		description: `Check Out The Lyrics List Of All Nohay And Manqabats`,
	};
	if (type) {
		const capitalizedType = capitalize(type);
		meta = {
			title: `${capitalizedType} Lyrics - Ilhaf`,
			description: `Check Out The ${capitalizedType} Lyrics List`,
		};
	}

	return getMetadata({
		title: meta.title,
		description: meta.description,
		url: '/lyrics',
	});
}

export default async function LyricsPage(props: Props) {
	const searchParams = await props.searchParams;
	return <LyricsList Params={searchParams} />;
}
