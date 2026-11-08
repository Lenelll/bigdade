import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { SectionTheme } from "@/components/ui/section";

type Props = {
  title: string;
  eyebrow?: string;
  theme?: SectionTheme;
  id?: string;
};

/**
 * Full-bleed divider page, like "MURALS" / "DIGITAL ILLUSTRATIONS" in the
 * portfolio: one word at page scale on the charcoal grain.
 */
export function SectionOpener({ title, eyebrow, theme = "ink", id }: Props) {
  return (
    <Section theme={theme} id={id} className="py-24 sm:py-32 lg:py-40">
      <Container className="text-center">
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow mb-4 text-fg-muted">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(3.5rem,14vw,11rem)]">{title}</h2>
        </Reveal>
      </Container>
    </Section>
  );
}
