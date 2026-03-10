"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n-context";

const ease = [0.25, 0.1, 0.25, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function AfspraakPage() {
  const { t } = useTranslation();
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ naam: "", email: "", telefoon: "", postcode: "", huisnummer: "", opmerking: "" });
      } else {
        const data = await response.json().catch(() => null);
        console.error("Form submission failed:", response.status, data);
        setErrorMessage(data?.error || `Server error (${response.status})`);
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Netwerkfout");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitStatus === "success") {
    return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t("appointment.form.success").replace("✓ ", "")}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            {t("appointment.title")}
          </h1>
          <p className="text-muted text-base mb-8">
            {t("appointment.form.info")}
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center bg-accent text-foreground font-medium text-sm px-6 py-3 rounded hover:bg-accent-hover transition-colors"
          >
            {t("hero.callButton", { phone: PHONE_NUMBER })}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Info */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.span
              variants={item}
              className="inline-block text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
            >
              {t("appointment.eyebrow")}
            </motion.span>
            <motion.h1
              variants={item}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6"
            >
              {t("appointment.title")}
            </motion.h1>
            <motion.p variants={item} className="text-muted text-base mb-8 max-w-[40ch]">
              {t("appointment.subtitle")}
            </motion.p>
            <motion.a
              variants={item}
              href={PHONE_HREF}
              className="text-lg font-heading font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              {PHONE_NUMBER}
            </motion.a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-surface/80 backdrop-blur-md rounded-lg p-5 md:p-8 flex flex-col gap-4 md:gap-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-1">
                  {t("appointment.eyebrow")}
                </p>
                <h2 className="text-lg md:text-xl font-heading font-semibold mb-2">
                  {t("appointment.title")}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {t("appointment.subtitle")}
                </p>
              </div>

              <div>
                <label htmlFor="afspraak-naam" className="block text-sm text-muted mb-1.5">
                  {t("appointment.form.name")}
                </label>
                <input
                  type="text"
                  id="afspraak-naam"
                  name="naam"
                  required
                  value={formData.naam}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                  placeholder={t("appointment.form.placeholders.name")}
                />
              </div>

              <div>
                <label htmlFor="afspraak-email" className="block text-sm text-muted mb-1.5">
                  {t("appointment.form.email")}
                </label>
                <input
                  type="email"
                  id="afspraak-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                  placeholder={t("appointment.form.placeholders.email")}
                />
              </div>

              <div>
                <label htmlFor="afspraak-telefoon" className="block text-sm text-muted mb-1.5">
                  {t("appointment.form.phone")}
                </label>
                <input
                  type="tel"
                  id="afspraak-telefoon"
                  name="telefoon"
                  required
                  value={formData.telefoon}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                  placeholder={t("appointment.form.placeholders.phone")}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="afspraak-postcode" className="block text-sm text-muted mb-1.5">
                    {t("appointment.form.postalCode")}
                  </label>
                  <input
                    type="text"
                    id="afspraak-postcode"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                    placeholder={t("appointment.form.placeholders.postalCode")}
                  />
                </div>
                <div>
                  <label htmlFor="afspraak-huisnummer" className="block text-sm text-muted mb-1.5">
                    {t("appointment.form.houseNumber")}
                  </label>
                  <input
                    type="text"
                    id="afspraak-huisnummer"
                    name="huisnummer"
                    required
                    value={formData.huisnummer}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm"
                    placeholder={t("appointment.form.placeholders.houseNumber")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="afspraak-opmerking" className="block text-sm text-muted mb-1.5">
                  {t("appointment.form.remark")}
                </label>
                <textarea
                  id="afspraak-opmerking"
                  name="opmerking"
                  rows={3}
                  value={formData.opmerking}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 md:py-3 bg-background/60 border border-divider rounded text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-200 text-base md:text-sm resize-none"
                  placeholder={t("appointment.form.placeholders.remark")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-foreground font-medium text-base md:text-sm px-6 py-4 md:py-3.5 rounded hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("appointment.form.submitting") : t("appointment.form.submit")}
              </button>

              {submitStatus === "error" && (
                <div className="text-center">
                  <p className="text-sm text-red-500">
                    {t("appointment.form.error")}
                  </p>
                  {errorMessage && (
                    <p className="text-xs text-red-400 mt-1">{errorMessage}</p>
                  )}
                </div>
              )}
              {submitStatus === "idle" && (
                <p className="text-xs text-muted text-center">
                  {t("appointment.form.info")}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
