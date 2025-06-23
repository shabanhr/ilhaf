'use server';

import { drive } from '@/config';
import { db } from '@/db';
import { user } from '@/db/schema';
import { deleteFileFromR2 } from '@/lib/actions/r2';
import { eq } from 'drizzle-orm';

export const deleteUserById = async (id: string) => {
	const existedUser = await db.query.user.findFirst({
		where: eq(user.id, id),
	});

	if (!existedUser) {
		throw new Error('User Not Found For Delete');
	}
	if (existedUser.image?.startsWith(`${drive}/avatar`)) {
		const image = existedUser.image.replace(`${drive}/`, '');
		await deleteFileFromR2(image);
	}
	await db.delete(user).where(eq(user.id, id));

	return true;
};
