'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getErrorMessage } from '@/lib/utils/error';

type AdFormat = 'square' | 'horizontal' | 'vertical' | 'auto';

type AdUnitProps = React.ComponentProps<'ins'> & {
	slotId: string;
	format?: AdFormat;
	responsive?: boolean;
	adClient?: string;
};

function pushAd() {
	try {
		((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
	} catch (error) {
		console.error(getErrorMessage(error));
	}
}

export function AdUnit({
	slotId,
	format = 'auto',
	responsive = false,
	adClient = `ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`,
	className,
	style,
	...props
}: AdUnitProps) {
	return (
		<ins
			className={`adsbygoogle ${className ?? ''}`}
			style={{ display: 'block', ...style }}
			data-ad-client={adClient}
			data-ad-slot={slotId}
			data-ad-format={format}
			data-full-width-responsive={responsive ? 'true' : 'false'}
			{...props}
		/>
	);
}

function AdWrapper({ children }: { children: React.ReactNode }) {
	React.useEffect(() => {
		pushAd();
	}, []);

	return <div className="flex justify-center py-2">{children}</div>;
}

export function ResponsiveAd() {
	const { isMobile } = useMediaQuery();

	return (
		<AdWrapper>
			<AdUnit
				slotId="3018789542"
				format={isMobile ? 'square' : 'horizontal'}
				style={{ width: isMobile ? '250px' : '930px', height: isMobile ? '250px' : '120px' }}
			/>
		</AdWrapper>
	);
}

export function SquareAd() {
	return (
		<AdWrapper>
			<AdUnit slotId="3018789542" format="square" style={{ width: '250px', height: '250px' }} />
		</AdWrapper>
	);
}
