"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerItem, viewportConfig } from "@/lib/animations";
import { TOP_CITIES } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/lib/i18n-context";

export default function Werkgebied() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
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
              className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8"
            >
              {TOP_CITIES.map((city) => (
                <motion.div key={city} variants={staggerItem}>
                  <Link
                    href={`/werkgebied/${city.toLowerCase()}`}
                    className="text-base text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {city}
                  </Link>
                </motion.div>
              ))}
              <motion.p variants={staggerItem} className="col-span-2 text-sm text-muted/60 mt-2">
                {t("werkgebied.surrounding")}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
            >
              <Link
                href="/werkgebied"
                className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {t("werkgebied.viewAll")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="relative aspect-[4/3] overflow-hidden rounded"
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
