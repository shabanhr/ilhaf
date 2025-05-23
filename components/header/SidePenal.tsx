'use client';

import React from 'react'
import LinkItem from './LinkItem';
import SignoutBTN from './SignoutBTN';
import { User } from 'next-auth';
import {  HomeIcon, LogIn, MessageCircleWarning, UserIcon } from 'lucide-react';
import { FavoriteBeforeIcon, LyricsIcon } from '../icons';
import { MenuIcon } from '../icons';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';


const Links = [
    {
        title: "Home",
        link: '/',
        icon: <HomeIcon className='size-5' />
    },
    {
        title: "Lyrics",
        link: "/lyrics",
        icon: <LyricsIcon className="size-5" />
    },
    // {
    //     title: "Quran",
    //     link: "/quran",
    //     icon: <BookOpenIcon className="size-4" />
    // },
    {
        title: "My Account",
        link: '/account',
        icon: <UserIcon className='size-5' />
    },
    {
        title: "My Favorites",
        link: "/favorites",
        icon: <FavoriteBeforeIcon className="size-5" />
    },
    {
        title: "My Reports",
        link: "/reports",
        icon: <MessageCircleWarning className="size-5" />
    }
]
    ;


const SidePenal = () => {

    const { data: session, status } = useSession();
    const user = session?.user;

    const loading = status === 'loading';

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <MenuIcon className='size-5' />
                </Button>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col sm:max-w-sm max-w-[60%]' side="left">
                <SheetHeader className='flex-row  items-center justify-start w-full'>
                    <Logo size='sm' />
                </SheetHeader>
                <div className="flex flex-col items-start justify-between  h-full">
                    <div className='flex flex-col gap-x-2 mt-5 items-center h-max w-full'>
                        {Links.map((item, i) => (
                            <LinkItem close key={i} item={item} />
                        ))}
                    </div>

                    <div className='w-full flex justify-center'>
                        {user ? (
                            <SignoutBTN />
                        )
                            :
                            (
                                <LinkItem item={
                                    {
                                        title: "SignIn",
                                        link: "/auth",
                                        icon: <LogIn className='size-5' />
                                    }
                                } />
                            )
                        }
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    );

}

export default SidePenal;