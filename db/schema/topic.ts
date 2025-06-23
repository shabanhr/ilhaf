import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { lyricsToTopic } from './lyrics';

export const topic = pgTable('topic', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
});
export const topicRelations = relations(topic, ({ many }) => ({
	lyricsToTopics: many(lyricsToTopic),
}));
export type Topic = InferSelectModel<typeof topic>;
