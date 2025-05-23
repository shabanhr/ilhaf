import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    const InPutSkeloton = (
        <div>
            <Skeleton className='min-h-[20px] w-[100px]' />
            <Skeleton className='min-h-[40px] mt-1 w-full' />
        </div>
    )
    return <>
        <Skeleton className='h-[32px] mb-2 w-[145px]' />
        <Card className="min-h-[60vh] max-w-lg">
            <CardHeader>
                <Skeleton className='h-[20px] w-[100px]' />
            </CardHeader>
            <CardContent className="w-full space-y-5 ">
                <Skeleton className='size-20 rounded-full my-4 mx-auto' />
                {InPutSkeloton}
                {InPutSkeloton}
            </CardContent>
            <CardFooter>
                <Skeleton className='h-[45px] w-full rounded-full' />
            </CardFooter>
        </Card>
    </>
}