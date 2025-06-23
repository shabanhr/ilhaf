import Logo from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMetadata } from '@/lib/utils/metadata';

export const metadata = getMetadata({
	title: 'Contact Us',
	description:
		'If you have any questions regarding our site or need help, you can contact us by filling out the form here.',
	url: `/contact`,
});

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid gap-12 md:grid-cols-5">
			<div className="bp-x pt-12 flex flex-col justify-center md:col-span-2 lg:col-span-3">
				<Logo size="md" />
				<h1 className="text-muted-foreground mt-2 text-sm font-normal text-balance">
					If you have any questions regarding our site or need help, please fill out the form here. We do our best to
					respond within 1 business day.
				</h1>
			</div>
			<div className="relativel bp md:col-span-3 lg:col-span-2">
				<Card>
					<CardHeader>
						<CardTitle>Contact Us</CardTitle>
					</CardHeader>
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</div>
	);
}
