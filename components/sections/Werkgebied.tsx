"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerItem, viewportConfig } from "@/lib/animations";
import { TOP_CITIES } from "@/lib/constants";
import { getStadSlug } from "@/lib/steden";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/lib/i18n-context";

export default function Werkgebied() {
  const { t } = useTranslation();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow={t("werkgebied.eyebrow")}
              title={t("werkgebied.title")}
              subtitle={t("werkgebied.subtitle")}
              align="left"
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {TOP_CITIES.map((city) => (
                <motion.div key={city} variants={staggerItem}>
                  <Link
                    href={`/werkgebied/${getStadSlug(city)}`}
                    className="inline-flex bg-surface text-foreground text-sm font-medium px-4 py-2 rounded-full hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                  >
                    {city}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
              className="flex flex-col gap-2"
            >
              <p className="text-sm text-muted/60">
                {t("werkgebied.surrounding")}
              </p>
              <Link
                href="/werkgebied"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
              >
                {t("werkgebied.viewAll")} →
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ position: 'relative' }}
          >
            <Image
              src="/vogelnest-verwijderen.png"
              alt="Nederlandse daken en schoorstenen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
