import sharp from 'sharp';
import { uploadFileToR2 } from '@/lib/r2';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

const compressAndConvertToWebP = async (fileBuffer: Buffer): Promise<Buffer> => {
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    if (width === 480 || height === 360) {
        // Calculate new dimensions for cropping
        const cropHeight = height - 90; // Remove 80px from top and bottom
        // Crop the image
        image.extract({ left: 0, top: 45, width: width, height: cropHeight });
        // Resize to fit within 640x360, ignoring aspect ratio to fit exactly 640x360
        image.resize(640, 360, { fit: 'inside' });
    }

    // Convert to WebP format with compression
    return image.toFormat('webp').toBuffer();
};


export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const slug = data.get('slug') as string | null;
        const url = data.get('url') as string | null;
        const file = data.get('file') as File | null;
        if (!slug) {
            return new Response(JSON.stringify({ error: "Invalid slug!" }), { status: 400 });
        }


        let bytes: ArrayBuffer;
        if (file) {
            bytes = await file.arrayBuffer();
        } else if (url) {
            const UrlRes = await axios.get(url, { responseType: "arraybuffer" });
            if (UrlRes.status !== 200) {
                return new Response(JSON.stringify({ error: "Failed to fetch file from URL!" }), { status: 400 });
            }
            bytes = UrlRes.data;
        } else {
            return new Response(JSON.stringify({ error: "Either file or URL must be provided!" }), { status: 400 });
        }

        const fileBuffer = Buffer.from(bytes);
        const compressedBuffer = await compressAndConvertToWebP(fileBuffer);
        const fileKey = `lyrics/${slug}/image.webp`;
        const imageUrl = await uploadFileToR2({ Key: fileKey, Body: compressedBuffer });

        const PlaceholderBuffer = await sharp(fileBuffer)
            .blur(1)
            .resize(10)
            .toFormat("webp")
            .toBuffer();
        await uploadFileToR2({
            Key: `lyrics/${slug}/blur-placeholder.webp`,
            Body: PlaceholderBuffer,
        });

        revalidatePath(`/admin/add?slug=${slug}`)
        return new Response(JSON.stringify(imageUrl), { status: 200 });
    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Something Went Wrong!" }), { status: 400 });
    }
}
