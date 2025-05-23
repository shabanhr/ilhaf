import { siteName } from "@/config";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { currentUser } from "@/config/auth";
import { Card } from "@/components/ui/card";

const meta = {
    title: `Login or Create an Account - ${siteName}`,
    dec: "If you have any questions regarding our site or need help, you can contact us by filling out the form here.",
    link: `/auth`
}

export const metadata: Metadata = {
    title: meta.title,
    description: meta.dec,
    keywords: [siteName, 'Login', 'Create an Account'],
    publisher: siteName,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: false,
        },
    },
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
    }
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const user = await currentUser();

    if (user) return redirect("/");

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="w-full h-full py-12 col-span-1 md:col-span-2 lg:col-span-3 md:col-span- flex flex-col justify-center">
                <Logo size="md" />
                <h1 className="text-lg mt-2 font-normal">Login or Create an Account</h1>
            </div>
            <div className="w-full relative col-span-1 md:col-span-3 lg:col-span-2">
                <Card className="w-full min-h-[80vh]">
                    {children}
                </Card>
            </div>
        </div>
    )

}