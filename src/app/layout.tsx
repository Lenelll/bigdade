import type { Metadata, Viewport } from "next";
import type React from "react";
import { artist } from "@/content/artist";
import { myriad, myriadCondensed, warxer } from "@/lib/fonts";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteHeaderWithPath } from "@/components/layout/site-header-with-path";
import { SiteFooter } from "@/components/layout/site-footer";
import { LightboxProvider } from "@/components/ui/lightbox";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${SITE_NAME} — Mural artist & graffiti writer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${artist.name}: mural artist and graffiti writer. ${artist.tagline} Murals, digital illustrations, the Dade Tse character, prints and merchandise.`,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Mural artist & graffiti writer`,
    description: artist.tagline,
    images: [{ url: "/artwork/murals/nkosuo-nkwan-1.jpg", width: 2400, height: 1800, alt: "Nkosuo Nkwan mural by Quartey Bigland" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="ink"
      className={`${warxer.variable} ${myriad.variable} ${myriadCondensed.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <LightboxProvider>
          <Suspense fallback={<SiteHeader pathname={null} />}>
            <SiteHeaderWithPath />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LightboxProvider>
      </body>
    </html>
  );
}
