import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const basePath = "/auth";

export const authConfig = {
    basePath,
    
    debug: !!process.env.AUTH_DEBUG,
    theme: { logo: "https://authjs.dev/img/logo-sm.png" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.teamId = token.teamId as string;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    }
} satisfies NextAuthConfig;
