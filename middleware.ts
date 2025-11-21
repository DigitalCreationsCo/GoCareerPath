import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  if (
    pathname === '/' ||
    pathname === '/team' || 
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/api/auth') || // Allow auth endpoints
    pathname.startsWith('/auth') || // Allow custom base path auth endpoints
    pathname.startsWith('/og') // Allow Open Graph image generation
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in
  if (!session?.user) {
    console.log('no user');
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Protected Routes Logic

  // Dashboard requires a team
  if (pathname.startsWith('/dashboard')) {
    console.log('session.user: ', session.user);
    // Check for teamId in session (added via JWT callback in auth.ts)
    if (!(session.user).teamId) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  // Chat is allowed for all authenticated users (Consumers and Business users)
  // Onboarding is allowed for all authenticated users

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
