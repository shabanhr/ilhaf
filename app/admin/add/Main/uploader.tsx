import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import React, { ChangeEvent, DragEvent, useState } from "react";

interface Props {
    id: string;
    IsDisabled?: boolean;
    className?: string;
    onUpload: (files: File[]) => void;
}

const Uploader = ({ id, onUpload, IsDisabled, className }: Props) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        await onUpload(files);
    };

    const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        await onUpload(files);
    };

    return (
        <label
            htmlFor={id} // Use the dynamic id prop
            className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 h-full rounded-lg border-2 border-dashed p-8 transition-colors hover:border-gray-400",
                isDragging && "border-gray-600 dark:hover:border-gray-50",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <UploadIcon className="size-8 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                Drag & Drop or Click to Upload
            </p>
            <input
                type="file"
                accept="image/*"
                id={id} // Use the dynamic id prop
                className="sr-only"
                onChange={handleFileInputChange}
                disabled={IsDisabled}
            />
        </label>
    );
};

export default Uploader;
