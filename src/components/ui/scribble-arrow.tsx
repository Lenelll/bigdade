import { cn } from "@/lib/utils";

type ScribbleArrowProps = {
  className?: string;
  /** Mirror horizontally so the arrow points left. */
  flip?: boolean;
};

/**
 * Hand-drawn arrow, echoing the ink arrows that point from each project
 * title to its photograph in the portfolio. Decorative only.
 */
export function ScribbleArrow({ className, flip = false }: ScribbleArrowProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 48"
      fill="none"
      className={cn("h-8 w-auto text-current", flip && "-scale-x-100", className)}
    >
      <path
        d="M4 30c10 4 22 2 30-4 6-4 6-12 0-14-6-2-10 6-6 12 6 8 24 10 42 4 14-5 26-8 40-6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M98 12l14 10-16 8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
