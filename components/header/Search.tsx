'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { cn, getLyricsURL, isMacOs } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchIcon } from 'lucide-react';
import { CardType } from '@/types';
import { getLyricsData } from '@/lib/actions/lyrics';
import { Kbd } from '../kbd';

export function SearchCombobox() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');
	const debouncedQuery = useDebounce(query, 300);
	const [data, setData] = React.useState<CardType[] | null>(null);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (debouncedQuery.length <= 0) {
			setData(null);
			return;
		}

		async function fetchData() {
			setLoading(true);
			const { data } = await getLyricsData({ page: 1, query: debouncedQuery });
			setData(data);
			setLoading(false);
		}

		void fetchData();
	}, [debouncedQuery]);

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
		<>
			<Button
				variant="ghost"
				className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:border xl:px-3 xl:py-2"
				onClick={() => setOpen(true)}
			>
				<SearchIcon className="size-5 xl:mr-2" aria-hidden="true" />
				<span className="hidden xl:inline-flex">Search products...</span>
				<span className="sr-only">Search products</span>
				<Kbd
					title={isMacOs() ? 'Command' : 'Control'}
					className="pointer-events-none absolute top-1.5 right-1.5 hidden xl:block"
				>
					{isMacOs() ? '⌘' : 'Ctrl'} K
				</Kbd>
			</Button>
			<CommandDialog
				modal={true}
				open={open}
				onOpenChange={(open) => {
					setOpen(open);
					if (!open) {
						setQuery('');
					}
				}}
			>
				<CommandInput placeholder="Search lyrics..." value={query} onValueChange={setQuery} />
				<CommandList>
					<CommandEmpty className={cn(loading ? 'hidden' : 'py-6 text-center text-sm')}>No lyrics found.</CommandEmpty>
					{loading ? (
						<div className="space-y-1 overflow-hidden px-1 py-2">
							<Skeleton className="h-4 w-10 rounded" />
							<Skeleton className="h-8 rounded-sm" />
							<Skeleton className="h-8 rounded-sm" />
						</div>
					) : (
						data && (
							<CommandGroup heading="Search results">
								{data.map((item, i) => {
									return (
										<CommandItem
											key={i}
											className="h-9"
											value={item.title}
											onSelect={() => onSelect(() => router.push(getLyricsURL(item.reciter.slug, item.slug)))}
										>
											<span className="truncate">{item.title}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
						)
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}
