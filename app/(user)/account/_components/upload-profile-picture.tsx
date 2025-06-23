'use client';

import React from 'react';
import { toast } from 'sonner';
import Cropper, { Area, Point } from 'react-easy-crop';
import getCroppedImg from '../_lib/create-image';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';
import { Button, ButtonWithLoading } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showErrorToast } from '@/lib/utils/error';

interface Props {
	children: React.ReactNode;
	onUpload: (file: File) => Promise<{ success: boolean }>;
}

export const ProfilePicture = ({ children, onUpload }: Props) => {
	const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState<number>(1);

	const [isPending, setIsPending] = React.useState<boolean>(false);
	const [photo, setPhoto] = React.useState<{ url: string; file: File | null }>({
		url: '',
		file: null,
	});
	const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const extentions = ['jpeg', 'jpg', 'png', 'webp', 'PNG'];
		const img_ext = file.name.substring(file.name.lastIndexOf('.') + 1);
		const validExt = extentions.includes(img_ext);

		if (!validExt) {
			return toast.error('Selected file is not an image');
		} else {
			if (parseFloat(String(file.size)) / (1024 * 1024) >= 20) {
				toast.error('Selected Image is too big');
			} else {
				setPhoto({ url: URL.createObjectURL(file), file });
			}
		}
	};

	const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleCropChange = (crop: Point) => {
		setCrop(crop);
	};

	const handleZoomChange = (zoom: number) => {
		setZoom(zoom);
	};

	const [open, onOpenChange] = React.useState<boolean>(false);

	const handleUpdate = async () => {
		if (photo?.file) {
			setIsPending(true);
			try {
				const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);
				const file = new File([croppedImg.file], `${photo?.file?.name}`, {
					type: photo?.file?.type,
				});
				await onUpload(file);
				setPhoto({ url: '', file: null });
				onOpenChange(false);
				toast.success('Image updated successfully');
			} catch (error) {
				console.log(error);
				showErrorToast(error);
			} finally {
				setIsPending(false);
			}
		} else {
			toast.info('Select An Image First!');
		}
	};

	return (
		<Modal open={open} onOpenChange={onOpenChange} dismissible={photo?.file ? false : true}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent className="h-max md:max-w-md">
				<ModalHeader>
					<ModalTitle>Upload Image</ModalTitle>
				</ModalHeader>
				<ModalBody className="space-y-2">
					<Input disabled={isPending} onChange={handleFileChange} type="file" accept="image/*" />
					{photo?.file && (
						<div className="bg-accent relative aspect-square w-full overflow-hidden rounded-lg">
							<Cropper
								image={photo.url}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={handleCropChange}
								onZoomChange={handleZoomChange}
								onCropComplete={handleCropComplete}
								classes={{
									containerClassName: isPending ? 'opacity-80 pointer-events-none' : '',
								}}
							/>
						</div>
					)}
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" disabled={isPending} onClick={() => onOpenChange(false)}>
						Cancel
					</Button>

					<ButtonWithLoading type="button" onClick={handleUpdate} isLoading={isPending}>
						Update
					</ButtonWithLoading>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
