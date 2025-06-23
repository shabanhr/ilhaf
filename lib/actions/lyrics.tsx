'use server';

import { db } from '@/db';
import { LYRICS_PER_PAGE } from '@/config';
import { lyrics, userFavorite } from '@/db/schema';
import { and, count, desc, eq, ilike, type SQL } from 'drizzle-orm';
import { normalizeText } from '../utils';

interface getLyricDataProps {
	page: number;
	query?: string;
	take?: number;
}

export const getLyricsData = async ({ page = 1, take = LYRICS_PER_PAGE, query }: getLyricDataProps) => {
	const skip = (page - 1) * take;

	let where = eq(lyrics.status, 'published');
	if (query) {
		const slugifiedWords = query
			.trim()
			.split(/\s+/)
			.map((word) => normalizeText(word))
			.filter(Boolean);

		if (slugifiedWords.length > 0) {
			const slugFilters = slugifiedWords.map((word) => ilike(lyrics.slug, `%${word}%`));
			where = and(eq(lyrics.status, 'published'), ...slugFilters) as SQL<boolean>;
		}
	}

	const data = await db
		.select({
			title: lyrics.title,
			slug: lyrics.slug,
			type: lyrics.type,
			dop: lyrics.dop,
			oldSlug: lyrics.oldSlug,
		})
		.from(lyrics)
		.where(where)
		.orderBy(desc(lyrics.dop))
		.limit(take)
		.offset(skip);
	const [{ count: totalCount }] = await db.select({ count: count() }).from(lyrics).where(where);

	return { data, count: totalCount };
};

export const getFavLyrics = async ({ page = 1, userId }: { page: number; userId: string }) => {
	const skip = (page - 1) * LYRICS_PER_PAGE;
	const where = and(eq(userFavorite.userId, userId), eq(lyrics.status, 'published'));
	// Get the favorite lyrics with joins
	const data = await db
		.select({
			title: lyrics.title,
			slug: lyrics.slug,
			type: lyrics.type,
			dop: lyrics.dop,
			oldSlug: lyrics.oldSlug,
		})
		.from(userFavorite)
		.where(where)
		.innerJoin(lyrics, eq(userFavorite.lyricsId, lyrics.id))
		.orderBy(desc(userFavorite.createdAt))
		.limit(12)
		.offset(skip);

	// Get the count
	const res = await db
		.select({ count: count() })
		.from(userFavorite)
		.innerJoin(lyrics, eq(userFavorite.lyricsId, lyrics.id))
		.where(where);

	return {
		data,
		count: res[0].count,
	};
};
