import Logo from '@/components/Logo';
import { Card } from '@/components/ui/card';
import { getMetadata } from '@/lib/utils/metadata';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = getMetadata({
	title: 'Login or Create an Account',
	url: `/auth`,
});

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const user = await getCurrentUser();
	if (user) return redirect('/');

	return (
		<div className="grid gap-4 md:grid-cols-5">
			<div className="flex flex-col justify-center bp-x pt-12 md:col-span-2 lg:col-span-3">
				<Logo size="md" />
				<h1 className="mt-2 text-lg font-normal">Login or Create an Account</h1>
			</div>
			<div className="relative md:col-span-3 lg:col-span-2 bp">
				<Card className="min-h-[50vh] w-full">{children}</Card>
			</div>
		</div>
	);
}
