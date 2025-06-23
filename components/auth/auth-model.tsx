'use client';
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal';
import dynamicRender from 'next/dynamic';
import AuthLoader from './auth-loader';
import { useToggle } from '@/hooks/use-toggle';
import Link from 'next/link';

const Auth = dynamicRender(() => import('.'), {
	ssr: false,
	loading: () => <AuthLoader />,
});

const AuthModel = () => {
	const [open, setAuthOpen] = useToggle('auth-modal');

	return (
		<Modal open={open} onOpenChange={setAuthOpen}>
			<ModalContent className="p-0">
				<ModalHeader className="md:bg-muted/50 flex items-center justify-center p-4 md:rounded-t-lg md:border-b">
					<ModalTitle className="text- font-mono font-semibold">Sign In or Join Now!</ModalTitle>
				</ModalHeader>
				<ModalBody className="px-4 py-5 md:px-4">{open && <Auth />}</ModalBody>
				<div className="p-4">
					<p className="text-center text-xs text-muted-foreground">
						By clicking Continue, you agree to our{' '}
						<Link className="text-primary" href="/policy">
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</ModalContent>
		</Modal>
	);
};

export default AuthModel;
