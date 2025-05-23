import React from 'react';
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconType } from '@/types';

interface Props {
    heading?: string;
    dec?: string;
    topLabel?: string;
    buttonLabel?: string;
    bottomLabel?: string;
    Icon?: IconType;
    link?: string;
    orientation?: "horizontal" | "vertical";
}

const adlink = "https://api.whatsapp.com/send?phone=923247685136&text=Assalamu%20Alaikum%2C%0AI'm%20interested%20in%20advertising%20on%20ilhaf.com.%20Can%20we%20discuss%20the%20details%3F";


const Promotion = ({
    heading = "Show Your Ad Here",
    dec = " Reach a global audience and showcase your message to the shia community.",
    topLabel = "Premium Space",
    buttonLabel = "Get Started",
    bottomLabel = "Limited availability!",
    link = adlink,
    Icon = Sparkles,
    orientation = "vertical"
}: Props) => {

    const isHorizontal = orientation === "horizontal";


    return (
        <Card
            className="w-full mx-auto my-5 group"
        >
            <CardContent className={cn("p-4 sm:p-6 flex flex-col", {
                "md:flex-row": isHorizontal,
            })}>
                <div className='w-full flex flex-col items-start justify-center'>
                    <div className={cn("w-full flex items-center justify-between mb-4", {
                        "md:justify-start md:gap-x-5": isHorizontal,
                    })}>
                        <Badge variant="secondary" className="mb-2 sm:mb-0">
                            {topLabel}
                        </Badge>
                        <Sparkles className="h-5 w-5 text-primary transition-all duration-300 group-hover:animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight text-foreground">
                        {heading}
                    </h2>
                    <p className="text-sm sm:text-base mb-5 text-muted-foreground">
                        {dec}
                    </p>
                </div>
                <div className='flex items-center justify-center'>
                    <Link
                        target='_blank'
                        href={link}
                        className={buttonVariants({ className: cn("w-full", { "md:w-max": isHorizontal }) })}
                    >
                        {buttonLabel}
                        <Icon className="ml-2 h-4 w-4 transition-transform duration-300  group-hover:translate-x-1" />
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between items-center rounded-b-xl">
                <p className="text-sm font-medium text-muted-foreground">
                    {bottomLabel}
                </p>
                <Badge
                    variant="outline"
                >
                    Act Now
                </Badge>
            </CardFooter>
        </Card >
    );
};

export default Promotion;
