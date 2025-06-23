import { z } from 'zod/v4';

export const lyricsInsertSchema = z.object({
	title: z.string('Title is required').min(4, 'Title must be at least 4 characters.'),
	slug: z.string('Slug is required').min(4, 'Slug must be at least 4 characters.'),
	type: z.string('Type is required'),
	video: z.string('Video is required'),
	dop: z.date('Date of Publication is required'),
	english: z.string().optional(),
	urdu: z.string().optional(),
	status: z.string().default('draft').optional(),
	reciters: z.array(z.string()).min(1, 'Min 1 Reciter is required'),
	topics: z.array(z.string()),
	writers: z.array(z.string()),
});

export type lyricsInsertSchemaType = z.infer<typeof lyricsInsertSchema>;

export type dataType = {
	name: string;
	id: string;
	slug?: string;
	count?: number;
};

export const itemSchema = z.object({
	name: z.string().min(2, {
		message: 'name must be at least 2 characters.',
	}),
});

export type itemSchemaType = z.infer<typeof itemSchema>;

export type ModelName = 'topic' | 'writer' | 'reciter';
