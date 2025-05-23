

import { TrashIcon } from 'lucide-react';
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Props {
    trigger?: React.JSX.Element;
    handleDelete: () => void | Promise<void>;
    text?: string;

}

const DeleteComp = ({ trigger, handleDelete, text }: Props) => {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <TrashIcon className='w-6 h-6' />
                    <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. {text}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                    >
                        Yes, Sure
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteComp
