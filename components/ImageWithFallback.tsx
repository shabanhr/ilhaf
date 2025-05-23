"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
    src: string; // Source URL of the image
    alt: string; // Alt text for the image
    className?: string; // Custom class names
    height?: number; // Height of the image (if not using fill)
    width?: number; // Width of the image (if not using fill)
    fill?: boolean; // Whether the image should fill its container
    fallbackSrc?: string; // Fallback image source in case of an error
}

const ImageWithFallback: React.FC<Props> = ({
    src,
    alt,
    className,
    fill = false,
    height = 216,
    width = 216,
    fallbackSrc = "/placeholder.webp", // Default fallback image
}) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src); // Update the image source when `src` changes
    }, [src]);

    const handleError = () => {
        // Switch to fallback source on image load error
        setImgSrc(fallbackSrc);
    };

    return (
        <Image
            onError={handleError}
            src={imgSrc}
            alt={alt}
            fill={fill}
            className={cn(
                " rounded-xl mx-auto bg-accent",
                className
            )}
            height={!fill ? height : undefined} // Apply height only if `fill` is false
            width={!fill ? width : undefined} // Apply width only if `fill` is false
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes for better optimization
        />
    );
};

export default ImageWithFallback;
