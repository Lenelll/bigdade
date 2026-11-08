/** Site-wide constants that are not artist content. */
export const SITE_NAME = "Quartey Bigland";

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      /* fall through to default */
    }
  }
  return new URL("http://localhost:3000");
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/murals", label: "Murals" },
  { href: "/dade-tse", label: "Dade Tse" },
  { href: "/shop", label: "Shop" },
] as const;
