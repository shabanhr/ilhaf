'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LyricsRequest } from '@/db/schema';
import { formatDate, timeAgo } from '@/lib/utils/date';
import { deleteRequestById, updateRequestById } from '../_lib/actions';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

interface RequestIdClientPageProps {
	request: LyricsRequest;
}

export default function RequestIdClientPage({ request }: RequestIdClientPageProps) {
	const { id, title, type, writers, reciters, english, urdu, status, dop, createdAt, updatedAt } = request;

	const router = useRouter();
	const [isSaving, setIsSaving] = React.useState(false);
	const [selectedStatus, setSelectedStatus] = React.useState(status);
	const [lyricsSlug, setLyricsSlug] = React.useState(request.lyricsSlug || '');

	const handleDelete = () => {
		toast.promise(deleteRequestById(id), {
			loading: 'Deleting request...',
			success: () => {
				router.push('/admin/requests');
				return 'Request deleted';
			},
			error: (err) => getErrorMessage(err),
		});
	};

	const handlesUpdate = async () => {
		if (selectedStatus === 'approved' && !lyricsSlug.trim()) {
			toast.error('Slug is required when approving');
			return;
		}

		setIsSaving(true);
		toast.promise(updateRequestById(request.id, selectedStatus, lyricsSlug), {
			loading: 'Updating...',
			success: 'Updated successfully',
			error: (err) => getErrorMessage(err),
			finally: () => {
				router.push(`/admin/requests`);
			},
		});
	};

	const labelValue = (label: string, value: React.ReactNode) => (
		<div className="grid gap-1">
			<span className="text-muted-foreground text-sm font-medium">{label}</span>
			<span className="break-words">{value || '—'}</span>
		</div>
	);

	return (
		<Card className="mx-auto w-full max-w-2xl">
			<CardHeader>
				<CardTitle className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						{title || 'Untitled request'}
						<Badge variant={status === 'approved' ? 'default' : 'outline'}>{status}</Badge>
					</div>
					<Button variant="destructive" size="sm" onClick={handleDelete}>
						Delete
					</Button>
				</CardTitle>
			</CardHeader>

			<CardContent className="grid gap-6">
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="grid gap-2">
						<label className="text-muted-foreground text-sm font-medium">Status</label>
						<Select value={selectedStatus} onValueChange={setSelectedStatus} disabled={isSaving}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
					{selectedStatus === 'approved' && (
						<div className="grid gap-2">
							<label className="text-muted-foreground text-sm font-medium">Lyrics Slug</label>
							<Input
								value={lyricsSlug}
								onChange={(e) => setLyricsSlug(e.target.value)}
								placeholder="e.g. ya-ali-mola"
								disabled={isSaving}
							/>
						</div>
					)}
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{labelValue('Type', type)}
					{labelValue('Date of publication', `${formatDate(dop)} (${timeAgo(dop, { withAgo: true })})`)}
					{labelValue('Created', `${formatDate(createdAt)} (${timeAgo(createdAt, { withAgo: true })})`)}
					{labelValue('Last updated', `${formatDate(updatedAt)} (${timeAgo(updatedAt, { withAgo: true })})`)}
				</div>

				<Separator />

				<div className="grid gap-4 sm:grid-cols-2">
					{labelValue('Writers', writers)}
					{labelValue('Reciters', reciters)}
				</div>

				<Separator />

				<div className="grid gap-4">
					{labelValue('English', english)}
					{labelValue('Urdu', urdu)}
				</div>
				<Button onClick={handlesUpdate} disabled={isSaving}>
					Update
				</Button>
			</CardContent>
		</Card>
	);
}
