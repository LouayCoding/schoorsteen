"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n-context";

const STEP_KEYS = ["step1", "step2", "step3"];
const STEP_NUMBERS = ["01", "02", "03"];

export default function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 border-t border-divider">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
            className="relative aspect-[4/5] overflow-hidden rounded order-2 lg:order-1"
            style={{ position: 'relative' }}
          >
            <Image
              src="/camera-inspectie.png"
              alt="Schoorsteenveger aan het werk"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
              className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
            >
              {t("howItWorks.eyebrow")}
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
              className="text-3xl md:text-4xl font-heading font-semibold mb-12"
            >
              {t("howItWorks.title")}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="flex flex-col gap-10 mb-10"
            >
              {STEP_KEYS.map((key, i) => (
                <motion.div key={key} variants={fadeUp} className="flex gap-6">
                  <span className="text-3xl font-heading font-semibold text-accent/30 shrink-0">
                    {STEP_NUMBERS[i]}
                  </span>
                  <div>
                    <h3 className="text-base font-heading font-semibold mb-1.5">
                      {t(`howItWorks.steps.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {t(`howItWorks.steps.${key}.description`)}
                    </p>
                  </div>
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
                className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-sm px-6 py-3 rounded hover:bg-accent-hover transition-colors"
              >
                {t("howItWorks.callButton", { phone: PHONE_NUMBER })}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
