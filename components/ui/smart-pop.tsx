'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Drawer, DrawerTrigger, DrawerContent } from './drawer';

type SmartPopProps = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	drawerProps?: React.ComponentProps<typeof Drawer>;
	popoverProps?: React.ComponentProps<typeof Popover>;
};

const SmartPop = ({ children, open, onOpenChange, defaultOpen, drawerProps, popoverProps }: SmartPopProps) => {
	const { isMobile } = useMediaQuery();

	if (isMobile) {
		return (
			<Drawer open={open ?? defaultOpen} onOpenChange={onOpenChange} {...drawerProps}>
				{children}
			</Drawer>
		);
	}

	return (
		<Popover open={open ?? defaultOpen} onOpenChange={onOpenChange} {...popoverProps}>
			{children}
		</Popover>
	);
};

type SmartPopTriggerProps = {
	children: React.ReactNode;
	asChild?: boolean;
};

const SmartPopTrigger = ({ children }: SmartPopTriggerProps) => {
	const { isMobile } = useMediaQuery();
	const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;
	return <Trigger asChild>{children}</Trigger>;
};

type SmartPopContentProps = {
	children: React.ReactNode;
	popoverProps?: React.ComponentProps<typeof PopoverContent>;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
};

const SmartPopContent = ({ children, popoverProps, drawerProps }: SmartPopContentProps) => {
	const { isMobile } = useMediaQuery();
	if (isMobile) {
		return <DrawerContent {...drawerProps}>{children}</DrawerContent>;
	}
	return <PopoverContent {...popoverProps} className={cn('p-0', popoverProps?.className)}>{children}</PopoverContent>;
};

const SmartPopBody = ({ children, className, ...props }: React.ComponentProps<'div'>) => (
	<div className={cn('p-4 md:p-2', className)} {...props}>
		{children}
	</div>
);

export { SmartPop, SmartPopTrigger, SmartPopContent, SmartPopBody };
