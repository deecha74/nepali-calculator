import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIMARY_ORIGIN = 'https://nepalicalc.com';
const LEGACY_HOSTS = new Set([
  'calculator.chalisetech.com',
  'www.nepalicalc.com',
  'nepalcalc.com',
  'www.nepalcalc.com',
]);

// Suspicious URL or Query pattern checks for SQLi, XSS, Path Traversal
const SUSPICIOUS_PATTERNS = [
  /\.\./,
  /<script/i,
  /javascript:/i,
  /union\s+select/i,
  /etc\/passwd/i,
  /\bexec\s*\(/i,
];

export function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  // 1. Legacy host 301 redirect to https://nepalicalc.com
  const rawHost =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';
  const hostname = rawHost.split(',')[0].trim().split(':')[0].toLowerCase();

  if (LEGACY_HOSTS.has(hostname)) {
    const targetUrl = new URL(`${url}${searchParams}`, PRIMARY_ORIGIN);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. Path traversal & injection detection
  try {
    const fullTarget = decodeURIComponent(url + searchParams);
    const isMalicious = SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(fullTarget));
    if (isMalicious) {
      return new NextResponse('Bad Request: Security policy violation detected.', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
          'X-Security-Action': 'Blocked-Malicious-Pattern',
        },
      });
    }
  } catch {
    // Malformed URI encoding
  }

  // 3. Add proactive security headers to outgoing responses
  const response = NextResponse.next();
  response.headers.set('X-Security-Policy', 'NepalCalc-Zero-Data-Retention-Enclave');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
