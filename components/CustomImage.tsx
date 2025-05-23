"use client";

import React from 'react'
import Image from 'next/image';
import { cn, getBlurPlaceholderURL, getImageURL } from '@/lib/utils';
import { AspectRatio } from './ui/aspect-ratio';
import { useInView } from 'framer-motion';


interface CustomImageProps {
    slug: string;
    alt: string;
    className?: string;
}

export const CustomImage = ({ slug, alt, className }: CustomImageProps) => {
    const image = getImageURL(slug);
    const placeholder = getBlurPlaceholderURL(slug);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    
    let imgSrc = image;

    const [isLoading, setIsLoading] = React.useState(true);

    const handleError = () => {
        imgSrc = "/placeholder.webp";
    };


    return (
        <AspectRatio
            ref={ref}
            ratio={16 / 9}
            className={cn('w-full h-full relative rounded-md bg-accent', className)}
        >
            <Image
                sizes="10px"
                priority
                fill
                alt={alt}
                src={placeholder}
                className="object-cover w-full h-full rounded-md"
                unoptimized
            />
            {isInView && (
                <Image
                    sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 33vw"
                    alt={alt}
                    src={imgSrc}
                    fill
                    className={`object-cover w-full h-full rounded-md
                         transition-opacity duration-300 ease-in-out 
                         pointer-events-none select-none", {
                         ${isLoading ? "opacity-0" : "opacity-100"}`}
                    onError={handleError}
                    onLoad={() => setIsLoading(false)}
                />
            )}
        </AspectRatio>
    )
}