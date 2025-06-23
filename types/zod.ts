import * as z from 'zod/v4';

export const userNameFormSchema = z.object({
	name: z.string().min(3).max(32),
});
export type userNameFormType = z.infer<typeof userNameFormSchema>;

export const userEmailFormSchema = z.object({
	email: z.string().email(),
});

export type userEmailFormType = z.infer<typeof userEmailFormSchema>;

export const OTPSchema = z.object({
	otp: z.string().length(6, 'Invalid OTP!'),
});
export type OTPSchemaType = z.infer<typeof OTPSchema>;

export const ContactSchema = z.object({
	...userNameFormSchema.shape,
	...userEmailFormSchema.shape,
	topic: z.string().min(2, 'Topic must be at least 2 characters').max(50, 'Topic must be less than 45 characters'),
	message: z.string(),
});
export type ContactTypes = z.infer<typeof ContactSchema>;
