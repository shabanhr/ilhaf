'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import ProfilePicture from './ProfilePicture';
import { UpdateSchema } from '@/types/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputWithIcon } from '@/components/ui/input';
import { ButtonWithLoading } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { redirect } from 'next/navigation';
import { SessionUser } from '@/types/auth';
import { updateUserById } from './actions';
import { AtSign, UserIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function Main({ user }: { user: SessionUser }) {
	if (!user?.name || !user?.email) {
		return redirect('/auth');
	}

	const [status, setStatus] = useState<{
		success: boolean;
		message: string;
		loading: boolean;
	}>({
		success: false,
		message: '',
		loading: false,
	});

	type Inputs = z.infer<typeof UpdateSchema>;
	const form = useForm<Inputs>({
		resolver: zodResolver(UpdateSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
	});

	const { update } = useSession();

	if (!user?.name || !user?.email) {
		return redirect('/auth');
	}

	const onSubmit = async (values: z.infer<typeof UpdateSchema>) => {
		setStatus({ success: false, message: '', loading: true });
		const res = await updateUserById(user.id, values);
		if (res.success) {
			toast.success(res.message);
			update({
				name: values.name,
			});
			return setStatus({ success: true, message: res.message, loading: false });
		} else {
			toast.error(res.message);
			return setStatus({ success: false, message: res.message, loading: false });
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mx-auto">
					<ProfilePicture user={user} />
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<InputWithIcon icon={UserIcon} placeholder="Enter Your Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<InputWithIcon disabled icon={AtSign} placeholder="Enter Your Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ButtonWithLoading type="submit" isLoading={status.loading} className="w-full">
							Update
						</ButtonWithLoading>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
