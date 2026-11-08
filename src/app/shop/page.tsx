import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { ShopComingSoon } from "@/components/sections/shop-coming-soon";

export const metadata: Metadata = {
  title: "Shop",
  description: "Prints, merchandise and canvas works by Quartey Bigland. Coming soon.",
};

/**
 * Placeholder until the Phase 4 backend (Express + MongoDB + Paystack) is live.
 * Product listing, categories and the cart return with that phase.
 */
export default function ShopPage() {
  return (
    <>
      <Section theme="ink" className="pt-36 sm:pt-44">
        <Container>
          <p className="eyebrow mb-4 text-fg-muted">The shop</p>
          <h1 className="display text-[clamp(3.5rem,14vw,11rem)]">Shop</h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted sm:text-xl">
            Prints, merchandise and canvas works.
          </p>
        </Container>
      </Section>
      <Section theme="paper" edges={false}>
        <Container>
          <ShopComingSoon />
        </Container>
      </Section>
    </>
  );
}
