import { confirmUser } from '@/lib/auth';
import { AppSidebar } from '@/app/admin/_components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getMetadata } from '@/lib/utils/metadata';

export const metadata = getMetadata({
	title: 'Admin',
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
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
