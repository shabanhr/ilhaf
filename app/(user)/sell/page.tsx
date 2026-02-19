import { getMetadata } from '@/lib/utils/metadata';
import { BorderSeparator, PageHeading, PageDescription } from '@/components/sheard';
import Logo from '@/components/Logo';
import { MailIcon, GlobeIcon, BarChart3Icon, UsersIcon, FileTextIcon } from 'lucide-react';

export const metadata = getMetadata({
    title: 'Website For Sale',
    description:
        'ilhaf.com is available for purchase. Contact us at salam@ilhaf.com for inquiries about acquiring this established lyrics platform.',
    url: '/sell',
    noIndex: true,
});

const highlights = [
    {
        icon: GlobeIcon,
        title: 'Premium Domain',
        description: 'Short, memorable .com domain — ilhaf.com',
    },
    {
        icon: BarChart3Icon,
        title: 'Established Platform',
        description: 'Active since May 2024 with growing organic traffic',
    },
    {
        icon: UsersIcon,
        title: 'Real User Base',
        description: 'Dedicated community of users and returning visitors',
    },
    {
        icon: FileTextIcon,
        title: 'Rich Content Library',
        description: 'Extensive curated collection of Manqabats & Nohay lyrics',
    },
];

export default function SellPage() {
    return (
        <>
            <div className="bp flex flex-col items-center justify-center text-center">
                <div className="bg-foreground text-background mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
                    <span className="relative flex size-1.5">
                        <span className="bg-emerald-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                        <span className="bg-emerald-500 relative inline-flex size-1.5 rounded-full" />
                    </span>
                    Available for Purchase
                </div>
                <PageHeading>This Website is For Sale</PageHeading>
                <PageDescription>
                    ilhaf.com — an established lyrics platform with a premium domain, growing audience, and rich content library — is
                    available for acquisition.
                </PageDescription>
            </div>

            <BorderSeparator />

            <div className="bp mx-auto max-w-3xl">
                <div className="grid gap-4 sm:grid-cols-2">
                    {highlights.map((item) => (
                        <div key={item.title} className="bg-card rounded-lg border p-4">
                            <div className="bg-muted mb-3 flex size-9 items-center justify-center rounded-md">
                                <item.icon className="text-foreground size-4" />
                            </div>
                            <h3 className="text-sm font-medium">{item.title}</h3>
                            <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <BorderSeparator />

            <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="mx-auto flex items-center justify-center flex-col max-w-md">
                    <Logo size="sm" />
                    <h2 className="mt-4 text-lg font-semibold">Interested in Acquiring ilhaf.com?</h2>
                    <p className="text-muted-foreground mt-2 text-sm text-balance">
                        Reach out to us via email for pricing, traffic details, and any other information you need.
                    </p>

                    <a
                        href="mailto:salam@ilhaf.com"
                        className="bg-foreground text-background hover:bg-foreground/90 mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
                    >
                        <MailIcon className="size-4" />
                        salam@ilhaf.com
                    </a>

                    <p className="text-muted-foreground mt-4 text-xs">We typically respond within 1–2 business days.</p>
                </div>
            </div>
        </>
    );
}
