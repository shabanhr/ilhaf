import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Gulzar } from 'next/font/google';

export const fontSans = GeistSans;

export const fontMono = GeistMono;

export const fontUrdu = Gulzar({
	weight: ['400'],
	subsets: ['arabic'],
	variable: '--font-urdu',
});
