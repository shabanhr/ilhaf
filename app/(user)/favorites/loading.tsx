import { LyricsCardSkeleton } from '@/components/lyrics-card';
import React from 'react';

const loading = () => {
	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<LyricsCardSkeleton key={i} />
			))}
		</div>
	);
};

export default loading;
