'use server';

import { db } from '@/db';
import { userFavorite } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface FavoriteProps {
	favorited: boolean;
	userId: string;
	lyricsId: string;
}

export const AddToFavorite = async ({ favorited, userId, lyricsId }: FavoriteProps) => {
	const favorite = !favorited;

	if (!userId || !lyricsId) {
		return favorite;
	}

	try {
		if (favorited) {
			await db.delete(userFavorite).where(eq(userFavorite.userId, userId));
		} else {
			await db.insert(userFavorite).values({ userId, lyricsId });
		}

		return favorite;
	} catch (error) {
		console.error('Error in AddToFavorite:', error);
		throw error; // Ensure the error is propagated.
	}
};
