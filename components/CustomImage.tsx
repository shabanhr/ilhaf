'use client';

import React from 'react';
import Image from 'next/image';
import { cn, getBlurPlaceholderURL, getImageURL } from '@/lib/utils';
import { AspectRatio } from './ui/aspect-ratio';
import { useInView } from 'motion/react';

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
		imgSrc = '/placeholder.webp';
	};

	return (
		<AspectRatio ref={ref} ratio={16 / 9} className={cn('bg-accent relative h-full w-full rounded-md', className)}>
			<Image
				sizes="10px"
				priority
				fill
				alt={alt}
				src={placeholder}
				className="h-full w-full rounded-md object-cover"
				unoptimized
			/>
			{isInView && (
				<Image
					sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 33vw"
					alt={alt}
					src={imgSrc}
					fill
					className={`select-none", { pointer-events-none h-full w-full rounded-md object-cover transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
					onError={handleError}
					onLoad={() => setIsLoading(false)}
				/>
			)}
		</AspectRatio>
	);
};
