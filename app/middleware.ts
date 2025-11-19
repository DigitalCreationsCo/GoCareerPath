import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/onboarding')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (!session.user.teamId) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
}
