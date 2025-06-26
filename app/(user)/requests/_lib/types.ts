import { z } from 'zod/v4';

export const requestLyricsSchema = z.object({
	title: z.string('Title is required').min(4, 'Title must be at least 4 characters.'),
	type: z.string('Type is required').optional(),
	video: z.string('Video is required'),
	dop: z.date('Date of Publication is required'),
	english: z.string().optional(),
	urdu: z.string().optional(),
	reciters: z.string().optional(),
	topics: z.string().optional(),
	writers: z.string().optional(),
});

export type RequestLyricsSchemaType = z.infer<typeof requestLyricsSchema>;
