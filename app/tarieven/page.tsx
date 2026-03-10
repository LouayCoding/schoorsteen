"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerItem, viewportConfig } from "@/lib/animations";
import { SERVICES, PRICING_DISCLAIMER, PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

export default function TarievenPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader
          eyebrow="Tarieven"
          title="Heldere prijzen, geen verrassingen."
          subtitle="Wat u ziet is wat u betaalt. Alle prijzen zijn exclusief btw."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-divider mb-12"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.slug}
              variants={staggerItem}
              className="bg-background p-8 md:p-10"
            >
              <Link href={`/diensten/${service.slug}`} className="group block">
                <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-3xl font-heading font-semibold text-accent mb-6">
                  €{service.price}
                  <span className="text-sm font-body text-muted font-normal ml-1">vanaf</span>
                </p>
                <ul className="flex flex-col gap-3 mb-4">
                  {service.details.map((d) => (
                    <li key={d.label} className="flex items-baseline justify-between text-sm">
                      <span className="text-muted">{d.label}</span>
                      <span className="text-foreground font-medium">{d.price}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                  Meer info →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="text-xs text-muted/60 max-w-[65ch] mx-auto text-center leading-relaxed mb-16"
        >
          {PRICING_DISCLAIMER}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="text-center"
        >
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors"
          >
            Bel {PHONE_NUMBER}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
