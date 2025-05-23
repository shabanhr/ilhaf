import React from 'react'
import { MotionDiv, MotionH1, MotionP } from '@/components/motion'
import { fadeIn } from '@/components/motion/utils'
import { currentUser } from '@/config/auth';
import { HeartHandshake } from 'lucide-react'
import Image from 'next/image';
import { siteName } from '@/config';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import GradientHeading from '../GradientHeading';

const Hero = async () => {
    const user = await currentUser();

    return (
        <div className="w-full h-full relative grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-10 mt-5 mb-24 md:mt-18">
            {/* Objects */}
            <div className="absolute bottom-0 -z-[1] w-40 h-48 bg-gradient-to-b from-accent via-accent to-background rounded-lg">
                <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute top-0 end-0 -z-[1] w-48 h-48 bg-gradient-to-t from-accent via-accent to-background rounded-full">
                <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>

            <div className="flex flex-col gap-y-4 items-center md:items-start justify-center">
                <MotionDiv variants={fadeIn('up', 0.1)}
                    initial='hidden'
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    animate='show'
                    exit='hidden'
                >
                    <GradientHeading h={1}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
                    >
                        Welcome to Ilhaf
                    </GradientHeading>
                </MotionDiv>
                <MotionP
                    variants={fadeIn('up', 0.2)}
                    initial='hidden'
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    animate='show'
                    exit='hidden'
                    className="text-center md:text-left"
                >
                    Explore a vast collection of religious poetry including Noha, Manqabat, Dua, Hamd, and Naats, complete with their lyrics and detailed information.
                </MotionP>
                <MotionDiv
                    variants={fadeIn('up', 0.3)}
                    initial='hidden'
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    animate='show' exit='hidden'
                    className="flex gap-x-2 items-center"
                >
                    <Link className={buttonVariants()}
                        target='_blank'
                        href="https://www.patreon.com/ilhaf"
                    >
                        <HeartHandshake className='mr-1 size-5' />
                        Support Us
                    </Link>
                    {user ? (
                        <Link className={buttonVariants({ variant: 'outline', className: "border-primary/70" })} href="/lyrics">
                            Explore Lyrics
                        </Link>
                    ) : (
                        <Link className={buttonVariants({ variant: 'outline', className: "border-primary/70" })} href="/auth">
                            Join Now
                        </Link>
                    )}
                </MotionDiv>
            </div>

            <MotionDiv className="flex flex-col items-center justify-center"
                variants={fadeIn('left', 0.3)}
                initial='hidden' transition={{ duration: 1, ease: 'easeInOut' }}
                animate='show' exit='hidden'
            >
                <Image
                    // unoptimized
                    width={640}
                    height={488}
                    className='dark:invert pointer-events-none'
                    src='/image.webp'
                    alt={siteName}
                />
            </MotionDiv>
        </div>

    )
}

export default Hero;
