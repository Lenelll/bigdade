import Link from "next/link";
import { artist } from "@/content/artist";
import { getFeaturedMurals, murals } from "@/content/murals";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MuralProjectSpread } from "./mural-project";
import { SectionOpener } from "./section-opener";

/**
 * Commissioned work & murals: a charcoal "MURALS" opener, then a run of
 * pinned project spreads on lime, closing with the commission invitation.
 */
export function MuralsShowcase() {
  const featured = getFeaturedMurals();
  return (
    <>
      <SectionOpener title="Murals" eyebrow="Commissioned work" id="murals" />
      <Section theme="lime" aria-label="Selected murals">
        <Container className="space-y-24 lg:space-y-32">
          {featured.map((project, i) => (
            <MuralProjectSpread key={project.slug} project={project} index={i} />
          ))}
        </Container>

        <Container className="mt-24 lg:mt-32">
          <Reveal>
            <div className="hairline grid gap-8 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow mb-3 text-fg-muted">
                  {murals.length} projects in the portfolio
                </p>
                <h3 className="display text-4xl sm:text-5xl lg:text-6xl">
                  Walls, studios, courts and festivals.
                </h3>
                <p className="mt-4 max-w-prose text-lg">
                  For commissions and mural enquiries, write to{" "}
                  <a className="underline underline-offset-4" href={`mailto:${artist.contact.email}`}>
                    {artist.contact.email}
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/murals" className="btn btn-solid">
                  See all murals
                </Link>
                <a href={`mailto:${artist.contact.email}?subject=Mural%20commission`} className="btn btn-outline">
                  Commission a mural
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
