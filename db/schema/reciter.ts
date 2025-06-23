import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { lyricsToReciter } from './lyrics';

export const reciter = pgTable('reciter', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
});
export const reciterRelations = relations(reciter, ({ many }) => ({
	lyricsToReciters: many(lyricsToReciter),
}));

export type Reciter = InferSelectModel<typeof reciter>;
