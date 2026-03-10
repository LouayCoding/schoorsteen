"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, COMPANY_NAME } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={item}
            className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Contact
          </motion.span>
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 max-w-[16ch]"
          >
            Neem contact met ons op.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-muted text-base md:text-lg max-w-[45ch] mb-12"
          >
            Bel ons direct of stuur een e-mail. Wij reageren altijd binnen 24 uur.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider"
        >
          <motion.a
            href={PHONE_HREF}
            variants={fadeUp}
            className="group bg-background p-8 md:p-10 transition-colors hover:bg-surface"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-3">
              Telefoon
            </p>
            <p className="text-xl font-heading font-semibold group-hover:text-accent transition-colors">
              {PHONE_NUMBER}
            </p>
            <p className="text-sm text-muted mt-2">Ma–Vr, 08:00–18:00</p>
          </motion.a>

          <motion.a
            href={`mailto:${EMAIL}`}
            variants={fadeUp}
            className="group bg-background p-8 md:p-10 transition-colors hover:bg-surface"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-3">
              E-mail
            </p>
            <p className="text-xl font-heading font-semibold group-hover:text-accent transition-colors">
              {EMAIL}
            </p>
            <p className="text-sm text-muted mt-2">Reactie binnen 24 uur</p>
          </motion.a>

          <motion.div
            variants={fadeUp}
            className="bg-background p-8 md:p-10"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium mb-3">
              Werkgebied
            </p>
            <p className="text-xl font-heading font-semibold">Heel Nederland</p>
            <p className="text-sm text-muted mt-2">Landelijk netwerk van vakmensen</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
