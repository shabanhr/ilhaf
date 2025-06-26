import { LyricsRequest } from '@/db/schema';
import { createSearchParamsCache, parseAsInteger, parseAsStringEnum } from 'nuqs/server';
import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';

export const searchParamsCache = createSearchParamsCache({
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser<LyricsRequest>().withDefault([{ id: 'createdAt', desc: true }]),
	filters: getFiltersStateParser().withDefault([]),
	joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
});

export type GetRequestsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>;
