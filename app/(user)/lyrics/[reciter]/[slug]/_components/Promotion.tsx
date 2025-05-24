import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
	orientation?: 'horizontal' | 'vertical';
}

const adlink =
	"https://api.whatsapp.com/send?phone=923247685136&text=Assalamu%20Alaikum%2C%0AI'm%20interested%20in%20advertising%20on%20ilhaf.com.%20Can%20we%20discuss%20the%20details%3F";

const Promotion = ({
	heading = 'Show Your Ad Here',
	dec = ' Reach a global audience and showcase your message to the shia community.',
	topLabel = 'Premium Space',
	buttonLabel = 'Get Started',
	bottomLabel = 'Limited availability!',
	link = adlink,
	Icon = Sparkles,
	orientation = 'vertical',
}: Props) => {
	const isHorizontal = orientation === 'horizontal';

	return (
		<Card className="group mx-auto my-5 w-full">
			<CardContent
				className={cn('flex flex-col p-4 sm:p-6', {
					'md:flex-row': isHorizontal,
				})}
			>
				<div className="flex w-full flex-col items-start justify-center">
					<div
						className={cn('mb-4 flex w-full items-center justify-between', {
							'md:justify-start md:gap-x-5': isHorizontal,
						})}
					>
						<Badge variant="secondary" className="mb-2 sm:mb-0">
							{topLabel}
						</Badge>
						<Sparkles className="text-primary h-5 w-5 transition-all duration-300 group-hover:animate-pulse" />
					</div>
					<h2 className="text-foreground mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{heading}</h2>
					<p className="text-muted-foreground mb-5 text-sm sm:text-base">{dec}</p>
				</div>
				<div className="flex items-center justify-center">
					<Link
						target="_blank"
						href={link}
						className={buttonVariants({ className: cn('w-full', { 'md:w-max': isHorizontal }) })}
					>
						{buttonLabel}
						<Icon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between rounded-b-xl border-t p-4">
				<p className="text-muted-foreground text-sm font-medium">{bottomLabel}</p>
				<Badge variant="outline">Act Now</Badge>
			</CardFooter>
		</Card>
	);
};

export default Promotion;
