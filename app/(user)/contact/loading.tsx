import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <div className="space-y-8 min-h-full w-full ">
        <Skeleton className='min-h-[45px] w-full rounded-lg' />
        <Skeleton className='min-h-[45px] w-full rounded-lg' />
        <Skeleton className='min-h-[45px] w-full rounded-lg' />
        <Skeleton className='min-h-[80px] w-full rounded-lg' />
        <Skeleton className='min-h-[40px] w-full rounded-full' />
    </div>
}