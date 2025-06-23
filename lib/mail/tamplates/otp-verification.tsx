import { Section, Text } from '@react-email/components';
import { EmailTemplate } from '.';
import { siteName } from '@/config';

interface OtoEmailProps {
	email: string;
	otp: string;
}

export function OtpVerificationTemplate({ email, otp }: OtoEmailProps) {
	return (
		<EmailTemplate preview={`Your ${siteName} Verification Code`} heading="Sign In to Your Account">
			<Text className="mx-auto text-sm leading-6">
				Enter this code on the {siteName} sign-in page to access your account:
			</Text>
			<Section className="my-8">
				<div className="mx-auto w-fit rounded-xl px-6 py-3 text-center font-mono text-2xl font-semibold tracking-[0.25em]">
					{otp}
				</div>
			</Section>
			<Text className="text-sm leading-6 text-black">This code expires in 5 minutes.</Text>
			<Section className="my-4">
				<Text className="text-[12px] leading-6 text-neutral-500">
					This email was intended for <span className="text-black">{email}</span>. If you were not expecting this email,
					you can ignore this email.
				</Text>
			</Section>
		</EmailTemplate>
	);
}
