import { cn } from '@/lib/utils';

interface Props {
    invert?: boolean;
    active: boolean;
    size?: "xs" | "sm" | "md" | "lg";
}

const Spinner = ({ invert, size = "sm", active }: Props) => {
    if (!active) return null;

    const sizeClasses = {
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    const sizeDimensions = {
        xs: "after:w-[4px] after:h-[2px]",
        sm: "after:w-[5px] after:h-[3px]",
        md: "after:w-[6px] after:h-[4px]",
        lg: "after:w-[7px] after:h-[5px]",
    };

    const selectedSizeClass = sizeClasses[size];
    const selectedSizeDimensions = sizeDimensions[size];

    const dotClasses = cn(
        "absolute inset-0 flex justify-center after:rounded-full after:content-[''] after:bg-background animate-spin",
        selectedSizeDimensions,
        "[&>*:nth-child(3)]:delay-100 [&>*:nth-child(4)]:delay-200 [&>*:nth-child(5)]:delay-300",
        invert && "after:bg-primary"
    );

    return (
        <div className={cn("relative [&>*:nth-child(3)]:delay-100 [&>*:nth-child(4)]:delay-200 [&>*:nth-child(5)]:delay-300", selectedSizeClass)}>
            {[...Array(5)].map((_, i) => (
                <div key={i} className={dotClasses}></div>
            ))}
        </div>
    );
};

export default Spinner;
