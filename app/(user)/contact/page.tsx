import { getCurrentUser } from '@/lib/auth';
import { ContactForm } from './_components/contact-form';
import { getMetadata } from '@/lib/utils/metadata';
import Logo from '@/components/Logo';

export const metadata = getMetadata({
	title: 'Contact Us',
	description:
		'If you have any questions regarding our site or need help, you can contact us by filling out the form here.',
	url: `/contact`,
});

export default async function ContactPage() {
	const user = await getCurrentUser();
	return (
		<div className="min-h-[calc(100vh-16rem)] grid md:grid-cols-5">
			<div className="bp flex flex-col justify-center md:col-span-2 lg:col-span-3 border-b md:border-b-0 md:border-r">
				<Logo size="md" />
				<h1 className="text-muted-foreground mt-2 text-sm font-normal text-balance">
					If you have any questions regarding our site or need help, please fill out the form here. We do our best to
					respond within 1 business day.
				</h1>
			</div>
			<div className="bp relative flex min-h-full items-center md:col-span-3 lg:col-span-2">
				<ContactForm user={user} />
			</div>
		</div>
	);
}
