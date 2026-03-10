import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Schoorsteenservice`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <article className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ServiceDetailClient service={service} />

        <div className="mt-20 pt-16 border-t border-divider">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4 block">
                Direct regelen
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
                {service.title} nodig?
              </h2>
              <p className="text-muted text-base max-w-[40ch] mb-6">
                Neem contact op voor een afspraak. Snel, vakkundig en eerlijk geprijsd.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-sm px-6 py-3 rounded hover:bg-accent-hover transition-colors"
                >
                  Bel {PHONE_NUMBER}
                </a>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center border border-foreground/20 text-foreground font-medium text-sm px-6 py-3 rounded hover:border-foreground/40 transition-colors"
                >
                  Afspraak maken
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-divider">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-8">
            Andere diensten
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/diensten/${s.slug}`}
                className="group block bg-background p-8 transition-colors hover:bg-surface"
              >
                <p className="text-xs text-accent font-medium mb-2">
                  Vanaf €{s.price}
                </p>
                <h3 className="text-lg font-heading font-semibold group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
