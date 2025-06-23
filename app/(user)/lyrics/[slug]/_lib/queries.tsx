'use server';

import { LYRICS_PER_PAGE } from '@/config';
import { db } from '@/db';
import { lyrics, lyricsToTopic } from '@/db/schema';
import { CardType } from '@/types';
import { and, count, desc, eq, inArray, ne, sql } from 'drizzle-orm';

export const getLyricsData = async (slug: string) => {
	const data = await db.query.lyrics.findFirst({
		where: (lyrics, { eq }) => eq(lyrics.slug, slug),
		with: {
			reciters: {
				with: {
					reciter: true,
				},
			},
			topics: {
				with: {
					topic: true,
				},
			},
			writers: {
				with: {
					writer: true,
				},
			},
		},
	});
	return data;
};

interface Props {
	lyricsId: string;
	userId?: string;
}

export const isFavorited = async ({ lyricsId, userId }: Props) => {
	let favorited: boolean = false;

	if (userId) {
		const existingFavorite = await db.query.userFavorite.findFirst({
			where: (userFavorite, { and, eq }) => and(eq(userFavorite.userId, userId), eq(userFavorite.lyricsId, lyricsId)),
		});
		if (existingFavorite) {
			favorited = true;
		}
	}

	return favorited;
};

interface SimilarLyricsProps {
	type: string;
	slug: string;
	topics: string[];
	page?: number;
	take?: number;
}

export const getSimilarLyrics = async ({
	slug,
	type,
	topics,
	page = 1,
	take = LYRICS_PER_PAGE,
}: SimilarLyricsProps) => {
	const offset = (page - 1) * take;

	const baseWhere = [ne(lyrics.slug, slug), eq(lyrics.type, type), eq(lyrics.status, 'published')];
	const topicFilter = topics.length > 0 ? inArray(lyricsToTopic.topicId, topics) : undefined;


	const data = (await db
		.select({
			title: sql<string>`min(${lyrics.title})`.as('title'),
			slug: sql<string>`min(${lyrics.slug})`.as('slug'),
			dop: sql<Date>`max(${lyrics.dop})`.as('dop'),
			type: sql<string>`min(${lyrics.type})`.as('type'),
			oldSlug: sql<string | null>`min(${lyrics.oldSlug})`.as('oldSlug'),
		})
		.from(lyrics)
		.leftJoin(lyricsToTopic, eq(lyrics.id, lyricsToTopic.lyricsId))
		.where(topicFilter ? and(...baseWhere, topicFilter) : and(...baseWhere))
		.groupBy(lyrics.id)
		.orderBy(desc(lyrics.dop))
		.limit(take)
		.offset(offset)) as CardType[];

	const [{ count: total }] = await db
		.select({ count: count() })
		.from(lyrics)
		.leftJoin(lyricsToTopic, eq(lyrics.id, lyricsToTopic.lyricsId))
		.where(topicFilter ? and(...baseWhere, topicFilter) : and(...baseWhere));

	return { data, count: total };
};
