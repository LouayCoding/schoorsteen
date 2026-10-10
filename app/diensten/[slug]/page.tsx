import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqList from "@/components/FaqList";
import Reveal from "@/components/Reveal";
import { BASE_URL, COMPANY_NAME, PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { BTN_LG, BTN_MD, BTN_PRIMARY, BTN_SECONDARY, CONTAINER, EYEBROW } from "@/lib/ui";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Schoorsteenservice`,
    description: service.description,
    alternates: { canonical: `/diensten/${slug}` },
    openGraph: {
      title: `${service.title} | Schoorsteenservice`,
      description: service.description,
      url: `/diensten/${slug}`,
    },
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
  const faqItems = service.faq.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      telephone: PHONE_NUMBER,
      url: BASE_URL,
    },
    areaServed: { "@type": "Country", name: "Nederland" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.price.replace(",", "."),
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: service.price.replace(",", "."),
        unitText: "exclusief btw",
      },
    },
  };

  return (
    <article className="pt-28 md:pt-36 pb-20 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <Reveal>
            <span className={`${EYEBROW} mb-4`}>Vanaf €{service.price}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-5">
              {service.title}
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-[45ch]">
              {service.description}
            </p>
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted mb-4">
              Tarieven
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {service.details.map((d) => (
                <li
                  key={d.label}
                  className="flex items-baseline justify-between text-base border-b border-divider pb-3"
                >
                  <span className="text-muted">{d.label}</span>
                  <span className="font-semibold">{d.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={PHONE_HREF} className={`${BTN_PRIMARY} ${BTN_MD}`}>
                Bel {PHONE_NUMBER}
              </a>
              <Link href="/afspraak" className={`${BTN_SECONDARY} ${BTN_MD}`}>
                Afspraak maken
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-divider">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </Reveal>
        </div>

        {service.benefits.length > 0 && (
          <Reveal className="mt-20 pt-16 border-t border-divider">
            <span className={`${EYEBROW} mb-4`}>Voordelen</span>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
              Waarom {service.title.toLowerCase()}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <p className="text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {service.process.length > 0 && (
          <Reveal className="mt-20 pt-16 border-t border-divider">
            <span className={`${EYEBROW} mb-4`}>Werkwijze</span>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
              Hoe werkt het?
            </h2>
            <div className="flex flex-col gap-8">
              {service.process.map((step, index) => (
                <div key={step.step} className="flex gap-6">
                  <span className="text-2xl font-heading font-semibold text-accent/40 shrink-0">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-heading font-semibold mb-1.5">{step.step}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {faqItems.length > 0 && (
          <Reveal className="mt-20 pt-16 border-t border-divider max-w-[760px]">
            <span className={`${EYEBROW} mb-4`}>Veelgestelde vragen</span>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
              Vragen over {service.title.toLowerCase()}?
            </h2>
            <FaqList items={faqItems} />
          </Reveal>
        )}

        <div className="mt-20 pt-16 border-t border-divider">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className={`${EYEBROW} mb-4`}>Direct regelen</span>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
                {service.title} nodig?
              </h2>
              <p className="text-muted text-base max-w-[40ch] mb-6">
                Neem contact op voor een afspraak. Snel, vakkundig en eerlijk geprijsd.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={PHONE_HREF} className={`${BTN_PRIMARY} ${BTN_LG}`}>
                  Bel {PHONE_NUMBER}
                </a>
                <Link href="/afspraak" className={`${BTN_SECONDARY} ${BTN_LG}`}>
                  Afspraak maken
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-divider">
          <p className={`${EYEBROW} mb-8`}>Andere diensten</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/diensten/${s.slug}`}
                className="group block bg-surface border border-divider rounded-2xl p-6 transition-colors hover:border-accent/40"
              >
                <p className="text-xs text-accent font-semibold mb-2">Vanaf €{s.price}</p>
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
