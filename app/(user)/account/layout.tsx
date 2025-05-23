import { currentUser } from "@/config/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    
    if (!user) return redirect("/auth");

    return (
        <div className="min-h-screen mx-2 md:max-w-xl md:mx-auto flex flex-col items-center justify-start md:space-x-4 gap-y-5 pt-5">
            <div className="flex flex-col items-center justify-center gap-y-2">
                <h1>My Account</h1>
            </div>
            <div className="flex w-full flex-col">
                {children}
            </div>
        </div>
    )
}
