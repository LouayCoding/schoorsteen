"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/heropc.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-0 mx-auto max-w-[1400px] w-full px-6 py-32 md:py-40 text-center"
      >
        <motion.span
          variants={item}
          className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6"
        >
          Error 404
        </motion.span>

        <motion.h1
          variants={item}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-semibold mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold mb-6"
        >
          Pagina niet gevonden.
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted text-lg md:text-xl max-w-[45ch] mx-auto mb-10"
        >
          De pagina die u zoekt bestaat niet of is verplaatst. Geen probleem, wij helpen u graag verder.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
          >
            Terug naar home
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center border border-foreground/20 text-foreground font-medium text-base px-8 py-4 rounded hover:border-foreground/40 transition-colors duration-200"
          >
            Bel {PHONE_NUMBER}
          </a>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
          <Link href="/diensten" className="flex items-center gap-2.5 text-sm text-muted hover:text-accent transition-colors">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Onze diensten
          </Link>
          <Link href="/werkgebied" className="flex items-center gap-2.5 text-sm text-muted hover:text-accent transition-colors">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Werkgebied
          </Link>
          <Link href="/tarieven" className="flex items-center gap-2.5 text-sm text-muted hover:text-accent transition-colors">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Tarieven
          </Link>
          <Link href="/contact" className="flex items-center gap-2.5 text-sm text-muted hover:text-accent transition-colors">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Contact
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
