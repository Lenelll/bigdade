import Link from "next/link";
import { artist } from "@/content/artist";
import { NAV_LINKS } from "@/lib/site";
import { Container, Section } from "@/components/ui/section";

export function SiteFooter() {
  return (
    <Section as="footer" theme="ink" id="contact" className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-4 text-fg-muted">Get in touch</p>
            <h2 className="display text-5xl sm:text-6xl lg:text-7xl">Thank you.</h2>
            <ul className="mt-8 space-y-3 text-lg">
              <li>
                <a
                  className="underline-offset-4 hover:underline"
                  href={`mailto:${artist.contact.email}`}
                >
                  {artist.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="underline-offset-4 hover:underline"
                  href={artist.contact.instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  @{artist.contact.instagram}
                </a>
              </li>
              <li>
                <a className="underline-offset-4 hover:underline" href={artist.contact.phoneHref}>
                  {artist.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:justify-self-end">
            <p className="eyebrow mb-4 text-fg-muted">Explore</p>
            <ul className="space-y-2 text-lg">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className="underline-offset-4 hover:underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="underline-offset-4 hover:underline" href="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hairline mt-14 flex flex-col gap-2 pt-5 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {artist.fullName} — Artist Portfolio {artist.portfolioYear}
          </p>
          <p>© {artist.name}. All artwork belongs to the artist.</p>
        </div>
      </Container>
    </Section>
  );
}
