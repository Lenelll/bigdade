import Link from "next/link";
import { artist } from "@/content/artist";
import { SHOP_COLLECTIONS } from "@/lib/commerce/config";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** `page` is the full /shop state; `compact` sits inside another section. */
  variant?: "page" | "compact";
  className?: string;
};

/**
 * Placeholder for the shop and cart until the Phase 4 backend is live.
 * Typographic on purpose so it reads as part of the portfolio, not an error.
 */
export function ShopComingSoon({ variant = "page", className }: Props) {
  const compact = variant === "compact";

  return (
    <div className={cn("hairline", compact ? "py-12 sm:py-16" : "py-16 sm:py-24", className)}>
      <Reveal>
        <p className="eyebrow mb-4 text-fg-muted">Coming soon</p>
        <h2
          className={cn(
            "display max-w-3xl",
            compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl",
          )}
        >
          The shop will be coming soon, so stay tuned with us.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">
          Prints, merchandise and canvas works by {artist.name} are on the way. Follow along on
          Instagram to catch the first drop.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3" aria-label="What the shop will carry">
          {SHOP_COLLECTIONS.map((c, i) => (
            <li key={c.handle} className="flex items-baseline gap-3">
              <span className="eyebrow text-fg-muted">0{i + 1}</span>
              <span className="display text-2xl sm:text-3xl">{c.title}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={artist.contact.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
            Follow @{artist.contact.instagram}
          </a>
          <Link href="/murals" className="btn btn-outline">
            Commission a mural
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
