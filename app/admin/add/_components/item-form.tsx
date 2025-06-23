'use client';
import React from 'react';
import { Button, ButtonWithLoading } from '@/components/ui/button';
import { useForm, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createOrUpdateItem } from '../_lib/actions';
import { toast } from 'sonner';
import { ModelName, dataType, itemSchema, itemSchemaType } from '../_lib/types';
import { showErrorToast } from '@/lib/utils/error';

interface Props {
	title: string;
	model: ModelName;
	item?: dataType;
	onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
	onComplete: () => void;
}

export function ItemForm({ model, title, item, onOpenChange, onComplete }: Props) {
	const form = useForm({
		schema: itemSchema,
		defaultValues: {
			name: item?.name || '',
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (values: itemSchemaType) => {
		try {
			const resMessage = await createOrUpdateItem({ id: item?.id, model, values });
			onOpenChange(false);
			onComplete();
			return toast.success(resMessage);
		} catch (error) {
			showErrorToast(error);
		}
	};

	return (
		<Form {...form}>
			<form className="space-y-8">
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
				<div className="flex items-center justify-end gap-2">
					<Button
						variant="outline"
						type="button"
						className="w-full md:w-max"
						disabled={isSubmitting}
						onClick={() => onOpenChange(false)}
					>
						Close
					</Button>
					<ButtonWithLoading
						type="button"
						onClick={form.handleSubmit(onSubmit)}
						className="w-full md:w-max"
						isLoading={isSubmitting}
					>
						{item ? 'Update' : 'Add'}
					</ButtonWithLoading>
				</div>
			</form>
		</Form>
	);
}
