'use client';
import React, { useState } from 'react';
import AddAndUpdate from './AddAndUpdate';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModelName } from '../types';
import { Modal, ModalTrigger } from '@/components/ui/modal';

interface Props {
	model: ModelName;
	title: string;
}

const AddNew = ({ model, title }: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button variant="ghost" className="w-full" size="sm">
					<Plus />
					Add
				</Button>
			</ModalTrigger>
			<AddAndUpdate onOpenChange={setOpen} model={model} title={title} />
		</Modal>
	);
};

export default AddNew;
