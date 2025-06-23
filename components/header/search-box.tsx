'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { capitalize, cn, getLyricsURL, isMacOs } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { CommandInput } from 'cmdk';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchIcon } from 'lucide-react';
import { getLyricsData } from '@/lib/actions/lyrics';
import { Kbd } from '../kbd';
import useSWR from 'swr';
import { LyricsCardBadge, LyricsCardBadgeSkeleton } from '../lyrics-card';

export function SearchCombobox() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const debouncedQuery = useDebounce(query, 300);

	const { data, isLoading } = useSWR(
		open ? `/lyrics/search?query=${debouncedQuery}` : null,
		() => getLyricsData({ page: 1, query: debouncedQuery }),
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			revalidateIfStale: false,
			revalidateOnMount: true,
		},
	);

	const onSelect = React.useCallback((callback: () => unknown) => {
		setOpen(false);
		callback();
	}, []);

	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button
					variant="ghost"
					className="relative size-9 p-0 lg:h-9 lg:w-60 lg:justify-start lg:border lg:p-2"
					onClick={() => setOpen(true)}
				>
					<SearchIcon className="size-5 lg:mr-1" aria-hidden="true" />
					<span className="hidden lg:inline-flex">Search lyrics...</span>
					<span className="sr-only">Search lyrics</span>
					<Kbd
						title={isMacOs() ? 'Command' : 'Control'}
						className="top-1.8 pointer-events-none absolute right-1.5 hidden lg:block"
					>
						{isMacOs() ? '⌘' : 'Ctrl'} K
					</Kbd>
				</Button>
			</ModalTrigger>
			<ModalContent className="bg-background/90 supports-[backdrop-filter]:bg-background/75 p-0 backdrop-blur-lg">
				<Command
					className="bg-transparent"
					filter={() => {
						return 1;
					}}
				>
					<div data-slot="command-input-wrapper" className="flex h-12 items-center gap-2 border-b px-3">
						<SearchIcon className="size-4 shrink-0 opacity-50" />
						<CommandInput
							data-slot="command-input"
							className={cn(
								'placeholder:text-muted-foreground flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
							)}
							placeholder="Search lyrics..."
							value={query}
							onValueChange={setQuery}
						/>
					</div>
					<CommandList className="px-2 md:px-0">
						<CommandEmpty className={cn(isLoading ? 'hidden' : 'py-6 text-center text-sm')}>
							No lyrics found.
						</CommandEmpty>
						{isLoading ? (
							<div className="overflow-hidden px-1 py-2">
								<Skeleton className="h-4 w-10 rounded" />
								<div className="flex h-7 items-center justify-between">
									<Skeleton className="h-6 w-1/2 rounded-sm" />
									<div className="flex items-center gap-1">
										<LyricsCardBadgeSkeleton />
										<LyricsCardBadgeSkeleton />
									</div>
								</div>
								<div className="flex h-7 items-center justify-between">
									<Skeleton className="h-6 w-1/2 rounded-sm" />
									<div className="flex items-center gap-1">
										<LyricsCardBadgeSkeleton />
										<LyricsCardBadgeSkeleton />
									</div>
								</div>
							</div>
						) : (
							data && (
								<CommandGroup heading="Search results">
									{data?.data.map((item, i) => {
										return (
											<CommandItem
												key={i}
												className="flex justify-between gap-1"
												value={item.title}
												onSelect={() => onSelect(() => router.push(getLyricsURL(item.slug)))}
											>
												<span className="truncate">{item.title}</span>
												<div className="flex items-center gap-1">
													<LyricsCardBadge>{capitalize(item.type)}</LyricsCardBadge>
													<LyricsCardBadge>{item.dop.getFullYear()}</LyricsCardBadge>
												</div>
											</CommandItem>
										);
									})}
								</CommandGroup>
							)
						)}
					</CommandList>
				</Command>
			</ModalContent>
		</Modal>
	);
}
