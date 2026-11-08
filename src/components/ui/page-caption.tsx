import { artist } from "@/content/artist";
import { cn } from "@/lib/utils";

/**
 * The hairline-and-caption that closes every portfolio page:
 * "Quartey Bigland Nii Ayi - Artist Portfolio 2026".
 */
export function PageCaption({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn("hairline flex items-center justify-between gap-4 pt-3 text-xs text-fg-muted", className)}
      aria-hidden="true"
    >
      <span>{label}</span>
      <span>
        {artist.fullName} — Artist Portfolio {artist.portfolioYear}
      </span>
    </div>
  );
}
