import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/b2b') && !pathname.startsWith('/b2b/onboarding')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (!session.user.organizationId) {
      return NextResponse.redirect(new URL('/b2b/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/b2b/:path*'],
}
