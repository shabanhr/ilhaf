import AuthLoader from "@/components/auth/AuthLoader";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <>
        <CardHeader>
            <Skeleton className='h-[20px] w-[100px]  rounded-lg' />
        </CardHeader>
        <CardContent className="min-w-full flex flex-col justify-center min-h-[60vh]">
            <AuthLoader />
        </CardContent>
        <CardFooter>
            <Skeleton className='h-[10px] w-full rounded-lg' />
        </CardFooter>
    </>
}