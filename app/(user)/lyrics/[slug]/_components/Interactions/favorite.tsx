'use client';

import React from 'react';
import { useToggle } from '@/hooks/use-toggle';
import { InnerInteractionButton } from './inner-Button';
import { FavoriteBeforeIcon, FavoritedIcon } from '@/components/icons';
import { AddToFavorite } from '../../_lib/actions';
import { isFavorited } from '../../_lib/queries';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { useLyricsStore } from '../../_lib/use-lyrics-store';

export function FavoriteInteraction() {
	const lyricsData = useLyricsStore((state) => state.data);
	const [favorited, setFavorited] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const { data: session, isPending } = authClient.useSession();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAuthOpen] = useToggle('auth-modal');

	const lyricsId = React.useMemo(() => lyricsData?.id ?? null, [lyricsData]);

	React.useEffect(() => {
		if (!lyricsId || !session?.user.id) return;

		setLoading(true);
		isFavorited({ lyricsId, userId: session.user.id })
			.then(setFavorited)
			.catch((err) => console.error('Favorite check failed:', err))
			.finally(() => setLoading(false));
	}, [lyricsId, session?.user.id]);

	const handleFavorite = async () => {
		if (!lyricsId || !session?.user.id) {
			setAuthOpen(true);
			return;
		}

		setLoading(true);
		try {
			const fav = await AddToFavorite({
				favorited,
				lyricsId,
				userId: session.user.id,
			});
			setFavorited(fav);
		} catch (err) {
			console.error('Error updating favorite:', err);
		} finally {
			setLoading(false);
		}
	};

	const isLoading = isPending || loading;

	if (!lyricsId) return null;

	return (
		<InnerInteractionButton
			Icon={favorited ? FavoritedIcon : FavoriteBeforeIcon}
			onClick={handleFavorite}
			disabled={isLoading}
			className={cn('transition-opacity', isLoading && 'cursor-not-allowed opacity-50')}
		>
			{isLoading ? 'Processing...' : favorited ? 'Remove from Favorites' : 'Add to Favorites'}
		</InnerInteractionButton>
	);
}
