'use server';

import { sendContactEmail } from '@/lib/mail';
import { ContactSchema, ContactTypes } from '@/types/zod';

export const SendContactEmails = async (values: ContactTypes) => {
	const validatedFields = ContactSchema.safeParse(values);
	if (!validatedFields.success) {
		return { success: false, message: 'Invalid fields!' };
	}
	if (validatedFields.data.token) {
		const formData = new FormData();
		formData.append('secret', process.env.TURNSTILE_SECRET_KEY || '1x00000000000000000000AA');
		formData.append('response', validatedFields.data.token);

		const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body: formData,
		});

		const outcome = await result.json();
		if (!outcome.success) {
			return { success: false, message: 'Invalid Captcha!' };
		}
	}

	const res = await sendContactEmail(validatedFields.data);

	if (res.success) {
		return { success: true, message: 'Message sent successfully!' };
	} else {
		return { success: false, message: 'Somthing went Wrong!' };
	}
};
