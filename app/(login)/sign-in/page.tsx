"use server";

import { auth } from '@/auth';
import { Login } from '../login';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    return session.user.role === "owner" ? redirect("/dashboard") : redirect('/chat');
  }
  return (
    <Login />
  );
}
