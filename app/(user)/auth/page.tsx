import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Auth from '@/components/auth';

export default function Page() {
	return (
		<>
			<CardHeader>
				<CardTitle>Sign In or Join Now!</CardTitle>
			</CardHeader>
			<CardContent className="flex min-h-[50vh] min-w-full flex-col justify-center">
				<Auth />
			</CardContent>
			<CardFooter>
				<div className="text-center text-[12px] opacity-80">
					By clicking Continue, you agree to our{' '}
					<Link className="a" href="/policy">
						Privacy Policy
					</Link>
					.
				</div>
			</CardFooter>
		</>
	);
}
