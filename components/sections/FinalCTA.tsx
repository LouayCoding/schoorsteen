"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n-context";

export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/daklekkage-repareren.png)",
        }}
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
            {t("finalCta.eyebrow")}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold max-w-[16ch] mb-6 text-[#f5f5f0]"
          >
            {t("finalCta.title")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#a0a0a0] text-base md:text-lg max-w-[40ch] mb-10"
          >
            {t("finalCta.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center bg-accent text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
            >
              {t("finalCta.callButton", { phone: PHONE_NUMBER })}
            </a>
            <Link
              href="/afspraak"
              className="inline-flex items-center justify-center border border-white/20 text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:border-white/40 transition-colors duration-200"
            >
              {t("finalCta.appointmentButton")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
