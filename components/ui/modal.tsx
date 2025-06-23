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

// Define conditional prop types based on isDesktop
type ModalProps = React.ComponentProps<typeof Dialog> | React.ComponentProps<typeof Drawer>;
type ModalTriggerProps = React.ComponentProps<typeof DialogTrigger> | React.ComponentProps<typeof DrawerTrigger>;
type ModalCloseProps = React.ComponentProps<typeof DialogClose> | React.ComponentProps<typeof DrawerClose>;
type ModalContentProps = React.ComponentProps<typeof DialogContent> | React.ComponentProps<typeof DrawerContent>;
type ModalDescriptionProps =
	| React.ComponentProps<typeof DialogDescription>
	| React.ComponentProps<typeof DrawerDescription>;
type ModalHeaderProps = React.ComponentProps<typeof DialogHeader> | React.ComponentProps<typeof DrawerHeader>;
type ModalTitleProps = React.ComponentProps<typeof DialogTitle> | React.ComponentProps<typeof DrawerTitle>;
type ModalFooterProps = React.ComponentProps<typeof DialogFooter> | React.ComponentProps<typeof DrawerFooter>;

const Modal = ({ children, ...props }: ModalProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? Drawer : Dialog;

	return <Component {...props}>{children}</Component>;
};

const ModalTrigger = ({ className, children, ...props }: ModalTriggerProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerTrigger : DialogTrigger;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalClose = ({ className, children, ...props }: ModalCloseProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerClose : DialogClose;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalContent = ({ className, children, ...props }: ModalContentProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerContent : DialogContent;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalDescription = ({ className, children, ...props }: ModalDescriptionProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerDescription : DialogDescription;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalHeader = ({ className, children, ...props }: ModalHeaderProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerHeader : DialogHeader;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalTitle = ({ className, children, ...props }: ModalTitleProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerTitle : DialogTitle;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

const ModalBody = ({ className, children, ...props }: React.ComponentProps<'div'>) => {
	return (
		<div className={cn('px-4 md:px-0', className)} {...props}>
			{children}
		</div>
	);
};

const ModalFooter = ({ className, children, ...props }: ModalFooterProps) => {
	const { isMobile } = useMediaQuery();
	const Component = isMobile ? DrawerFooter : DialogFooter;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
};

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
