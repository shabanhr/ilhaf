'use client';
import React from 'react';
import { InputWithIcon } from '../ui/input';
import { Button, ButtonWithLoading } from '../ui/button';
import { useForm, Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { userEmailFormSchema, OTPSchema, userNameFormSchema } from '@/types/zod';
import { authClient } from '@/lib/auth-client';
import { AtSignIcon, UserIcon } from 'lucide-react';
import { getErrorMessage, showErrorToast } from '@/lib/utils/error';
import { z } from 'zod/v4';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { useToggle } from '@/hooks/use-toggle';
import { toast } from 'sonner';
import { getUserByEmail } from '@/lib/actions/user';
import { usePathname } from 'next/navigation';

const LoginWithEmailSchema = z.object({
	email: userEmailFormSchema.shape.email,
	otp: OTPSchema.shape.otp.optional(),
	name: userNameFormSchema.shape.name.optional(),
});
type LoginWithEmailSchemaType = z.infer<typeof LoginWithEmailSchema>;

export function LoginWithEmail() {
	const [step, setStep] = React.useState<'email' | 'verify' | 'name'>('email');
	const [isNewUser, setIsNewUser] = React.useState<boolean | null>(null);
	const [resendTimer, setResendTimer] = React.useState(60);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setGoogleDisabled] = useToggle('auth-google-disabled');
	const [isEmailDisabled, setEmailDisabled] = useToggle('auth-email-disabled');
	const pathname = usePathname();

	const form = useForm({
		schema: LoginWithEmailSchema,
		defaultValues: { email: '' },
	});

	const isSubmitting = form.formState.isSubmitting;

	// Handle resend timer
	React.useEffect(() => {
		if (step === 'verify' && resendTimer > 0) {
			const timer = setInterval(() => {
				setResendTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(timer);
		}
	}, [step, resendTimer]);

	async function handleResendCode() {
		const email = form.getValues('email');
		if (!email) {
			toast.error('Please enter an email address first');
			return;
		}
		toast.promise(
			async () => {
				setEmailDisabled(true);
				const { error } = await authClient.emailOtp.sendVerificationOtp({
					email,
					type: 'sign-in',
				});
				if (error) throw new Error(error.message);
				setResendTimer(60);
			},
			{
				loading: 'Sending verification code...',
				success: 'Verification code sent to your email!',
				error: (err) => {
					return getErrorMessage(err);
				},
				finally() {
					setEmailDisabled(false);
				},
			},
		);
	}

	async function onSubmit(values: LoginWithEmailSchemaType) {
		try {
			setEmailDisabled(true);
			setGoogleDisabled(true);
			if (step === 'name' && values.name && isNewUser) {
				const { error } = await authClient.updateUser({
					name: values.name,
				});
				if (error) throw new Error(error.message);
				return (window.location.href = pathname);
			}
			if (step === 'email') {
				const existingUser = await getUserByEmail(values.email);
				setIsNewUser(!existingUser);
				const { error } = await authClient.emailOtp.sendVerificationOtp({
					email: values.email,
					type: 'sign-in',
				});
				if (error) throw new Error(error.message);
				setEmailDisabled(false);
				return setStep('verify');
			}
			if (step === 'verify' && values.otp) {
				const { error } = await authClient.signIn.emailOtp({
					email: values.email,
					otp: values.otp,
				});
				if (error) throw new Error(error.message);

				if (isNewUser) {
					setEmailDisabled(false);
					return setStep('name');
				} else {
					window.location.href = pathname;
				}
			}
		} catch (error) {
			console.error(error);
			showErrorToast(error);
			setEmailDisabled(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
				{step === 'email' && (
					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem className="animate-in fade-in duration-300">
								<FormDescription className="text-start text-xs">
									Enter your email address to sign in or create an account
								</FormDescription>
								<FormControl>
									<InputWithIcon
										disabled={isEmailDisabled || isSubmitting}
										icon={AtSignIcon}
										placeholder="your.email@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{step === 'verify' && (
					<FormField
						name="otp"
						control={form.control}
						render={({ field }) => (
							<FormItem className="animate-in fade-in flex flex-col items-center justify-center duration-300">
								<FormDescription className="text-start text-xs">
									We&apos;ve sent a 6-digit verification code to your inbox
								</FormDescription>
								<FormControl>
									<InputOTP
										disabled={isEmailDisabled || isSubmitting}
										maxLength={6}
										onComplete={form.handleSubmit(onSubmit)}
										autoFocus
										{...field}
									>
										<InputOTPGroup>
											{Array.from({ length: 6 }).map((_, i) => (
												<InputOTPSlot className="size-12" key={i} index={i} />
											))}
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{step === 'name' && (
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem className="animate-in fade-in duration-300">
								<FormDescription className="text-start text-xs">
									Please enter your name to complete your account setup
								</FormDescription>
								<FormControl>
									<InputWithIcon
										disabled={isEmailDisabled || isSubmitting}
										icon={UserIcon}
										placeholder="Your Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<ButtonWithLoading
					disabled={isEmailDisabled || isSubmitting}
					isLoading={isSubmitting}
					type="submit"
					className="w-full"
				>
					{step === 'email' && 'Continue with Email'}
					{step === 'verify' && 'Verify Code'}
					{step === 'name' && 'Create Account'}
				</ButtonWithLoading>
				{step === 'verify' && (
					<Button
						variant="ghost"
						size="sm"
						type="button"
						disabled={resendTimer > 0 || isEmailDisabled || isSubmitting}
						onClick={handleResendCode}
						className="text-muted-foreground mx-auto w-max"
					>
						{resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend verification code'}
					</Button>
				)}
			</form>
		</Form>
	);
}
