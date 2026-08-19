import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match everything except API, Next internals, and static files (with a dot).
  // Needed for "as-needed" so unprefixed default-locale paths (e.g. /privacy)
  // still run through the intl middleware.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
