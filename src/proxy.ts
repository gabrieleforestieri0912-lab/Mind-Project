import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
  '/profile',
  '/settings',
  '/academy',
  '/mind-project',
  '/payment/checkout',
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // @supabase/ssr stores session as a cookie prefixed with "sb-"
  const hasSessionCookie = request.cookies.getAll().some((c) => c.name.startsWith('sb-'));

  if (!hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|api/).*)',
  ],
};
