import Image from "next/image";
import { artist } from "@/content/artist";
import { artwork } from "@/content/artwork";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageCaption } from "@/components/ui/page-caption";

/**
 * "Meet the artist" — the portfolio's lime page: heading in Warxer, the
 * verbatim bio, and the cut-out portrait filling the right side of the page
 * and bleeding off its right and bottom edges, as on the PDF spread.
 */
export function About() {
  const portrait = artwork("artist-portrait");
  return (
    <Section theme="lime" id="about" flush aria-labelledby="about-title">
      <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,44%)] lg:gap-8 lg:py-0">
        <div className="lg:self-center lg:py-28">
          <Reveal>
            <h2 id="about-title" className="display text-6xl sm:text-7xl lg:text-8xl">
              Meet the artist
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed sm:text-xl">
              {artist.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base">
              <li>
                <a className="underline-offset-4 hover:underline" href={`mailto:${artist.contact.email}`}>
                  {artist.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="underline-offset-4 hover:underline"
                  href={artist.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{artist.contact.instagram}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Matches the PDF spread: the cut-out starts just past the middle of
            the page, its head sits about 12% down, and it runs off the right
            and bottom edges (the figure is ~1.2× the page height). The column
            stretches to the row height; the image is sized from that height
            and the section's overflow-hidden does the cropping. Negative right
            margins run the column past the container to the viewport. */}
        <Reveal
          delay={0.15}
          distance={40}
          className="relative lg:-mr-12 lg:min-h-[44rem] xl:-mr-[calc((100vw-80rem)/2+3rem)]"
        >
          <Image
            src={portrait.src}
            alt={`Portrait of ${artist.name}`}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1024px) 50vw, 80vw"
            className="mx-auto h-auto w-[min(100%,30rem)] lg:absolute lg:left-0 lg:top-[12%] lg:mx-0 lg:h-[130%] lg:w-auto lg:max-w-none"
          />
        </Reveal>
        {/* As on the spread, the hairline and caption run over the photo; the
            right-hand caption turns lime where it sits on the dark figure. */}
        <PageCaption
          label="Meet the artist"
          className="relative z-10 pb-8 lg:col-span-2 lg:pb-10 lg:[&>span:last-child]:text-lime"
        />
      </Container>
    </Section>
  );
}
