import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

export type SectionTheme = "ink" | "lime" | "paper";

type SectionProps<T extends ElementType> = {
  as?: T;
  theme?: SectionTheme;
  /** Draw the Adinkra symbol strip down the edges. */
  edges?: boolean;
  /** Apply the paper/charcoal grain texture. */
  grain?: boolean;
  /** Remove the default vertical padding. */
  flush?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Themed page band. Sets `data-theme` so every child picks up the right
 * surface, text and accent variables; see globals.css.
 */
export function Section<T extends ElementType = "section">({
  as,
  theme = "lime",
  edges = true,
  grain = true,
  flush = false,
  className,
  children,
  ...rest
}: SectionProps<T>) {
  const Tag = (as ?? "section") as ElementType;
  return (
    <Tag
      data-theme={theme}
      className={cn(
        "relative overflow-hidden bg-surface text-fg",
        edges && "adinkra-edges",
        grain && "grain",
        !flush && "py-20 sm:py-24 lg:py-32",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Horizontal page gutter shared by all sections. */
export function Container({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}
      {...rest}
    />
  );
}
