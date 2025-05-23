import Image from 'next/image'
import React from 'react'

interface Props {
    size: "sm" | "md" | "lg"
}

const Logo: React.FC<Props> = ({ size }) => {

    let width: number = 76;
    let height: number = 24;


    switch (size) {
        case "sm":
            width = width;
            height = height;
            break;
        case "md":
            width = 134;
            height = 42;
            break;
        case "lg":
            width = 153;
            height = 48;
            break;
        default:
            break;
    }



    return <Image alt='Logo' width={width} height={height} className='dark:invert' src='/logo.png' />
}

export default Logo
