'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getErrorMessage } from '@/lib/utils/error';
import { cn } from '@/lib/utils';

type AdFormat = 'square' | 'horizontal' | 'vertical' | 'auto' | 'fluid';

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
	const layoutProps = format === 'fluid' ? { 'data-ad-layout': 'in-article' } : {};

	return (
		<ins
			className={cn('adsbygoogle', className)}
			style={{ display: 'block', width: '100%', height: 'auto', ...style }}
			data-ad-client={adClient}
			data-ad-slot={slotId}
			data-ad-format={format}
			data-full-width-responsive={responsive ? 'true' : 'false'}
			{...layoutProps}
			{...props}
		/>
	);
}

export function AdWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
	React.useEffect(() => {
		pushAd();
	}, []);

	return <div className={cn('bg-muted/50 flex justify-center py-2', className)}>{children}</div>;
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
