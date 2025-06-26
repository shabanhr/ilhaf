import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { TextEffect } from '../motion/text-effect';
import { AnimatedGroup } from '../motion/animated-group';
import { LyricPencilIcon } from '../icons';

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: 'blur(12px)',
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			y: 0,
			transition: {
				type: 'spring',
				bounce: 0.3,
				duration: 1.5,
			},
		},
	},
} as const;

export function Hero() {
	return (
		<section className="bp-x relative grid grid-cols-1 gap-10 py-8 md:grid-cols-2 md:py-0">
			<div className="flex flex-col items-center justify-center gap-y-4 md:items-start">
				<TextEffect
					preset="fade-in-blur"
					speedSegment={0.3}
					as="h1"
					className="text-3xl font-extrabold sm:text-4xl md:text-5xl"
				>
					Welcome to Ilhaf
				</TextEffect>
				<TextEffect
					per="line"
					preset="fade-in-blur"
					speedSegment={0.3}
					delay={0.5}
					as="p"
					className="text-foreground/80 text-center md:text-left"
				>
					Explore a vast collection of religious poetry including Noha, Manqabat, Dua, Hamd, and Naats, complete with
					their lyrics and detailed information.
				</TextEffect>
				<AnimatedGroup
					variants={{
						container: {
							visible: {
								transition: {
									staggerChildren: 0.05,
									delayChildren: 0.75,
								},
							},
						},
						...transitionVariants,
					}}
					className="flex items-center gap-x-2"
				>
					<Button size="lg" asChild>
						<Link target="_blank" href="/support">
							<HeartHandshake className="mr-1 size-5" />
							Support Us
						</Link>
					</Button>
					<Button key={2} size="lg" variant="outline" asChild>
						<Link href="/lyrics">Explore Lyrics</Link>
					</Button>
				</AnimatedGroup>
			</div>
			<AnimatedGroup
				variants={{
					container: {
						visible: {
							transition: {
								staggerChildren: 0.05,
								delayChildren: 0.75,
							},
						},
					},
					...transitionVariants,
				}}
			>
				<div className="relative">
					<LyricPencilIcon className="aspect-square size-full" />
					<div
						aria-hidden
						className="to-background absolute inset-0 bg-gradient-to-r from-transparent via-transparent"
					/>
				</div>
			</AnimatedGroup>
		</section>
	);
}
