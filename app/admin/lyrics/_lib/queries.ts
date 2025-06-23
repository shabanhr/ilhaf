'use server';
import { GetLyricsSchema } from './validations';
import { asc, count, desc } from 'drizzle-orm';
import { lyrics } from '@/db/schema';
import { db } from '@/db';
import { filterColumns } from '@/lib/filter-columns';

export async function getLyrics(input: GetLyricsSchema) {
	const offset = (input.page - 1) * input.perPage;

	const where = filterColumns({
		table: lyrics,
		filters: input.filters,
		joinOperator: input.joinOperator,
	});

	const orderBy =
		input.sort.length > 0
			? input.sort.map((item) => (item.desc ? desc(lyrics[item.id]) : asc(lyrics[item.id])))
			: [asc(lyrics.dop)];


	const data = await db.query.lyrics.findMany({
		where,
		limit: input.perPage,
		offset,
		orderBy,
		with: {
			reciters: {
				with: {
					reciter: true,
				},
			},
		},
	});

	const total = await db
		.select({
			count: count(),
		})
		.from(lyrics)
		.where(where)
		.execute()
		.then((res) => res[0]?.count ?? 0);

	const pageCount = Math.ceil(total / input.perPage);

	return { data, pageCount };
}
