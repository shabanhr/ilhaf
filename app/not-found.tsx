import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
	return (
		<div className="relative flex flex-col items-center gap-10 p-10 text-center">
			<Image
				src="/404.png"
				alt="404"
				className="aspect-square object-cover select-none dark:invert"
				width={300}
				height={300}
			/>
			<h1 className="text-4xl leading-7">Page not found</h1>
			<p>
				The page you are looking for does not exists. Head back to the{' '}
				<Link href="/" className="dark:text-primary text-black underline">
					Home page
				</Link>
			</p>
		</div>
	);
}
