'use client';
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal';
import dynamicRender from 'next/dynamic';
import AuthLoader from './AuthLoader';
import { useAuthModel } from '@/hooks/use-auth-model';

const Auth = dynamicRender(() => import('.'), {
	ssr: false,
	loading: () => <AuthLoader />,
});

const AuthModel = () => {
	const { open, text, setAuthOpen } = useAuthModel();

	return (
		<Modal open={open} onOpenChange={(open) => setAuthOpen({ open })}>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>Join Now! {text}</ModalTitle>
				</ModalHeader>
				<ModalBody className="px-2 py-8">{open && <Auth />}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AuthModel;
