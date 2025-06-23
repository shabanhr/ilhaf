import { drive } from '@/config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const removeDash = (value: string) => {
	return value.replace(/-/g, ' ');
};

export const getAvatarUrl = (url?: string | null, seed?: string): string => {
	return url ? url : `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed || 'default')}`;
};

export const getInitialChar = (fullName: string) => {
	return fullName
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.slice(0, 2)
		.join('');
};

export const getImageURL = ({
	slug,
	oldSlug,
	keyOnly = false,
}: {
	slug: string;
	oldSlug?: string | null;
	keyOnly?: boolean;
}): string => {
	if (oldSlug) {
		return `${keyOnly ? '' : `${drive}/`}lyrics/${oldSlug.split('/')[1]}/image.webp`;
	}
	return `${keyOnly ? '' : `${drive}/`}lyrics/${slug}/image.webp`;
};

export const getLyricsURL = (slug: string): string => `/lyrics/${slug}`;

export const capitalize = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizeText = (value: string) => {
	return value.includes(' ')
		? value
				.split(' ')
				.map((word) => capitalize(word))
				.join(' ')
		: capitalize(value);
};

export function toSentenceCase(str: string) {
	return str
		.replace(/_/g, ' ')
		.replace(/([A-Z])/g, ' $1')
		.toLowerCase()
		.replace(/^\w/, (c) => c.toUpperCase())
		.replace(/\s+/g, ' ')
		.trim();
}

export function slugify(str: string) {
	return str
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');
}

export function unslugify(str: string) {
	return str.replace(/-/g, ' ');
}

export function normalizeText(str: string) {
	return str.toLowerCase().replace(/[^\w\s-]+/g, '');
}

export function normalizeYouTubeURL(url: string) {
	return url.length === 11 ? `https://youtu.be/${url}` : url;
}

export function isMacOs() {
	if (typeof window === 'undefined') return false;

	return window.navigator.userAgent.includes('Mac');
}

export function truncate(str: string, length: number) {
	return str.length > length ? `${str.substring(0, length)}...` : str;
}
