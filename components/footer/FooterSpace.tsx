"use client";
import { usePlayer } from '@/hooks/use-player';
import React from 'react'

const FooterSpace = () => {

    const {item } = usePlayer();

    if(item){
        return (
            <div className='py-10' />
        )
    }

}

export default FooterSpace
