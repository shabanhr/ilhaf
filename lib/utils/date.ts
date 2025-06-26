import ms from 'ms';

type timeAgoOptions = {
	withAgo?: boolean;
};

export const timeAgo = (timestamp: Date | string, { withAgo }: timeAgoOptions = {}): string => {
	if (timestamp.toString() === 'Invalid Date') return '';
	const diff = Date.now() - new Date(timestamp).getTime();
	if (diff < 1000) return 'Just now';
	return `${ms(diff)}${withAgo ? ' ago' : ''}`;
};

export function formatDate(date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}) {
	if (!date) return '';

	try {
		return new Intl.DateTimeFormat('en-US', {
			month: opts.month ?? 'long',
			day: opts.day ?? 'numeric',
			year: opts.year ?? 'numeric',
			...opts,
		}).format(new Date(date));
	} catch {
		return '';
	}
}
