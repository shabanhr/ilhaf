import { Reciter } from '@prisma/client';
import Link from 'next/link';
import { capitalize } from './utils';

export const arrayToString = (arr: string[]) => {
	const capitalizedNames = arr.map((name) => {
		return name
			.split(' ')
			.map((word) => capitalize(word))
			.join(' ');
	});

	if (capitalizedNames.length === 1) {
		return capitalizedNames[0];
	} else if (capitalizedNames.length === 2) {
		const lastElement = capitalizedNames.pop();
		return capitalizedNames + ' & ' + lastElement;
	} else {
		const lastElement = capitalizedNames.pop();
		return capitalizedNames.join(', ') + ' & ' + lastElement;
	}
};

export const getRecitersLinks = (arr: Reciter[]) => {
	const capitalizedNames = arr.map((item) => {
		const name = item.name
			.split(' ')
			.map((word) => capitalize(word))
			.join(' ');
		return (
			<Link key={item.id} href={`/lyrics/${item.slug}`} className="a">
				{name}
			</Link>
		);
	});

	// Handle formatting: single name, two names with '&', and more names with commas
	if (capitalizedNames.length === 1) {
		return capitalizedNames[0];
	} else if (capitalizedNames.length === 2) {
		return (
			<>
				{capitalizedNames[0]} & {capitalizedNames[1]}
			</>
		);
	} else {
		const lastElement = capitalizedNames.pop();
		return (
			<>
				{capitalizedNames.map((item, index) => (
					<span key={index}>
						{item}
						{index < capitalizedNames.length - 1 ? ', ' : ''}
					</span>
				))}{' '}
				& {lastElement}
			</>
		);
	}
};

export const convertLyricsArr = (english: string | null, urdu: string | null) => {
	return {
		english: english ? english.split('\n\n').map((p) => p.split('\n')) : undefined,
		urdu: urdu ? urdu.split('\n\n').map((p) => p.split('\n')) : undefined,
	};
};
