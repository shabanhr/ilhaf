import { cn } from '@/lib/utils';

export function BorderSeparator({
	children,
	className,
	...props
}: React.ComponentProps<'div'> & {
	showDecorator?: boolean;
	decoratorClassName?: React.ComponentProps<'div'>['className'];
}) {
	return (
		<div className={cn('relative', className)} {...props}>
			<div
				className="bg-border pointer-events-none absolute top-0 left-1/2 h-px w-screen -translate-x-1/2"
				aria-hidden="true"
			/>
			{children}
		</div>
	);
}

export function PageHeading({ className, ...props }: React.ComponentProps<'h1'>) {
	return (
		<h1
			className={cn(
				'text-2xl font-medium [text-shadow:_0_-20px_40px_rgba(255,255,255,0.20),_0_20px_40px_rgba(255,255,255,0.20)] md:text-3xl lg:text-4xl lg:font-semibold xl:font-bold',
				className,
			)}
			{...props}
		/>
	);
}

export function PageDescription({ className, ...props }: React.ComponentProps<'p'>) {
	return <p className={cn('text-muted-foreground my-2 text-sm md:text-base max-w-xl text-balance', className)} {...props} />;
}
