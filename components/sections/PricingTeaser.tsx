"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerItem, viewportConfig } from "@/lib/animations";
import { SERVICES, PRICING_DISCLAIMER } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

const FEATURED = SERVICES.slice(0, 3);

export default function PricingTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader
          eyebrow="Tarieven"
          title="Heldere prijzen, geen verrassingen."
          subtitle="Wat u ziet is wat u betaalt. Altijd vooraf duidelijkheid."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider mb-10"
        >
          {FEATURED.map((service) => (
            <motion.div
              key={service.slug}
              variants={staggerItem}
              className="bg-background p-8 md:p-10"
            >
              <h3 className="text-lg font-heading font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-3xl font-heading font-semibold text-accent mb-6">
                €{service.price}
                <span className="text-sm font-body text-muted font-normal ml-1">
                  vanaf
                </span>
              </p>
              <ul className="flex flex-col gap-3">
                {service.details.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-baseline justify-between text-sm"
                  >
                    <span className="text-muted">{d.label}</span>
                    <span className="text-foreground font-medium">
                      {d.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/tarieven"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
          >
            Bekijk alle tarieven →
          </Link>
          <p className="text-xs text-muted/60 max-w-[60ch] text-center leading-relaxed">
            {PRICING_DISCLAIMER}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
