'use server';

import { ContactTemplateAdmin, ContactTemplateUser } from './tamplates/contact';
import { Emailfrom, siteName } from '@/config';
import { ContactTypes } from '@/types/zod';
import { render } from '@react-email/render';
import { createTransport } from 'nodemailer';
import { getErrorMessage } from '../utils/error';
import { OtpVerificationTemplate } from './tamplates/otp-verification';
import { LyricsRequestTemplate } from './tamplates/lyrics-request';

const transport = createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_SECURE === 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
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

export async function sendLyricsRequestEmail({ email }: { email: string }) {
	try {
		if (!email) {
			throw new Error('Email is required');
		}

		await transport.sendMail({
			subject: `We have received your request to add lyrics!`,
			to: email,
			from: Emailfrom,
			text: `Thank you for your request to add lyrics to ${siteName}. We have received your request and will get back to you as soon as possible.`,
			html: await render(<LyricsRequestTemplate />),
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
