export type Item = {
    value: string;
    label: string;
};

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";


interface Props {
    open?: boolean;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    trigger: React.ReactNode;
    className?: string
    asChild?: true;
}


const MagicBox = ({ children, trigger, ...props }: Props) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const MagicBox = isDesktop ? Popover : Drawer;
    const MagicBoxTrigger = isDesktop ? PopoverTrigger : DrawerTrigger;
    const MagicBoxContent = isDesktop ? PopoverContent : DrawerContent;
    return (
        <MagicBox {...props}>
            <MagicBoxTrigger asChild>
                {trigger}
            </MagicBoxTrigger>
            <MagicBoxContent className="w-full px-4 lg:px-0">
                {children}
            </MagicBoxContent>
        </MagicBox>
    )
}


export default MagicBox;