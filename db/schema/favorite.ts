import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { relations } from 'drizzle-orm';
import { lyrics } from './lyrics';

export const userFavorite = pgTable(
	'user_favorite',
	{
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		lyricsId: text('lyrics_id')
			.notNull()
			.references(() => lyrics.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at')
			.$defaultFn(() => new Date())
			.notNull(),
	},
	(t) => [primaryKey({ columns: [t.userId, t.lyricsId] })],
);


export const userFavoriteRelations = relations(userFavorite, ({ one }) => ({
	user: one(user, {
		fields: [userFavorite.userId],
		references: [user.id],
	}),
	lyrics: one(lyrics, {
		fields: [userFavorite.lyricsId],
		references: [lyrics.id],
	}),
}));
