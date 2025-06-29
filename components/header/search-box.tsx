'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { capitalize, cn, getImageURL, getLyricsURL } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { CommandInput } from 'cmdk';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchIcon } from 'lucide-react';
import { getLyricsData } from '@/lib/actions/lyrics';
import useSWR from 'swr';
import { LyricsCardBadge, LyricsCardBadgeSkeleton } from '../lyrics-card';
import { AnimatedImage } from '../lyrics-card/animated-image';

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
				<Button variant="outline" size="icon" onClick={() => setOpen(true)}>
					<SearchIcon aria-hidden="true" />
					<span className="sr-only">Search lyrics</span>
				</Button>
			</ModalTrigger>
			<ModalContent className="bg-background/90 supports-[backdrop-filter]:bg-background/75 p-0 backdrop-blur-sm">
				<Command className="bg-transparent" filter={() => 1}>
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
					<CommandList className="min-h-[320px] max-h-[320px] px-2 md:px-0">
						<CommandEmpty className={cn(isLoading ? 'hidden' : 'py-12 text-center text-sm')}>
							No lyrics found.
						</CommandEmpty>
						{isLoading ? (
							<div className="overflow-hidden px-1 py-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<div key={i} className="grid grid-cols-[.25fr_.75fr] items-center gap-2 px-2 py-1.5">
										<Skeleton className="aspect-video size-full" />
										<div className="flex flex-col gap-1">
											<Skeleton className="h-[1.5rem] w-2/3 md:h-[1.5556rem]" />
											<div className="flex items-center gap-1">
												<LyricsCardBadgeSkeleton />
												<LyricsCardBadgeSkeleton />
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							data && (
								<CommandGroup>
									{data?.data.map((item, i) => {
										return (
											<CommandItem
												key={i}
												className="grid cursor-pointer grid-cols-[.25fr_.75fr]"
												value={item.title}
												onSelect={() => onSelect(() => router.push(getLyricsURL(item.slug)))}
											>
												<AnimatedImage
													src={getImageURL({ slug: item.slug, oldSlug: item.oldSlug })}
													alt={`${item.title} Lyrics image`}
												/>
												<div className="flex flex-col gap-1">
													<p className="max-w-[250px] truncate text-sm md:text-base">{item.title}</p>
													<div className="flex items-center gap-1">
														<LyricsCardBadge>{capitalize(item.type)}</LyricsCardBadge>
														<LyricsCardBadge>{item.dop.getFullYear()}</LyricsCardBadge>
													</div>
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
