'use client';

import React, { useState } from 'react';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { useAuthModel } from '@/hooks/use-auth-model';
import { InnerInteractionButton } from './inner-Button';
import { Button } from '@/components/ui/button';
import { FavoriteBeforeIcon, FavoritedIcon } from '@/components/icons';
import { AddToFavorite } from '../../_lib/actions';
import { cn } from '@/lib/utils';

const InteractionFavorite = () => {
	const lyricsData = useLyricsInteractions((state) => state.lyricsData);
	const favorited = useLyricsInteractions((state) => state.favorited);
	const userId = useLyricsInteractions((state) => state.userId);
	const { setAuthOpen } = useAuthModel();
	const [loading, setLoading] = useState(false); // Track loading state

	if (!lyricsData) return <div className="hidden" />;
	const lyricsId = lyricsData.id;

	const handleFavorite = async () => {
		if (!lyricsId || !userId) {
			setAuthOpen({ open: true, text: 'to add to favorites' });
			return;
		}

		setLoading(true); // Set loading to true
		try {
			const fav = await AddToFavorite({ favorited, lyricsId, userId });
			useLyricsInteractions.setState({ favorited: fav });
		} catch (error) {
			console.error('Error adding to favorites:', error);
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	return (
		<Button
			variant="ghost"
			onClick={handleFavorite}
			disabled={loading} // Disable the button while loading
			className={cn('w-full md:h-8 md:justify-start md:p-2', { 'cursor-not-allowed opacity-50': loading })}
		>
			<InnerInteractionButton
				Icon={favorited ? FavoritedIcon : FavoriteBeforeIcon}
				text={loading ? 'Processing...' : favorited ? 'Remove from Favorites' : 'Add to Favorites'}
			/>
		</Button>
	);
};

export default InteractionFavorite;
