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
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DeleteProps = {
    v: "image" | "audio";
    handleDelete: ({ v }: { v: "image" | "audio" }) => void;
}

const DeleteComp = ({ v, handleDelete }: DeleteProps) => {

    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button className="h-6 w-6 p-0">
                    <span className="sr-only">Open menu</span>
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Trash className='w-6 h-6' />
                    <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {v}
                        and remove your {v} from servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete({ v })} >
                        Yes, Sure
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default DeleteComp
