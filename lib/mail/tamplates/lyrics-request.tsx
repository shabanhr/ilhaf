import React from 'react';
import { EmailTemplate } from '.';
import { siteName } from '@/config';
import { Section, Text } from '@react-email/components';

export function LyricsRequestTemplate() {
	return (
		<EmailTemplate
			preview={`Thank you for your request to add lyrics to ${siteName}.`}
			heading="We have received your request to add lyrics!"
		>
			<Text className="mx-auto text-sm leading-6">Thank you for your request to add lyrics to {siteName}.</Text>
			<Section className="my-4">
				<Text className="text-[12px] leading-6 text-neutral-500">
					We will review your request and get back to you as soon as possible.
				</Text>
			</Section>
		</EmailTemplate>
	);
}
