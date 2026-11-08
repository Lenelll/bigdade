import Link from "next/link";
import { illustrations } from "@/content/illustrations";
import { Container, Section } from "@/components/ui/section";
import { PageCaption } from "@/components/ui/page-caption";
import { Polaroid } from "@/components/ui/polaroid";
import { SectionOpener } from "./section-opener";

const TILTS = [-3, 2.5, -1.5, 3.5, -2, 1.5, -3.5, 2];

/**
 * Digital illustrations as a horizontal run of pinned cards, the way the
 * portfolio pins one piece per page. The run drifts sideways on its own
 * (two copies, translated by half), pauses on hover, and falls back to a
 * plain scrollable strip when the visitor prefers reduced motion.
 */
export function IllustrationsStrip() {
  return (
    <>
      <SectionOpener title="Illustrations" eyebrow="Digital" id="illustrations" />
      <Section theme="lime" edges={false} className="py-16 sm:py-20" aria-label="Digital illustrations">
        <div className="marquee-viewport overflow-hidden pb-6 pt-2">
          <div className="marquee marquee-slow">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                data-marquee-copy={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 gap-8 pr-8"
              >
                {illustrations.map((piece, i) => (
                  <li key={piece.slug} className="w-64 shrink-0 sm:w-80">
                    <Polaroid
                      image={piece.images[0]}
                      alt={`${piece.title} — digital illustration by Quartey Bigland`}
                      tilt={TILTS[i % TILTS.length]}
                      ratio="square"
                      sizes="(min-width: 640px) 320px, 256px"
                      caption={piece.note ? `${piece.title} · ${piece.note}` : piece.title}
                      zoomGroup={copy === 0 ? "illustrations" : "illustrations-copy"}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Container className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-fg-muted">
            {illustrations.filter((i) => i.featuresDadeTse).length} of these feature{" "}
            <Link href="/dade-tse" className="underline underline-offset-4">
              Dade Tse
            </Link>
            .
          </p>
          <PageCaption label="Digital illustrations" className="w-full" />
        </Container>
      </Section>
    </>
  );
}
