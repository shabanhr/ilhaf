import AuthModel from '@/components/auth/auth-model';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="container min-h-screen max-w-5xl flex-grow py-10">{children}</main>
			<Footer />
			<AuthModel />
		</>
	);
}
