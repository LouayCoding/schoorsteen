"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`flex flex-col gap-4 mb-12 md:mb-16 ${alignment}`}
    >
      <motion.span
        variants={fadeUp}
        className="text-xs uppercase tracking-[0.2em] text-accent font-medium"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-semibold max-w-[20ch]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-muted text-base md:text-lg max-w-[50ch]"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
