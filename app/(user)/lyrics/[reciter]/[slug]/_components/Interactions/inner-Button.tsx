import { MotionSpan } from '@/components/motion'
import { useLyricsInteractions } from '@/hooks/use-lyrics-interactions';
import React from 'react'

export const InnerInteractionButton = ({ Icon, text }: { Icon: any, text: string }) => {
    const isHovered = useLyricsInteractions((state) => state.isHovered);

    return (
        <>
            <MotionSpan>
                <Icon className="size-5 md:size-4" />
            </MotionSpan>
            {isHovered && (
                <MotionSpan
                    layoutId="interaction-button-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden md:block md:ml-2"
                >
                    {text}
                </MotionSpan>
            )}
        </>
    )
}