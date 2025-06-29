'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { AArrowUpIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { InnerInteractionButton } from './inner-Button';
import { cn } from '@/lib/utils';
import { useFontSize } from '@/hooks/use-font-size';
import { lyricsFontSizes } from '@/config/data';
import { Button } from '@/components/ui/button';
import { SmartPop, SmartPopContent, SmartPopTrigger, SmartPopBody } from '@/components/ui/smart-pop';

export const InteractionFontSize = () => {
	const fontSizeId = useFontSize((state) => state.id);
	const setFontSizeId = useFontSize((state) => state.setFontSize);
	const fontSizeIndex = lyricsFontSizes.findIndex((size) => size.id === fontSizeId);
	const [open, setOpen] = React.useState(false);

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
		<SmartPop open={open} onOpenChange={setOpen}>
			<SmartPopTrigger asChild>
				<InnerInteractionButton Icon={AArrowUpIcon}>Font Size</InnerInteractionButton>
			</SmartPopTrigger>
			<SmartPopContent>
				<SmartPopBody className="flex w-full items-center justify-center gap-x-2 py-12 md:py-5">
					<Button
						variant="outline"
						className="size-10 rounded-full p-2"
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
						className="size-10 rounded-full p-2"
						onClick={incrementFontSize}
						disabled={fontSizeIndex === lyricsFontSizes.length - 1}
					>
						<PlusIcon className="size-5" />
					</Button>
				</SmartPopBody>
			</SmartPopContent>
		</SmartPop>
	);
};
