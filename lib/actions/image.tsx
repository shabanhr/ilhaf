"use server";

import sharp from "sharp";

interface IImageOptions {
    fileBuffer: Buffer;
    maxWidth?: number;
}

export const compressAndResizeToWebP = async ({ fileBuffer, maxWidth = 500 }: IImageOptions): Promise<Buffer> => {
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    if (metadata.width && metadata.width > maxWidth) {
        return image
            .resize({ width: maxWidth })
            .toFormat("webp")
            .toBuffer();
    }

    return image.toFormat("webp").toBuffer();
};