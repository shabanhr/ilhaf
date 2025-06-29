'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './drawer';

const useIsMobile = () => useMediaQuery().isMobile;

function Modal(props: React.ComponentProps<typeof Dialog> & React.ComponentProps<typeof Drawer>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? Drawer : Dialog;
	return <Component {...props} />;
}

function ModalTrigger(props: React.ComponentProps<typeof DialogTrigger> & React.ComponentProps<typeof DrawerTrigger>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerTrigger : DialogTrigger;
	return <Component {...props} />;
}

function ModalClose(props: React.ComponentProps<typeof DialogClose> & React.ComponentProps<typeof DrawerClose>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerClose : DialogClose;
	return <Component {...props} />;
}

function ModalContent(props: React.ComponentProps<typeof DialogContent> & React.ComponentProps<typeof DrawerContent>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerContent : DialogContent;
	return <Component {...props} />;
}

function ModalDescription(
	props: React.ComponentProps<typeof DialogDescription> & React.ComponentProps<typeof DrawerDescription>,
) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerDescription : DialogDescription;
	return <Component {...props} />;
}

function ModalHeader({
	children,
	...props
}: React.ComponentProps<typeof DialogHeader> & React.ComponentProps<typeof DrawerHeader>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerHeader : DialogHeader;
	return <Component {...props}>{children}</Component>;
}

function ModalTitle({
	children,
	...props
}: React.ComponentProps<typeof DialogTitle> & React.ComponentProps<typeof DrawerTitle>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerTitle : DialogTitle;
	return <Component {...props}>{children}</Component>;
}

function ModalBody({ className, children, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('px-4 md:px-0', className)} {...props}>
			{children}
		</div>
	);
}

function ModalFooter(props: React.ComponentProps<typeof DialogFooter> & React.ComponentProps<typeof DrawerFooter>) {
	const isMobile = useIsMobile();
	const Component = isMobile ? DrawerFooter : DialogFooter;
	return <Component {...props} />;
}

export {
	Modal,
	ModalTrigger,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
};
