
import { siteName } from "@/config"
import { Main } from "./Main"
import { SessionUser } from "@/types/auth"
import { currentUser } from "@/config/auth"
import { redirect } from "next/navigation"
import { getSocialAccountsById } from "./actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SocialAccount from "./SocialAccount"


const meta = {
    title: `Account - ${siteName}`,
    dec: "",
    link: `/account`
}

export function generateMetadata() {

    return {
        title: meta.title,
        description: meta.dec,
        keywords: [`Account`, siteName],
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

export default async function Page() {
    const user = await currentUser();
    if (!user) {
        return redirect("/auth");
    }

    const Accouts = await getSocialAccountsById(user.id);

    return (

            <Tabs defaultValue="profile" className="w-full max-w-lg">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Main user={user as SessionUser} />
                </TabsContent>
                <TabsContent value="security">
                    <SocialAccount accounts={Accouts} />
                </TabsContent>
            </Tabs>
    )
}
