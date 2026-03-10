"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerItem, viewportConfig } from "@/lib/animations";
import { SERVICES } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/lib/i18n-context";

export default function ServicesGrid() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
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
                className="group block bg-background h-full transition-colors duration-300 hover:bg-surface"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-3">
                    {t("services.from")} €{service.price}
                  </p>
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
