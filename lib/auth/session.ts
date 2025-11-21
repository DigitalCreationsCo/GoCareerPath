"use server";

import { compare, hash } from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from '@/lib/db/drizzle';
import { sessions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

export async function setSession(user: { id: string }) {
  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await db.insert(sessions).values({
    sessionToken,
    userId: user.id,
    expires,
  });

  (await cookies()).set('authjs.session-token', sessionToken, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const sessionToken = (await cookies()).get('authjs.session-token')?.value;
  if (!sessionToken) return null;

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.sessionToken, sessionToken),
    with: {
      user: true, // Assuming relation exists, otherwise remove
    },
  });

  if (!session || session.expires < new Date()) {
    return null;
  }

  return session;
}
