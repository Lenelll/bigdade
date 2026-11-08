import Link from "next/link";
import { character } from "@/content/character";
import { Character3D } from "@/components/character/character-3d";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Home-page doorway into the character's world. The `Character3D` slot is
 * where the interactive model will live once it exists.
 */
export function CharacterTeaser() {
  return (
    <Section theme="ink" id="dade-tse" aria-labelledby="character-teaser-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow mb-4 text-fg-muted">The created character</p>
            <h2 id="character-teaser-title" className="display text-[clamp(3.5rem,11vw,8rem)]">
              {character.name}
            </h2>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-fg-muted sm:text-xl">
              {character.signature}
            </p>
            <div className="mt-8">
              <Link href="/dade-tse" className="btn btn-solid">
                Enter the world
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="order-1 lg:order-2">
          <Character3D variant="inline" className="max-w-md" />
        </Reveal>
      </Container>
    </Section>
  );
}
