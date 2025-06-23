import { Hr, Tailwind, Text } from '@react-email/components';
import { siteName, domain } from '@/config';

export function Footer() {
	return (
		<Tailwind>
			<Hr className="mx-0 my-6 w-full border border-neutral-200" />
			<Text className="text-[12px] text-neutral-500">
				{siteName}.
				<br />© All Rights Reserved {domain}
			</Text>
		</Tailwind>
	);
}
