import { z } from 'zod';
import { Prisma } from '@prisma/client';

const lyricsTypes = [
	'NOHA',
	'MANQABAT',
	'MANAJAT',
	'NAAT',
	'SALAM',
	'HAMAD',
	'DUA',
	'MARSIYA',
	'RAMZAN_KALAM',
	'SUFI_KALAM',
] as const;

export const AddLyricsSchema = z.object({
	title: z.string(),
	slug: z.string(),
	type: z.enum(lyricsTypes),
	reciterId: z.string(),
	topics: z.array(z.string().min(1)),
	writers: z.array(z.string().min(1)),
	otherReciters: z.array(z.string().min(1)),
	video: z.string(),
	dop: z.date(),
	english: z.string().optional(),
	urdu: z.string().optional(),
	p: z.boolean().default(false).optional(),
});

export type NewLyricsType = z.infer<typeof AddLyricsSchema>;

export type dataType = {
	name: string;
	id: string;
	slug?: string;
};

export const addNewItemSchema = z.object({
	name: z.string().min(2, {
		message: 'name must be at least 2 characters.',
	}),
});

export type ModelName =
	| 'user'
	| 'lyrics'
	| 'topic'
	| 'reciter'
	| 'otherReciter'
	| 'writer'
	| 'account'
	| 'session'
	| 'verificationToken';

export type ListItemType = {
	id: string;
	name: string;
	slug?: string;
};

export type CreateInputType = {
	user: Prisma.UserCreateInput;
	lyrics: Prisma.LyricsCreateInput;
	topic: Prisma.TopicCreateInput;
	reciter: Prisma.ReciterCreateInput;
	otherReciter: Prisma.OtherReciterCreateInput;
	writer: Prisma.WriterCreateInput;
	account: Prisma.AccountCreateInput;
	session: Prisma.SessionCreateInput;
	verificationToken: Prisma.VerificationTokenCreateInput;
};
