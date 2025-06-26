'use server';

import { db } from '@/db';
import { lyricsRequest } from '@/db/schema';
import { requestLyricsSchema, RequestLyricsSchemaType } from './types';
import { getErrorMessage } from '@/lib/utils/error';
import { getCurrentUser } from '@/lib/auth';
import getYouTubeID from 'get-youtube-id';
import { sendLyricsRequestEmail } from '@/lib/mail';
import { gte, and, eq } from 'drizzle-orm';

export async function createLyricsRequest(data: RequestLyricsSchemaType) {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return { success: false, message: 'User Not Found!' };
		}

		const validatedData = requestLyricsSchema.safeParse(data);
		if (!validatedData.success) {
			return { success: false, message: 'Invalid Data!' };
		}

		const videoId = getYouTubeID(validatedData.data.video);

		if (!videoId) {
			return { success: false, message: 'Invalid Video URL!' };
		}

		// Restrict to 1 request per 24 hours
		const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
		const recentRequests = await db
			.select()
			.from(lyricsRequest)
			.where(and(eq(lyricsRequest.userId, user.id), gte(lyricsRequest.createdAt, twentyFourHoursAgo)));

		if (recentRequests.length > 0) {
			const lastRequest = recentRequests[0]; // assuming it's the only one
			const lastRequestTime = new Date(lastRequest.createdAt);
			const nextAllowedTime = new Date(lastRequestTime.getTime() + 24 * 60 * 60 * 1000);
			const timeLeftMs = nextAllowedTime.getTime() - Date.now();
			const hoursLeft = Math.ceil(timeLeftMs / (1000 * 60 * 60));

			return {
				success: false,
				message: `You can only request lyrics every 24 hours. Try again in ${hoursLeft} hour(s).`,
			};
		}

		await sendLyricsRequestEmail({ email: user.email });

		await db.insert(lyricsRequest).values({
			...validatedData.data,
			video: videoId,
			userId: user.id,
		});
		return { success: true, message: 'Lyrics Request Created Successfully!' };
	} catch (error) {
		return { success: false, message: getErrorMessage(error) };
	}
}
