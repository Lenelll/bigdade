"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Pixels to travel upward into place. */
  distance?: number;
  /** Reveal once (default) or every time it scrolls into view. */
  once?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "className">;

/**
 * Fades and lifts content into view on scroll. Respects reduced-motion by
 * rendering static content with no animation.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
