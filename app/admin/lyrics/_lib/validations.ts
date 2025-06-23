import { Lyrics } from '@/db/schema';
import { createSearchParamsCache, parseAsInteger, parseAsStringEnum } from 'nuqs/server';
import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';

export const searchParamsCache = createSearchParamsCache({
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser<Lyrics>().withDefault([{ id: 'updatedAt', desc: true }]),
	filters: getFiltersStateParser().withDefault([]),
	joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
});

export type GetLyricsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>;
