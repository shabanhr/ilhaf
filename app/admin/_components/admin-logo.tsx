import { cn } from '@/lib/utils';
import React from 'react';

const AdminLogo = ({ isOpen }: { isOpen?: boolean }) => {
	return (
		<div
			className={cn(
				'mb-1 flex items-center justify-start gap-x-2 pl-4 transition-transform duration-300 ease-in-out',
				!isOpen ? 'translate-x-1' : 'translate-x-0',
			)}
		>
			<img src="/efferd.png" alt="efferd" width={34} height={34} className="mr-1 dark:invert" />
			<div
				className={cn(
					'flex flex-col items-start whitespace-nowrap transition-[transform,opacity,display] duration-300 ease-in-out',
					!isOpen ? 'hidden -translate-x-96 opacity-0' : 'translate-x-0 opacity-100',
				)}
			>
				<span className="font-bold">Efferd</span>
				<span className="-mt-1 text-xs opacity-70">Admin Penal</span>
			</div>
		</div>
	);
};

export default AdminLogo;
