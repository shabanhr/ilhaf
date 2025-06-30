'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getErrorMessage } from '@/lib/utils/error';
import { cn } from '@/lib/utils';

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
			className={cn('adsbygoogle', className)}
			style={{ display: responsive ? 'block' : 'inline-block', ...style }}
			data-ad-client={adClient}
			data-ad-slot={slotId}
			data-ad-format={format}
			data-full-width-responsive={responsive ? 'true' : 'false'}
			{...props}
		/>
	);
}

type AdWrapperProps = React.ComponentProps<'div'> & {
	children: React.ReactNode;
	device?: 'mobile' | 'desktop' | 'all';
};

export function AdWrapper({ children, className, device = 'all', ...props }: AdWrapperProps) {
	const { isMobile } = useMediaQuery();
	const render = device === 'all' || (device === 'desktop' && !isMobile) || (device === 'mobile' && isMobile);

	React.useEffect(() => {
		if (!render) return;
		pushAd();
	}, [render]);

	if (!render) return null;

	return (
		<div
			className={cn(
				'bg-[linear-gradient(to_right,--theme(--color-foreground/.1)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/.1)_1px,transparent_1px)]',
				'bg-[size:24px_24px]',
				'flex justify-center py-2',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}