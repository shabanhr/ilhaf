import React from 'react';
import { ButtonWithLoading } from '../ui/button';
import { authClient } from '@/lib/auth-client';
import { GoogleIcon } from '../icons';
import { useToggle } from '@/hooks/use-toggle';
import { usePathname } from 'next/navigation';

export function LoginWithGoogle() {
	const [loading, setLoading] = React.useState(false);
	const [isGoogleDisabled, setGoogleDisabled] = useToggle('auth-google-disabled');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setEmailDisabled] = useToggle('auth-email-disabled');
	const pathname = usePathname();

	const signInWithGoogle = async () => {
		try {
			setLoading(true);
			setGoogleDisabled(true);
			setEmailDisabled(true);
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: pathname,
			});
		} catch (error) {
			setLoading(false);
			setGoogleDisabled(false);
			setEmailDisabled(false);
			console.log(error);
		}
	};

	return (
		<ButtonWithLoading
			onClick={signInWithGoogle}
			isLoading={loading}
			disabled={loading || isGoogleDisabled}
			type="button"
			variant="outline"
			className="animate-in fade-in w-full duration-300"
			icon={GoogleIcon}
		>
			<span>Continue With Google</span>
		</ButtonWithLoading>
	);
}
