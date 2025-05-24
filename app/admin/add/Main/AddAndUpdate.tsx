'use client';
import React, { useState } from 'react';
import { ModalClose, ModalContent, ModalFooter, ModalBody, ModalHeader, ModalTitle } from '@/components/ui/modal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ButtonWithLoading } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { AddUpdateItem } from '../actions';
import { toast } from 'sonner';
import { ModelName, addNewItemSchema } from '../types';

type ListItemType = {
	id?: string;
	name: string;
};

interface Props {
	title: string;
	model: ModelName;
	item?: ListItemType;
	onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAndUpdate = ({ model, title, item, onOpenChange }: Props) => {
	let defaultValues: ListItemType = item || {
		id: undefined,
		name: '',
	};

	const form = useForm<z.infer<typeof addNewItemSchema>>({
		resolver: zodResolver(addNewItemSchema),
		defaultValues,
	});

	const {
		setValue,
		formState: { isSubmitting },
	} = form;
	const onSubmit = async (values: z.infer<typeof addNewItemSchema>) => {
		try {
			const res = await AddUpdateItem({ id: item?.id, model, values });
			if (res.success) {
				onOpenChange(false);
				return toast.success(res.message);
			} else {
				return toast.error(res.message);
			}
		} catch (error: any) {
			return console.log(error.message);
		}
	};

	return (
		<ModalContent>
			<ModalHeader>
				<ModalTitle>{title}</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={isSubmitting} placeholder={`Name Of ${title}`} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</ModalBody>

			<ModalFooter className="flex flex-row items-center justify-end">
				<ModalClose asChild>
					<Button variant="outline" className="w-full md:w-max" disabled={isSubmitting}>
						Close
					</Button>
				</ModalClose>
				<ButtonWithLoading
					onClick={form.handleSubmit(onSubmit)}
					type="submit"
					className="w-full md:w-max"
					isLoading={isSubmitting}
				>
					{item ? 'Update' : 'Add'}
				</ButtonWithLoading>
			</ModalFooter>
		</ModalContent>
	);
};

export default AddAndUpdate;
