"use client";

import dynamic from "next/dynamic";
import { CharacterPlaceholder } from "./character-placeholder";

/**
 * Integration point for the future interactive 3D Dade Tse experience.
 *
 * Today it renders the static placeholder. When the GLB model is ready:
 *  1. install three / @react-three/fiber / @react-three/drei,
 *  2. implement `Character3DScene` in ./character-3d-scene.tsx,
 *  3. set NEXT_PUBLIC_CHARACTER_3D=on.
 * Nothing else on the page needs to change. The scene is loaded only on the
 * client and only when the flag is on, so it never affects the initial
 * bundle until it exists.
 */
const Character3DScene = dynamic(
  () => import("./character-3d-scene").then((m) => m.Character3DScene),
  { ssr: false, loading: () => <CharacterPlaceholder loading /> },
);

export const CHARACTER_3D_ENABLED = process.env.NEXT_PUBLIC_CHARACTER_3D === "on";

export type Character3DProps = {
  /** Where the component is mounted; lets the scene pick a camera/animation preset later. */
  variant?: "hero" | "inline";
  className?: string;
};

export function Character3D({ variant = "hero", className }: Character3DProps) {
  if (!CHARACTER_3D_ENABLED) {
    return <CharacterPlaceholder variant={variant} className={className} />;
  }
  return <Character3DScene variant={variant} className={className} />;
}
