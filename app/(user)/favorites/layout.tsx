import { Metadata } from "next";
import { domain, siteLink, siteName } from "@/config";
import { currentUser } from "@/config/auth";
import { redirect } from "next/navigation";
import { FavoriteBeforeIcon } from "@/components/icons";

const meta = {
    title: 'My favorites - Ilhaf',
    dec: "",
    link: "/favorites"
}


export const metadata: Metadata = {
    title: meta.title,
    description: meta.dec,
    metadataBase: new URL(siteLink),
    applicationName: siteName,
    keywords: [siteName, domain],
    publisher: siteName,
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
    },
    alternates: {
        canonical: meta.link,
    },
    openGraph: {
        title: meta.title,
        description: meta.dec,
        url: meta.link,
        locale: 'en-US',
        siteName,
        type: 'website',
    },
}
export default async function RootLayout({ children }: {
    children: React.ReactNode;
}) {

    const user = await currentUser();
    if (!user) {
        return redirect("/auth")
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className='my-2 space-y-5'>
                <h1 className='flex items-center justify-start gap-x-3 mb-10 my-5'>
                    <FavoriteBeforeIcon className='size-7' />  My Favorites</h1>
                {children}
            </div>
        </div>
    );
}
