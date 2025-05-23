"use client";
import { Button } from '@/components/ui/button';
import React from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react';
import { usePlayer } from '@/hooks/use-player';

interface PlayerBtnProps {
    slug: string;
    title: string;
    reciterName: string;
    reciterSlug: string;
}


const PlayBtn = (props: PlayerBtnProps) => {

    const { slug } = props;
    const { item, setItem, isPlaying, setPlaying } = usePlayer();

    const handeClick = () => {
        if (item?.slug === slug && isPlaying) {
            setPlaying(false);
        } else {
            setItem(props)
            setPlaying(true);
        }
    }

    return (
        <Button className='bg-primary rounded-full size-12 p-0' onClick={handeClick}>
            {item?.slug === slug && isPlaying ? (
                <PauseIcon className="size-6" />
            ) : (
                <PlayIcon className="size-6" />
            )}
        </Button>

    )
}

export default PlayBtn
