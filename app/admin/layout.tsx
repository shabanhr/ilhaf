import { Metadata } from "next";
import { siteName } from "@/config";
import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";
import AdminProvider from "./_components/provider";
import { currentUser } from "@/config/auth";
import { redirect } from "next/navigation";

const meta = {
    title: `Admin - ${siteName}`,
}

export const metadata: Metadata = {
    title: meta.title,
};


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const user = await currentUser();

    if (!user) {
        return redirect("/auth");
    }
    // if (user.role !== "ADMIN") {
    //     return redirect("/");
    // }

    return (
        <>
            <Sidebar />
            <AdminProvider>
                <Navbar />
                <div className="container pt-8 pb-8 px-4 sm:px-8">
                    {children}
                </div>
            </AdminProvider>

        </>
    );
}
