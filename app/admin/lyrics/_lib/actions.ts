'use server';
import { db } from '@/db';
import { lyrics } from '@/db/schema';
import { deleteFileFromR2 } from '@/lib/actions/r2';
import { eq } from 'drizzle-orm';

export const deleteLyricsById = async (id: string) => {
	const foundLyrics = await db.query.lyrics.findFirst({
		where: eq(lyrics.id, id),
	});

	if (!foundLyrics) {
		throw new Error('Lyrics Not Found For Delete');
	}

	// Delete file assets
	await deleteFileFromR2(`lyrics/${foundLyrics.slug}/image.webp`);
	
	// Delete from database
	await db.delete(lyrics).where(eq(lyrics.id, id));

	return true;
};
