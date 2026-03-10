"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerItem, viewportConfig } from "@/lib/animations";
import { SERVICES } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

export default function DienstenPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader
          eyebrow="Onze diensten"
          title="Wat kunnen wij voor u doen?"
          subtitle="Professioneel schoorsteenonderhoud door heel Nederland."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-divider"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <Link
                href={`/diensten/${service.slug}`}
                className="group block bg-background p-8 md:p-10 h-full transition-colors duration-300 hover:bg-surface"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-4">
                  Vanaf €{service.price}
                </p>
                <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-2 mb-6">
                  {service.details.map((d) => (
                    <li
                      key={d.label}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span className="text-muted">{d.label}</span>
                      <span className="text-foreground font-medium">{d.price}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-sm text-muted group-hover:text-foreground transition-colors duration-300">
                  Meer info →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
