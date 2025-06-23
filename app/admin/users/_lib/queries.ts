'use server';
import { GetUsersSchema } from './validations';
import { asc, count, desc } from 'drizzle-orm';
import { db } from '@/db';
import { user } from '@/db/schema';
import { filterColumns } from '@/lib/filter-columns';

export async function getUsers(input: GetUsersSchema) {
	const offset = (input.page - 1) * input.perPage;

	const where = filterColumns({
		table: user,
		filters: input.filters,
		joinOperator: input.joinOperator,
	});

	const orderBy =
		input.sort.length > 0
			? input.sort.map((item) => (item.desc ? desc(user[item.id]) : asc(user[item.id])))
			: [asc(user.createdAt)];

	const data = await db
		.select()
		.from(user)
		.where(where)
		.limit(input.perPage)
		.offset(offset)
		.orderBy(...orderBy);

	const total = await db
		.select({
			count: count(),
		})
		.from(user)
		.where(where)
		.then((res) => res[0]?.count ?? 0);

	const pageCount = Math.ceil(total / input.perPage);

	return { data, pageCount };
}
