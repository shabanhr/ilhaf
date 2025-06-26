'use server';
import { db } from '@/db';
import { lyrics, lyricsRequest } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const deleteRequestById = async (id: string) => {
	const foundRequest = await db.query.lyricsRequest.findFirst({
		where: eq(lyricsRequest.id, id),
	});

	if (!foundRequest) {
		throw new Error('Request Not Found For Delete');
	}

	// Delete from database
	await db.delete(lyricsRequest).where(eq(lyricsRequest.id, id));

	return true;
};

export const updateRequestById = async (id: string, newStatus: string, lyricsSlug?: string) => {
	const foundRequest = await db.query.lyricsRequest.findFirst({
		where: eq(lyricsRequest.id, id),
	});

	if (!foundRequest) {
		throw new Error('Request not found');
	}

	if (newStatus === 'approved') {
		if (!lyricsSlug) {
			throw new Error('Lyrics slug is required when approving a request');
		}
		const foundLyrics = await db.query.lyrics.findFirst({
			where: eq(lyrics.slug, lyricsSlug),
		});
		if (!foundLyrics) {
			throw new Error('Lyrics not found');
		}
	}

	await db
		.update(lyricsRequest)
		.set({
			status: newStatus,
			...(newStatus === 'approved' && lyricsSlug ? { lyricsSlug } : {}),
		})
		.where(eq(lyricsRequest.id, id));

	return true;
};
