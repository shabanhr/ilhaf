"use server";
import { S3Client, DeleteObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { drive } from '@/config';

const Bucket = process.env.R2_BUCKET;

const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`, // Cloudflare R2 endpoint
    credentials: {
        accessKeyId: `${process.env.R2_KEY}`,
        secretAccessKey: `${process.env.R2_SECRET_KEY}`,
    },
});


interface uploadFileProps {
    Key: string;
    Body: Buffer;
    ContentType?: string
}

export const uploadFileToR2 = async ({ Key, Body, ContentType = "image/webp" }: uploadFileProps): Promise<string> => {
    const command = new PutObjectCommand({ Bucket, Key, Body, ContentType });
    await r2.send(command);
    return `${drive}/${Key}`;
};

export const deleteFileFromR2 = async (Key?: string) => {
    if (!Key) {
        return { ok: false, message: "Invalid URL format" };
    }
    try {
        const command = new DeleteObjectCommand({ Bucket, Key });
        await r2.send(command);
        return { ok: true, message: 'File deleted successfully' };
    } catch (error: any) {
        return { ok: false, message: error.message };
    }
};

export const checkObjectExistsInR2 = async (Key: string): Promise<boolean> => {
    try {
        const command = new HeadObjectCommand({ Bucket, Key });
        await r2.send(command);
        return true;
    } catch (error: any) {
        if (error.name === 'NotFound') {
            return false; // Object doesn't exist
        }
        throw error; // Rethrow other errors
    }
}

