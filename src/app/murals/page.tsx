import type { Metadata } from "next";
import { artist } from "@/content/artist";
import { murals } from "@/content/murals";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MuralProjectSpread } from "@/components/sections/mural-project";

export const metadata: Metadata = {
  title: "Murals",
  description: `All ${murals.length} mural projects from ${artist.name}'s ${artist.portfolioYear} portfolio.`,
};

export default function MuralsPage() {
  return (
    <>
      <Section theme="ink" className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 text-fg-muted">Commissioned work</p>
            <h1 className="display text-[clamp(3.5rem,14vw,11rem)]">Murals</h1>
            <p className="mt-10 max-w-xl text-lg text-fg-muted sm:text-xl">
              {murals.length} projects. {artist.tagline}
            </p>
          </Reveal>
          <nav aria-label="Jump to a project" className="mt-12">
            <ol className="flex flex-wrap gap-x-6 gap-y-2">
              {murals.map((m, i) => (
                <li key={m.slug}>
                  <a href={`#${m.slug}`} className="display text-xl text-fg-muted transition-colors hover:text-fg-strong sm:text-2xl">
                    <span className="eyebrow mr-2 text-[0.6rem] text-fg-muted/70">{String(i + 1).padStart(2, "0")}</span>
                    {m.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </Section>

      <Section theme="lime" aria-label="All mural projects">
        <Container className="space-y-24 lg:space-y-32">
          {murals.map((project, i) => (
            <MuralProjectSpread key={project.slug} project={project} index={i} full headingLevel="h2" />
          ))}
        </Container>
        <Container className="mt-24">
          <div className="hairline pt-8 text-lg">
            For commissions, write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${artist.contact.email}`}>
              {artist.contact.email}
            </a>
            .
          </div>
        </Container>
      </Section>
    </>
  );
}
