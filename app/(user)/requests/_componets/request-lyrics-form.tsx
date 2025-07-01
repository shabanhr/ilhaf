'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form';
import React from 'react';
import { requestLyricsSchema, RequestLyricsSchemaType } from '../_lib/types';
import { toast } from 'sonner';
import { showErrorToast } from '@/lib/utils/error';
import { Input } from '@/components/ui/input';
import { Button, ButtonWithLoading } from '@/components/ui/button';
import { SmartPop, SmartPopTrigger, SmartPopContent } from '@/components/ui/smart-pop';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { LyricsTypes } from '@/config/data';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatetimePicker } from '@/components/ui/datetime-picker';
import { Textarea } from '@/components/ui/textarea';
import { createLyricsRequest } from '../_lib/actions';
import { useQueryState } from 'nuqs';

export function RequestLyricsForm({ disabled }: { disabled?: boolean }) {
	const [triggerState, setTriggerState] = React.useState<boolean>(false);
	const { '1': setTab } = useQueryState('tab');

	const form = useForm({
		schema: requestLyricsSchema,
		defaultValues: {
			dop: new Date(),
		},
	});

	const {
		setValue,
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (data: RequestLyricsSchemaType) => {
		try {
			const { success, message } = await createLyricsRequest(data);
			if (!success) {
				return toast.error(message);
			}
			setTab('requests');
			toast(message);
		} catch (error) {
			showErrorToast(error);
		}
	};

	const IsDisabled = isSubmitting || disabled;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="bp relative">
				<div className="grid gap-4 md:grid-cols-2">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title *</FormLabel>
								<FormControl>
									<Input disabled={IsDisabled} placeholder="Enter Title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="video"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Youtube URL *</FormLabel>
								<FormControl>
									<Input disabled={IsDisabled} placeholder="Enter Video URL" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Type (optional)</FormLabel>
								<FormControl>
									<SmartPop open={triggerState} onOpenChange={setTriggerState}>
										<SmartPopTrigger>
											<Button
												variant="outline"
												role="combobox"
												disabled={IsDisabled}
												className="w-full justify-between capitalize"
											>
												{field.value ? LyricsTypes.find((i) => i.id === field.value)?.name : 'Select Type'}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</SmartPopTrigger>
										<SmartPopContent>
											<Command>
												<CommandInput placeholder="Filter ..." />
												<CommandList>
													<CommandEmpty>No results found.</CommandEmpty>
													<CommandGroup>
														{LyricsTypes.map((item, i) => (
															<CommandItem
																key={i}
																value={item.id}
																onSelect={(value) => {
																	setValue('type', value);
																	setTriggerState(false);
																}}
															>
																{item.name}
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		item.id === field.value ? 'opacity-100' : 'opacity-0',
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</SmartPopContent>
									</SmartPop>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="reciters"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Reciter(s) (optional)</FormLabel>
								<FormControl>
									<Input disabled={IsDisabled} placeholder="Enter Reciter(s) Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="writers"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Writer(s) (optional)</FormLabel>
								<FormControl>
									<Input disabled={IsDisabled} placeholder="Enter Writer(s) Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dop"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col">
								<FormLabel>Date Of Publish *</FormLabel>
								<FormControl>
									<DatetimePicker
										disabled={IsDisabled}
										value={field.value}
										onChange={field.onChange}
										format={[['months', 'days', 'years'], []]}
										className="w-full"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="english"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col">
								<FormLabel>English Lyrics (optional)</FormLabel>
								<FormControl>
									<Textarea disabled={IsDisabled} className="h-60" placeholder="Enter English Lyrics" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="urdu"
						render={({ field }) => (
							<FormItem className="flex w-full flex-col">
								<FormLabel>Urdu Lyrics (optional)</FormLabel>
								<FormControl>
									<Textarea disabled={IsDisabled} dir="rtl" className="h-60" placeholder="اردو  درج کریں۔" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="mt-3 flex w-full justify-end border-t pt-3">
					<ButtonWithLoading className="w-full md:w-1/2" type="submit" disabled={IsDisabled} isLoading={isSubmitting}>
						Submit
					</ButtonWithLoading>
				</div>
			</form>
		</Form>
	);
}
