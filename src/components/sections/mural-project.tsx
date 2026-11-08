import { artwork } from "@/content/artwork";
import type { MuralProject } from "@/content/murals";
import { Polaroid } from "@/components/ui/polaroid";
import { ScribbleArrow } from "@/components/ui/scribble-arrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  project: MuralProject;
  /** Alternate the layout direction, as the portfolio alternates spreads. */
  index: number;
  /** Show every photograph, not only the lead and two details. */
  full?: boolean;
  headingLevel?: "h2" | "h3";
};

/**
 * Height the side column would need if the detail shots were stacked one per
 * row, measured in multiples of its own width. The lead photo is roughly
 * 1.5 of those units tall, so anything well past 2.5 leaves the lead sitting
 * beside a long empty gap (Novo Apartments, Jiljil Academy, Grills and Wines).
 */
function stackedHeight(keys: string[], natural: boolean): number {
  return keys.reduce((sum, key) => {
    if (!natural) return sum + 1;
    const img = artwork(key);
    return sum + img.height / img.width;
  }, 0);
}

const CLUSTER_THRESHOLD = 2.5;

/**
 * One mural spread: handwritten title with an arrow, a large lead photo and
 * smaller detail shots pinned around it. Mirrors the portfolio page grammar.
 * Portrait-heavy detail sets are pinned as a two-up cluster, the way the
 * portfolio overlaps its small photos, instead of a single tall column.
 */
export function MuralProjectSpread({ project, index, full = false, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const [lead, ...details] = project.images;
  const shown = full ? details : details.slice(0, 2);
  const reverse = index % 2 === 1;
  const tilt = reverse ? 1.6 : -1.6;
  const cluster = shown.length >= 3 && stackedHeight(shown, full) > CLUSTER_THRESHOLD;
  // Exactly two portrait details: pin them as an overlapping pair so the side
  // column ends roughly level with the lead photo (Tsadidi Festival).
  const pair = full && shown.length === 2 && stackedHeight(shown, true) > 2.2;

  return (
    <article
      id={project.slug}
      className={cn("scroll-mt-28 grid gap-6 lg:grid-cols-12 lg:gap-8", reverse && "lg:[direction:rtl]")}
      aria-labelledby={`mural-${project.slug}`}
    >
      <div className={cn("lg:col-span-8 lg:[direction:ltr]")}>
        <Reveal>
          <div className="mb-4 flex items-end gap-3">
            <Heading id={`mural-${project.slug}`} className="display text-3xl sm:text-4xl">
              {project.title}
            </Heading>
            <ScribbleArrow className="mb-1 hidden h-7 text-fg sm:block" flip={reverse} />
          </div>
          <Polaroid
            image={lead}
            alt={`${project.title} — mural by Quartey Bigland`}
            tilt={tilt}
            ratio="landscape"
            sizes="(min-width: 1024px) 60vw, 100vw"
            zoomGroup={project.slug}
          />
          {project.location || project.year ? (
            <p className="mt-3 text-sm text-fg-muted">
              {[project.location, project.year].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          {project.description ? (
            <p className="mt-3 max-w-prose text-base leading-relaxed">{project.description}</p>
          ) : null}
        </Reveal>
      </div>

      {shown.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-2 gap-4 lg:col-span-4 lg:[direction:ltr]",
            cluster
              ? "content-start lg:gap-x-5"
              : pair
                ? "lg:grid-cols-1 lg:content-start lg:gap-0"
                : full
                  ? "lg:grid-cols-1"
                  : "lg:grid-cols-1 lg:pt-16",
          )}
        >
          {shown.map((key, i) => {
            const lastOdd = cluster && i === shown.length - 1 && shown.length % 2 === 1;
            return (
              <Reveal
                key={key}
                delay={0.1 + i * 0.08}
                className={cn(
                  cluster && i % 2 === 1 && "mt-10",
                  lastOdd && "col-span-2 w-[72%] justify-self-center",
                  pair && "lg:w-[66%]",
                  pair && i === 0 && "lg:justify-self-start",
                  pair && i === 1 && "lg:relative lg:-mt-[26%] lg:justify-self-end",
                )}
              >
                <Polaroid
                  image={key}
                  alt={`${project.title} — detail ${i + 1}`}
                  tilt={(i % 2 === 0 ? 3 : -2.5) * (reverse ? -1 : 1)}
                  ratio={full ? "natural" : "square"}
                  sizes={
                    cluster || pair ? "(min-width: 1024px) 18vw, 45vw" : "(min-width: 1024px) 28vw, 45vw"
                  }
                  zoomGroup={project.slug}
                />
              </Reveal>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}
