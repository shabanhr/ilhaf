import { LyricsWithData } from '@/types';
import { checkObjectExistsInR2 } from '@/lib/actions/r2';
import AddClientPage from './page.client';
import { db } from '@/db';
import { getImageURL } from '@/lib/utils';

interface Props {
	searchParams: Promise<{
		id?: string;
	}>;
}

export default async function Add(props: Props) {
	const searchParams = await props.searchParams;
	let lyric: LyricsWithData | undefined;

	const { id } = searchParams;
	let imageQ = false;

	if (id) {
		lyric = await db.query.lyrics.findFirst({
			where: (lyrics, { eq }) => eq(lyrics.id, id),
			with: {
				reciters: {
					with: {
						reciter: true,
					},
				},
				writers: {
					with: {
						writer: true,
					},
				},
				topics: {
					with: {
						topic: true,
					},
				},
			},
		});
		if (lyric) {
			imageQ = await checkObjectExistsInR2(getImageURL({ slug: lyric.slug, oldSlug: lyric.oldSlug, keyOnly: true }));
		}
	}

	return <AddClientPage lyric={lyric} imageQ={imageQ} />;
}
