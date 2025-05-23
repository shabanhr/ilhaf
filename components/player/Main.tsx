"use client";

import React, { useRef, useState, useEffect } from 'react';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAudioURL, getImageURL, getLyricsURL } from '@/lib/utils';
import { usePlayer } from '@/hooks/use-player';
import PlayerMenu from './menu';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';
import { PlayerSlider } from './PlayerSlider';
import Spinner from '../Spinner';
import { MotionDiv } from '../motion';
import { motion } from 'framer-motion';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const MainPlayer: React.FC = () => {
    const { item, setItem, isPlaying, setPlaying, volume, loop } = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSeek(0)
        setDuration(0)
        setBuffered([])
        setLoading(true)
    }, [item]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setPlaying(false)
            } else {
                audioRef.current.play();
                setPlaying(true)
            }
        }
    };

    const handleTimeChange = (value: number[]) => {
        const time = value[0];
        setSeek(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.loop = loop;
            const updateDuration = () => {
                setDuration(audioRef.current?.duration || 0);
            };
            audioRef.current.addEventListener('loadedmetadata', updateDuration);
            return () => {
                audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [volume, item, loop]);


    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);



    if (!item) return null;

    const { title, slug, reciterName, reciterSlug } = item;
    const mp3Url = getAudioURL(slug);
    const src = getImageURL(slug);
    const url = getLyricsURL(reciterSlug, slug);

    const onTimeUpdate = () => {
        setSeek(audioRef.current?.currentTime || 0);
    };

    const onEnded = () => setItem(null);
    const onCanPlay = () => setLoading(false);
    const onSeeking = () => setLoading(true);
    const onSeeked = () => setLoading(false);
    const onPlay = () => {
        audioRef.current?.play();
        setPlaying(true)
    };
    const onPause = () => {
        audioRef.current?.pause();
        setPlaying(false)
    };


    const onProgress = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.currentTarget;
        const bufferedRanges: number[] = [];
        for (let i = 0; i < audio.buffered.length; i++) {
            bufferedRanges.push(audio.buffered.end(i));
        }
        setBuffered(bufferedRanges);
    };

    const playerVariants = {
        hidden: { y: "100%", opacity: 0 }, // Slide down out of view
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }, // Slide up into view
    };
    return (
        <motion.div
            variants={playerVariants}
            initial="hidden"
            animate={item ? "visible" : "hidden"}
            className="flex flex-col px-2 md:px-4 items-center relative"
        >
            <PlayerSlider
                value={[seek]}
                max={duration}
                width={`${(buffered[0] / duration) * 100}%`}
                onValueChange={handleTimeChange}
                className="cursor-pointer relative"
            // disabled={loading} // Disable slider if loading
            />
            <audio
                className='hidden'
                ref={audioRef}
                src={mp3Url}
                autoPlay
                preload="auto"
                onCanPlay={onCanPlay}
                onPlay={onPlay}
                onPause={onPause}
                onTimeUpdate={onTimeUpdate}
                onEnded={onEnded}
                onSeeking={onSeeking}
                onSeeked={onSeeked}
                onProgress={onProgress}
            />
            <div className="flex items-center justify-between w-full pt-1 pb-2 bg-background">
                <div className="flex gap-x-2 items-center justify-center">
                    <ImageWithFallback src={src} height={36} width={64} alt="" className="rounded aspect-video" />
                    <div className="">
                        <Link href={url} className="text-sm md:text-lg font-normal md:font-bold">
                            <MotionDiv layoutId="title">{title}</MotionDiv>
                        </Link>
                        <div className="text-xs font-thin opacity-80">{reciterName}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MotionDiv className="hidden md:flex">
                        {formatTime(seek)} / {formatTime(duration)}
                    </MotionDiv>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handlePlayPause}
                        disabled={loading}
                    >
                        {loading ? (<Spinner active invert />)
                            : (
                                isPlaying ? (
                                    <PauseIcon className="w-6 h-6" />
                                ) : (
                                    <PlayIcon className="w-6 h-6" />
                                ))}
                    </Button>
                    <PlayerMenu />
                </div>
            </div>
        </motion.div>
    );
};

export default MainPlayer;
