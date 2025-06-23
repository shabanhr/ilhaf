import { confirmUser } from '@/lib/auth';
import { AppSidebar } from '@/app/admin/_components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getMetadata } from '@/lib/utils/metadata';

export const metadata = getMetadata({
	title: "Admin",
	url: `/admin`,
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const user = await confirmUser();

	if (user.role !== 'admin') {
		return (
			<div>
				<p>Unauthorized</p>
			</div>
		);
	}

	return (
		<NuqsAdapter>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</NuqsAdapter>
	);
}
