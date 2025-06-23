'use client';
import React from 'react';
import { ButtonWithLoading } from '@/components/ui/button';
import {
	useForm,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { lyricsInsertSchema, lyricsInsertSchemaType } from './_lib/types';
import { LyricsWithData } from '@/types';
import { useRouter } from 'next/navigation';
import { AddNewLyrics } from './_lib/actions';
import { getVideoData } from './_lib/queries';
import DeleteComp from './_components/delete-comp';
import LyricsInputs from './_components/lyrics-inputs';
import { capitalizeText, getImageURL, normalizeYouTubeURL, slugify } from '@/lib/utils';
import { deleteFileFromR2 } from '@/lib/actions/r2';
import { LyricsImageUploader } from './_components/uploader';
import { getErrorMessage, showErrorToast } from '@/lib/utils/error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LyricsTypes } from '@/config/data';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

interface Props {
	lyric?: LyricsWithData;
	imageQ: boolean;
}

function useMultiLoading() {
	const [loadingKeys, setLoading] = React.useState<string[]>([]);
	const start = (key: string) => setLoading((prev) => [...prev, key]);
	const end = (key: string) => setLoading((prev) => prev.filter((k) => k !== key));
	const isLoading = (key: string) => loadingKeys.includes(key);
	return { start, end, isLoading };
}

export default function AddClientPage({ lyric, imageQ }: Props) {
	const InitSlug = lyric?.slug;
	const { start, end, isLoading } = useMultiLoading();
	const [image, setImage] = React.useState<{
		file: File | null;
		url: string;
		isUploaded: boolean;
	}>({
		url: InitSlug && imageQ ? getImageURL({ slug: InitSlug, oldSlug: lyric?.oldSlug }) : '',
		file: null,
		isUploaded: false,
	});

	const router = useRouter();

	const form = useForm({
		schema: lyricsInsertSchema,
		defaultValues: {
			title: lyric?.title,
			slug: lyric?.slug,
			type: lyric?.type,
			english: lyric?.english ? lyric?.english : undefined,
			urdu: lyric?.urdu ? lyric?.urdu : undefined,
			video: lyric?.video ? lyric?.video : undefined,
			dop: lyric?.dop,
			topics: lyric?.topics.map((topic) => topic.topicId) ?? [],
			writers: lyric?.writers.map((item) => item.writerId) ?? [],
			reciters: lyric?.reciters.map((item) => item.reciterId) ?? [],
			status: lyric?.status || 'draft',
		},
	});

	const {
		watch,
		getValues,
		setValue,
		formState: { isSubmitting },
	} = form;

	const slug = watch('slug');

	const handleDeleteImage = async () => {
		start('image');
		if (lyric) {
			await deleteFileFromR2(getImageURL({ slug: lyric.slug, oldSlug: lyric.oldSlug, keyOnly: true }));
		}
		setImage({ file: null, url: '', isUploaded: false });
		end('image');
	};

	const validateAndUpload = async (files: File[]) => {
		const file = files[0];
		const extensions = ['jpeg', 'jpg', 'png', 'webp', 'PNG'];
		const imgExt = file.name.substring(file.name.lastIndexOf('.') + 1);
		const validExt = extensions.includes(imgExt);

		if (!validExt) {
			return toast.error('Selected file is not an image');
		} else if (file.size / (1024 * 1024) >= 10) {
			return toast.error('Selected Image is too big');
		} else {
			setImage({ file, url: URL.createObjectURL(file), isUploaded: true });
		}
	};

	const UploadImage = async () => {
		const { file, url } = image;
		const formData = new FormData();
		formData.set('slug', slug);
		if (file) {
			formData.set('file', file);
		} else if (url) {
			formData.set('url', url);
		}
		const response = await fetch('/api/upload', {
			method: 'POST',
			cache: 'no-store',
			body: formData,
		});
		if (!response.ok) {
			toast.error(`Some think is wrong! ${JSON.stringify(await response.json())}`);
		}
	};

	const fetchData = async (fetchType: 'image' | 'data') => {
		start(fetchType);
		const videoURL = normalizeYouTubeURL(getValues('video'));
		try {
			const response = await getVideoData(videoURL);

			if (!response.success) {
				toast.error(response.message);
				return;
			}
			const { thumbnails, uploadDate, title, videoId } = response;

			if (fetchType === 'image') {
				let thumbUrl = thumbnails[thumbnails.length - 1].url;
				if (thumbUrl.includes('?')) {
					thumbUrl = thumbUrl.split('?')[0];
				}
				return setImage({ file: null, url: thumbUrl, isUploaded: true });
			}

			if (fetchType === 'data' || !fetchType) {
				if (videoId) {
					setValue('video', videoId);
				}
				setValue('dop', new Date(uploadDate));

				if (!lyric) {
					const matchingType = LyricsTypes.find((type) => title.toLowerCase().includes(type.name.toLowerCase()));
					if (matchingType) {
						form.setValue('type', matchingType.id);
					}
				}
			}
		} catch (error) {
			toast.error(`Something went wrong: ${getErrorMessage(error)}`);
		} finally {
			end(fetchType);
		}
	};

	const onSubmit = async (data: lyricsInsertSchemaType) => {
		try {
			const { success, message } = await AddNewLyrics(data, lyric?.id);
			if (!success) {
				return toast.error(message);
			}
			if (image.isUploaded) {
				await UploadImage();
			}
			toast(message);
			router.push('/admin/lyrics');
		} catch (error) {
			showErrorToast(error);
		}
	};

	const IsDisabled = isSubmitting || isLoading('fetching');

	const debouncedSlugUpdate = useDebouncedCallback((title: string) => {
		const reciters = getValues('reciters') || [];
		const reciterSlugs = reciters.map((id) => {
			const reciter = lyric?.reciters.find((r) => r.reciterId === id);
			return reciter?.reciter?.slug || slugify(reciter?.reciter?.name || '');
		});
		const newSlug = (reciterSlugs.length ? `${reciterSlugs.join('-')}-` : '') + slugify(title.trim());
		setValue('slug', newSlug);
	}, 300);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-5xl space-y-4">
				<div className="flex gap-5">
					<div className="bg-accent aspect-video h-full w-full max-w-[384px] rounded-lg">
						{image.url ? (
							<div className="relative">
								<div className="absolute top-2 right-2">
									<DeleteComp handleDelete={handleDeleteImage} />
								</div>
								<img src={image.url} width={384} height={188} alt="a" className="rounded-md" />
							</div>
						) : (
							<LyricsImageUploader IsDisabled={isSubmitting} onUpload={validateAndUpload} />
						)}
					</div>
					<div className="w-full space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											disabled={IsDisabled || !!lyric}
											placeholder="Enter Title"
											value={field.value}
											onChange={(e) => {
												const capitalized = capitalizeText(e.target.value);
												setValue('title', capitalized);
												debouncedSlugUpdate(capitalized);
											}}
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>Slug: {slug}</FormDescription>
								</FormItem>
							)}
						/>
						<div className="flex flex-col items-center justify-center gap-2">
							<FormField
								control={form.control}
								name="video"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Youtube URL</FormLabel>
										<FormControl>
											<Input disabled={IsDisabled} placeholder="Enter Video URL" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex w-full items-center justify-center gap-2">
								<ButtonWithLoading
									type="button"
									onClick={() => fetchData('image')}
									disabled={IsDisabled || isLoading('image')}
									isLoading={isLoading('image')}
								>
									Image
								</ButtonWithLoading>

								<ButtonWithLoading
									type="button"
									onClick={() => fetchData('data')}
									disabled={IsDisabled || isLoading('data')}
									isLoading={isLoading('data')}
								>
									Data
								</ButtonWithLoading>
							</div>
						</div>
					</div>
				</div>

				<LyricsInputs form={form} IsDisabled={IsDisabled} lyric={lyric} />

				<div className="mt-10 flex w-full justify-between gap-2">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange} disabled={IsDisabled}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="published">Published</SelectItem>
											<SelectItem value="draft">Draft</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<ButtonWithLoading type="submit" className="max-w-sm" disabled={IsDisabled} isLoading={isSubmitting}>
						{lyric ? 'Update' : 'Submit'}
					</ButtonWithLoading>
				</div>
			</form>
		</Form>
	);
}
