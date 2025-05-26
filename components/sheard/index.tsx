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
