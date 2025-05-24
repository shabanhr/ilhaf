import React from 'react';
import { MotionDiv, MotionP } from '@/components/motion';
import { fadeIn } from '@/components/motion/utils';
import { currentUser } from '@/config/auth';
import { HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import { siteName } from '@/config';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import GradientHeading from '../GradientHeading';

const Hero = async () => {
	const user = await currentUser();

	return (
		<div className="relative mt-5 mb-24 grid h-full w-full grid-cols-1 gap-20 md:mt-18 md:grid-cols-2 md:gap-10">
			{/* Objects */}
			<div className="from-accent via-accent to-background absolute bottom-0 -z-[1] h-48 w-40 rounded-lg bg-gradient-to-b">
				<div className="bg-background/10 h-48 w-48 rounded-lg" />
			</div>
			<div className="from-accent via-accent to-background absolute end-0 top-0 -z-[1] h-48 w-48 rounded-full bg-gradient-to-t">
				<div className="bg-background/10 h-48 w-48 rounded-full" />
			</div>

			<div className="flex flex-col items-center justify-center gap-y-4 md:items-start">
				<MotionDiv
					variants={fadeIn('up', 0.1)}
					initial="hidden"
					transition={{ duration: 1, ease: 'easeInOut' }}
					animate="show"
					exit="hidden"
				>
					<GradientHeading h={1} className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
						Welcome to Ilhaf
					</GradientHeading>
				</MotionDiv>
				<MotionP
					variants={fadeIn('up', 0.2)}
					initial="hidden"
					transition={{ duration: 1, ease: 'easeInOut' }}
					animate="show"
					exit="hidden"
					className="text-center md:text-left"
				>
					Explore a vast collection of religious poetry including Noha, Manqabat, Dua, Hamd, and Naats, complete with
					their lyrics and detailed information.
				</MotionP>
				<MotionDiv
					variants={fadeIn('up', 0.3)}
					initial="hidden"
					transition={{ duration: 1, ease: 'easeInOut' }}
					animate="show"
					exit="hidden"
					className="flex items-center gap-x-2"
				>
					<Link className={buttonVariants()} target="_blank" href="https://www.patreon.com/ilhaf">
						<HeartHandshake className="mr-1 size-5" />
						Support Us
					</Link>
					{user ? (
						<Link className={buttonVariants({ variant: 'outline' })} href="/lyrics">
							Explore Lyrics
						</Link>
					) : (
						<Link className={buttonVariants({ variant: 'outline' })} href="/auth">
							Join Now
						</Link>
					)}
				</MotionDiv>
			</div>

			<MotionDiv
				className="flex flex-col items-center justify-center"
				variants={fadeIn('left', 0.3)}
				initial="hidden"
				transition={{ duration: 1, ease: 'easeInOut' }}
				animate="show"
				exit="hidden"
			>
				<Image
					// unoptimized
					width={640}
					height={488}
					className="pointer-events-none dark:invert"
					src="/image.webp"
					alt={siteName}
				/>
			</MotionDiv>
		</div>
	);
};

export default Hero;
