import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';
import React, { ChangeEvent, DragEvent, useState } from 'react';

interface Props {
	IsDisabled?: boolean;
	className?: string;
	onUpload: (files: File[]) => void;
}

export function LyricsImageUploader({ IsDisabled, className, onUpload }: Props) {
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
			htmlFor="lyrics-image"
			className={cn(
				'flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors hover:border-gray-400',
				isDragging && 'border-gray-600 dark:hover:border-gray-50',
				className,
			)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<UploadIcon className="size-8 text-gray-400" />
			<p className="text-center text-xs text-gray-500 dark:text-gray-400">Drag & Drop or Click to Upload</p>
			<input
				type="file"
				accept="image/*"
				id="lyrics-image"
				className="sr-only"
				onChange={handleFileInputChange}
				disabled={IsDisabled}
			/>
		</label>
	);
}
