'use client';

import React from 'react';
import Image from 'next/image';
import { cn, getImageURL } from '@/lib/utils';
import { useInView } from 'motion/react';
import { AspectRatio } from '../ui/aspect-ratio';

type AnimatedImageProps = {
	slug: string;
	alt: string;
	className?: string;
};

export function AnimatedImage({ slug, alt, className, ...props }: AnimatedImageProps) {
	const [isLoading, setIsLoading] = React.useState(true);
	const image = getImageURL(slug);
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });

	let imgSrc = image;

	const handleError = () => {
		imgSrc = '/placeholder.webp';
	};

	return (
		<AspectRatio ref={ref} ratio={16 / 9} className={cn('bg-accent relative h-full w-full rounded-md', className)}>
			<Image
				sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 33vw"
				alt={alt}
				src={imgSrc}
				fill
				className={cn(
					'pointer-events-none rounded-md object-cover opacity-0 transition-opacity duration-1000 select-none',
					{
						'opacity-100': isInView && !isLoading,
					},
				)}
				onLoad={() => setIsLoading(false)}
				onError={handleError}
				{...props}
			/>
		</AspectRatio>
	);
}
