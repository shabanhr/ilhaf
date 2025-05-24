import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const loading = () => {
	return (
		<div className="flex h-[30rem] items-center justify-center">
			<Spinner size={50} />
		</div>
	);
};

export default loading;
