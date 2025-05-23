"use client"
import React from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal';
import dynamicRender from 'next/dynamic';
import AuthLoader from './AuthLoader';
import { useAuthModel } from '@/hooks/use-auth-model';

const Auth = dynamicRender(() => import('.'),
    {
        ssr: false,
        loading: () => <AuthLoader />
    }
)

const AuthModel = () => {
    const { open, text, setAuthOpen } = useAuthModel();

    return (
        <Modal open={open} onOpenChange={(open) => setAuthOpen({ open })}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>
                        Sign-In or Sign-Up {text}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody className='py-8 px-2'>
                    {open && <Auth />}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AuthModel
