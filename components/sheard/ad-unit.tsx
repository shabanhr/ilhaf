'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type AdLayoutProps = React.ComponentProps<'ins'> & {
	slotId: string;
};

interface DisplayProps extends AdLayoutProps {
	responsive?: boolean;
}

export function AdUnit({ responsive = false, slotId, style, className, ...props }: DisplayProps) {
	return (
		<ins
			className={cn('bg-muted/50 adsbygoogle', className)}
			style={{ display: 'block', ...style }}
			data-ad-format="auto"
			data-full-width-responsive={responsive}
			data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
			data-ad-slot={slotId}
			{...props}
		/>
	);
}
