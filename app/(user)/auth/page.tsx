import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Auth from "@/components/auth";

export default function Page() {


    return (
        <>
            <CardHeader>
                <CardTitle>
                    Signin
                </CardTitle>
            </CardHeader>
            <CardContent className="min-w-full flex flex-col justify-center min-h-[60vh]">
                <Auth />
            </CardContent>
            <CardFooter>
                <div className='opacity-80 text-[12px] text-center'>
                    By clicking Continue, you agree to our <Link className='a' href='/policy'>Privacy Policy</Link>.
                </div>
            </CardFooter>
        </>
    );
}
