import AuthModel from "@/components/auth/auth-model";
import Footer from "@/components/footer";
import Header from "@/components/header"
// import { PlayerV2 } from "@/components/player";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className="container max-w-5xl min-h-screen py-10 flex-grow">
				{children}
				{/* <PlayerV2 /> */}
			</main>
			<Footer />
			<AuthModel />
		</>
	);
}
