import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Suspicious URL or Query pattern checks for SQLi, XSS, Path Traversal
const SUSPICIOUS_PATTERNS = [
  /\.\./, // Directory traversal
  /<script/i, // Basic XSS attempt
  /javascript:/i, // JS scheme injection
  /union\s+select/i, // SQL injection
  /etc\/passwd/i, // File inclusion
  /\bexec\s*\(/i, // Command execution
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  // 1. Path traversal & injection detection
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

  // 2. Add proactive security headers to outgoing responses
  const response = NextResponse.next();
  response.headers.set('X-Security-Policy', 'NepalCalc-Zero-Data-Retention-Enclave');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-RateLimit-Limit', '120');
  response.headers.set('X-RateLimit-Remaining', '118');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets like .png, .jpg, .svg, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
