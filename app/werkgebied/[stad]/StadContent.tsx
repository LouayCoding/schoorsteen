"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import PricingTeaser from "@/components/sections/PricingTeaser";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";

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

const TRUST_ITEMS = [
  "Gecertificeerde vakmensen",
  "Inclusief veegbewijs",
  "Transparante tarieven",
  "Binnen 48 uur geholpen",
];

export default function StadContent({ stad }: { stad: string }) {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    postcode: "",
    huisnummer: "",
    opmerking: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, stad }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ naam: "", email: "", telefoon: "", postcode: "", huisnummer: "", opmerking: "" });
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || `Server error (${response.status})`);
        setSubmitStatus("error");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Netwerkfout");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ── Hero (matching home design: 2-column with inline form) ── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: "url(/heromobile.png)" }}
        />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
          style={{ backgroundImage: "url(/heropc.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />

        <div className="relative z-0 mx-auto max-w-[1600px] w-full px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.div variants={item} className="flex items-center gap-2 text-sm text-muted mb-6">
                <Link href="/werkgebied" className="hover:text-accent transition-colors">
                  Werkgebied
                </Link>
                <span className="text-muted/40">/</span>
                <span className="text-foreground">{stad}</span>
              </motion.div>

              <motion.span
                variants={item}
                className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-6"
              >
                Schoorsteenveger in {stad}
              </motion.span>

              <motion.h1
                variants={item}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-heading font-semibold max-w-[14ch] mb-6"
              >
                Vakkundig en snel geregeld in {stad}.
              </motion.h1>

              <motion.p
                variants={item}
                className="text-muted text-lg md:text-xl max-w-[40ch] mb-10"
              >
                Professioneel schoorsteen vegen, inspectie of reparatie in {stad} en omgeving. Vandaag nog geholpen.
              </motion.p>

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
                >
                  Bel {PHONE_NUMBER}
                </a>
              </motion.div>

              <motion.div variants={item} className="flex flex-wrap gap-x-8 gap-y-3">
                {TRUST_ITEMS.map((text) => (
                  <span key={text} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-surface/80 backdrop-blur-md rounded-lg p-5 md:p-8 flex flex-col gap-4 md:gap-5"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-1">
                    Afspraak in {stad}
                  </p>
                  <h2 className="text-lg md:text-xl font-heading font-semibold mb-2">
                    Direct plannen.
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Vul het formulier in en wij nemen binnen 24 uur contact met u op.
                  </p>
                </div>

                <div>
                  <label htmlFor="stad-naam" className="block text-sm text-muted mb-1.5">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="stad-naam"
                    name="naam"
                    required
                    value={formData.naam}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                    placeholder="Uw naam"
                  />
                </div>

                <div>
                  <label htmlFor="stad-email" className="block text-sm text-muted mb-1.5">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="stad-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                    placeholder="uw@email.nl"
                  />
                </div>

                <div>
                  <label htmlFor="stad-telefoon" className="block text-sm text-muted mb-1.5">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    id="stad-telefoon"
                    name="telefoon"
                    required
                    value={formData.telefoon}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                    placeholder="06 12345678"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="stad-postcode" className="block text-sm text-muted mb-1.5">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      id="stad-postcode"
                      name="postcode"
                      required
                      value={formData.postcode}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                      placeholder="1234 AB"
                    />
                  </div>
                  <div>
                    <label htmlFor="stad-huisnummer" className="block text-sm text-muted mb-1.5">
                      Huisnummer *
                    </label>
                    <input
                      type="text"
                      id="stad-huisnummer"
                      name="huisnummer"
                      required
                      value={formData.huisnummer}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stad-opmerking" className="block text-sm text-muted mb-1.5">
                    Opmerking
                  </label>
                  <textarea
                    id="stad-opmerking"
                    name="opmerking"
                    rows={2}
                    value={formData.opmerking}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm resize-none"
                    placeholder="Eventuele opmerkingen..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-foreground font-medium text-base md:text-sm px-6 py-4 md:py-3.5 rounded hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Verzenden..." : "Afspraak aanvragen"}
                </button>

                {submitStatus === "success" && (
                  <p className="text-sm text-accent text-center">
                    ✓ Bedankt! We nemen binnen 24 uur contact met u op.
                  </p>
                )}
                {submitStatus === "error" && (
                  <div className="text-center">
                    <p className="text-sm text-red-500">
                      Er is iets misgegaan. Probeer het opnieuw of bel ons direct.
                    </p>
                    {errorMessage && (
                      <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
                    )}
                  </div>
                )}
                {submitStatus === "idle" && (
                  <p className="text-xs text-muted text-center">
                    We nemen binnen 24 uur contact met u op
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Shared sections (same as home page) ── */}
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <PricingTeaser />
      <Reviews />
      <FAQ />

      {/* ── City-specific Final CTA ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/daklekkage-repareren.png)" }}
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
              Schoorsteenveger {stad}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold max-w-[20ch] mb-6 text-[#f5f5f0]"
            >
              Klaar om het te regelen in {stad}?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[#a0a0a0] text-base md:text-lg max-w-[40ch] mb-10"
            >
              Bel ons direct of plan online een afspraak. Wij staan voor u klaar in {stad} en omgeving.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center bg-accent text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:bg-accent-hover transition-colors duration-200"
              >
                Bel {PHONE_NUMBER}
              </a>
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center border border-white/20 text-[#f5f5f0] font-medium text-base px-8 py-4 rounded hover:border-white/40 transition-colors duration-200"
              >
                Afspraak maken
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
