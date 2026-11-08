import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artist } from "@/content/artist";
import { artwork } from "@/content/artwork";
import { character, getCharacterIllustrations, getCharacterMurals } from "@/content/character";
import { Container, Section } from "@/components/ui/section";
import { Zoomable } from "@/components/ui/lightbox";
import { Polaroid } from "@/components/ui/polaroid";
import { Reveal } from "@/components/ui/reveal";
import { ScribbleArrow } from "@/components/ui/scribble-arrow";
import { ShopComingSoon } from "@/components/sections/shop-coming-soon";

export const metadata: Metadata = {
  title: character.name,
  description: `${character.name}, the character created by ${artist.name}. ${character.signature}`,
};

export default function CharacterPage() {
  const illustrations = getCharacterIllustrations();
  const murals = getCharacterMurals();
  const tilts = [-2.5, 2, -1.5, 3, -3, 1.5];
  const wordmark = artwork(character.wordmark);
  const main = artwork(character.mainImage);

  return (
    <>
      {/* 1. The graffiti wordmark on the artist's own yellow backdrop. */}
      <Section
        theme="lime"
        edges={false}
        grain={false}
        flush
        className="pt-20 sm:pt-24"
        aria-labelledby="character-title"
      >
        <Container className="flex flex-col items-center justify-center py-12 sm:py-14 lg:py-16">
          <Reveal>
            <p className="eyebrow mb-6 text-center text-ink/70">The created character</p>
          </Reveal>
          <h1 id="character-title" className="sr-only">
            {character.name}
          </h1>
          <Reveal delay={0.1} className="w-full">
            <Image
              src={wordmark.src}
              alt={`${character.name} — graffiti wordmark by ${artist.name}`}
              width={wordmark.width}
              height={wordmark.height}
              sizes="(min-width: 1280px) 1120px, 92vw"
              priority
              placeholder="blur"
              blurDataURL={wordmark.blurDataURL}
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-md text-center text-lg text-ink/80 sm:text-xl">{character.signature}</p>
            <p className="mt-2 text-center text-sm text-ink/70">Created by {artist.name}.</p>
          </Reveal>
        </Container>
      </Section>

      {/* 2. The finished illustration, on its own. Letterboxed to a wide
          frame from sm up (the crop only trims sky and ground); the lightbox
          still opens the full picture. */}
      <Section theme="ink" className="py-14 sm:py-16 lg:py-20" aria-label={`${character.name} illustration`}>
        <Container>
          <Reveal>
            <figure>
              <Zoomable
                group="dade-tse-main"
                image={{ src: main.src, alt: `${character.name} — illustration by ${artist.name}`, width: main.width, height: main.height }}
              >
                <div className="relative overflow-hidden sm:aspect-[16/9] lg:aspect-[11/6]">
                  <Image
                    src={main.src}
                    alt={`${character.name} — illustration by ${artist.name}`}
                    width={main.width}
                    height={main.height}
                    sizes="(min-width: 1280px) 1184px, 100vw"
                    placeholder="blur"
                    blurDataURL={main.blurDataURL}
                    className="h-auto w-full sm:absolute sm:inset-0 sm:h-full sm:object-cover sm:object-[center_42%]"
                  />
                </div>
              </Zoomable>
              <figcaption className="mt-3 text-sm text-fg-muted">
                {character.name} · digital illustration
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* 3. About — the artist's own words. */}
      <Section theme="lime" id="about" aria-labelledby="character-about-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 id="character-about-title" className="display text-6xl sm:text-7xl">
              About
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            {character.story ? (
              <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
                {character.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : (
              <div className="hairline pt-6">
                <p className="eyebrow mb-3 text-fg-muted">Story coming soon</p>
                <p className="max-w-prose text-lg leading-relaxed sm:text-xl">
                  {character.name} appears across {artist.name}&rsquo;s illustrations and murals. The
                  character&rsquo;s own story will be told here, in the artist&rsquo;s words.
                </p>
              </div>
            )}
          </Reveal>
        </Container>
      </Section>

      {/* 4. Art — illustrations and murals featuring the character. */}
      <Section theme="lime" edges={false} className="pt-0" aria-labelledby="character-art-title">
        <Container>
          <Reveal>
            <div className="mb-12 flex items-end gap-4">
              <h2 id="character-art-title" className="display text-5xl sm:text-6xl">
                Art
              </h2>
              <ScribbleArrow className="mb-1 hidden sm:block" />
            </div>
          </Reveal>
          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-8 [&>li]:break-inside-avoid">
            {illustrations.map((piece, i) => (
              <li key={piece.slug}>
                <Reveal delay={(i % 3) * 0.08}>
                  <Polaroid
                    image={piece.images[0]}
                    alt={`${piece.title} — digital illustration featuring ${character.name}`}
                    tilt={tilts[i % tilts.length]}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    caption={piece.title}
                    zoomGroup="dade-tse"
                  />
                </Reveal>
              </li>
            ))}
            {murals.flatMap((mural) =>
              (mural.dadeTseImages ?? mural.images).map((key, j) => (
                <li key={key}>
                  <Reveal delay={(j % 3) * 0.08}>
                    <Polaroid
                      image={key}
                      alt={`${mural.title} — mural featuring ${character.name}`}
                      tilt={tilts[(j + 2) % tilts.length]}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      caption={`${mural.title} · mural`}
                      zoomGroup="dade-tse"
                    />
                  </Reveal>
                </li>
              )),
            )}
          </ul>
        </Container>
      </Section>

      {/* 5. Products — shop items tagged with the character (Phase 4). */}
      <Section theme="paper" edges={false} aria-labelledby="character-shop-title">
        <Container>
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 id="character-shop-title" className="display text-5xl sm:text-6xl">
                Take {character.name} home
              </h2>
              <Link href="/shop" className="btn btn-outline">
                Full shop
              </Link>
            </div>
          </Reveal>
          <ShopComingSoon variant="compact" />
        </Container>
      </Section>
    </>
  );
}
