import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { MultiSelect } from './multi-select';
import { SmartPop, SmartPopTrigger, SmartPopContent } from '@/components/ui/smart-pop';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn, slugify } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { LyricsTypes } from '@/config/data';
import { LyricsWithData } from '@/types';

interface Props {
	form: UseFormReturn<any>;
	IsDisabled: boolean;
	lyric?: LyricsWithData;
}

const LyricsInputs = ({ form, IsDisabled, lyric }: Props) => {
	const { setValue, watch } = form;
	const [triggerState, setTriggerState] = useState<boolean>(false);
	const [dateTrigger, setDateTrigger] = useState<boolean>(false);
	const title = watch('title') || '';
	return (
		<div className="grid gap-8 md:grid-cols-2">
			<FormField
				control={form.control}
				name="type"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Type</FormLabel>
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
															className={cn('ml-auto h-4 w-4', item.id === field.value ? 'opacity-100' : 'opacity-0')}
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
				name="dop"
				render={({ field }) => (
					<FormItem className="flex w-full flex-col">
						<FormLabel>Date Of Publish</FormLabel>
						<FormControl>
							<SmartPop open={dateTrigger} onOpenChange={setDateTrigger}>
								<SmartPopTrigger>
									<Button
										disabled={IsDisabled}
										variant="outline"
										className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
									>
										{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</SmartPopTrigger>
								<SmartPopContent>
									<Calendar
										mode="single"
										captionLayout="dropdown"
										startMonth={new Date(1990, 0)}
										endMonth={new Date()}
										selected={new Date(field.value as Date)}
										onSelect={field.onChange}
									/>
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
						<FormLabel>Reciters</FormLabel>
						<FormControl>
							<MultiSelect
								title="Reciters"
								model="reciter"
								disabled={IsDisabled || !!lyric}
								defaultValue={field.value}
								onValueChange={(value) => {
									const reciterSlugs = value.map((v) => v.slug || slugify(v.name)).join('-');
									setValue(
										'reciters',
										value.map((v) => v.id),
									);
									const slug = reciterSlugs.length > 0 ? `${reciterSlugs}-${slugify(title.trim())}` : slugify(title.trim());
									setValue('slug', slug);
								}}
								placeholder="Select Reciters"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div></div>
			<FormField
				control={form.control}
				name="writers"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Writers</FormLabel>
						<FormControl>
							<MultiSelect
								disabled={IsDisabled}
								title="Writers"
								model="writer"
								defaultValue={field.value}
								onValueChange={(value) =>
									setValue(
										'writers',
										value.map((v) => v.id),
									)
								}
								placeholder="Select options"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="topics"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Topics</FormLabel>
						<FormControl>
							<MultiSelect
								disabled={IsDisabled}
								title="Topics"
								model="topic"
								defaultValue={field.value}
								onValueChange={(value) =>
									setValue(
										'topics',
										value.map((v) => v.id),
									)
								}
								placeholder="Select options"
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
					<FormItem className="w-full">
						<FormLabel>English Lyrics</FormLabel>
						<FormControl>
							<Textarea
								disabled={IsDisabled}
								className="max-h-screen min-h-[70vh]"
								placeholder="Enter english Lyrics"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="urdu"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Urdu Lyrics</FormLabel>
						<FormControl>
							<Textarea
							dir="rtl"
								disabled={IsDisabled}
								className="max-h-screen min-h-[70vh]"
								placeholder="Enter urdu lyrics"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default LyricsInputs;
