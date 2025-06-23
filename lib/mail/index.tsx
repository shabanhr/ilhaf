'use server';

import { ContactTemplateAdmin, ContactTemplateUser } from './tamplates/contact';
import { Emailfrom, siteName } from '@/config';
import { ContactTypes } from '@/types/zod';
import { render } from '@react-email/render';
import { createTransport } from 'nodemailer';
import { getErrorMessage } from '../utils/error';
import { OtpVerificationTemplate } from './tamplates/otp-verification';

const transport = createTransport({
	host: process.env.EMAIL_SERVER_HOST,
	port: Number(process.env.EMAIL_SERVER_PORT),
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD,
	},
});

export async function sendVerificationOTPAction({ email, otp }: { email: string; otp: string }) {
	try {
		if (!email) {
			throw new Error('Email is required');
		}
		if (!otp) {
			throw new Error('OTP is required');
		}

		await transport.sendMail({
			subject: `Sign In to Your ${siteName} Account`,
			to: email,
			from: Emailfrom,
			text: `Enter this code on the ${siteName} sign-in page to access your account: ${otp}`,
			html: await render(<OtpVerificationTemplate email={email} otp={otp} />),
		});
	} catch (error) {
		console.error(`Failed to send OTP email to ${email}:`, error);
		throw new Error(getErrorMessage(error));
	}
}



export async function sendContactEmail(data: ContactTypes) {
	const { name, email, topic, message } = data;

	let success: boolean = true;
	await transport.sendMail(
		{
			to: 'sshahaider@gmail.com',
			from: Emailfrom,
			replyTo: email,
			subject: `Contact Us Message from: ${siteName}`,
			text: `name, ${name} email ${email}, topic ${topic}, message ${message}`,
			html: await render(<ContactTemplateAdmin {...data} />),
		},
		(err: any) => {
			if (err) {
				success = false;
			}
		},
	);

	await transport.sendMail({
		to: email,
		from: Emailfrom,
		subject: `Thank You for Contacting Us!`,
		text: `name, ${name} email ${email}, topic ${topic}, message ${message}`,
		html: await render(<ContactTemplateUser {...data} />),
	});

	return { success };
}
