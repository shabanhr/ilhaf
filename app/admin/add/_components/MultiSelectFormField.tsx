import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import AddNew from './AddNew';
import { ModelName } from '../types';
import ItemActions from './ItemActions';

const multiSelectVariants = cva(
	'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300',
	{
		variants: {
			variant: {
				default: 'border-border drop-shadow-md text-foreground bg-card hover:bg-card/80',
				secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				inverted: 'inverted',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

interface MultiSelectFormFieldProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof multiSelectVariants> {
	asChild?: boolean;
	options: {
		name: string;
		id: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	defaultValue?: string[];
	disabled?: boolean;
	placeholder: string;
	className?: string;
	title: string;
	model: ModelName;
	onValueChange: (value: string[]) => void;
}

const MultiSelectFormField = React.forwardRef<HTMLButtonElement, MultiSelectFormFieldProps>(
	(
		{
			className,
			variant,
			title,
			asChild = false,
			options,
			defaultValue,
			onValueChange,
			disabled,
			placeholder,
			model,
			...props
		},
		ref,
	) => {
		const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue || []);
		const selectedValuesSet = React.useRef(new Set(selectedValues));
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

		React.useEffect(() => {
			setSelectedValues(defaultValue || []);
			selectedValuesSet.current = new Set(defaultValue);
		}, [defaultValue]);

		const handleInputKeyDown = (event: any) => {
			if (event.key === 'Enter') {
				setIsPopoverOpen(true);
			} else if (event.key === 'Backspace' && !event.target.value) {
				selectedValues.pop();
				setSelectedValues([...selectedValues]);
				selectedValuesSet.current.delete(selectedValues[selectedValues.length - 1]);
				onValueChange([...selectedValues]);
			}
		};

		const toggleOption = (value: string) => {
			const newSelectedValues = selectedValues.includes(value)
				? selectedValues.filter((v) => v !== value)
				: [...selectedValues, value];
			setSelectedValues(newSelectedValues);
			onValueChange(newSelectedValues);
		};

		// const toggleOption = (value: string) => {
		//     if (selectedValuesSet.current.has(value)) {
		//         selectedValuesSet.current.delete(value);
		//         setSelectedValues(selectedValues.filter((v) => v !== value));
		//     } else {
		//         selectedValuesSet.current.add(value);
		//         setSelectedValues([...selectedValues, value]);
		//     }
		//     onValueChange(Array.from(selectedValuesSet.current)); // Convert the Set to an array
		// };

		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						disabled={disabled}
						{...props}
						onClick={() => setIsPopoverOpen(!isPopoverOpen)}
						className="hover:bg-card flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit"
					>
						{selectedValues.length > 0 ? (
							<div className="flex w-full items-center justify-between">
								<div className="flex flex-wrap items-center">
									{selectedValues.map((value, i) => {
										const option = options.find((o) => o.id === value);
										const IconComponent = option?.icon;
										return (
											<Badge key={i} className={cn(multiSelectVariants({ variant, className }))}>
												{IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
												{option?.name}
												<XCircle
													className="ml-2 h-4 w-4 cursor-pointer"
													onClick={(event) => {
														event.stopPropagation();
														toggleOption(value);
													}}
												/>
											</Badge>
										);
									})}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="text-muted-foreground mx-2 h-4 cursor-pointer"
										onClick={(event) => {
											setSelectedValues([]);
											selectedValuesSet.current.clear();
											onValueChange([]);
											event.stopPropagation();
										}}
									/>
									<Separator orientation="vertical" className="flex h-full min-h-6" />
									<ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
								</div>
							</div>
						) : (
							<div className="mx-auto flex w-full items-center justify-between">
								<span className="text-muted-foreground mx-3 text-sm">{placeholder}</span>
								<ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="max-w-[420px] p-0 drop-shadow-sm"
					align="start"
					onEscapeKeyDown={() => setIsPopoverOpen(false)}
					onInteractOutside={(event) => {
						if (!event.defaultPrevented) {
							setIsPopoverOpen(false);
						}
					}}
				>
					<Command>
						<CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{options.map((option, i) => {
									const isSelected = selectedValuesSet.current.has(option.id);
									return (
										<CommandItem key={i} className="flex w-full items-center justify-between gap-x-2 py-0.5">
											<div className="flex items-center justify-start" onClick={() => toggleOption(option.id)}>
												<div
													className={cn(
														'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
														isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
													)}
												>
													<CheckIcon className="h-4 w-4" />
												</div>
												{option.icon && <option.icon className="text-muted-foreground mr-2 h-4 w-4" />}
												<span>{option.name}</span>
											</div>
											<ItemActions title={title} item={option} model={model} />
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup className="bg-background sticky bottom-0 h-full w-full pt-1">
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<Button
											onClick={() => {
												setSelectedValues([]);
												selectedValuesSet.current.clear();
												onValueChange([]);
											}}
											style={{
												pointerEvents: 'auto',
												opacity: 1,
											}}
											className="w-full cursor-pointer"
											variant="ghost"
											size="sm"
										>
											Clear
										</Button>
									)}
									<Button
										onClick={() => setIsPopoverOpen(false)}
										style={{
											pointerEvents: 'auto',
											opacity: 1,
										}}
										className="w-full cursor-pointer"
										variant="ghost"
										size="sm"
									>
										Close
									</Button>
									<AddNew model={model} title={title} />
								</div>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	},
);

MultiSelectFormField.displayName = 'MultiSelectFormField';

export default MultiSelectFormField;
