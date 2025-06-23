import React from 'react';
import { OverviewCard, OverviewCardSkeleton } from './overview-card';

interface Props {
	data: { [Key: string]: any };
}

export const DetailCardsSekaloton = ({ cards = 4 }: { cards?: number }) => {
	return (
		<div className="mb-5 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
			{Array.from({ length: cards }).map((_, i) => (
				<OverviewCardSkeleton key={i} d={false} />
			))}
		</div>
	);
};

const DetailCards = ({ data }: Props) => {
	return (
		<div className="mb-5 grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
			{Object.entries(data).map(([title, value], i) => (
				<OverviewCard key={i} title={title.split('x').join(' ')} value={value} />
			))}
		</div>
	);
};

export default DetailCards;
