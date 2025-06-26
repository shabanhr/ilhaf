'use server';
import { GetRequestsSchema } from './validations';
import { asc, count, desc } from 'drizzle-orm';
import { lyricsRequest } from '@/db/schema';
import { db } from '@/db';
import { filterColumns } from '@/lib/filter-columns';
import { eq } from 'drizzle-orm';

export async function getRequests(input: GetRequestsSchema) {
	const offset = (input.page - 1) * input.perPage;

	const where = filterColumns({
		table: lyricsRequest,
		filters: input.filters,
		joinOperator: input.joinOperator,
	});

	const orderBy =
		input.sort.length > 0
			? input.sort.map((item) => (item.desc ? desc(lyricsRequest[item.id]) : asc(lyricsRequest[item.id])))
			: [asc(lyricsRequest.createdAt)];

	const data = await db.query.lyricsRequest.findMany({
		columns: {
			id: true,
			title: true,
			video: true,
			status: true,
			dop: true,
			createdAt: true,
			updatedAt: true,
		},
		where,
		limit: input.perPage,
		offset,
		orderBy,
	});

	const total = await db
		.select({
			count: count(),
		})
		.from(lyricsRequest)
		.where(where)
		.execute()
		.then((res) => res[0]?.count ?? 0);

	const pageCount = Math.ceil(total / input.perPage);

	return { data, pageCount };
}


export async function getRequestById(id: string) {
	const request = await db.query.lyricsRequest.findFirst({
		where: eq(lyricsRequest.id, id),
	});

	return request;
}