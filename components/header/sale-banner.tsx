import Link from 'next/link';

export function SaleBanner() {
    return (
        <div className="border-b">
            <div className='container  lg:border-x'>
                <Link
                    href="/sell"
                    className="container bp-x relative flex items-center justify-center gap-2 py-2 text-center text-xs font-medium sm:text-sm"
                >
                    <span className="relative flex size-2">
                        <span className="bg-emerald-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                        <span className="bg-emerald-500 relative inline-flex size-2 rounded-full" />
                    </span>
                    <span>
                        This website is <strong>for sale</strong> — Interested?{' '}
                        <span className="underline underline-offset-2">Learn more →</span>
                    </span>
                </Link>
            </div>
        </div>
    );
}
