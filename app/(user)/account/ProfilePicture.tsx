"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import Cropper from "react-easy-crop";
import getCroppedImg from "./createImage";

import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { PencilIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialChar } from "@/lib/utils";
import { SessionUser } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProfilePicture = ({ user }: { user: SessionUser }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const { id, image, name } = user;

  const [isPending, setIsPending] = useState<boolean>(false);
  const [photo, setPhoto] = useState<{ url: string; file: File | null }>({ url: "", file: null });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extentions = ["jpeg", "jpg", "png", "webp", "PNG"];
    const img_ext = file.name.substring(file.name.lastIndexOf('.') + 1);
    const validExt = extentions.includes(img_ext);

    if (!validExt) {
      return toast.error("Selected file is not an image");
    } else {
      if (parseFloat(String(file.size)) / (1024 * 1024) >= 10) {
        toast.error("Selected Image is too big");
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
      setIsPending(true)
      try {
        const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);
        const file = new File([croppedImg.file], `${photo?.file?.name}`, {
          type: photo?.file?.type,
        });
        const formData = new FormData();
        formData.set('file', file)
        formData.set('id', id)

        const response = await fetch('/api/updateAvatar', {
          method: 'POST',
          cache: 'no-store',
          body: formData,
        });

        if (response.ok) {
          setPhoto({ url: "", file: null });
          onOpenChange(false)
          toast.success('Image updated successfully');
          const res = await response.json();
          update({
            image: res.url,
          })
          router.refresh();
        } else {
          toast.error('Something wnet Wrong!');
        }
      } catch (error: any) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setIsPending(false)
      }
    } else {
      toast.info('Select An Image First!');
    }

  };


  return (
    <Modal open={open} onOpenChange={onOpenChange} >
      <div className="w-full gap-x-4 my-4 mx-auto">
        <Avatar className="relative w-20 h-20 mx-auto">
          <AvatarImage src={image || ""} />
          <AvatarFallback className="text-2xl font-bold">{getInitialChar(name)}</AvatarFallback>
          <ModalTrigger className="cursor-pointer absolute flex items-center justify-center top-0 bottom-0 right-0  left-0  w-8 h-8  m-auto p-1 rounded-full bg-background border">
            <PencilIcon className="w-4 h-4" />
          </ModalTrigger>
        </Avatar>
      </div>

      <ModalContent className="w-full">
        <ModalHeader className="flex flex-col gap-1">
          <ModalTitle>
            Upload Image
          </ModalTitle>
        </ModalHeader>
        <Input
          disabled={isPending}
          onChange={handleFileChange}
          type="file"
        />
        {photo?.file && (
          <div className="w-full mx-auto min-w-xs max-w-sm">
            <h2 className="font-semibold mt-1 text-lg">Crop Image</h2>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-accent">
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

          <Button type="button"
            disabled={isPending}
            onClick={handleUpdate}
            icon={<Spinner active={isPending} />}
          > Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePicture;
