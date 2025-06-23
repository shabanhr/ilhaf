const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fullMonths: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getFullDay = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export const getFullDate = (timestamp: number): { date: string, slug: string } => {
    const d = new Date(timestamp);
    const date = `${fullMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    const slug = `${fullMonths[d.getMonth()].toLowerCase()}-${d.getDate()}-${d.getFullYear()}`
    return { date, slug }
}

export const getTimeAgo = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 30) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
        return `${months} mo${months === 1 ? '' : 's'} ago`;
    } else {
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
};

export function getAge(dob: Date) {
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
}


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