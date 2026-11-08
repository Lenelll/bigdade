"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

/**
 * `usePathname` reads request data, so with Cache Components it must sit
 * inside a Suspense boundary. The layout renders the plain header as the
 * fallback and this version streams in with the active link highlighted.
 */
export function SiteHeaderWithPath() {
  return <SiteHeader pathname={usePathname()} />;
}
