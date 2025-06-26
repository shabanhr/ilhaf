'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RequestLyricsForm } from './_componets/request-lyrics-form';
import RequestList from './_componets/request-list';
import { useQueryState } from 'nuqs';

export default function RequestsClientPage() {
	const [tab, setTab] = useQueryState('tab', {
		defaultValue: 'requests',
	});

	return (
			<Tabs
				defaultValue={tab}
				value={tab}
				onValueChange={setTab}
				className="mx-auto min-h-80 w-full max-w-4xl md:border-x"
			>
				<div className="bg-background/90 supports-[backdrop-filter]:bg-background/75 drop-shadow-background sticky top-14 z-10 drop-shadow-xl backdrop-blur-lg">
					<TabsList className="h-auto gap-2 rounded-none bg-transparent px-2 pt-2 pb-1">
						<TabsTrigger
							value="requests"
							className="data-[state=active]:after:bg-primary relative rounded-none border-0 py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent"
						>
							Your Requests
						</TabsTrigger>
						<TabsTrigger
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
				<TabsContent value="new-request">
					<p className="text-muted-foreground py-2 text-center text-sm">
						Fill out the form below to request to add new lyrics. and we will add it as soon as possible.
					</p>
					<RequestLyricsForm />
				</TabsContent>
			</Tabs>
	);
}
