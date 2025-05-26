import AuthModel from '@/components/auth/auth-model';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { cn } from '@/lib/utils';

export default function UsersLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
			<Header />
			<main
				className={cn(
					'relative container grow py-8',
					'before:bg-border before:absolute before:inset-y-0 before:-left-0 before:w-px',
					'after:bg-border after:absolute after:inset-y-0 after:-right-0 after:w-px',
				)}
			>
				{children}
			</main>
			<Footer />
			<AuthModel />
		</div>
	);
}
