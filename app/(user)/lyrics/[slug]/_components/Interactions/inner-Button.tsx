'use client';
import { motion } from 'motion/react';
import React from 'react';
import { IconType } from '@/types';
import { useToggle } from '@/hooks/use-toggle';

export const InnerInteractionButton = ({ Icon, text }: { Icon: IconType; text: string }) => {
	const [isHovered] = useToggle('is-interaction-hovered');

	return (
		<>
			<motion.span>
				<Icon className="size-5 md:size-4" />
			</motion.span>
			{isHovered && (
				<motion.span
					layoutId="interaction-button-text"
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className="hidden md:ml-2 md:block"
				>
					{text}
				</motion.span>
			)}
		</>
	);
};
