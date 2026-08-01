import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-off-white py-24">
      <Container className="text-center">
        <p className="section-label mb-3">404</p>
        <h1 className="text-4xl text-navy">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          The page you requested is not available. Return to the BGIVS homepage or contact the
          institute for assistance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Go to Homepage
          </Button>
          <Button href="/contact" variant="outline">
            Contact the Institute
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or explore the{" "}
          <Link href="/framework" className="font-semibold text-blue hover:underline">
            BVSDQ–CSRDQ Framework®
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
