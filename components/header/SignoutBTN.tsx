"use client";
import { signOut } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const SignoutBTN = () => {
    return <Button variant="outline" onClick={() => signOut()} className="w-full my-2"
        icon={<LogOut className='size-5' />}
    >Sign Out </Button>
}

export default SignoutBTN
