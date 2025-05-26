'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SigninSchema } from '@/types/zod';
import { ButtonWithLoading } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input';
import { MotionDiv } from '@/components/motion';
import { providers } from '@/config';
import { AtSign, MailCheck, MailWarning } from 'lucide-react';
import AuthDivider from './auth-divider';
import { GoogleIcon } from '../icons';

const Signin = () => {
	const [prov, setProv] = useState<string>('');
	const [emailSent, setEmailSent] = useState<any>({});

	type Inputs = z.infer<typeof SigninSchema>;
	const form = useForm<Inputs>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			email: '',
		},
	});

	const emailSubmit = async (values: z.infer<typeof SigninSchema>) => {
		try {
			setProv('email');
			setEmailSent(await signIn('email', { email: values.email, redirect: false }));
		} catch (error: any) {
			setProv('');
			console.log(error.message);
		}
	};

	const loginWithProvider = async (provider: string) => {
		try {
			setProv(provider);
			await signIn(provider);
		} catch (error: any) {
			setProv('');
			console.log(error.message);
		}
	};

	return (
		<>
			{emailSent.status && (
				<MotionDiv
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="text-muted-foreground min-h-full space-y-3 text-center text-xs"
				>
					{emailSent.error ? <MailWarning className="mx-auto size-8" /> : <MailCheck className="mx-auto size-8" />}
					<h2 className="text-foreground font-mono text-2xl font-semibold">
						{emailSent.error ? 'Something Went Wrong!' : 'Check Your Mail Box!'}
					</h2>
					<p className="text-xs">{emailSent.error ? 'Try Again Later' : 'We sent a magic link to'}</p>
					{!emailSent.error && (
						<>
							<p className="text-foreground text-xs">
								<b>{form.getValues('email')}</b>
							</p>
							<p className="text-xs">Click the link to Sign In or Sign Up</p>
						</>
					)}
				</MotionDiv>
			)}

			{!emailSent.status && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(emailSubmit)} className="w-full space-y-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<InputWithIcon disabled={prov !== ''} icon={AtSign} placeholder="Enter Your Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ButtonWithLoading isLoading={prov === 'email'} type="submit" className="w-full">
							Submit
						</ButtonWithLoading>
					</form>

					<AuthDivider />

					<div className="flex w-full flex-col items-center justify-center gap-y-2 text-xl font-semibold">
						{providers.map((provider) => (
							<ButtonWithLoading
								key={provider}
								onClick={() => loginWithProvider(provider)}
								isLoading={prov === provider}
								type="button"
								className="w-full capitalize"
								icon={GoogleIcon}
							>
								<span>Continue With {provider}</span>
							</ButtonWithLoading>
						))}
					</div>
				</Form>
			)}
		</>
	);
};
export default Signin;
