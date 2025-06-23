import { siteName } from '@/config';
import { Heading, Text, Hr, Section } from '@react-email/components';
import { ContactTypes } from '@/types/zod';
import { EmailTemplate } from '.';

export const ContactTemplateUser = ({ name, email, topic, message }: ContactTypes) => (
	<EmailTemplate preview={`Thank You for Contacting Us!`} heading="Thank You for Contacting Us!">
		<Heading className="my-5 text-lg">Thank You for Contacting Us!</Heading>
		<Hr />
		<Text>Dear {name},</Text>
		<Text>
			Thank you for contacting us through our Contact Us page. We appreciate you taking the time to reach out to us.
		</Text>
		<Text>
			We have received your message and will get back to you as soon as possible. Here are the details of your inquiry:
		</Text>
		<Section className="border-primary flex items-center justify-start rounded-xl border px-5">
			<Text>Your Name: {name},</Text>
			<Hr />
			<Text>Your Email: {email}</Text>
			<Hr />
			<Text>Your Topic: {topic}</Text>
			<Hr />
			<Text>Your Message: {message}</Text>
		</Section>
		<Text>
			Rest assured, your concerns are important to us, and we are committed to providing you with the best possible
			assistance.
		</Text>
	</EmailTemplate>
);

export const ContactTemplateAdmin: React.FC<ContactTypes> = ({ name, email, topic, message }) => (
	<EmailTemplate preview={`Contact Us Message from: ${siteName}`} heading="Contact Us Message from: {siteName}">
		<Heading className="my-5 text-lg">Contact Us Message from: {siteName}</Heading>
		<Hr />
		<Section className="border-primary flex items-center justify-start rounded-xl border px-5">
			<Text className="">Name: {name}</Text>
			<Hr />
			<Text>Email: {email}</Text>
			<Hr />
			<Text>Topic: {topic}</Text>
			<Hr />
			<Text>Message: {message}</Text>
		</Section>
	</EmailTemplate>
);
