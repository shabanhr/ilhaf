import { confirmUser } from '@/lib/auth';
import { BorderSeparator, PageHeading } from '@/components/sheard';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	await confirmUser();

	return (
		<div className="min-h-screen">
			<div className="flex items-center justify-center bp">
				<PageHeading>My Account</PageHeading>
			</div>
			<BorderSeparator />
			<div className="flex w-full flex-col bp items-center">{children}</div>
		</div>
	);
}
