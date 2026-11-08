"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  /** Seconds before the first letter starts. */
  delay?: number;
  /** Seconds between letters. */
  stagger?: number;
  className?: string;
};

/**
 * Letter-by-letter rise for display headings. Screen readers get the whole
 * word; reduced-motion users get static text.
 */
export function SplitText({ text, delay = 0, stagger = 0.035, className }: SplitTextProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{text}</span>;
  }
  const letters = Array.from(text);
  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className="sr-only">{text}</span>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: "0.35em", rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </span>
  );
}
