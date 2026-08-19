import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation. usePathname() returns the path WITHOUT the locale
// prefix, and router.replace(path, { locale }) switches language correctly —
// including the default locale (English) which carries no prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
