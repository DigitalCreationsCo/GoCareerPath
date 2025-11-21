import NextAuth from "next-auth";
import "next-auth/jwt";
import { getUserWithTeam } from "./lib/db/queries/user";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/drizzle";
import { sessions, accounts, users, verificationTokens } from "./lib/db/schema";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  events: {
    async createUser({ user }) {
      const cookieStore = await cookies();
      const role = cookieStore.get('signup_role')?.value;
      if (role === 'owner' && user.id) {
        await db.update(users).set({ role: 'owner' }).where(eq(users.id, user.id));
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      
      const userId = token.id as string || token.sub;
      if (userId) {
        const userWithTeam = await getUserWithTeam(userId);
        if (userWithTeam) {
          token.role = userWithTeam.user.role;
          token.teamId = userWithTeam.teamId ?? undefined;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        
        const userId = token.id as string;
        if (userId) {
          const userWithTeam = await getUserWithTeam(userId);
          if (userWithTeam) {
            session.user.role = userWithTeam.user.role;
            session.user.teamId = userWithTeam.teamId as string;
          }
        }
      }
      return session;
    },
  },
});
