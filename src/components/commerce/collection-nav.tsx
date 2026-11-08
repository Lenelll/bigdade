import Link from "next/link";
import { SHOP_COLLECTIONS } from "@/lib/commerce/config";
import { cn } from "@/lib/utils";

export function CollectionNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Shop categories">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/shop" className={cn("btn btn-outline min-h-10 text-xs", !active && "bg-accent text-accent-fg border-accent")}>
            All
          </Link>
        </li>
        {SHOP_COLLECTIONS.map((c) => (
          <li key={c.handle}>
            <Link
              href={`/shop/${c.handle}`}
              aria-current={active === c.handle ? "page" : undefined}
              className={cn("btn btn-outline min-h-10 text-xs", active === c.handle && "bg-accent text-accent-fg border-accent")}
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
