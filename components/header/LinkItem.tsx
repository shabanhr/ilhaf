"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SheetClose } from '../ui/sheet';

interface Item {
    title: string;
    link: string;
    icon: React.ReactNode;
}

interface Props {
    item: Item;
    className?: string;
    close?: boolean;
    isExternal?: boolean
}

const LinkItem: React.FC<Props> = ({ item, className, close, isExternal }) => {
    const pathname = usePathname();
    const isHome = item.title === "Home";
    const isActive = isHome ? pathname === "/" : pathname.startsWith(item.link);

    const linkClassNames = cn(
        "my-1 w-full flex flex-row text-sm items-center justify-start md:justify-center gap-x-2 p-2 rounded-md hover:bg-accent duration-200",
        isActive && "bg-accent",
        className
    );

    if (close) {
        return (
            <SheetClose asChild>
                <Link href={item.link} className={linkClassNames} target={isExternal ? "_blank" : undefined}>
                    {item.icon} {item.title}
                </Link>
            </SheetClose>
        )
    } else {
        return (
            <Link href={item.link} className={linkClassNames} target={isExternal ? "_blank" : undefined}>
                {item.icon} {item.title}
            </Link>
        )
    }
};

export default LinkItem;
