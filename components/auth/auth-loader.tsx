import React from 'react';
import { Skeleton } from '../ui/skeleton';
import AuthDivider from './auth-divider';

const AuthLoader = () => {
	return (
		<div className="w-full space-y-5">
			<Skeleton className="min-h-[14px] w-[50px]" />
			<Skeleton className="min-h-[42px] w-full rounded-lg" />
			<Skeleton className="min-h-[42px] w-full rounded-full" />
			<AuthDivider />
			<Skeleton className="mt-5 min-h-[42px] w-full rounded-full" />
		</div>
	);
};

export default AuthLoader;
