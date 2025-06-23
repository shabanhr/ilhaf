'use client';
import * as React from 'react';
import { CheckIcon, ChevronDown, PencilIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	CommandDialog,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { ModelName, dataType } from '../_lib/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import useSWR from 'swr';
import { Modal, ModalTrigger, ModalContent, ModalBody, ModalHeader, ModalTitle } from '@/components/ui/modal';
import { ItemForm } from './item-form';
import { getItems } from '../_lib/queries';

interface MultiSelectFormFieldProps extends React.ComponentProps<'button'> {
	defaultValue?: string[];
	placeholder: string;
	title: string;
	model: ModelName;
	onValueChange: (item: dataType[]) => void;
}

export function MultiSelect({
	className,
	title,
	defaultValue,
	onValueChange,
	placeholder,
	model,
	...props
}: MultiSelectFormFieldProps) {
	const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue || []);
	const selectedValuesSet = React.useRef(new Set(selectedValues));
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const [modalOpen, setModalOpen] = React.useState(false);
	const [editItem, setEditItem] = React.useState<dataType | null>(null);

	const {
		data: options,
		isLoading,
		mutate,
	} = useSWR(`/api/${model}/search`, () => getItems(model), {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
		revalidateOnMount: true,
	});

	React.useEffect(() => {
		setSelectedValues(defaultValue || []);
		selectedValuesSet.current = new Set(defaultValue);
	}, [defaultValue]);

	const toggleOption = (value: string) => {
		const newSelectedValues = selectedValues.includes(value)
			? selectedValues.filter((v) => v !== value)
			: [...selectedValues, value];
		setSelectedValues(newSelectedValues);
		onValueChange(options?.filter((o) => newSelectedValues.includes(o.id)) || []);
	};

	const handleEdit = (item: dataType) => {
		setEditItem(item);
		setModalOpen(true);
	};

	return (
		<>
			<Button
				type="button"
				onClick={() => setOpen(!open)}
				className={cn(
					'hover:bg-card flex h-auto min-h-9 w-full items-center justify-between rounded-md border bg-inherit',
					className,
				)}
				{...props}
			>
				{selectedValues.length > 0 ? (
					<div className="flex w-full items-center justify-between">
						<div className="flex flex-wrap items-center gap-2">
							{selectedValues.map((value, i) => {
								const option = options?.find((o) => o.id === value);
								return <Badge key={i}>{option?.name}</Badge>;
							})}
						</div>
						<ChevronDown className="text-muted-foreground" />
					</div>
				) : (
					<div className="flex w-full items-center justify-between">
						<span className="text-muted-foreground">{placeholder}</span>
						<ChevronDown className="text-muted-foreground" />
					</div>
				)}
			</Button>

			<CommandDialog
				modal
				open={open}
				onOpenChange={(open) => {
					setOpen(open);
					if (!open) setQuery('');
				}}
			>
				<Command>
					<CommandInput placeholder="Search..." value={query} onValueChange={setQuery} />
					<CommandList>
						<CommandEmpty className={cn(isLoading ? 'hidden' : 'py-6 text-center text-sm')}>
							No results found.
						</CommandEmpty>
						{isLoading ? (
							<div className="space-y-1 overflow-hidden px-1 py-2">
								<Skeleton className="h-4 w-10 rounded" />
								<Skeleton className="h-8 rounded-sm" />
								<Skeleton className="h-8 rounded-sm" />
							</div>
						) : (
							options && (
								<CommandGroup>
									{options.map((option) => {
										const isSelected = selectedValuesSet.current.has(option.id);
										return (
											<CommandItem
												key={option.id}
												value={option.name}
												className="flex w-full items-center justify-between"
												onSelect={() => toggleOption(option.id)}
											>
												<div className="flex w-full items-center justify-start gap-3">
													{isSelected && <CheckIcon strokeWidth={4} className="text-foreground" />}
													<span className="truncate">
														{option.name} ({option.count})
													</span>
												</div>
												<Button
													type="button"
													variant="outline"
													className="z-50 size-6 [&_svg]:size-2"
													onClick={() => handleEdit(option)}
												>
													<PencilIcon />
												</Button>
											</CommandItem>
										);
									})}
								</CommandGroup>
							)
						)}
					</CommandList>
					<div className="flex items-center justify-between gap-2 border-t px-2 py-1">
						<ModalTrigger asChild>
							<Button variant="ghost" type="button">
								Close
							</Button>
						</ModalTrigger>
						{selectedValues.length > 0 && (
							<Button
								onClick={() => {
									setSelectedValues([]);
									selectedValuesSet.current.clear();
									onValueChange([]);
								}}
								variant="ghost"
								type="button"
							>
								Clear
							</Button>
						)}
						<Button
							variant="ghost"
							type="button"
							onClick={() => {
								setEditItem(null); // null means create mode
								setModalOpen(true);
							}}
						>
							<PlusIcon className="mr-1 h-4 w-4" />
							Add
						</Button>
					</div>
				</Command>
			</CommandDialog>

			{/* Inline Item Modal */}
			<Modal open={modalOpen} onOpenChange={setModalOpen}>
				<ModalContent>
					<ModalHeader>
						<ModalTitle>{editItem ? `Edit ${title}` : `Add ${title}`}</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<ItemForm
							model={model}
							title={title}
							item={editItem || undefined}
							onOpenChange={setModalOpen}
							onComplete={mutate}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
