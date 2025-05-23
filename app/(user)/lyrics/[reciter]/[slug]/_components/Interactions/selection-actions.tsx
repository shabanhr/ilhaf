"use client";

import { XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MessageCircleWarning } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalTitle,
} from "@/components/ui/modal";
import AuthModel from "@/components/auth/auth-model";
import { useLyricsInteractions } from "@/hooks/use-lyrics-interactions";
import { useAuthModel } from "@/hooks/use-auth-model";

const CreateReportForm = dynamic(() => import("./create-report-form"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full">
            <Spinner active invert />
        </div>
    ),
});

interface Props {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export const SelectionActions = ({ containerRef }: Props) => {
    const { userId } = useLyricsInteractions();

    const [selection, setSelection] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const { setAuthOpen } = useAuthModel();

    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const selectionRef = useRef<string | undefined>(undefined);

    function getSelectedText() {
        const selection = window.getSelection();
        return selection ? selection.toString() : '';
    }

    function onShare() {
        if (!selectionRef.current) return;
        const message = [
            `"${encodeURIComponent(selectionRef.current.substring(0, 120))}"`,
            encodeURIComponent(window.location.href)
        ].join('%0A%0A');
        const url = `https://twitter.com/intent/tweet?text=${message}`;
        window.open(url, 'share-twitter', 'width=550, height=550');
    }

    const handleReport = () => {
        if (userId) {
            if (selectionRef.current) {
                setSelection(selectionRef.current);
            }
            setOpen(true);
        } else {
            setAuthOpen({ open: true, text: 'to report for correction.' })
        }
    }

    function handleSelectionChange() {
        const selectedText = getSelectedText();
        const selection = window.getSelection();
        if (selectedText.length >= 10 && selection) {
            const range = selection.getRangeAt(0);
            const container = containerRef.current;

            if (container && range.intersectsNode(container)) {
                selectionRef.current = selectedText;
                if (selectedText) {
                    const rect = range.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                    setPosition({
                        top: rect.bottom + scrollTop + 10,
                        left: rect.left + scrollLeft + rect.width / 2
                    });
                }
            } else {
                selectionRef.current = undefined;
                setPosition({ top: 0, left: 0 });
            }
        } else {
            selectionRef.current = undefined;
            setPosition({ top: 0, left: 0 });
        }
    }

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, []);

    return (
        <>
            {selectionRef.current && selectionRef.current.length >= 10 && (
                <div
                    className="absolute w-max h-max py-1 px-2 bg-primary text-background rounded-xl m-0 flex items-center justify-center"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                    }}
                >
                    <Button
                        title='Share on X'
                        variant="ghost"
                        className='size-8 p-2'
                        onClick={() => onShare()}
                    >
                        <XIcon className="w-full h-full" />
                    </Button>
                    <Button
                        title='Report for Incorrect'
                        variant="ghost"
                        className={cn('size-8 p-1.5', {
                        })}
                        onClick={handleReport}
                    >
                        <MessageCircleWarning className="w-full h-full" />
                    </Button>
                </div>
            )}
            {userId && (
                <Modal open={open} onOpenChange={setOpen}>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Report For Correction</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {open && (
                                <CreateReportForm
                                    setOpen={setOpen}
                                    selection={selection}
                                />
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
