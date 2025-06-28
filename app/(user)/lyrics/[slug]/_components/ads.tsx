'use client';
import { AdUnit } from '@/components/sheard/ad-unit';
import { useMediaQuery } from '@/hooks/use-media-query';
import React from 'react';

export function TopAds() {
	React.useEffect(() => {
		((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
	}, []);

	const { isMobile } = useMediaQuery();

	return (
		<div className="flex size-full justify-center py-2">
			{isMobile ? (
				<AdUnit slotId="3018789542" style={{ width: '250px', height: '250px' }} />
			) : (
				<AdUnit slotId="3518983424" style={{ width: '930px', height: '120px' }} />
			)}
		</div>
	);
}
