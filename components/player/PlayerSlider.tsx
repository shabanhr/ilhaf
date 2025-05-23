"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { MotionDiv } from "../motion";

interface PlayerSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    width?: string | number;
}

const PlayerSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>,
    PlayerSliderProps
>(({ className, width, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center py-2",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-3 rounded-full border border-primary/50 bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        {!props.disabled && <MotionDiv
            layoutId="slider-progress"
            className={`bg-primary/30 h-1 absolute left-0 z-40 `}
            style={{ width }}
        />}

    </SliderPrimitive.Root>
))
PlayerSlider.displayName = SliderPrimitive.Root.displayName

export { PlayerSlider }
