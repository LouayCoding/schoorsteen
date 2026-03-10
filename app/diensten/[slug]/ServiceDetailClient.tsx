"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

interface ServiceDetailClientProps {
  service: {
    title: string;
    price: string;
    description: string;
    image: string;
    details: { label: string; price: string }[];
    benefits?: string[];
    process?: { step: string; description: string }[];
    faq?: { q: string; a: string }[];
  };
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
      >
        <div>
          <motion.span
            variants={item}
            className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            Vanaf €{service.price}
          </motion.span>
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p
            variants={item}
            className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-[45ch]"
          >
            {service.description}
          </motion.p>
          <motion.div variants={item}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted mb-4">
              Tarieven
            </h3>
            <ul className="flex flex-col gap-3">
              {service.details.map((d) => (
                <li
                  key={d.label}
                  className="flex items-baseline justify-between text-base border-b border-divider pb-3"
                >
                  <span className="text-muted">{d.label}</span>
                  <span className="text-foreground font-medium">{d.price}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative aspect-[4/3] overflow-hidden rounded" style={{ position: 'relative' }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="mt-20 pt-16 border-t border-divider">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6 block">
            Voordelen
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
            Waarom {service.title.toLowerCase()}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <p className="text-base text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <div className="mt-20 pt-16 border-t border-divider">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6 block">
            Werkwijze
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
            Hoe werkt het?
          </h2>
          <div className="flex flex-col gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="flex gap-6">
                <span className="text-2xl font-heading font-semibold text-accent/30 shrink-0">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-base font-heading font-semibold mb-1.5">
                    {step.step}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <div className="mt-20 pt-16 border-t border-divider">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6 block">
            Veelgestelde vragen
          </span>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-8">
            Vragen over {service.title.toLowerCase()}?
          </h2>
          <div className="flex flex-col">
            {service.faq.map((item, index) => (
              <div key={index} className="border-b border-divider">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-base font-medium pr-8 group-hover:text-accent transition-colors duration-200">
                    {item.q}
                  </span>
                  <span
                    className={`text-muted text-xl shrink-0 transition-transform duration-300 ${
                      openFaqIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="pb-6">
                    <p className="text-sm text-muted leading-relaxed max-w-[55ch]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
