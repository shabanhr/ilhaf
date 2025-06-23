'use server';

import { itemSchemaType, lyricsInsertSchema, lyricsInsertSchemaType, ModelName } from './types';
import { db } from '@/db';
import { lyrics, lyricsToReciter, lyricsToTopic, lyricsToWriter, reciter, topic, writer } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

const updateLyrics = async (id: string, values: lyricsInsertSchemaType) => {
	const validatedFields = lyricsInsertSchema.safeParse(values);

	if (!validatedFields.success) {
		return { success: false, message: 'Invalid fields!' };
	}

	const { reciters, writers, topics, ...lyricsData } = values;

	await db
		.update(lyrics)
		.set({
			...lyricsData,
			title: lyricsData.title.trim(),
			updatedAt: new Date(),
		})
		.where(eq(lyrics.id, id));

	// 2️⃣ Update the `lyricsReciter` relation
	await db.delete(lyricsToReciter).where(eq(lyricsToReciter.lyricsId, id));
	if (reciters.length > 0) {
		await db.insert(lyricsToReciter).values(
			reciters.map((reciterId) => ({
				lyricsId: id,
				reciterId,
			})),
		);
	}

	// 3️⃣ Update the `lyricsToWriter` relation
	await db.delete(lyricsToWriter).where(eq(lyricsToWriter.lyricsId, id));
	if (writers.length > 0) {
		await db.insert(lyricsToWriter).values(
			writers.map((writerId) => ({
				lyricsId: id,
				writerId,
			})),
		);
	}

	// 4️⃣ Update the `lyricsToTopic` relation
	await db.delete(lyricsToTopic).where(eq(lyricsToTopic.lyricsId, id));
	if (topics.length > 0) {
		await db.insert(lyricsToTopic).values(
			topics.map((topicId) => ({
				lyricsId: id,
				topicId,
			})),
		);
	}

	return { success: true, message: 'Lyrics Updated' };
};

export const AddNewLyrics = async (
	values: lyricsInsertSchemaType,
	id?: string,
): Promise<{ success: boolean; message: string; id?: string }> => {
	try {
		if (id) {
			return updateLyrics(id, values);
		} else {
			// Check for slug duplicate
			const lyricsExists = await db.query.lyrics.findFirst({
				where: (lyrics, { eq }) => eq(lyrics.slug, values.slug),
			});
			if (lyricsExists) {
				return { success: false, message: 'Lyrics already exists!' };
			}

			const newId = crypto.randomUUID();
			const { reciters, writers, topics, ...lyricsData } = values;

			// Create main lyrics
			await db.insert(lyrics).values({
				id: newId,
				...lyricsData,
				title: lyricsData.title.trim(),
			});

			if (reciters.length > 0) {
				await db.insert(lyricsToReciter).values(
					reciters.map((reciterId) => ({
						lyricsId: newId,
						reciterId,
					})),
				);
			}

			if (writers.length > 0) {
				await db.insert(lyricsToWriter).values(
					writers.map((writerId) => ({
						lyricsId: newId,
						writerId,
					})),
				);
			}

			if (topics.length > 0) {
				await db.insert(lyricsToTopic).values(
					topics.map((topicId) => ({
						lyricsId: newId,
						topicId,
					})),
				);
			}

			return { success: true, message: 'Lyrics Uploaded!', id: newId };
		}
	} catch (error: any) {
		console.error(error);
		return { success: false, message: `Something went wrong: ${error.message}` };
	}
};

interface AddUpdateItemProps {
	values: itemSchemaType;
	model: ModelName;
	id?: string;
}

export const createOrUpdateItem = async ({ id, model, values }: AddUpdateItemProps) => {
	let message = 'Added';

	try {
		if (model === 'reciter') {
			const slug: string = slugify(values.name);
			if (id) {
				await db
					.update(reciter)
					.set({ ...values, slug })
					.where(eq(reciter.id, id));
				message = 'Updated';
			} else {
				await db.insert(reciter).values({ ...values, slug });
			}
		}

		if (model === 'writer') {
			if (id) {
				await db.update(writer).set(values).where(eq(writer.id, id));
				message = 'Updated';
			} else {
				await db.insert(writer).values(values);
			}
		}

		if (model === 'topic') {
			if (id) {
				await db.update(topic).set(values).where(eq(topic.id, id));
				message = 'Updated';
			} else {
				await db.insert(topic).values(values);
			}
		}

		revalidatePath('/admin/add');
		return message;
	} catch (error) {
		throw error;
	}
};
