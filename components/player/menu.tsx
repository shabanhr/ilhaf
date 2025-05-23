import React from 'react'
import { EllipsisVertical, RepeatIcon, Volume2Icon, VolumeXIcon, XIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from '../ui/slider';
import { usePlayer } from '@/hooks/use-player';

const PlayerMenu = () => {
    const { volume, setVolume, loop, setLoop, clearItem } = usePlayer();

    const handleVolumeChange = (value: number[]) => {
        const volume = Math.min(Math.max(value[0], 0), 1);
        setVolume(volume);
    };



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='w-8 p-1'>
                    <EllipsisVertical className='size-5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuCheckboxItem
                    checked={loop}
                    onCheckedChange={setLoop}
                >
                    Loop
                    <RepeatIcon className='size-4 ml-auto' />
                </DropdownMenuCheckboxItem>
                <DropdownMenuItem onClick={() => clearItem()} >
                    Close
                    <XIcon className='size-4 ml-auto' />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='flex items-center justify-center gap-2 p-1'>
                    {volume === 0 ? (
                        <VolumeXIcon className="w-6 h-6" />
                    ) : (
                        <Volume2Icon className="w-6 h-6" />
                    )} <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PlayerMenu
