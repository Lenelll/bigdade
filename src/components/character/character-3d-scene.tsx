"use client";

import type { Character3DProps } from "./character-3d";
import { CharacterPlaceholder } from "./character-placeholder";

/**
 * Phase 5 target. Replace the body of this component with the React Three
 * Fiber canvas once the model exists, keeping the same props so the
 * `Character3D` wrapper and the pages stay untouched.
 *
 * Suggested shape:
 *   <Canvas dpr={[1, 1.5]} camera={...}>
 *     <Suspense fallback={null}><DadeTseModel url="/models/dade-tse.glb" /></Suspense>
 *   </Canvas>
 */
export function Character3DScene({ variant, className }: Character3DProps) {
  return <CharacterPlaceholder variant={variant} className={className} />;
}
