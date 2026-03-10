"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { FAQ_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import { useTranslation } from "@/lib/i18n-context";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[720px] px-6">
        <SectionHeader
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="flex flex-col"
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border-b border-divider"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-base font-medium pr-8 group-hover:text-accent transition-colors duration-200">
                  {item.question}
                </span>
                <span
                  className={`text-muted text-xl shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                  >
                    <p className="text-sm text-muted leading-relaxed pb-6 max-w-[55ch]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
