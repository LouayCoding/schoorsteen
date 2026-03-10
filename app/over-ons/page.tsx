"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function OverOnsPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.span
              variants={item}
              className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
            >
              Over ons
            </motion.span>
            <motion.h1
              variants={item}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-8"
            >
              Vakmanschap door heel Nederland.
            </motion.h1>
            <motion.div variants={item} className="flex flex-col gap-6 text-muted text-base leading-relaxed">
              <p>
                Wij zijn een landelijk netwerk van ervaren schoorsteenvegers. 
                Geen groot bedrijf met dure kantoren, maar vakmensen die hun werk serieus nemen.
              </p>
              <p>
                Elke schoorsteen is anders. Daarom werken wij niet met standaard oplossingen, 
                maar bekijken we per situatie wat er nodig is. Eerlijk advies, heldere prijzen 
                en werk waar we achter staan.
              </p>
              <p>
                Van Amsterdam tot Maastricht — wij zorgen ervoor dat er altijd een vakman 
                bij u in de buurt beschikbaar is. Snel, betrouwbaar en zonder gedoe.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="relative aspect-[4/5] overflow-hidden rounded"
            style={{ position: 'relative' }}
          >
            <Image
              src="/dak-inspectie.png"
              alt="Vakman op het dak"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
          className="relative aspect-[21/9] overflow-hidden rounded mb-20"
          style={{ position: 'relative' }}
        >
          <Image
            src="/schoorsteenkap-plaatsen.png"
            alt="Nederlandse huizen met schoorstenen"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 pb-16 border-b border-divider"
        >
          {[
            { value: "10+", label: "Jaar ervaring" },
            { value: "2.500+", label: "Tevreden klanten" },
            { value: "Heel NL", label: "Werkgebied" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="text-4xl font-heading font-semibold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
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
