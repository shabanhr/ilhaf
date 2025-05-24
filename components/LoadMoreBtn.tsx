import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button, ButtonWithLoading } from './ui/button';
import { Spinner } from './ui/spinner';

interface LoadMoreProps {
	loadMore: (page: number) => Promise<void>;
	total: number;
	limit: number;
}

export const LoadMoreBtn = ({ loadMore, total, limit }: LoadMoreProps) => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const handleLoadMore = async () => {
		if (loading) return;
		setLoading(true);
		try {
			await loadMore(page + 1); // Pass next page to loadMore
			setPage(page + 1); // Increment the page after successful load
		} catch (error) {
			console.error('Error loading more:', error);
		} finally {
			setLoading(false);
		}
	};

	const hasMore = page * limit < total;
	const buttonText = loading ? 'Loading...' : 'Load More';

	if (hasMore) {
		return (
			<ButtonWithLoading
				variant="ghost"
				size="sm"
				onClick={handleLoadMore}
				isLoading={loading}
				className="mx-auto my-4"
				icon={MoreHorizontal}
			>
				{buttonText}
			</ButtonWithLoading>
		);
	}
};
