import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { MuralsShowcase } from "@/components/sections/murals-showcase";
import { IllustrationsStrip } from "@/components/sections/illustrations-strip";
import { CharacterTeaser } from "@/components/sections/character-teaser";
import { ShopTeaser } from "@/components/sections/shop-teaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MuralsShowcase />
      <IllustrationsStrip />
      <CharacterTeaser />
      <ShopTeaser />
    </>
  );
}
