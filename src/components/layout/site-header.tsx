"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { artist } from "@/content/artist";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Fixed charcoal header. Gains a hairline shadow once the page is scrolled.
 * Mobile nav is a full-height panel below the bar.
 */
export function SiteHeader({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the panel is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-theme="ink"
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ink/85 backdrop-blur-md transition-shadow duration-300",
        (scrolled || open) && "shadow-[0_1px_0_0_var(--rule)]",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-lime focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="display text-2xl leading-none text-lime sm:text-3xl"
          aria-label={`${artist.name} — home`}
        >
          {artist.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active =
                pathname !== null &&
                (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "eyebrow relative py-2 text-lime/80 transition-colors hover:text-lime",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lime after:transition-transform",
                      active && "text-lime after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-lime md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform",
                  open && "top-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-6 bg-current transition-transform",
                  open && "bottom-[7px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id={menuId}
        hidden={!open}
        className="adinkra-edges grain fixed inset-x-0 top-16 z-40 h-[calc(100svh-4rem)] overflow-y-auto bg-ink text-lime md:hidden"
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 py-10">
          <ul className="space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="display block text-5xl">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-lime/70">@{artist.contact.instagram}</p>
        </nav>
      </div>
    </header>
  );
}
