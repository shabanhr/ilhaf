import { drive } from '@/config';
import { deleteFileFromR2, uploadFileToR2 } from '@/lib/actions/r2';
import { compressAndResizeToWebP } from '@/lib/actions/image';
import { getUserById } from '@/lib/actions/user';

const uploadFile = async (id: string, fileBuffer: Buffer) => {
	const compressedBuffer = await compressAndResizeToWebP({ fileBuffer, maxWidth: 250 });
	const uniqeId = id.split('').slice(0, 12).join('');
	const date = new Date();
	const fileName = `avatar/${uniqeId}-${date.getTime()}.webp`;
	const imageUrl = await uploadFileToR2({ Key: fileName, Body: compressedBuffer });
	return imageUrl;
};

export async function POST(req: Request) {
	try {
		const data = await req.formData();
		const file = data.get('file') as File | null;
		const id = data.get('id') as string | null;
		if (!file || !id) {
			return new Response(JSON.stringify({ error: 'Invalid Items!' }), { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const fileUrl = await uploadFile(id, buffer);
		const oldUser = await getUserById(id);

		if (!oldUser) {
			return new Response(JSON.stringify({ message: 'User Not Exists!' }), { status: 400 });
		}
		if (oldUser.image && oldUser.image.startsWith(`${drive}/avatar`)) {
			const imageKey = oldUser.image.split('/').pop();
			await deleteFileFromR2(`avatar/${imageKey}`);
		}

		return new Response(JSON.stringify({ url: fileUrl }), { status: 200 });
	} catch (error: any) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'Something Went Wrong!' }), { status: 400 });
	}
}
