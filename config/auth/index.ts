import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from "next-auth/providers/google";
import { Emailfrom } from '@/config';
import { sendVerificationRequest } from '@/lib/mail'
import { SessionUser } from "@/types/auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma";
import { AdapterUser } from "next-auth/adapters";
import { getUserByEmail } from "@/lib/actions/user";


export const authOptions: NextAuthOptions = {
    providers: [
        EmailProvider({
            from: Emailfrom,
            sendVerificationRequest
        }),
        GoogleProvider({
            clientId: String(process.env.AUTH_GOOGLE_ID),
            clientSecret: String(process.env.AUTH_GOOGLE_SECRET),
            allowDangerousEmailAccountLinking: true
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;
            const data = await getUserByEmail(email);
            if (data) {
                const newSession = {
                    ...session,
                    user: {
                        id: data?.id,
                        name: data?.name,
                        email: data?.email,
                        image: data?.image,
                        role: data?.role,
                    },
                };
                return newSession;
            }

            return session;
        },
        async signIn({ user }: { user: User | AdapterUser }) {
            try {
                const existingUser = await getUserByEmail(user.email as string);
                if (!existingUser || !existingUser.name || !existingUser.image) {
                    const name = user.name ? user.name : user?.email?.split("@")[0];
                    const image = user.image;
                    await prisma.user.upsert({
                        where: { email: user.email as string },
                        update: { name, image },
                        create: { name, image, email: user.email as string },
                    });
                }
                return true;
            } catch (error) {
                console.error('Error in signIn callback:', error);
                return false;
            }
        },
    },
    session: {
        strategy: 'jwt'
    },
    theme: {
        logo: "/logo.png",
        colorScheme: "auto",
    },
    pages: {
        signIn: "/auth",
    }

};

export async function currentUser(): Promise<SessionUser | undefined> {
    const session = await getServerSession(authOptions);
    return session?.user as SessionUser;
}