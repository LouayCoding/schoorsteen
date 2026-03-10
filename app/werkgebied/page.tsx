"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerItem, viewportConfig } from "@/lib/animations";
import { PHONE_HREF, PHONE_NUMBER, TOP_CITIES } from "@/lib/constants";
import { getAllSteden, getStadSlug } from "@/lib/steden";
import SectionHeader from "@/components/SectionHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function WerkgebiedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const allSteden = getAllSteden();

  const filteredSteden = useMemo(() => {
    if (!searchQuery.trim()) return allSteden;
    const query = searchQuery.toLowerCase();
    return allSteden.filter((stad) => stad.toLowerCase().includes(query));
  }, [searchQuery, allSteden]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60svh] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/heropc.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-0 mx-auto max-w-[1400px] w-full px-6 pt-32 pb-20 md:pt-40 md:pb-28"
        >
          <motion.span
            variants={item}
            className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6"
          >
            Werkgebied
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold max-w-[16ch] mb-6"
          >
            Actief door heel Nederland.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted text-lg md:text-xl max-w-[45ch] mb-10"
          >
            Ons landelijk netwerk van vakmensen staat voor u klaar. Van Groningen tot Maastricht.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
            >
              Bel {PHONE_NUMBER}
            </a>
            <Link
              href="/afspraak"
              className="inline-flex items-center justify-center border border-foreground/20 text-foreground font-medium text-base px-8 py-4 rounded hover:border-foreground/40 transition-colors duration-200"
            >
              Afspraak maken
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Populaire steden ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeader
            eyebrow="Populaire locaties"
            title="Meest aangevraagd."
            subtitle="Onze vakmensen zijn het meest actief in deze regio's."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-divider mb-8"
          >
            {TOP_CITIES.map((city) => (
              <motion.div key={city} variants={staggerItem}>
                <Link
                  href={`/werkgebied/${getStadSlug(city)}`}
                  className="group relative block bg-background overflow-hidden transition-colors duration-300 hover:bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src="/schoorsteenkap-plaatsen.png"
                      alt={`Schoorsteenveger ${city}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-base font-heading font-semibold group-hover:text-accent transition-colors duration-300">
                      {city}
                    </p>
                    <p className="text-xs text-muted mt-1">+ omgeving</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Alle gemeenten ── */}
      <section className="py-20 md:py-28 border-t border-divider">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHeader
            eyebrow="Alle gemeenten"
            title="Zoek uw gemeente."
            subtitle="Wij zijn actief in meer dan 300 gemeenten door heel Nederland."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="mb-12 max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Zoek uw gemeente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200"
            />
            {searchQuery && (
              <p className="text-xs text-muted mt-3 text-center">
                {filteredSteden.length} {filteredSteden.length === 1 ? "gemeente" : "gemeenten"} gevonden
              </p>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.01 } } }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-divider"
          >
            {filteredSteden.map((stad) => (
              <motion.div key={stad} variants={staggerItem}>
                <Link
                  href={`/werkgebied/${getStadSlug(stad)}`}
                  className="group block bg-background p-4 transition-colors duration-300 hover:bg-surface"
                >
                  <p className="text-sm font-heading font-semibold group-hover:text-accent transition-colors duration-300">
                    {stad}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredSteden.length === 0 && (
            <p className="text-center text-muted py-16">
              Geen gemeenten gevonden voor &ldquo;{searchQuery}&rdquo;
            </p>
          )}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="text-sm text-muted text-center mt-12"
          >
            Staat uw plaats er niet bij? Neem contact op — wij zijn vrijwel overal actief.
          </motion.p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/daklekkage-repareren.png)" }}
        />
        <div className="absolute inset-0 bg-[#141414]/85" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6"
            >
              Direct regelen
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold max-w-[16ch] mb-6 text-[#f5f5f0]"
            >
              Klaar om het te regelen?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[#a0a0a0] text-base md:text-lg max-w-[40ch] mb-10"
            >
              Bel ons direct of plan online een afspraak. Wij staan voor u klaar.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center bg-accent text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
              >
                Bel {PHONE_NUMBER}
              </a>
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center border border-white/20 text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:border-white/40 transition-colors duration-200"
              >
                Afspraak maken
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
