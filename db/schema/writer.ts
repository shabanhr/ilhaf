import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { lyricsToWriter } from './lyrics';

export const writer = pgTable('writer', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
});
export const writerRelations = relations(writer, ({ many }) => ({
	lyricsToWriters: many(lyricsToWriter),
}));
export type Writer = InferSelectModel<typeof writer>;
