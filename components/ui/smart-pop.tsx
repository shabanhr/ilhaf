'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Drawer, DrawerTrigger, DrawerContent } from './drawer';

const SmartPopContext = React.createContext<{ isMobile: boolean } | null>(null);

function useSmartPopContext() {
	const context = React.useContext(SmartPopContext);
	if (!context) {
		throw new Error('SmartPopTrigger or SmartPopContent must be used within <SmartPop>');
	}
	return context;
}

type SmartPopProps = {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultOpen?: boolean;
	popoverProps?: React.ComponentProps<typeof Popover>;
	drawerProps?: React.ComponentProps<typeof Drawer>;
};

function SmartPop({ children, open, onOpenChange, defaultOpen, popoverProps, drawerProps }: SmartPopProps) {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? Drawer : Popover;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<SmartPopContext.Provider value={{ isMobile }}>
			<Component open={open ?? defaultOpen} onOpenChange={onOpenChange} {...props}>
				{children}
			</Component>
		</SmartPopContext.Provider>
	);
}

function SmartPopTrigger({
	children,
	drawerProps,
	popoverProps,
}: {
	children: React.ReactNode;
	asChild?: boolean;
	drawerProps?: React.ComponentProps<typeof DrawerTrigger>;
	popoverProps?: React.ComponentProps<typeof PopoverTrigger>;
}) {
	const { isMobile } = useSmartPopContext();
	const Trigger = isMobile ? DrawerTrigger : PopoverTrigger;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Trigger asChild {...props}>
			{children}
		</Trigger>
	);
}

function SmartPopContent({
	children,
	drawerProps,
	className,
	popoverProps,
}: {
	children: React.ReactNode;
	className?: React.ComponentProps<'div'>['className'];
	popoverProps?: React.ComponentProps<typeof PopoverContent>;
	drawerProps?: React.ComponentProps<typeof DrawerContent>;
}) {
	const { isMobile } = useSmartPopContext();
	const Content = isMobile ? DrawerContent : PopoverContent;
	const props = isMobile ? drawerProps : popoverProps;

	return (
		<Content className={cn(!isMobile && 'p-0', className)} {...props}>
			{children}
		</Content>
	);
}

function SmartPopBody({ children, className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('p-4 md:p-2', className)} {...props}>
			{children}
		</div>
	);
}

export { SmartPop, SmartPopTrigger, SmartPopContent, SmartPopBody };
