import { buttonVariants } from '@/components/ui/button'
import { siteName } from '@/config'
import { MotionDiv, MotionH1, MotionP } from '@/components/motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { fadeIn } from '@/components/motion/utils'
import { HeartHandshakeIcon } from 'lucide-react'

export const QuranHero = () => {
    return (
        <div className="w-full relative h-screen mx-auto flex flex-col px-5 lg:flex-row mt-10 md:mt-0">
            {/* Objects */}
            <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-accent via-accent to-background p-px rounded-lg">
                <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute top-0 end-0 -z-[1] w-48 h-48 bg-gradient-to-t from-accent via-accent to-background p-px rounded-full">
                <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>

            <div className="lg:w-[55%] flex flex-col items-center md:items-start justify-center">
                <MotionH1 variants={fadeIn('up', 0.2)}
                    initial='hidden' transition={{ duration: 1, ease: 'easeInOut' }} animate='show' exit='hidden'
                    className="text-3xl text-center font-extrabold md:text-[55px]/[55px] md:text-left bg-clip-text text-transparent dark:text-transparent bg-gradient-to-b from-primary to-primary/70">
                    Welcome to Ilhaf
                </MotionH1>
                <MotionP variants={fadeIn('up', 0.3)}
                    initial='hidden' transition={{ duration: 1, ease: 'easeInOut' }} animate='show' exit='hidden' className="mt-4 text-center opacity-60 md:text-xl lg:text-left">
                    Explore a vast collection of religious poetry including Noha, Manqabat, Dua, Hamd, and Naats, complete with their lyrics and detailed information.
                </MotionP>
                <MotionDiv variants={fadeIn('up', 0.5)}
                    initial='hidden' transition={{ duration: 1, ease: 'easeInOut' }} animate='show' exit='hidden' className="z-10 flex items-center justify-center md:justify-start gap-x-2.5 mt-10 lg:mt-6 xl:mt-10">
                    <Link className={buttonVariants({ size: 'lg' })} target='_blank' href="https://www.patreon.com/ilhaf">
                        <HeartHandshakeIcon className='mr-1 size-5' />
                        Support Us
                    </Link>
                    <Link className={buttonVariants({ variant: 'outline', size: 'lg', className: "border-primary/70" })} href="/lyrics">
                        Explore Lyrics
                    </Link>

                </MotionDiv>
            </div>

            <MotionDiv variants={fadeIn('left', 0.5)}
                initial='hidden' transition={{ duration: 1, ease: 'easeInOut' }} animate='show' exit='hidden'
                className="lg:w-[45%] flex flex-col items-center justify-center">
                <Image
                    width={500}
                    height={500}
                    className='dark:invert pointer-events-none'
                    src='/image.png'
                    alt={siteName}
                />
            </MotionDiv>
        </div>

    )
}
