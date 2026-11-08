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
      <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-8 lg:py-0">
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

        {/* On large screens the column stretches to the row height and the
            portrait covers it, anchored to the top so the head stays in frame
            and the crop happens at the bottom, like the page edge in the PDF.
            Negative right margins run it past the container to the viewport. */}
        <Reveal
          delay={0.15}
          distance={40}
          className="relative lg:-mr-12 lg:min-h-[46rem] xl:-mr-[calc((100vw-80rem)/2+3rem)]"
        >
          <Image
            src={portrait.src}
            alt={`Portrait of ${artist.name}`}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1024px) 50vw, 80vw"
            className="mx-auto h-auto w-[min(100%,28rem)] lg:absolute lg:inset-x-0 lg:top-10 lg:bottom-0 lg:mx-0 lg:h-[calc(100%-2.5rem)] lg:w-full lg:object-cover lg:object-top"
          />
        </Reveal>
        <PageCaption label="Meet the artist" className="pb-8 lg:col-span-2 lg:pb-10" />
      </Container>
    </Section>
  );
}
