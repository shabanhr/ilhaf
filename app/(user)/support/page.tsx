import { siteName } from "@/config"
import { CheckIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import GradientHeading from "@/components/GradientHeading"

export const dynamic = "force-static";


const meta = {
    title: `Support - ${siteName}`,
    dec: "",
    link: `/support`
}

export function generateMetadata() {

    return {
        title: meta.title,
        description: meta.dec,
        keywords: [`Support`, siteName],
        alternates: {
            canonical: meta.link,
        },
        openGraph: {
            title: meta.title,
            description: meta.dec,
            url: meta.link,
            locale: 'en-US',
            siteName: siteName,
            type: 'website',
        },
    }
}


export default function Support() {
    return (
        <div className="w-full max-w-5xl mx-auto py-12 md:py-20">
            <div className="space-y-8">
                <div className="text-center space-y-4">
                    <GradientHeading h={1}>Support Our Mission</GradientHeading>
                    <p className="max-w-2xl mx-auto">
                        Your donations help us continue to provide valuable resources and content to the Islamic community. Join us in our mission!
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-start justify-center space-y-4">
                        {/* <Logo size="lg" /> */}
                        <GradientHeading h={2}>Our Mission</GradientHeading>
                        <p>
                            Our website is dedicated to providing a comprehensive platform for Islamic lyrics in both Urdu and English. We aim to help the community connect with their faith through the beauty of Islamic poetry and lyrics.
                        </p>
                        <p>
                            Your donations will help us expand our lyrics database, create more engaging content, and invest in infrastructure to better serve our community.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <GradientHeading h={2}>Donate Now</GradientHeading>
                        </CardHeader>
                        <CardContent>
                            <GradientHeading h={3}>Bank Details</GradientHeading>
                            <div className="space-y-2  p-4 rounded-lg border">
                                <div>
                                    <p className="tracking-wider">Account Holder:</p>
                                    <p className="opacity-80 my-1">HUSSNAIN ABBAS</p>
                                </div>
                                <div>
                                    <p className="tracking-wider">Bank:</p>
                                    <p className="opacity-80 my-1">Meezan Bank</p>
                                </div>
                                <div>
                                    <p className="tracking-wider">IBAN:</p>
                                    <p className="opacity-80 my-1">PK53MEZN0004180107066009</p>
                                </div>
                            </div>
                        </CardContent>


                    </Card>
                </div>
                <div className="space-y-6">
                    <GradientHeading h={2}>How Your Donations Help</GradientHeading>
                    <p>
                        Your donations help us maintain and expand our website, which serves as a hub for Islamic lyrics in both Urdu and English. Your support allows us to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <CheckIcon className="h-5 w-5" />
                            </div>
                            <span>Produce high-quality content</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <CheckIcon className="h-5 w-5" />
                            </div>
                            <span>Maintain and improve our website's functionality and accessibility</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <CheckIcon className="h-5 w-5" />
                            </div>
                            <span>Expand our collection of lyrics</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                <CheckIcon className="h-5 w-5" />
                            </div>
                            <span>Invest in better servers for better Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}