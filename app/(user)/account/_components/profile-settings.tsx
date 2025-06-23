'use client';
import React from 'react';
import { useForm, Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { userNameFormSchema, userEmailFormSchema } from '@/types/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputWithIcon } from '@/components/ui/input';
import { ButtonWithLoading } from '@/components/ui/button';
import { toast } from 'sonner';
import { AtSign, UserIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod/v4';
import { ProfilePicture } from './upload-profile-picture';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarUrl, getInitialChar } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { User } from 'better-auth';

const UpdateUserSchema = z.object({
	...userNameFormSchema.shape,
	...userEmailFormSchema.shape,
});
type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export function ProfileSettings({ user }: { user: User }) {
	const form = useForm({
		schema: UpdateUserSchema,
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
	});

	const router = useRouter();

	const { isSubmitting } = form.formState;

	const onSubmit = async (values: UpdateUserSchemaType) => {
		const { error } = await authClient.updateUser({ name: values.name });
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success('Profile Updated Successfully!');
		return;
	};
	const onUpload = async (file: File) => {
		const formData = new FormData();
		formData.set('type', 'user');
		formData.set('file', file);
		formData.set('id', user.id);

		const response = await fetch('/api/update-avatar', {
			method: 'POST',
			cache: 'no-store',
			body: formData,
		});

		const res = await response.json();

		if (!response.ok) {
			throw new Error(res.error || 'Something went wrong!');
		}
		const { error } = await authClient.updateUser({
			image: res.url,
		});
		if (error) {
			throw new Error(res.message || 'Something went wrong!');
		}
		router.refresh();

		return { success: response.ok };
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Edit Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mx-auto">
					<ProfilePicture onUpload={onUpload}>
						<Avatar className="relative mx-auto h-20 w-20 cursor-pointer hover:opacity-50">
							<AvatarImage src={getAvatarUrl(user.image, user.id)} />
							<AvatarFallback className="text-2xl font-bold">{getInitialChar(user.name)}</AvatarFallback>
						</Avatar>
					</ProfilePicture>
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
										<InputWithIcon disabled={isSubmitting} icon={UserIcon} placeholder="Enter Your Name" {...field} />
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
						<ButtonWithLoading type="submit" isLoading={isSubmitting} className="w-full">
							Update
						</ButtonWithLoading>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
