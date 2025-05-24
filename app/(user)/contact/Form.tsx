'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { SendContactEmails } from './actions';
import { ContactSchema, ContactTypes } from '@/types/zod';
import { ButtonWithLoading } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TagIcon } from 'lucide-react';
import { AtSign, UserIcon } from 'lucide-react';
import { SessionUser } from '@/types/auth';

interface Props {
	user?: SessionUser;
}

const ContactForm: React.FC<Props> = ({ user }) => {
	let defaultValues = {
		name: '',
		email: '',
		topic: '',
		message: '',
	};

	if (user) {
		defaultValues = {
			name: user.name,
			email: user.email,
			topic: '',
			message: '',
		};
	}

	const onSubmit = async (values: ContactTypes) => {
		try {
			const res = await SendContactEmails(values);
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const form = useForm<ContactTypes>({
		resolver: zodResolver(ContactSchema),
		defaultValues,
	});
	const {
		formState: { isSubmitting },
	} = form;
	return (
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
								<InputWithIcon disabled={isSubmitting} icon={AtSign} placeholder="Enter Your Email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="topic"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Topic</FormLabel>
							<FormControl>
								<InputWithIcon disabled={isSubmitting} icon={TagIcon} placeholder="Enter Your Topic" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea disabled={isSubmitting} placeholder="Enter Your message" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ButtonWithLoading type="submit" isLoading={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</ButtonWithLoading>
			</form>
		</Form>
	);
};

export default ContactForm;
