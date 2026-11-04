import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIMARY_ORIGIN = 'https://nepalicalc.com';
const LEGACY_HOSTS = new Set([
  'calculator.chalisetech.com',
  'www.nepalicalc.com',
  'nepalcalc.com',
  'www.nepalcalc.com',
]);

export function proxy(request: NextRequest) {
  const rawHost =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';
  const hostname = rawHost.split(',')[0].trim().split(':')[0].toLowerCase();

  if (LEGACY_HOSTS.has(hostname)) {
    const targetUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      PRIMARY_ORIGIN
    );
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

