'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonWithLoading } from '@/components/ui/button';
import { providers } from '@/config';
import { GoogleIcon } from '@/components/icons';

interface Props {
	accounts: string[] | null;
}

const SocialAccount: React.FC<Props> = ({ accounts }) => {
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

	const Sign = async (provider: string) => {
		setLoadingProvider(provider);
		await signIn(provider);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Social Accounts For Sign-in</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center justify-center gap-y-2">
					{providers.map((provider) => (
						<ButtonWithLoading
							key={provider}
							isLoading={loadingProvider === provider}
							icon={GoogleIcon}
							onClick={() => Sign(provider)}
							disabled={accounts?.includes(provider) || loadingProvider === provider}
							type="button"
							className="w-full capitalize"
						>
							<span>{accounts?.includes(provider) ? 'Connected' : 'Connect Now'}</span>
						</ButtonWithLoading>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default SocialAccount;
