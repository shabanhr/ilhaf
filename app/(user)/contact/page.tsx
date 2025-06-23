import { getCurrentUser } from '@/lib/auth';
import { ContactForm } from './_components/contact-form';

export default async function ContactPage() {
	const user = await getCurrentUser();
	return (<ContactForm user={user} />);
}
