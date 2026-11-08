"use client";

import { useEffect } from "react";
import { Container, Section } from "@/components/ui/section";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section theme="ink" className="flex min-h-svh items-center pt-24">
      <Container>
        <p className="eyebrow mb-4 text-fg-muted">Something went wrong</p>
        <h1 className="display text-6xl sm:text-8xl">Paint spilled.</h1>
        <div className="mt-8">
          <button type="button" onClick={reset} className="btn btn-solid">
            Try again
          </button>
        </div>
      </Container>
    </Section>
  );
}
