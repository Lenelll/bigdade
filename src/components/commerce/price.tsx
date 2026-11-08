import type { Money } from "@/lib/commerce/types";
import { cn, formatMoney } from "@/lib/utils";

type PriceProps = {
  price: Money;
  compareAt?: Money | null;
  /** Show "From" when a product has several variant prices. */
  from?: boolean;
  className?: string;
};

export function Price({ price, compareAt, from = false, className }: PriceProps) {
  const onSale = compareAt && compareAt.amount > price.amount;
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2", className)}>
      {from ? <span className="text-fg-muted">From</span> : null}
      <span className={cn(onSale && "text-signal")}>
        {formatMoney(price.amount, price.currencyCode)}
      </span>
      {onSale ? (
        <s className="text-fg-muted">{formatMoney(compareAt.amount, compareAt.currencyCode)}</s>
      ) : null}
    </span>
  );
}

/** Price line for a product summary: single price or "From …". */
export function ProductPrice({ min, max, className }: { min: Money; max: Money; className?: string }) {
  return <Price price={min} from={max.amount > min.amount} className={className} />;
}
