import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { ORDivider } from './or-divider';

const AuthLoader = () => {
	return (
		<div>
			<Skeleton className="min-h-9 w-full rounded-md" />
			<ORDivider />
			<div className="grid gap-2">
				<Skeleton className="min-h-4 w-1/2 rounded-md" />
				<Skeleton className="min-h-9 w-full rounded-md" />
				<Skeleton className="min-h-9 w-full rounded-md" />
			</div>
		</div>
	);
};

export default AuthLoader;
