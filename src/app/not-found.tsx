import Link from "next/link";
import { Container, Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section theme="ink" className="flex min-h-svh items-center pt-24">
      <Container>
        <p className="eyebrow mb-4 text-fg-muted">404</p>
        <h1 className="display text-6xl sm:text-8xl">Nothing on this wall.</h1>
        <div className="mt-8">
          <Link href="/" className="btn btn-solid">
            Back home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
