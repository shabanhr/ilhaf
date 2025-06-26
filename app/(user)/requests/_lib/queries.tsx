'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/auth';
import { LYRICS_PER_PAGE } from '@/config';

export const getRequestsData = async (page = 1, limit = LYRICS_PER_PAGE) => {
	const user = await getCurrentUser();
	if (!user) return [];

	const offset = (page - 1) * limit;

	const data = await db.query.lyricsRequest.findMany({
		columns: {
			id: true,
			title: true,
			video: true,
			lyricsSlug: true,
			status: true,
			createdAt: true,
		},
		where: (lyricsRequest, { eq }) => eq(lyricsRequest.userId, user.id),
		orderBy: (lyricsRequest, { desc }) => [desc(lyricsRequest.updatedAt)],
		limit,
		offset,
	});

	return data;
};

export type RequestsDataItem = Awaited<ReturnType<typeof getRequestsData>>[number];
