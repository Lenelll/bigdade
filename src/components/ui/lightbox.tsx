"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

type LightboxContextValue = {
  /** Register an image under a group; returns an unregister function. */
  register: (group: string, image: LightboxImage) => () => void;
  open: (group: string, src: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * One shared full-screen viewer for all artwork on a page. Images register
 * themselves under a group (e.g. a mural project) so arrow keys and the
 * on-screen buttons step through that group only.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const groups = useRef(new Map<string, LightboxImage[]>());
  // The open viewer snapshots its group so render never reads the ref.
  const [state, setState] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const register = useCallback((group: string, image: LightboxImage) => {
    const list = groups.current.get(group) ?? [];
    if (!list.some((i) => i.src === image.src)) list.push(image);
    groups.current.set(group, list);
    return () => {
      const current = groups.current.get(group);
      if (!current) return;
      groups.current.set(
        group,
        current.filter((i) => i.src !== image.src),
      );
    };
  }, []);

  const open = useCallback((group: string, src: string) => {
    const list = groups.current.get(group) ?? [];
    if (list.length === 0) return;
    const index = Math.max(
      0,
      list.findIndex((i) => i.src === src),
    );
    setState({ images: [...list], index });
  }, []);

  const close = useCallback(() => setState(null), []);

  const current = state ? state.images[state.index] : null;
  const count = state?.images.length ?? 0;

  const step = useCallback(
    (delta: number) => {
      setState((s) => {
        if (!s || s.images.length < 2) return s;
        return { ...s, index: (s.index + delta + s.images.length) % s.images.length };
      });
    },
    [],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (state && !dialog.open) dialog.showModal();
    if (!state && dialog.open) dialog.close();
  }, [state]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, step]);

  const value = useMemo(() => ({ register, open }), [register, open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        data-theme="ink"
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label={current ? current.alt : "Image viewer"}
        className="m-0 h-full max-h-none w-full max-w-none bg-ink/95 p-0 text-lime backdrop:bg-ink/80 open:flex open:items-center open:justify-center"
      >
        {current ? (
          <figure className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-10">
            <div className="relative h-full w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {current.caption || count > 1 ? (
              <figcaption className="mt-4 flex items-center gap-4 text-sm text-lime/80">
                {current.caption ? <span className="display text-lg">{current.caption}</span> : null}
                {count > 1 ? (
                  <span className="tabular-nums" aria-live="polite">
                    {state!.index + 1} / {count}
                  </span>
                ) : null}
              </figcaption>
            ) : null}

            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/60 text-lime hover:bg-lime hover:text-ink"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {count > 1 ? (
              <>
                <NavButton direction="prev" onClick={() => step(-1)} />
                <NavButton direction="next" onClick={() => step(1)} />
              </>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const prev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-lime hover:bg-lime hover:text-ink",
        prev ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("h-5 w-5", prev && "-scale-x-100")} fill="none">
        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

/**
 * Wraps artwork in a button that opens it in the lightbox. Registers the
 * image in `group` so neighbours in the same group are navigable.
 */
export function Zoomable({
  group,
  image,
  className,
  children,
}: {
  group: string;
  image: LightboxImage;
  className?: string;
  children: ReactNode;
}) {
  const { register, open } = useLightbox();
  const { src, alt, width, height, caption } = image;
  useEffect(
    () => register(group, { src, alt, width, height, caption }),
    [register, group, src, alt, width, height, caption],
  );
  return (
    <button
      type="button"
      onClick={() => open(group, src)}
      aria-label={`View larger: ${alt}`}
      className={cn("block w-full cursor-zoom-in text-left", className)}
    >
      {children}
    </button>
  );
}
