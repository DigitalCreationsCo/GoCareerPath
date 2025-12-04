import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      teamId?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string;
    teamId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    teamId?: string;
  }
}
