"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { providers } from '@/config';

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
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    {providers.map((provider) => (
                        <Button
                            size="full"
                            key={provider}
                            icon={
                                loadingProvider === provider ? (
                                    <Spinner active size="sm" />
                                ) : (
                                    <Image
                                        src={`/${provider}.png`}
                                        className={provider === 'github' ? 'invert dark:invert-0' : ''}
                                        width={22}
                                        height={22}
                                        alt={`Logo of ${provider}`}
                                    />
                                )
                            }
                            onClick={() => Sign(provider)}
                            disabled={accounts?.includes(provider) || loadingProvider === provider}
                            type="button"
                            className="capitalize"
                        >
                            <span>
                                {accounts?.includes(provider) ? "Connected" : "Connect Now"}
                            </span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default SocialAccount;
