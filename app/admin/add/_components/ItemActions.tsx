"use client";
import React, { useState } from 'react'
import { getErrorMessage } from '@/lib/handle-error';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { ListItemType, ModelName } from '../types';
import AddAndUpdate from './AddAndUpdate';
import { deleteItemById } from '../actions';
import { Modal, ModalTrigger } from '@/components/ui/modal';

interface Props { item: ListItemType, model: ModelName, title: string }

const ItemActions = ({ item, model, title }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const { id } = item;

    const handleDelete = async () => {
        toast.promise(deleteItemById(model, id), {
            loading: "Deleting...",
            success: () => {
                return "Deleted"
            },
            error: (err) => {
                return getErrorMessage(err)
            },
        })
    }

    return (
        <Modal open={open} onOpenChange={setOpen} >
            <ModalTrigger asChild>
                <Button variant="ghost" className='max-h-8 max-w-9 p-2 hover:bg-background'>
                    <Pencil className="w-full h-full" />
                </Button>
            </ModalTrigger>
            {/* <AlertDialog >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem icon={<Trash className="w-3 h-3" />}>
                                Delete
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                      
                    </DropdownMenuContent>
                </DropdownMenu>


                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Trash className='w-6 h-6' />
                        <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete User
                            and remove User from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} >
                            Yes, Sure
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
            <AddAndUpdate onOpenChange={setOpen} model={model} title={title} item={item} />
        </Modal>
    )
}

export default ItemActions
