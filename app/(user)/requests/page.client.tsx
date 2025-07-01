'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RequestLyricsForm } from './_componets/request-lyrics-form';
import RequestList from './_componets/request-list';
import { useQueryState } from 'nuqs';
import { User } from 'better-auth';
import { Button } from '@/components/ui/button';
import { useToggle } from '@/hooks/use-toggle';

interface Props {
	user?: User;
}

export default function RequestsClientPage({ user }: Props) {
	const [tab, setTab] = useQueryState('tab', {
		defaultValue: 'new-request',
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAuthOpen] = useToggle('auth-modal');
	return (
		<Tabs value={tab} onValueChange={setTab} className="mx-auto min-h-80 w-full max-w-4xl md:border-x">
			<div className="bg-background/90 supports-[backdrop-filter]:bg-background/75 drop-shadow-background sticky top-14 z-20 drop-shadow-xl backdrop-blur-lg">
				<TabsList className="h-auto gap-2 rounded-none bg-transparent px-2 pt-2 pb-1">
					<TabsTrigger
						disabled={!user}
						value="requests"
						className="data-[state=active]:after:bg-primary relative rounded-none border-0 py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent"
					>
						Your Requests
					</TabsTrigger>
					<TabsTrigger
						disabled={!user}
						value="new-request"
						className="data-[state=active]:after:bg-primary relative rounded-none border-0 py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent"
					>
						Create Request
					</TabsTrigger>
				</TabsList>
				<div className="bg-border h-px w-full" />
			</div>

			<TabsContent value="requests">
				<RequestList />
			</TabsContent>
			<TabsContent className="relative" value="new-request">
				<p className="text-muted-foreground py-2 text-center text-sm">
					Fill out the form below to request to add new lyrics. and we will add it as soon as possible.
				</p>
				{user ? (
					<RequestLyricsForm />
				) : (
					<>
						<div className="bg-background/40 backdrop-blur-xs absolute inset-0 z-10 flex items-center justify-center">
							<Button onClick={() => setAuthOpen(true)}>Login to create a request</Button>
						</div>
						<RequestLyricsForm disabled />
					</>
				)}
			</TabsContent>
		</Tabs>
	);
}
