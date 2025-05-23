import Logo from "@/components/Logo"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="w-full h-full py-12 col-span-1 md:col-span-2 lg:col-span-3 md:col-span- flex flex-col justify-center">
                <Logo size="md" />
                <h1 className="text-sm mt-2 font-normal">If you have any questions regarding our site or need help, please fill out the form here. We do our best to respond within 1 business day.</h1>
            </div>
            <div className="w-full relative col-span-1 md:col-span-3 lg:col-span-2">
                <Card className="w-full min-h-[80vh]">
                    <CardHeader>
                        <CardTitle>
                            Contact Us
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-full w-full flex justify-center">
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}