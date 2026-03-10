"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";

const STATS = [
  { value: "2.500+", label: "Schoorstenen geveegd" },
  { value: "4.9/5", label: "Klantbeoordeling" },
  { value: "24u", label: "Reactietijd" },
  { value: "100%", label: "Gecertificeerd" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-divider">
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
