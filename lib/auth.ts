import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { headers } from 'next/headers';
import { siteName } from '@/config';
import { oneTap, admin, emailOTP } from 'better-auth/plugins';
import { user, session, account, verification } from '@/db/schema';
import { redirect } from 'next/navigation';
import { sendVerificationOTPAction } from './mail';

export const auth = betterAuth({
	plugins: [
		oneTap(),
		admin(),
		emailOTP({
			sendVerificationOnSignUp: true,
			sendVerificationOTP: sendVerificationOTPAction,
		}),
	],
	advanced: {
		cookiePrefix: siteName,
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			user,
			session,
			account,
			verification,
		},
	}),
	socialProviders: {
		google: {
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 24 * 60 * 60, // 24 hours in seconds
		},
	},
});

export async function getCurrentUser() {
	const headersList = await headers();
	const session = await auth.api.getSession({
		headers: headersList,
	});
	return session?.user;
}

export async function confirmUser() {
	const user = await getCurrentUser();
	if (!user) {
		return redirect('/auth');
	}
	return user;
}

export type SessionUser = Awaited<ReturnType<typeof getCurrentUser>>;
