'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Cropper from 'react-easy-crop';
import getCroppedImg from './createImage';

import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from '@/components/ui/modal';

import { Button, ButtonWithLoading } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PencilIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitialChar } from '@/lib/utils';
import { SessionUser } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProfilePicture = ({ user }: { user: SessionUser }) => {
	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const { id, image, name } = user;

	const [isPending, setIsPending] = useState<boolean>(false);
	const [photo, setPhoto] = useState<{ url: string; file: File | null }>({ url: '', file: null });
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const extentions = ['jpeg', 'jpg', 'png', 'webp', 'PNG'];
		const img_ext = file.name.substring(file.name.lastIndexOf('.') + 1);
		const validExt = extentions.includes(img_ext);

		if (!validExt) {
			return toast.error('Selected file is not an image');
		} else {
			if (parseFloat(String(file.size)) / (1024 * 1024) >= 10) {
				toast.error('Selected Image is too big');
			} else {
				setPhoto({ url: URL.createObjectURL(file), file });
			}
		}
	};

	const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleCropChange = (crop: any) => {
		setCrop(crop);
	};

	const handleZoomChange = (zoom: any) => {
		setZoom(zoom);
	};

	const [open, onOpenChange] = useState<boolean>(false);
	const { update } = useSession();

	const router = useRouter();

	const handleUpdate = async () => {
		if (photo?.file) {
			setIsPending(true);
			try {
				const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);
				const file = new File([croppedImg.file], `${photo?.file?.name}`, {
					type: photo?.file?.type,
				});
				const formData = new FormData();
				formData.set('file', file);
				formData.set('id', id);

				const response = await fetch('/api/updateAvatar', {
					method: 'POST',
					cache: 'no-store',
					body: formData,
				});

				if (response.ok) {
					setPhoto({ url: '', file: null });
					onOpenChange(false);
					toast.success('Image updated successfully');
					const res = await response.json();
					update({
						image: res.url,
					});
					router.refresh();
				} else {
					toast.error('Something wnet Wrong!');
				}
			} catch (error: any) {
				toast.error(error.message);
				console.log(error);
			} finally {
				setIsPending(false);
			}
		} else {
			toast.info('Select An Image First!');
		}
	};

	return (
		<Modal open={open} onOpenChange={onOpenChange}>
			<div className="mx-auto my-4 w-full gap-x-4">
				<Avatar className="relative mx-auto h-20 w-20">
					<AvatarImage src={image || ''} />
					<AvatarFallback className="text-2xl font-bold">{getInitialChar(name)}</AvatarFallback>
					<ModalTrigger className="bg-background absolute top-0 right-0 bottom-0 left-0 m-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-1">
						<PencilIcon className="h-4 w-4" />
					</ModalTrigger>
				</Avatar>
			</div>

			<ModalContent className="w-full">
				<ModalHeader className="flex flex-col gap-1">
					<ModalTitle>Upload Image</ModalTitle>
				</ModalHeader>
				<Input disabled={isPending} onChange={handleFileChange} type="file" />
				{photo?.file && (
					<div className="mx-auto w-full max-w-sm min-w-xs">
						<h2 className="mt-1 text-lg font-semibold">Crop Image</h2>
						<div className="bg-accent relative aspect-square w-full overflow-hidden rounded-lg">
							<Cropper
								image={photo.url}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={handleCropChange}
								onZoomChange={handleZoomChange}
								onCropComplete={handleCropComplete}
							/>
						</div>
					</div>
				)}

				<ModalFooter>
					<ModalClose asChild>
						<Button variant="outline" color="danger" disabled={isPending}>
							Close
						</Button>
					</ModalClose>

					<ButtonWithLoading type="button" isLoading={isPending} onClick={handleUpdate}>
						Update
					</ButtonWithLoading>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ProfilePicture;
