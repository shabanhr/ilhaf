import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { IconType } from '@/types';
import { Spinner } from './spinner';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);
type ButtonProps = React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

// Button With Loading
interface ButtonWithLoadingProps extends ButtonProps {
	icon?: IconType; // Icon to show
	isLoading?: boolean; // Flag for loading state
}

const ButtonWithLoading = ({
	className,
	variant,
	size,
	isLoading = false,
	children,
	...props
}: ButtonWithLoadingProps) => (
	<Button className={cn(className)} variant={variant} size={size} disabled={isLoading || props.disabled} {...props}>
		{isLoading ? (
			<Spinner size={size === 'sm' ? 15 : size === 'lg' ? 18 : 16} invert={!variant || variant === 'default'} />
		) : (
			props.icon && <props.icon />
		)}
		{children}
	</Button>
);

export { Button, ButtonWithLoading, buttonVariants };
