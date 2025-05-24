import React from 'react';
import { Separator } from '../ui/separator';
import GradientHeading from '../GradientHeading';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const TopReciters = () => {
	const reciters = [
		{
			name: 'Nadeem Sarwar',
			link: '/lyrics/nadeem-sarwar',
			image: '/reciter/nadeem-sarwar.webp',
		},
		{
			name: 'Farhan Ali Waris',
			link: '/lyrics/farhan-ali-waris',
			image: '/reciter/farhan-ali-waris.webp',
		},
		{
			name: 'Mir Hasan Mir',
			link: '/lyrics/mir-hasan-mir',
			image: '/reciter/mir-hasan-mir.webp',
		},
		{
			name: 'Mesum Abbas',
			link: '/lyrics/mesum-abbas',
			image: '/reciter/mesum-abbas.webp',
		},
		{
			name: 'Irfan Haider',
			link: '/lyrics/irfan-haider',
			image: '/reciter/irfan-haider.webp',
		},
		{
			name: 'Syed Raza Abbas Zaidi',
			link: '/lyrics/syed-raza-abbas-zaidi',
			image: '/reciter/syed-raza-abbas-zaidi.webp',
		},
	];

	return (
		<div className="w-full">
			<SectionTitle text="Top Reciters" />
			<div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
				{reciters.map((reciter, i) => (
					<Link
						href={reciter.link}
						key={i}
						className="flex items-center justify-start gap-2 rounded-md border p-2 duration-200 hover:shadow-lg dark:hover:shadow-[#555]"
					>
						<Image src={reciter.image} width={60} height={60} alt={reciter.name} className="rounded-full" />
						{reciter.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default TopReciters;
