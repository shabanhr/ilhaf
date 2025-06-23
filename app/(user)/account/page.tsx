import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { confirmUser } from '@/lib/auth';
import { ProfileSettings } from './_components/profile-settings';
import { getMetadata } from '@/lib/utils/metadata';

export const metadata = getMetadata({
	title: 'Account',
	url: `/account`,
});

export default async function Page() {
	const user = await confirmUser();

	return (
		<Tabs defaultValue="profile" className="w-full max-w-lg">
			<TabsList>
				<TabsTrigger value="profile">Profile</TabsTrigger>
			</TabsList>
			<TabsContent value="profile">
				<ProfileSettings user={user} />
			</TabsContent>
		</Tabs>
	);
}
