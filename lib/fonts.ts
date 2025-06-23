import { Noto_Sans_Arabic, Noto_Sans_Mono } from 'next/font/google';

export const fontSans = Noto_Sans_Arabic({
	subsets: ['arabic'],
	variable: '--font-sans',
});

export const fontMono = Noto_Sans_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});
