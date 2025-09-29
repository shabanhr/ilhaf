import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations, InferSelectModel } from 'drizzle-orm';
import { userFavorite } from './favorite';
import { reciter } from './reciter';
import { writer } from './writer';
import { topic } from './topic';
import { user } from './auth';

export const lyrics = pgTable('lyrics', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	slug: text('slug').notNull().unique(),
	oldSlug: text('old_slug'),
	title: text('title').notNull(),
	video: text('video'),
	type: text('type').notNull(),
	english: text('english'),
	urdu: text('urdu'),
	writersNames: text('writers_names'),
	status: text('status').default('draft').notNull(),
	dop: timestamp('dop')
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
});

export const lyricsRelations = relations(lyrics, ({ many }) => ({
	reciters: many(lyricsToReciter),
	favorites: many(userFavorite),
	writers: many(lyricsToWriter),
	topics: many(lyricsToTopic),
}));
export type Lyrics = InferSelectModel<typeof lyrics>;

export const lyricsToReciter = pgTable(
	'lyrics_to_reciter',
	{
		lyricsId: text('lyrics_id')
			.notNull()
			.references(() => lyrics.id, { onDelete: 'cascade' }),
		reciterId: text('reciter_id')
			.notNull()
			.references(() => reciter.id, { onDelete: 'cascade' }),
	},
	(t) => [primaryKey({ columns: [t.lyricsId, t.reciterId] })],
);
export const lyricsToReciterRelations = relations(lyricsToReciter, ({ one }) => ({
	lyrics: one(lyrics, {
		fields: [lyricsToReciter.lyricsId],
		references: [lyrics.id],
	}),
	reciter: one(reciter, {
		fields: [lyricsToReciter.reciterId],
		references: [reciter.id],
	}),
}));
export type LyricsToReciter = InferSelectModel<typeof lyricsToReciter>;

export const lyricsToWriter = pgTable(
	'lyrics_to_writer',
	{
		lyricsId: text('lyrics_id')
			.notNull()
			.references(() => lyrics.id, { onDelete: 'cascade' }),
		writerId: text('writer_id')
			.notNull()
			.references(() => writer.id, { onDelete: 'cascade' }),
	},
	(t) => [primaryKey({ columns: [t.lyricsId, t.writerId] })],
);
export const lyricsToWriterRelations = relations(lyricsToWriter, ({ one }) => ({
	lyrics: one(lyrics, {
		fields: [lyricsToWriter.lyricsId],
		references: [lyrics.id],
	}),
	writer: one(writer, {
		fields: [lyricsToWriter.writerId],
		references: [writer.id],
	}),
}));
export type LyricsToWriter = InferSelectModel<typeof lyricsToWriter>;

export const lyricsToTopic = pgTable(
	'lyrics_to_topic',
	{
		lyricsId: text('lyrics_id')
			.notNull()
			.references(() => lyrics.id, { onDelete: 'cascade' }),
		topicId: text('topic_id')
			.notNull()
			.references(() => topic.id, { onDelete: 'cascade' }),
	},
	(t) => [primaryKey({ columns: [t.lyricsId, t.topicId] })],
);

export const lyricsToTopicRelations = relations(lyricsToTopic, ({ one }) => ({
	lyrics: one(lyrics, {
		fields: [lyricsToTopic.lyricsId],
		references: [lyrics.id],
	}),
	topic: one(topic, {
		fields: [lyricsToTopic.topicId],
		references: [topic.id],
	}),
}));

export type LyricsToTopic = InferSelectModel<typeof lyricsToTopic>;

export const lyricsRequest = pgTable('lyrics_request', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	type: text('type'),
	reciters: text('reciters'),
	writers: text('writers'),
	english: text('english'),
	urdu: text('urdu'),
	video: text('video').notNull(),
	status: text('status').default('pending').notNull(),
	lyricsSlug: text('lyrics_slug'),
	dop: timestamp('dop')
		.$defaultFn(() => new Date())
		.notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => new Date())
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const lyricsRequestRelations = relations(lyricsRequest, ({ one }) => ({
	user: one(user, {
		fields: [lyricsRequest.userId],
		references: [user.id],
	}),
}));

export type LyricsRequest = InferSelectModel<typeof lyricsRequest>;
