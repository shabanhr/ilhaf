'use client';
import React, { useState, useEffect } from 'react';
import { MotionDiv } from '@/components/motion';
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import { cn } from '@/lib/utils';

const getFontSizeById = (id: string) => {
	return lyricsFontSizes.find((item) => item.id === id);
};

export const lyricsFontSizes = [
	{
		id: 'xs',
		english: 'text-[12px] leading-[20px] space-y-4',
		urdu: 'text-[12px] leading-[26px] space-y-4',
	},
	{
		id: 'sm',
		english: 'text-[14px] leading-[24px] space-y-5',
		urdu: 'text-[14px] leading-[30px] space-y-5',
	},
	{
		id: 'md',
		english: 'text-[16px] leading-[28px] space-y-5',
		urdu: 'text-[16px] leading-[34px] space-y-5',
	},
	{
		id: 'lg',
		english: 'text-[18px] leading-[32px] space-y-6',
		urdu: 'text-[18px] leading-[38px] space-y-6',
	},
	{
		id: 'xl',
		english: 'text-[20px] leading-[36px] space-y-6',
		urdu: 'text-[20px] leading-[42px] space-y-6',
	},
];

const TabTriggers = ({ showTabs }: { showTabs: boolean }) => {
	const [activeTab, setActiveTab] = useState(false);
	const fontSizeId = useLyricsInteractions((state) => state.fontSizeId);

	useEffect(() => {
		const lyricsContent = document.getElementById('lyrics');
		const urdulyricsContent = document.getElementById('urdu-lyrics');
		const lyricsClasses = getFontSizeById(fontSizeId);

		if (lyricsContent && urdulyricsContent && lyricsClasses) {
			const englishClassList = cn(!activeTab ? lyricsClasses.english : 'hidden');
			const urduClassList = cn(activeTab ? lyricsClasses.urdu : 'hidden');
			// Apply computed classes
			lyricsContent.className = englishClassList;
			urdulyricsContent.className = urduClassList;
		}
	}, [activeTab, fontSizeId]);

	if (!showTabs) return null;

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div className="flex w-full items-center justify-center gap-2">
				<div
					id="english-tab"
					onClick={() => setActiveTab(false)}
					className={cn(
						'relative cursor-pointer rounded-full px-5 py-2 text-xl font-medium',
						!activeTab ? 'text-primary' : 'text-primary/70',
					)}
				>
					{!activeTab && (
						<MotionDiv
							layoutId="bubble"
							className="bg-primary absolute right-0 bottom-0 left-0 z-10 h-[2px] w-full"
							style={{ borderRadius: 9999 }}
							transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
						/>
					)}
					English
				</div>
				<div
					id="urdu-tab"
					onClick={() => setActiveTab(true)}
					className={cn(
						'relative cursor-pointer rounded-full px-5 py-2 text-xl font-medium',
						activeTab ? 'text-primary' : 'text-primary/70',
					)}
				>
					{activeTab && (
						<MotionDiv
							layoutId="bubble"
							className="bg-primary absolute right-0 bottom-0 left-0 z-10 h-[2px] w-full"
							style={{ borderRadius: 9999 }}
							transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
						/>
					)}
					Urdu
				</div>
			</div>
			<div className="bg-primary/30 h-[1px] w-full" />
		</div>
	);
};

export default TabTriggers;
