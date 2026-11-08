import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ShopComingSoon } from "./shop-coming-soon";

/**
 * Home-page door into the shop. Shows the coming-soon notice until the
 * Phase 4 backend is live; product tiles replace it then.
 */
export function ShopTeaser() {
  return (
    <Section theme="paper" id="shop" aria-labelledby="shop-teaser-title">
      <Container>
        <Reveal>
          <p className="eyebrow mb-3 text-fg-muted">The shop</p>
          <h2 id="shop-teaser-title" className="display text-5xl sm:text-6xl lg:text-7xl">
            Take the work home.
          </h2>
        </Reveal>
        <ShopComingSoon variant="compact" className="mt-12" />
      </Container>
    </Section>
  );
}
