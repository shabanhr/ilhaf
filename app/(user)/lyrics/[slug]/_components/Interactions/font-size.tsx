'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { AArrowUpIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InnerInteractionButton } from './inner-Button';
import { cn } from '@/lib/utils';
import { useFontSize } from '@/hooks/use-font-size';
import { lyricsFontSizes } from '@/config/data';

export const InteractionFontSize = () => {
	const fontSizeId = useFontSize((state) => state.id);
	const setFontSizeId = useFontSize((state) => state.setFontSize);
	const fontSizeIndex = lyricsFontSizes.findIndex((size) => size.id === fontSizeId);

	const handleFontSizeChange = (value: number[]) => {
		const index = value[0];
		const selected = lyricsFontSizes[index];
		if (selected) setFontSizeId(selected.id);
	};

	const incrementFontSize = () => {
		if (fontSizeIndex < lyricsFontSizes.length - 1) {
			handleFontSizeChange([fontSizeIndex + 1]);
		}
	};

	const decrementFontSize = () => {
		if (fontSizeIndex > 0) {
			handleFontSizeChange([fontSizeIndex - 1]);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="md:h-8 md:w-full md:justify-start md:p-2">
					<InnerInteractionButton Icon={AArrowUpIcon} text="Font Size" />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="flex w-full items-center justify-center gap-x-2">
					<Button
						variant="outline"
						className="size-9 rounded-full p-2"
						onClick={decrementFontSize}
						disabled={fontSizeIndex === 0}
					>
						<MinusIcon className="size-5" />
					</Button>
					<div className="flex w-full flex-col gap-2">
						<Slider
							min={0}
							max={lyricsFontSizes.length - 1}
							step={1}
							value={[fontSizeIndex]}
							onValueChange={handleFontSizeChange}
						/>
						<div className="flex w-full justify-between px-1">
							{lyricsFontSizes.map((size, index) => (
								<span key={size.id} className={cn('text-xs font-thin', { 'font-bold': fontSizeIndex === index })}>
									{size.id.toUpperCase()}
								</span>
							))}
						</div>
					</div>
					<Button
						variant="outline"
						className="size-9 rounded-full p-2"
						onClick={incrementFontSize}
						disabled={fontSizeIndex === lyricsFontSizes.length - 1}
					>
						<PlusIcon className="size-5" />
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
