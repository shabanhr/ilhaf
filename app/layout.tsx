import './globals.css';
import { getMetadata } from '@/lib/utils/metadata';
import { RootProviders } from '@/components/providers';
import { fontSans, fontMono } from '@/lib/fonts';
import { CustomScripts } from '@/components/custom-scripts';
import { cn } from '@/lib/utils';

export const metadata = getMetadata({
	description:
		'ilhaf.com is a website for getting and read the lyrics of Manqabats and Nohay, it user friendly website.',
	url: '/',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<CustomScripts />
			<head />
			<body
				className={cn(
					'bg-background text-foreground min-h-svh overscroll-none font-sans antialiased',
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<RootProviders themeProps={{ attribute: 'class', defaultTheme: 'light', disableTransitionOnChange: true }}>
					{children}
				</RootProviders>
			</body>
		</html>
	);
}
