"use client";
import { useSession } from 'next-auth/react'
import React from 'react'
import DropDown from './DropDown';
import { Button, buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useAuthModel } from '@/hooks/use-auth-model';

const UserSession = () => {
    const { setAuthOpen } = useAuthModel();

    const { data: session, status } = useSession();
    const user = session?.user;

    const loading = status === 'loading';

    return (
        <div className="hidden items-center md:flex">
            {loading ? <Skeleton className='w-16 h-10' /> : (
                user?.email ?
                    (
                        <DropDown user={user} />
                    )
                    :
                    (
                        <Button
                            onClick={() => setAuthOpen({ open: true })}
                            variant="outline"
                            className=""
                        >
                            Log in
                        </Button>
                    )
            )}
        </div >
    )
}

export default UserSession
