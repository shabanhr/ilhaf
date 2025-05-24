import LyricsList from '../LyricsList';
import Filters from '../Filters';
import { notFound } from 'next/navigation';
import { getRecitersData } from '../actions';
import { siteName } from '@/config';
import { capitalize } from '@/lib/utils';
import { arrayToString } from '@/lib/lyrics';
import { SearchParams } from 'next/dist/server/request/search-params';

interface Props {
	params: Promise<{ reciter: string }>;
	searchParams?: Promise<SearchParams>;
}

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const { reciter } = params;
	const Reciter = arrayToString([reciter.split('-').join(' ')]);
	const type = searchParams?.type as string | undefined;

	let meta = {
		title: `${Reciter} Lyrics List - Ihaf`,
		description: `Check Out The Lyrics List Of ${Reciter}`,
		link: `/lyrics/${reciter}`,
	};
	if (type) {
		const Type = capitalize(type);
		meta = {
			title: `${Reciter} ${Type} Lyrics - Ilhaf`,
			description: `Check Out The ${Reciter}'s ${Type} Lyrics List`,
			link: `/lyrics/${reciter}`,
		};
	}

	return {
		title: meta.title,
		description: meta.description,
		keywords: [`Lyrics List`, Reciter, type && `${capitalize(type)} Lyrics`],
		alternates: {
			canonical: meta.link,
		},
		openGraph: {
			title: meta.title,
			description: meta.description,
			url: meta.link,
			locale: 'en-US',
			siteName,
			type: 'website',
		},
	};
}

export default async function Reciter(props: Props) {
	const searchParams = await props.searchParams;
	const params = await props.params;

	if (!params.reciter) return notFound();

	const Params = {
		...searchParams,
		reciter: params.reciter,
	};
	const reciters = await getRecitersData();

	return (
		<>
			<Filters reciters={reciters} Params={Params} />
			<LyricsList Params={Params} />
		</>
	);
}
