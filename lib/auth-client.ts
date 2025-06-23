import { createAuthClient } from 'better-auth/react';
import { adminClient, oneTapClient , emailOTPClient} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	plugins: [
		adminClient(),
		oneTapClient({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			autoSelect: false,
			cancelOnTapOutside: true,
			context: 'signin',
			promptOptions: {
				baseDelay: 1000,
				maxAttempts: 5,
			},
		}),
		emailOTPClient()
	],
});
