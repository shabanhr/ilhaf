import { siteName } from "@/config"
import ContactForm from "./Form"
import { currentUser } from "@/config/auth"

export const dynamic = "force-static";

const meta = {
    title: `Contact - ${siteName}`,
    dec: "If you have any questions regarding our site or need help, you can contact us by filling out the form here.",
    link: `/contact`
}

export function generateMetadata() {

    return {
        title: meta.title,
        description: meta.dec,
        keywords: [`Contact`, siteName],
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
    return <ContactForm user={user} />
}