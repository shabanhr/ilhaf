'use client';
import { signOut } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const SignoutBTN = () => {
	return (
		<Button variant="outline" onClick={() => signOut()} className="my-2 w-full">
			<LogOut />
			Sign Out
		</Button>
	);
};

export default SignoutBTN;
