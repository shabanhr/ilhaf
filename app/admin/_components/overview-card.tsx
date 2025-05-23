import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface OverviewCardProps {
    title: string
    value: number
    description?: string
    icon?: React.ReactNode
}

export function OverviewCard({
    title,
    value,
    description,
    icon,
}: OverviewCardProps) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium my-0">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent className="space-y-1">
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
            </CardContent>
        </Card>
    )
}

export function OverviewCardSkeleton({ d = true }: { d?: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="size-4" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-6 w-12" />
                {d && <Skeleton className="h-4 w-40" />}
            </CardContent>
        </Card>
    )
}