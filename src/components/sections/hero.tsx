import Link from "next/link";
import { artist } from "@/content/artist";
import { Container, Section } from "@/components/ui/section";
import { Polaroid } from "@/components/ui/polaroid";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { PageCaption } from "@/components/ui/page-caption";

const TICKER = ["Murals", "Graffiti", "Digital illustrations", "Prints", "Merchandise", "Canvas works", "Dade Tse"];

/**
 * Identity first: the artist's name set in Warxer at page scale on the
 * charcoal cover treatment, with one pinned mural and a route into the site.
 */
export function Hero() {
  const [firstName, lastName] = artist.name.split(" ");
  return (
    <Section
      theme="ink"
      flush
      className="flex min-h-svh flex-col justify-end pt-28 sm:pt-32"
      aria-labelledby="hero-title"
    >
      <Container className="relative grid flex-1 items-end gap-10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:pb-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-5 text-fg-muted">
              Artist&rsquo;s portfolio {artist.portfolioYear}
            </p>
          </Reveal>
          <h1 id="hero-title" className="display text-[clamp(3.6rem,15vw,11rem)]">
            <span className="block">
              <SplitText text={firstName} delay={0.1} />
            </span>
            <span className="block pl-[0.08em] text-fg-strong">
              <SplitText text={lastName} delay={0.35} />
            </span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-fg-muted sm:text-xl">
              Mural artist &amp; graffiti writer. {artist.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dade-tse" className="btn btn-solid">
                Meet Dade Tse
              </Link>
              <Link href="/shop" className="btn btn-outline">
                Enter the shop
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="hidden lg:block">
          <Polaroid
            image="nkosuo-nkwan-1"
            alt="Nkosuo Nkwan — mural of a woman in a patterned headwrap painted in bright geometric colour"
            tilt={4}
            ratio="landscape"
            sizes="(min-width: 1024px) 38vw, 90vw"
            priority
            caption="Nkosuo Nkwan"
            zoomGroup="hero"
          />
        </Reveal>
        <PageCaption className="lg:col-span-2" />
      </Container>

      {/* Ticker, as a printed strip along the bottom of the cover. */}
      <div className="hairline border-b border-rule py-3" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {TICKER.map((item) => (
                <li key={item} className="display flex items-center gap-6 px-6 text-2xl text-fg-muted sm:text-3xl">
                  {item}
                  <span className="h-2 w-2 rounded-full bg-lime/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
