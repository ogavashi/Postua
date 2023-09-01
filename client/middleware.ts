import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  const defaultLocale = request.nextUrl.defaultLocale;
  const preferedLocale = request.cookies.get('NEXT_LOCALE')?.value;

  const locale = preferedLocale || defaultLocale;

  if (request.nextUrl.locale !== locale) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    );
  }
}
